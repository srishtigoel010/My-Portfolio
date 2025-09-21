#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Portfolio API
Tests all endpoints with proper data validation and error handling
"""

import asyncio
import aiohttp
import json
import sys
import os
from datetime import datetime
from typing import Dict, Any, List

# Get the backend URL from frontend .env file
def get_backend_url():
    """Read backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"❌ Error reading backend URL: {e}")
        return None
    return None

class PortfolioAPITester:
    def __init__(self):
        self.base_url = get_backend_url()
        if not self.base_url:
            raise Exception("Could not determine backend URL from frontend/.env")
        
        self.api_url = f"{self.base_url}/api"
        self.session = None
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "errors": [],
            "details": []
        }
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, passed: bool, details: str = "", error: str = ""):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        
        if details:
            print(f"   Details: {details}")
        if error:
            print(f"   Error: {error}")
            self.test_results["errors"].append(f"{test_name}: {error}")
        
        if passed:
            self.test_results["passed"] += 1
        else:
            self.test_results["failed"] += 1
            
        self.test_results["details"].append({
            "test": test_name,
            "passed": passed,
            "details": details,
            "error": error
        })
        print()
    
    async def test_health_check(self):
        """Test GET /api/ endpoint"""
        try:
            async with self.session.get(f"{self.api_url}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if "message" in data and "version" in data:
                        self.log_test("Health Check", True, f"API running with version {data.get('version')}")
                        return True
                    else:
                        self.log_test("Health Check", False, "", "Response missing required fields")
                        return False
                else:
                    self.log_test("Health Check", False, "", f"HTTP {response.status}")
                    return False
        except Exception as e:
            self.log_test("Health Check", False, "", str(e))
            return False
    
    async def test_portfolio_data(self):
        """Test GET /api/portfolio endpoint"""
        try:
            async with self.session.get(f"{self.api_url}/portfolio") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate required fields
                    required_fields = ["personal", "about", "education", "certifications", "skills", "experience", "projects"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test("Portfolio Data Structure", False, "", f"Missing fields: {missing_fields}")
                        return False
                    
                    # Validate Srishti Goel's data
                    personal = data.get("personal", {})
                    if personal.get("name") != "Srishti Goel":
                        self.log_test("Portfolio Personal Data", False, "", f"Expected 'Srishti Goel', got '{personal.get('name')}'")
                        return False
                    
                    if personal.get("tagline") != "AI Generalist Digital Marketer":
                        self.log_test("Portfolio Personal Data", False, "", f"Incorrect tagline: {personal.get('tagline')}")
                        return False
                    
                    # Validate skills structure
                    skills = data.get("skills", {})
                    if not isinstance(skills.get("technical"), list) or not isinstance(skills.get("transferable"), list):
                        self.log_test("Portfolio Skills Structure", False, "", "Skills should have technical and transferable arrays")
                        return False
                    
                    # Validate experience data
                    experience = data.get("experience", [])
                    if not isinstance(experience, list) or len(experience) == 0:
                        self.log_test("Portfolio Experience Data", False, "", "Experience should be a non-empty array")
                        return False
                    
                    # Check for expected companies
                    companies = [exp.get("company") for exp in experience]
                    expected_companies = ["The Study Anchor", "Looffers", "Sanklap Marketing", "Dream Hill Coffee"]
                    found_companies = [comp for comp in expected_companies if comp in companies]
                    
                    if len(found_companies) < 3:  # At least 3 companies should be present
                        self.log_test("Portfolio Experience Companies", False, "", f"Expected companies not found. Found: {companies}")
                        return False
                    
                    # Validate projects data
                    projects = data.get("projects", [])
                    if not isinstance(projects, list) or len(projects) == 0:
                        self.log_test("Portfolio Projects Data", False, "", "Projects should be a non-empty array")
                        return False
                    
                    self.log_test("Portfolio Data Retrieval", True, f"Retrieved complete portfolio for {personal.get('name')}")
                    return True
                    
                else:
                    self.log_test("Portfolio Data Retrieval", False, "", f"HTTP {response.status}")
                    return False
                    
        except Exception as e:
            self.log_test("Portfolio Data Retrieval", False, "", str(e))
            return False
    
    async def test_skills_endpoint(self):
        """Test GET /api/skills endpoint"""
        try:
            async with self.session.get(f"{self.api_url}/skills") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate skills structure
                    if not isinstance(data.get("technical"), list) or not isinstance(data.get("transferable"), list):
                        self.log_test("Skills Data Structure", False, "", "Skills should have technical and transferable arrays")
                        return False
                    
                    # Check for expected technical skills
                    technical_skills = data.get("technical", [])
                    expected_tech = ["Adobe Creative Cloud", "Canva", "WordPress", "Google Analytics"]
                    found_tech = [skill for skill in technical_skills if any(exp in skill for exp in expected_tech)]
                    
                    if len(found_tech) < 2:
                        self.log_test("Skills Technical Content", False, "", f"Expected technical skills not found. Found: {technical_skills}")
                        return False
                    
                    # Check for expected transferable skills
                    transferable_skills = data.get("transferable", [])
                    expected_transferable = ["Strategic Content Planning", "Campaign Project Management", "Creative Problem-Solving"]
                    found_transferable = [skill for skill in transferable_skills if any(exp in skill for exp in expected_transferable)]
                    
                    if len(found_transferable) < 2:
                        self.log_test("Skills Transferable Content", False, "", f"Expected transferable skills not found. Found: {transferable_skills}")
                        return False
                    
                    self.log_test("Skills Data Retrieval", True, f"Retrieved {len(technical_skills)} technical and {len(transferable_skills)} transferable skills")
                    return True
                    
                else:
                    self.log_test("Skills Data Retrieval", False, "", f"HTTP {response.status}")
                    return False
                    
        except Exception as e:
            self.log_test("Skills Data Retrieval", False, "", str(e))
            return False
    
    async def test_experience_endpoint(self):
        """Test GET /api/experience endpoint"""
        try:
            async with self.session.get(f"{self.api_url}/experience") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if not isinstance(data, list) or len(data) == 0:
                        self.log_test("Experience Data Structure", False, "", "Experience should be a non-empty array")
                        return False
                    
                    # Validate experience structure
                    for exp in data:
                        required_fields = ["position", "company", "period", "responsibilities"]
                        missing_fields = [field for field in required_fields if field not in exp]
                        if missing_fields:
                            self.log_test("Experience Data Structure", False, "", f"Missing fields in experience: {missing_fields}")
                            return False
                    
                    # Check for expected companies
                    companies = [exp.get("company") for exp in data]
                    expected_companies = ["The Study Anchor", "Looffers", "Sanklap Marketing", "Dream Hill Coffee"]
                    found_companies = [comp for comp in expected_companies if comp in companies]
                    
                    if len(found_companies) < 3:
                        self.log_test("Experience Companies", False, "", f"Expected companies not found. Found: {companies}")
                        return False
                    
                    self.log_test("Experience Data Retrieval", True, f"Retrieved {len(data)} work experiences")
                    return True
                    
                else:
                    self.log_test("Experience Data Retrieval", False, "", f"HTTP {response.status}")
                    return False
                    
        except Exception as e:
            self.log_test("Experience Data Retrieval", False, "", str(e))
            return False
    
    async def test_projects_endpoint(self):
        """Test GET /api/projects endpoint"""
        try:
            async with self.session.get(f"{self.api_url}/projects") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if not isinstance(data, list) or len(data) == 0:
                        self.log_test("Projects Data Structure", False, "", "Projects should be a non-empty array")
                        return False
                    
                    # Validate project structure
                    for project in data:
                        required_fields = ["title", "description", "technologies", "category", "image"]
                        missing_fields = [field for field in required_fields if field not in project]
                        if missing_fields:
                            self.log_test("Projects Data Structure", False, "", f"Missing fields in project: {missing_fields}")
                            return False
                    
                    # Check for expected project titles
                    titles = [proj.get("title") for proj in data]
                    expected_titles = ["AI-Powered Content Strategy", "Multi-Platform Campaign Management", "Brand Visual Identity Design"]
                    found_titles = [title for title in expected_titles if title in titles]
                    
                    if len(found_titles) < 2:
                        self.log_test("Projects Content", False, "", f"Expected project titles not found. Found: {titles}")
                        return False
                    
                    self.log_test("Projects Data Retrieval", True, f"Retrieved {len(data)} projects")
                    return True
                    
                else:
                    self.log_test("Projects Data Retrieval", False, "", f"HTTP {response.status}")
                    return False
                    
        except Exception as e:
            self.log_test("Projects Data Retrieval", False, "", str(e))
            return False
    
    async def test_contact_form_submission(self):
        """Test POST /api/contact/messages endpoint"""
        try:
            # Test data for contact form
            contact_data = {
                "name": "Sarah Johnson",
                "email": "sarah.johnson@example.com",
                "subject": "Portfolio Inquiry",
                "message": "Hi Srishti, I came across your portfolio and I'm impressed with your AI-powered marketing strategies. I'd love to discuss a potential collaboration opportunity for our upcoming digital campaign. Could we schedule a call to explore how your expertise could benefit our brand?"
            }
            
            async with self.session.post(
                f"{self.api_url}/contact/messages",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if "message" not in data or "id" not in data:
                        self.log_test("Contact Form Response", False, "", "Response missing required fields")
                        return False
                    
                    if "successfully" not in data["message"].lower():
                        self.log_test("Contact Form Response", False, "", f"Unexpected response message: {data['message']}")
                        return False
                    
                    # Verify the message was stored by retrieving it
                    async with self.session.get(f"{self.api_url}/contact/messages") as get_response:
                        if get_response.status == 200:
                            messages = await get_response.json()
                            if isinstance(messages, list) and len(messages) > 0:
                                # Check if our message is in the list
                                found_message = any(
                                    msg.get("email") == contact_data["email"] and 
                                    msg.get("subject") == contact_data["subject"]
                                    for msg in messages
                                )
                                if found_message:
                                    self.log_test("Contact Form Submission", True, f"Message submitted and stored successfully with ID: {data['id']}")
                                    return True
                                else:
                                    self.log_test("Contact Form Storage", False, "", "Message not found in stored messages")
                                    return False
                            else:
                                self.log_test("Contact Form Storage", False, "", "No messages found after submission")
                                return False
                        else:
                            self.log_test("Contact Form Verification", False, "", f"Could not verify message storage: HTTP {get_response.status}")
                            return False
                    
                else:
                    self.log_test("Contact Form Submission", False, "", f"HTTP {response.status}")
                    return False
                    
        except Exception as e:
            self.log_test("Contact Form Submission", False, "", str(e))
            return False
    
    async def test_cors_headers(self):
        """Test CORS headers are properly configured"""
        try:
            async with self.session.options(f"{self.api_url}/") as response:
                headers = response.headers
                
                # Check for CORS headers
                cors_headers = [
                    "Access-Control-Allow-Origin",
                    "Access-Control-Allow-Methods",
                    "Access-Control-Allow-Headers"
                ]
                
                missing_headers = [header for header in cors_headers if header not in headers]
                
                if missing_headers:
                    self.log_test("CORS Configuration", False, "", f"Missing CORS headers: {missing_headers}")
                    return False
                
                self.log_test("CORS Configuration", True, "CORS headers properly configured")
                return True
                
        except Exception as e:
            self.log_test("CORS Configuration", False, "", str(e))
            return False
    
    async def test_error_handling(self):
        """Test error handling for invalid endpoints"""
        try:
            # Test 404 for non-existent endpoint
            async with self.session.get(f"{self.api_url}/nonexistent") as response:
                if response.status == 404:
                    self.log_test("404 Error Handling", True, "Properly returns 404 for non-existent endpoints")
                else:
                    self.log_test("404 Error Handling", False, "", f"Expected 404, got {response.status}")
                    return False
            
            # Test invalid contact form data
            invalid_contact_data = {
                "name": "",  # Empty name
                "email": "invalid-email",  # Invalid email
                "subject": "",  # Empty subject
                "message": ""  # Empty message
            }
            
            async with self.session.post(
                f"{self.api_url}/contact/messages",
                json=invalid_contact_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status in [400, 422]:  # Bad request or validation error
                    self.log_test("Validation Error Handling", True, f"Properly validates input data (HTTP {response.status})")
                else:
                    self.log_test("Validation Error Handling", False, "", f"Expected 400/422, got {response.status}")
                    return False
            
            return True
            
        except Exception as e:
            self.log_test("Error Handling", False, "", str(e))
            return False
    
    async def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Portfolio API Backend Tests")
        print(f"📍 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Run tests in order
        test_methods = [
            self.test_health_check,
            self.test_portfolio_data,
            self.test_skills_endpoint,
            self.test_experience_endpoint,
            self.test_projects_endpoint,
            self.test_contact_form_submission,
            self.test_cors_headers,
            self.test_error_handling
        ]
        
        for test_method in test_methods:
            await test_method()
        
        # Print summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        print(f"📈 Success Rate: {(self.test_results['passed'] / (self.test_results['passed'] + self.test_results['failed']) * 100):.1f}%")
        
        if self.test_results['errors']:
            print("\n🔍 ERRORS FOUND:")
            for error in self.test_results['errors']:
                print(f"   • {error}")
        
        return self.test_results['failed'] == 0

async def main():
    """Main test runner"""
    try:
        async with PortfolioAPITester() as tester:
            success = await tester.run_all_tests()
            sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Test runner failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())