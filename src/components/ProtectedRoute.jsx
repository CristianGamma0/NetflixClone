import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, profiles, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && profiles.length === 0) {
      // Se l'utente è loggato ma non ha profili, reindirizza al setup
      navigate('/profile-setup');
    }
  }, [isAuthenticated, profiles, isLoading, navigate]);

  return children;
};

export default ProtectedRoute;
