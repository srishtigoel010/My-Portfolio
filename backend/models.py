from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Personal Information Models
class PersonalInfo(BaseModel):
    name: str
    tagline: str
    description: str
    location: str
    email: EmailStr
    phone: str
    portfolio: str

class AboutInfo(BaseModel):
    title: str
    content: str
    image: str

class Education(BaseModel):
    degree: str
    institution: str
    period: str
    score: Optional[str] = None

class Certification(BaseModel):
    name: str
    issuer: str
    period: str

# Skills Models
class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    technical: List[str]
    transferable: List[str]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SkillsCreate(BaseModel):
    technical: List[str]
    transferable: List[str]

# Experience Models
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: str
    company: str
    period: str
    responsibilities: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ExperienceCreate(BaseModel):
    position: str
    company: str
    period: str
    responsibilities: List[str]

# Project Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    category: str
    image: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    category: str
    image: str

# Contact Message Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "unread"  # unread, read, replied

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Complete Portfolio Model
class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    about: AboutInfo
    education: List[Education]
    certifications: List[Certification]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PortfolioCreate(BaseModel):
    personal: PersonalInfo
    about: AboutInfo
    education: List[Education]
    certifications: List[Certification]

# Response Models
class MessageResponse(BaseModel):
    message: str
    id: Optional[str] = None

class PortfolioResponse(BaseModel):
    personal: PersonalInfo
    about: AboutInfo
    education: List[Education]
    certifications: List[Certification]
    skills: Skills
    experience: List[Experience]
    projects: List[Project]