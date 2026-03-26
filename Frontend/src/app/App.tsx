import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { EmployeeLoginPage } from './components/EmployeeLoginPage';
import { EmployeeSignup } from './components/EmployeeSignup';
import { HRDashboard } from './components/HRDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { EmployeeUser } from './data/attendanceData';

type UserType = 'manager' | 'employee' | null;
type AppState = 'home' | 'manager-login' | 'employee-login' | 'employee-signup' | 'manager-dashboard' | 'employee-dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [managerEmail, setManagerEmail] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeUser | null>(null);

  const handleSelectUserType = (type: UserType) => {
    if (type === 'manager') {
      setAppState('manager-login');
    } else if (type === 'employee') {
      setAppState('employee-login');
    }
  };

  const handleManagerLogin = (email: string, password: string) => {
    setManagerEmail(email);
    setAppState('manager-dashboard');
  };

  const handleEmployeeLogin = (employee: EmployeeUser) => {
    setCurrentEmployee(employee);
    setAppState('employee-dashboard');
  };

  const handleEmployeeSignup = (employeeData: any) => {
    // Create a new employee user object
    const newEmployee: EmployeeUser = {
      id: employeeData.id,
      employeeId: employeeData.employeeId,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      name: `${employeeData.firstName} ${employeeData.lastName}`,
      email: employeeData.email,
      password: employeeData.password,
      position: employeeData.position,
      department: employeeData.department,
      joinDate: employeeData.joinDate,
      absences: 0,
      performance: 75,
      workload: 50,
      turnoverRisk: 'low' as const,
      phone: employeeData.phone || '',
      avatar: `https://ui-avatars.com/api/?name=${employeeData.firstName}+${employeeData.lastName}&background=10b981&color=fff`
    };
    
    setCurrentEmployee(newEmployee);
    setAppState('employee-dashboard');
  };

  const handleManagerLogout = () => {
    setManagerEmail('');
    setAppState('home');
  };

  const handleEmployeeLogout = () => {
    setCurrentEmployee(null);
    setAppState('home');
  };

  const handleBackToHome = () => {
    setAppState('home');
  };

  const handleBackToLogin = () => {
    setAppState('employee-login');
  };

  // Render based on app state
  switch (appState) {
    case 'home':
      return <HomePage onSelectUserType={handleSelectUserType} />;
    
    case 'manager-login':
      return <LoginPage onLogin={handleManagerLogin} onBackToHome={handleBackToHome} />;
    
    case 'employee-login':
      return (
        <EmployeeLoginPage 
          onLogin={handleEmployeeLogin} 
          onBackToHome={handleBackToHome}
          onSignup={() => setAppState('employee-signup')}
        />
      );
    
    case 'employee-signup':
      return (
        <EmployeeSignup 
          onSignup={handleEmployeeSignup}
          onBackToLogin={handleBackToLogin}
        />
      );
    
    case 'manager-dashboard':
      return <HRDashboard userEmail={managerEmail} onLogout={handleManagerLogout} />;
    
    case 'employee-dashboard':
      return currentEmployee ? (
        <EmployeeDashboard employee={currentEmployee} onLogout={handleEmployeeLogout} />
      ) : (
        <HomePage onSelectUserType={handleSelectUserType} />
      );
    
    default:
      return <HomePage onSelectUserType={handleSelectUserType} />;
  }
}

export default App;