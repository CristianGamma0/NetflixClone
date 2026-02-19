import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || 'Errore login');
        }
      } else {
        const result = await register(email, password, name);
        if (result.success) {
          onClose();
          navigate('/profile-setup');
        } else {
          setError(result.error || 'Errore registrazione');
        }
      }
    } catch {
      setError('Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]">
      <div className="bg-[#141414] rounded-lg p-8 w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6">
          {isLogin ? 'Accedi' : 'Registrati'}
        </h2>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-[#333] text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#333] text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#333] text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white p-3 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Caricamento...' : (isLogin ? 'Accedi' : 'Registrati')}
          </button>
        </form>

        <div className="mt-4 text-gray-400 text-center">
          {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-white ml-2 hover:underline"
          >
            {isLogin ? 'Registrati' : 'Accedi'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-400 hover:text-white transition"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
