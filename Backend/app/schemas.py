# backend/app/schemas.py
from pydantic import BaseModel, EmailStr, Field, validator
from datetime import datetime, date
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    HR_MANAGER = "hr_manager"
    EMPLOYEE = "employee"
    ADMIN = "admin"

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    email: str
    role: UserRole
    full_name: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None
    role: Optional[UserRole] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.EMPLOYEE

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Employee Schemas
class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    position: Optional[str] = None
    department: Optional[str] = None
    hire_date: Optional[date] = None
    age: Optional[int] = None
    seniority_years: Optional[float] = None
    performance_score: Optional[float] = 75.0
    workload_percentage: Optional[int] = 50

class EmployeeCreate(EmployeeBase):
    password: Optional[str] = None

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    position: Optional[str] = None
    department: Optional[str] = None
    performance_score: Optional[float] = None
    workload_percentage: Optional[int] = None

class EmployeeResponse(EmployeeBase):
    id: int
    turnover_risk: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True