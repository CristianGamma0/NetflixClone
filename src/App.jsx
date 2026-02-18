// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./home/home.jsx";
import Details from "./pages/Details.jsx";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // I dati sono "freschi" per 5 minuti
      cacheTime: 1000 * 60 * 10, // Cache mantenuta per 10 minuti
      retry: 1, // Riprova 1 volta in caso di errore
      refetchOnWindowFocus: false, // Non ricarica quando torni alla finestra
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:mediaType/:id" element={<Details />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;