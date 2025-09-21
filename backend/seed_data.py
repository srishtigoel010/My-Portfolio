from models import *
from database import DatabaseManager
from datetime import datetime

# Seed data based on the mock.js file
SEED_PORTFOLIO_DATA = {
    "personal": {
        "name": "Srishti Goel",
        "tagline": "AI Generalist Digital Marketer",
        "description": "Strategically works to give AI-based solutions to all marketing needs of a brand",
        "location": "Ghaziabad, Uttar Pradesh, India",
        "email": "srishti.186.goel@gmail.com",
        "phone": "+91 82794 37049",
        "portfolio": "Srishti Goel My Portfolio"
    },
    "about": {
        "title": "About Me",
        "content": "Strategic and creative digital marketer with a proven track record of driving measurable growth across content, engagement, and branding. At The Study Anchor, spearheaded content creation and digital campaigns that doubled video views and boosted YouTube subscribers by 250+ in just 3 months, using a combination of data-driven planning, event-led promotion, and platform analytics. Played a key role in increasing admissions by executing high-impact webinars, student-centric events, and optimized ad creatives. Known for blending visual storytelling and performance marketing to elevate digital presence and conversions.",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
    },
    "education": [
        {
            "degree": "Bachelor of Science in Digital Marketing",
            "institution": "Asian Academy of Film and Television, Noida",
            "period": "2024 – 2027 (Pursuing)"
        },
        {
            "degree": "Senior Secondary",
            "institution": "Parevartan School, Ghaziabad",
            "period": "Completed in 2024",
            "score": "97.7%"
        }
    ],
    "certifications": [
        {
            "name": "Creative Skills Academy for Marketers",
            "issuer": "General Assembly (GA) | Adobe Certified Professional",
            "period": "Feb 2025 – May 2025"
        },
        {
            "name": "Digital Marketing and E-Com Professional Certificate",
            "issuer": "Google | Issued by Coursera",
            "period": "July 2025"
        }
    ]
}

SEED_SKILLS_DATA = {
    "technical": [
        "Adobe Creative Cloud (Photoshop, Illustrator, Premiere Pro)",
        "Canva, CorelDRAW, Figma",
        "WordPress, Elementor, SEMrush", 
        "Meta Business Suite, LinkedIn Ads Manager, Hootsuite",
        "Google Analytics, Google Search Console",
        "Microsoft Excel (Pivot Tables, Dashboarding), PowerPoint",
        "Basic HTML, CSS",
        "Generative AI Tools for Marketing"
    ],
    "transferable": [
        "Tech Adaptability & Quick Learning of New Tools",
        "Strategic Content Planning & Execution", 
        "Cross-Functional Team Collaboration",
        "Campaign Project Management",
        "Digital Brand Storytelling",
        "Performance Analytics & ROI Optimization",
        "Adaptability in Fast-Paced Environments",
        "Creative Problem-Solving",
        "Effective Communication & Knowledge Sharing"
    ]
}

SEED_EXPERIENCE_DATA = [
    {
        "position": "Digital Marketing Intern",
        "company": "The Study Anchor", 
        "period": "April 2025 - Present",
        "responsibilities": [
            "Developed and executed content calendars aligned with campaign goals",
            "Planned and optimized digital marketing strategies across platforms",
            "Designed creative assets for social media and event promotion", 
            "Organized webinars and virtual engagement events",
            "Analyzed digital performance metrics to boost ROI and user interaction"
        ]
    },
    {
        "position": "Social Media Manager & Recruiter", 
        "company": "Looffers",
        "period": "Nov 2024 – Mar 2025",
        "responsibilities": [
            "Created platform-specific content and managed publishing schedules",
            "Recruited and trained interns across content and marketing roles",
            "Monitored performance metrics and curated weekly insights"
        ]
    },
    {
        "position": "Team Leader, Digital Marketing",
        "company": "Sanklap Marketing", 
        "period": "Nov 2024 – Jan 2025",
        "responsibilities": [
            "Led a cross-functional team of marketers and designers",
            "Developed brand-specific content strategies and performance reports",
            "Oversaw hiring and resource allocation for campaign execution"
        ]
    },
    {
        "position": "Graphic Designer",
        "company": "Dream Hill Coffee",
        "period": "May 2024 – Aug 2024", 
        "responsibilities": [
            "Designed branded visuals for online and offline channels",
            "Collaborated on thematic content and digital promotions"
        ]
    }
]

SEED_PROJECTS_DATA = [
    {
        "title": "AI-Powered Content Strategy",
        "description": "Comprehensive content strategy leveraging AI tools to optimize engagement and conversion rates across multiple platforms.",
        "technologies": ["AI Tools", "Content Strategy", "Analytics"],
        "category": "Strategy",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "title": "Multi-Platform Campaign Management",
        "description": "Integrated marketing campaign across social media platforms with performance tracking and optimization.",
        "technologies": ["Social Media", "Campaign Management", "ROI Analysis"],
        "category": "Campaign",
        "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "title": "Brand Visual Identity Design", 
        "description": "Complete visual identity package including logos, social media templates, and marketing collaterals.",
        "technologies": ["Adobe Creative Suite", "Brand Design", "Visual Identity"],
        "category": "Design",
        "image": "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "title": "Performance Analytics Dashboard",
        "description": "Custom analytics dashboard for tracking marketing performance and generating actionable insights.",
        "technologies": ["Google Analytics", "Data Visualization", "Performance Tracking"],
        "category": "Analytics", 
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
]

async def seed_database(db_manager: DatabaseManager):
    """Seed the database with initial portfolio data"""
    
    # Seed portfolio data
    portfolio_data = Portfolio(**SEED_PORTFOLIO_DATA).dict()
    await db_manager.create_or_update_portfolio(portfolio_data)
    
    # Seed skills data  
    skills_data = Skills(**SEED_SKILLS_DATA).dict()
    await db_manager.create_or_update_skills(skills_data)
    
    # Seed experience data
    for exp_data in SEED_EXPERIENCE_DATA:
        experience = Experience(**exp_data).dict()
        await db_manager.create_experience(experience)
    
    # Seed projects data
    for proj_data in SEED_PROJECTS_DATA:
        project = Project(**proj_data).dict()
        await db_manager.create_project(project)
    
    print("✅ Database seeded successfully with portfolio data")