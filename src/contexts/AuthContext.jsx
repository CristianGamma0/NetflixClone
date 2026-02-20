import { createContext, useContext, useEffect, useState } from 'react';
import pb from '../config/pocketbase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(pb.authStore.record);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  // Carica profili quando l'utente è autenticato
  useEffect(() => {
    const loadProfiles = async () => {
      if (user) {
        await fetchProfiles();
      } else {
        setProfiles([]);
        setCurrentProfile(null);
      }
    };
    loadProfiles();
  }, [user]);

  useEffect(() => {
    // Listener per cambiamenti nello stato di autenticazione
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Recupera i profili dell'utente
  const fetchProfiles = async () => {
    try {
      const records = await pb.collection('profiles').getFullList({
        filter: `user = "${user.id}"`,
        sort: '-is_default',
      });
      setProfiles(records);
      
      // Seleziona il profilo di default o il primo
      const defaultProfile = records.find(p => p.is_default) || records[0];
      if (defaultProfile) {
        setCurrentProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Errore nel recupero profili:', error);
    }
  };

  // Crea un nuovo profilo
  const createProfile = async (name, avatarUrl = '', isKids = false) => {
    try {
      if (!user) {
        return { success: false, error: 'Utente non autenticato' };
      }
      
      const data = {
        user: user.id,
        name,
        avatar_url: avatarUrl,
        is_kids: isKids,
        is_default: profiles.length === 0, // Il primo profilo è di default
      };
      
      const record = await pb.collection('profiles').create(data);
      await fetchProfiles();
      return { success: true, profile: record };
    } catch (error) {
      console.error('Errore creazione profilo:', error);
      return { success: false, error: error.message };
    }
  };

  // Seleziona un profilo
  const selectProfile = (profile) => {
    setCurrentProfile(profile);
  };

  // Elimina un profilo
  const deleteProfile = async (profileId) => {
    try {
      await pb.collection('profiles').delete(profileId);
      await fetchProfiles();
      return { success: true };
    } catch (error) {
      console.error('Errore eliminazione profilo:', error);
      return { success: false, error: error.message };
    }
  };

  // Login con email e password
  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      setUser(authData.record);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Errore login:', error);
      return { success: false, error: error.message };
    }
  };

  // Registrazione
  const register = async (email, password, name) => {
    try {
      const data = {
        email,
        password,
        passwordConfirm: password,
        name,
        emailVisibility: true,
      };
      
      const record = await pb.collection('users').create(data);
      
      // Auto-login dopo registrazione
      await login(email, password);
      
      return { success: true, user: record };
    } catch (error) {
      console.error('Errore registrazione:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  // Aggiorna profilo utente
  const updateProfile = async (userId, data) => {
    try {
      const record = await pb.collection('users').update(userId, data);
      setUser(record);
      return { success: true, user: record };
    } catch (error) {
      console.error('Errore aggiornamento profilo:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    profiles,
    currentProfile,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    createProfile,
    selectProfile,
    deleteProfile,
    fetchProfiles,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
