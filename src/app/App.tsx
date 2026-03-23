import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { EmployeeLoginPage } from './components/EmployeeLoginPage';
import { HRDashboard } from './components/HRDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { EmployeeUser } from './data/attendanceData';

type UserType = 'manager' | 'employee' | null;
type AppState = 'home' | 'manager-login' | 'employee-login' | 'manager-dashboard' | 'employee-dashboard';

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

  // Render based on app state
  switch (appState) {
    case 'home':
      return <HomePage onSelectUserType={handleSelectUserType} />;
    
    case 'manager-login':
      return <LoginPage onLogin={handleManagerLogin} onBackToHome={handleBackToHome} />;
    
    case 'employee-login':
      return <EmployeeLoginPage onLogin={handleEmployeeLogin} onBackToHome={handleBackToHome} />;
    
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