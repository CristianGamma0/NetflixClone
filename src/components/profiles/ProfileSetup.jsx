import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../../hooks/useProfiles';

const ProfileSetup = () => {
  const { user, createProfile } = useAuth(); 
  const { data: profiles, isLoading: loadingProfiles } = useProfiles();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [profileName, setProfileName] = useState(user?.name || '');
  const [isKids, setIsKids] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se l'utente non è autenticato o ha già profili, reindirizza
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (!loadingProfiles && profiles && profiles.length > 0) {
      navigate('/');
    }
  }, [user, profiles, loadingProfiles, navigate]);

  // Avatar disponibili
  const avatarOptions = [
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABWyiavndJuXkk9GYmlrYoi4ZtcxbO7iDvshj5KoVoOHaQRVfv5l5xIzbXDIgouCT3-wLkWz5O2YUGAsQCET_uItkrpIGySrS-Pj1.png?r=989',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABYo85Lg8Qn22cahF2sIw7K_gDo3cGpvw3Gt5xl7FIazw864EYeVkm71Qvrlz0HP2fU4n26AVq15v5t8T4lVBpBcqqZbmRHHsMefk.png?r=1d4',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABWdXDYge26RSKAGzS4IkNiEdncTKcEamed0qJMdHP-7ncA_g_xAhLPmIbnWXXJAhcWovL7z8evftM6gq6sgXFq_-i_VUSO5K5a5O.png?r=6a6',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZfhNS88u5ao0M3F5X4HRBGCFsqdb2nncDt32YQHoM-1BeLJq93H30hWyleqclSwt1jNGm6l0tkeefKiiCOLLL5gNjpSjS_Xlaij.png?r=bd7',
    'https://occ-0-1009-3933.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABR5tqqDT-3YSG90s8KcGKAWnfVCRaKCe2Us_ijZCq8Q5BPY8H2K1JfVs-Ll7f1clmf0D5T1qPVhDDpqleZqJqm4gFfE.png?r=bd7',
    'https://occ-0-1009-3933.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVfnN06VdDAqNZbQqZqLL_m2d8cTjxCPWM0DGgICfBlXu6f6YpTAWPUvCjJYr7kDfbxHrNLqt8AYo_PazbKPqXCHWeK.png?r=e6e',
    'https://occ-0-1009-3933.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABRr4YZbF9GpzTWqwH85wN85R2BGaVdmDmK5fk-6DdJU1JqY7h2yX7wJERLPBJz-nYYx0pGQBdB-hNEkSTH-yvwDNJVo.png?r=4cf',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!profileName.trim()) {
      setError('Il nome del profilo è obbligatorio');
      return;
    }

    if (!selectedAvatar) {
      setError('Seleziona un avatar');
      return;
    }

    setIsSubmitting(true);
    const result = await createProfile(profileName.trim(), selectedAvatar, isKids);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Errore nella creazione del profilo');
      setIsSubmitting(false);
    }
  };

  // Mostra un loading mentre verifica i profili esistenti
  if (loadingProfiles) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-white text-xl mt-4">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <img 
            src="/Netflix_logo.svg" 
            alt="Netflix" 
            className="h-12 mx-auto mb-8"
          />
          <h1 className="text-5xl font-semibold text-white mb-4">
            Chi guarda?
          </h1>
          <p className="text-xl text-gray-400">
            Scegli il tuo avatar e crea il tuo profilo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-600 text-white p-4 rounded text-center">
              {error}
            </div>
          )}

          {/* Nome profilo */}
          <div className="max-w-md mx-auto">
            <label className="block text-white text-lg mb-3">
              Nome del profilo
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-gray-700 text-white text-lg p-4 rounded border-2 border-gray-600 focus:border-white focus:outline-none"
              placeholder="Inserisci il nome"
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>

          {/* Selezione avatar */}
          <div>
            <h2 className="text-white text-2xl font-medium mb-6 text-center">
              Scegli il tuo avatar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {avatarOptions.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => !isSubmitting && setSelectedAvatar(avatar)}
                  className={`cursor-pointer transform transition-all duration-200 hover:scale-110 ${
                    selectedAvatar === avatar 
                      ? 'ring-4 ring-white scale-110' 
                      : 'ring-2 ring-transparent hover:ring-gray-500'
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox bambini */}
          <div className="max-w-md mx-auto">
            <label className="flex items-center justify-center text-white text-lg cursor-pointer">
              <input
                type="checkbox"
                checked={isKids}
                onChange={(e) => setIsKids(e.target.checked)}
                className="mr-3 w-6 h-6 cursor-pointer"
                disabled={isSubmitting}
              />
              <span>Profilo bambini</span>
            </label>
            {isKids && (
              <p className="text-gray-400 text-sm text-center mt-2">
                I profili bambini mostrano solo contenuti adatti ai più piccoli
              </p>
            )}
          </div>

          {/* Pulsante continua */}
          <div className="max-w-md mx-auto pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !selectedAvatar}
              className="w-full bg-red-600 text-white text-xl font-semibold py-4 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creazione profilo...' : 'Continua'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
