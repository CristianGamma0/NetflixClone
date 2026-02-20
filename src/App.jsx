// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import Home from "./home/home.jsx";
import Details from "./pages/Details.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import ProfileSetup from "./components/profiles/ProfileSetup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // I dati sono "freschi" per 5 minuti
      gcTime: 1000 * 60 * 10, // Cache mantenuta per 10 minuti
      retry: 1, // Riprova 1 volta in caso di errore
      refetchOnWindowFocus: false, // Non ricarica quando torni alla finestra
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/watch/:mediaType/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;