from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="HR Intelligence System", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Demo data
users = {
    "manager@rh.com": {"password": "password123", "full_name": "Jean Dupont", "role": "hr_manager", "user_id": 1},
    "sophie.martin@company.com": {"password": "password123", "full_name": "Sophie Martin", "role": "employee", "user_id": 2}
}

employees = [
    {"id": 1, "first_name": "Jean", "last_name": "Dupont", "email": "jean.dupont@company.com", 
     "position": "HR Manager", "department": "Human Resources", "performance_score": 92.5, 
     "workload_percentage": 65, "turnover_risk": "low", "absences_count": 3},
    {"id": 2, "first_name": "Sophie", "last_name": "Martin", "email": "sophie.martin@company.com", 
     "position": "Senior Developer", "department": "IT", "performance_score": 85.0, 
     "workload_percentage": 80, "turnover_risk": "medium", "absences_count": 5},
    {"id": 3, "first_name": "Pierre", "last_name": "Bernard", "email": "pierre.bernard@company.com", 
     "position": "Marketing Manager", "department": "Marketing", "performance_score": 78.5, 
     "workload_percentage": 90, "turnover_risk": "high", "absences_count": 8}
]

@app.get("/")
def root():
    return {"message": "HR Intelligence System API", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/api/auth/login")
def login(email: str, password: str):
    if email in users and users[email]["password"] == password:
        user = users[email]
        return {"access_token": f"token_{user['user_id']}", "token_type": "bearer", 
                "user_id": user["user_id"], "email": email, "role": user["role"], 
                "full_name": user["full_name"]}
    return {"error": "Invalid credentials"}, 401

@app.get("/api/users/employees")
def get_all_employees():
    return employees

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    total = len(employees)
    return {
        "total_employees": total,
        "avg_absences_per_year": round(sum(e["absences_count"] for e in employees) / total, 1),
        "high_turnover_risk_count": len([e for e in employees if e["turnover_risk"] == "high"]),
        "avg_performance": round(sum(e["performance_score"] for e in employees) / total, 1),
        "overloaded_employees": len([e for e in employees if e["workload_percentage"] > 85]),
        "avg_workload": round(sum(e["workload_percentage"] for e in employees) / total, 1)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)