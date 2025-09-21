from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models import *
import os
from datetime import datetime

class DatabaseManager:
    def __init__(self, db):
        self.db = db
        self.portfolio_collection = db.portfolio
        self.skills_collection = db.skills
        self.experience_collection = db.experience
        self.projects_collection = db.projects
        self.messages_collection = db.contact_messages
    
    # Portfolio CRUD Operations
    async def get_portfolio(self) -> Optional[dict]:
        portfolio = await self.portfolio_collection.find_one({})
        return portfolio
    
    async def create_or_update_portfolio(self, portfolio_data: dict) -> dict:
        existing = await self.portfolio_collection.find_one({})
        if existing:
            portfolio_data['updated_at'] = datetime.utcnow()
            await self.portfolio_collection.update_one(
                {"_id": existing["_id"]}, 
                {"$set": portfolio_data}
            )
        else:
            await self.portfolio_collection.insert_one(portfolio_data)
        return portfolio_data
    
    # Skills CRUD Operations
    async def get_skills(self) -> Optional[dict]:
        skills = await self.skills_collection.find_one({})
        return skills
    
    async def create_or_update_skills(self, skills_data: dict) -> dict:
        existing = await self.skills_collection.find_one({})
        if existing:
            skills_data['updated_at'] = datetime.utcnow()
            await self.skills_collection.update_one(
                {"_id": existing["_id"]}, 
                {"$set": skills_data}
            )
        else:
            await self.skills_collection.insert_one(skills_data)
        return skills_data
    
    # Experience CRUD Operations
    async def get_all_experience(self) -> List[dict]:
        experience_list = []
        async for exp in self.experience_collection.find({}).sort("created_at", -1):
            experience_list.append(exp)
        return experience_list
    
    async def create_experience(self, experience_data: dict) -> dict:
        result = await self.experience_collection.insert_one(experience_data)
        experience_data["_id"] = result.inserted_id
        return experience_data
    
    async def delete_experience(self, experience_id: str) -> bool:
        result = await self.experience_collection.delete_one({"id": experience_id})
        return result.deleted_count > 0
    
    # Projects CRUD Operations
    async def get_all_projects(self) -> List[dict]:
        projects_list = []
        async for project in self.projects_collection.find({}).sort("created_at", -1):
            projects_list.append(project)
        return projects_list
    
    async def create_project(self, project_data: dict) -> dict:
        result = await self.projects_collection.insert_one(project_data)
        project_data["_id"] = result.inserted_id
        return project_data
    
    async def delete_project(self, project_id: str) -> bool:
        result = await self.projects_collection.delete_one({"id": project_id})
        return result.deleted_count > 0
    
    # Contact Messages CRUD Operations
    async def create_contact_message(self, message_data: dict) -> dict:
        result = await self.messages_collection.insert_one(message_data)
        message_data["_id"] = result.inserted_id
        return message_data
    
    async def get_all_messages(self) -> List[dict]:
        messages_list = []
        async for message in self.messages_collection.find({}).sort("created_at", -1):
            messages_list.append(message)
        return messages_list
    
    async def update_message_status(self, message_id: str, status: str) -> bool:
        result = await self.messages_collection.update_one(
            {"id": message_id}, 
            {"$set": {"status": status}}
        )
        return result.modified_count > 0