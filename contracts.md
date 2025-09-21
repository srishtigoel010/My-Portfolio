# Portfolio Website API Contracts

## Overview
This document outlines the API contracts for migrating from mock data to a fully functional backend system with MongoDB and FastAPI.

## Current Mock Data Structure
The frontend currently uses `/app/frontend/src/data/mock.js` with the following data:
- Personal information (name, tagline, contact details)
- About content and profile image
- Skills (technical and transferable)
- Work experience with achievements
- Education and certifications
- Project portfolio with categories
- Contact form functionality (currently frontend-only)

## Backend API Endpoints

### 1. Portfolio Data Management

#### GET /api/portfolio
- **Purpose**: Retrieve complete portfolio data
- **Response**: Complete portfolio object matching current mock structure
- **Usage**: Replace mock data import in frontend components

#### PUT /api/portfolio
- **Purpose**: Update portfolio information
- **Request Body**: Portfolio data object
- **Response**: Updated portfolio data
- **Usage**: Future content management functionality

### 2. Contact Form Management

#### POST /api/contact/messages
- **Purpose**: Submit contact form message
- **Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```
- **Response**: Message confirmation with ID
- **Usage**: Replace mock form submission in Contact.jsx

#### GET /api/contact/messages
- **Purpose**: Retrieve contact messages (admin functionality)
- **Response**: Array of contact messages
- **Usage**: Future admin dashboard

### 3. Skills Management

#### GET /api/skills
- **Purpose**: Retrieve skills data
- **Response**: Skills object with technical and transferable arrays
- **Usage**: Skills.jsx component integration

#### PUT /api/skills
- **Purpose**: Update skills information
- **Request Body**: Skills object
- **Response**: Updated skills data

### 4. Experience Management

#### GET /api/experience
- **Purpose**: Retrieve work experience data
- **Response**: Array of experience objects
- **Usage**: Experience.jsx component integration

#### POST /api/experience
- **Purpose**: Add new experience entry
- **Request Body**: Experience object
- **Response**: Created experience with ID

### 5. Projects Management

#### GET /api/projects
- **Purpose**: Retrieve project portfolio
- **Response**: Array of project objects
- **Usage**: Projects.jsx component integration

#### POST /api/projects
- **Purpose**: Add new project
- **Request Body**: Project object with image upload support
- **Response**: Created project with ID

## Database Models

### 1. Portfolio Model
```python
class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    about: AboutInfo
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 2. Contact Message Model
```python
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "unread"  # unread, read, replied
```

### 3. Skills Model
```python
class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    technical: List[str]
    transferable: List[str]
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 4. Experience Model
```python
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: str
    company: str
    period: str
    responsibilities: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### 5. Project Model
```python
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    category: str
    image: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

## Frontend Integration Plan

### 1. API Client Setup
- Create `/app/frontend/src/services/api.js` for centralized API calls
- Replace direct mock imports with API calls
- Add loading states and error handling

### 2. Component Updates Required

#### Hero.jsx
- No changes needed (uses personal data from portfolio API)

#### About.jsx  
- Replace `portfolioData` import with API call to `/api/portfolio`
- Add loading states for content

#### Skills.jsx
- Replace mock skills with `/api/skills` endpoint
- Add real-time update capability

#### Experience.jsx
- Replace mock experience with `/api/experience` endpoint
- Add sorting by date functionality

#### Projects.jsx
- Replace mock projects with `/api/projects` endpoint
- Implement real category filtering
- Add project management features

#### Contact.jsx
- Replace mock form submission with `/api/contact/messages` POST
- Add proper success/error handling
- Implement form validation

### 3. Data Migration Strategy
1. Initialize database with current mock data
2. Create seed script to populate initial portfolio data
3. Test all endpoints with existing frontend
4. Replace mock imports incrementally
5. Add loading states and error boundaries

## Implementation Phases

### Phase 1: Backend Setup
- Set up MongoDB models
- Create basic CRUD endpoints
- Implement contact form functionality
- Add data validation and error handling

### Phase 2: Frontend Integration
- Create API service layer
- Replace mock data in components
- Add loading and error states
- Test all functionality

### Phase 3: Enhancement
- Add admin functionality
- Implement image upload for projects
- Add search and filtering capabilities
- Performance optimization

## Error Handling Strategy
- Standardized error responses with meaningful messages
- Frontend fallback to cached data when API unavailable
- Proper validation on both frontend and backend
- User-friendly error messages for form submissions

## Security Considerations
- Input validation and sanitization
- Rate limiting for contact form
- CORS configuration for production
- Environment variable management for sensitive data

This contract ensures seamless migration from mock data to a fully functional backend while maintaining the current user experience.