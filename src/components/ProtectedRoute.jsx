import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, profiles } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && profiles.length === 0) {
      // Se l'utente è loggato ma non ha profili, reindirizza al setup
      navigate('/profile-setup');
    }
  }, [isAuthenticated, profiles, navigate]);

  return children;
};

export default ProtectedRoute;
