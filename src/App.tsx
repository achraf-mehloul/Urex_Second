import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from './lib/supabase';

type Page = 'landing' | 'registration' | 'admin' | 'dashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleLogoDoubleClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@urex.local',
        password: 'Ash2004_admin_urex',
      });

      if (error) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: 'admin@urex.local',
          password: 'Ash2004_admin_urex',
        });

        if (!signUpError) {
          await supabase.auth.signInWithPassword({
            email: 'admin@urex.local',
            password: 'Ash2004_admin_urex',
          });
        }
      }

      setIsAuthenticated(true);
      setShowAdminLogin(false);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onCancel={() => setShowAdminLogin(false)}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage
          onGetStarted={() => setCurrentPage('registration')}
          onLogoDoubleClick={handleLogoDoubleClick}
        />
      )}

      {currentPage === 'registration' && (
        <RegistrationForm onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'dashboard' && isAuthenticated && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
