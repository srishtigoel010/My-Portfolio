from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from models import *
from database import DatabaseManager
from seed_data import seed_database
import os
import logging
from pathlib import Path
from typing import List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize database manager
db_manager = DatabaseManager(db)

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Portfolio endpoints
@api_router.get("/portfolio", response_model=PortfolioResponse)
async def get_portfolio():
    """Get complete portfolio data"""
    try:
        portfolio = await db_manager.get_portfolio()
        skills = await db_manager.get_skills()
        experience = await db_manager.get_all_experience()
        projects = await db_manager.get_all_projects()
        
        if not portfolio:
            # If no portfolio exists, seed the database
            await seed_database(db_manager)
            portfolio = await db_manager.get_portfolio()
            skills = await db_manager.get_skills()
            experience = await db_manager.get_all_experience()
            projects = await db_manager.get_all_projects()
        
        # Clean up MongoDB _id fields for response
        def clean_mongo_doc(doc):
            if doc and '_id' in doc:
                doc.pop('_id')
            return doc
        
        portfolio = clean_mongo_doc(portfolio)
        skills = clean_mongo_doc(skills)
        
        for exp in experience:
            clean_mongo_doc(exp)
        
        for proj in projects:
            clean_mongo_doc(proj)
        
        response_data = {
            **portfolio,
            "skills": skills,
            "experience": experience,
            "projects": projects
        }
        
        return response_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio: {str(e)}")

@api_router.put("/portfolio")
async def update_portfolio(portfolio_data: PortfolioCreate):
    """Update portfolio information"""
    try:
        portfolio_dict = portfolio_data.dict()
        result = await db_manager.create_or_update_portfolio(portfolio_dict)
        return {"message": "Portfolio updated successfully", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating portfolio: {str(e)}")

# Skills endpoints
@api_router.get("/skills", response_model=Skills)
async def get_skills():
    """Get skills data"""
    try:
        skills = await db_manager.get_skills()
        if not skills:
            raise HTTPException(status_code=404, detail="Skills not found")
        
        if '_id' in skills:
            skills.pop('_id')
        
        return skills
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching skills: {str(e)}")

@api_router.put("/skills")
async def update_skills(skills_data: SkillsCreate):
    """Update skills information"""
    try:
        skills_dict = Skills(**skills_data.dict()).dict()
        result = await db_manager.create_or_update_skills(skills_dict)
        return {"message": "Skills updated successfully", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating skills: {str(e)}")

# Experience endpoints
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    try:
        experience_list = await db_manager.get_all_experience()
        
        for exp in experience_list:
            if '_id' in exp:
                exp.pop('_id')
        
        return experience_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching experience: {str(e)}")

@api_router.post("/experience")
async def create_experience(experience_data: ExperienceCreate):
    """Add new work experience"""
    try:
        exp_dict = Experience(**experience_data.dict()).dict()
        result = await db_manager.create_experience(exp_dict)
        return {"message": "Experience created successfully", "id": result["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating experience: {str(e)}")

# Projects endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        projects_list = await db_manager.get_all_projects()
        
        for proj in projects_list:
            if '_id' in proj:
                proj.pop('_id')
        
        return projects_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@api_router.post("/projects")
async def create_project(project_data: ProjectCreate):
    """Add new project"""
    try:
        proj_dict = Project(**project_data.dict()).dict()
        result = await db_manager.create_project(proj_dict)
        return {"message": "Project created successfully", "id": result["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating project: {str(e)}")

# Contact messages endpoints
@api_router.post("/contact/messages")
async def submit_contact_message(message_data: ContactMessageCreate):
    """Submit contact form message"""
    try:
        msg_dict = ContactMessage(**message_data.dict()).dict()
        result = await db_manager.create_contact_message(msg_dict)
        
        return {
            "message": "Message submitted successfully! Thank you for reaching out.", 
            "id": result["id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting message: {str(e)}")

@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin functionality)"""
    try:
        messages_list = await db_manager.get_all_messages()
        
        for msg in messages_list:
            if '_id' in msg:
                msg.pop('_id')
        
        return messages_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching messages: {str(e)}")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running!", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
