import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileManagementModal = ({ onClose }) => {
  const { profiles, createProfile, deleteProfile, fetchProfiles } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState('');
  const [isKids, setIsKids] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Avatar predefiniti di Netflix
  const avatarOptions = [
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABWyiavndJuXkk9GYmlrYoi4ZtcxbO7iDvshj5KoVoOHaQRVfv5l5xIzbXDIgouCT3-wLkWz5O2YUGAsQCET_uItkrpIGySrS-Pj1.png?r=989',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABYo85Lg8Qn22cahF2sIw7K_gDo3cGpvw3Gt5xl7FIazw864EYeVkm71Qvrlz0HP2fU4n26AVq15v5t8T4lVBpBcqqZbmRHHsMefk.png?r=1d4',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABWdXDYge26RSKAGzS4IkNiEdncTKcEamed0qJMdHP-7ncA_g_xAhLPmIbnWXXJAhcWovL7z8evftM6gq6sgXFq_-i_VUSO5K5a5O.png?r=6a6',
    'https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZfhNS88u5ao0M3F5X4HRBGCFsqdb2nncDt32YQHoM-1BeLJq93H30hWyleqclSwt1jNGm6l0tkeefKiiCOLLL5gNjpSjS_Xlaij.png?r=bd7',
  ];

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!newProfileName.trim()) {
      setError('Il nome del profilo è obbligatorio');
      return;
    }

    setIsSubmitting(true);
    const result = await createProfile(
      newProfileName.trim(),
      newProfileAvatar || avatarOptions[0],
      isKids
    );

    if (result.success) {
      setNewProfileName('');
      setNewProfileAvatar('');
      setIsKids(false);
      setShowCreateForm(false);
    } else {
      setError(result.error || 'Errore nella creazione del profilo');
    }
    setIsSubmitting(false);
  };

  const handleDeleteProfile = async (profileId) => {
    if (profiles.length <= 1) {
      setError('Devi avere almeno un profilo');
      return;
    }

    if (window.confirm('Sei sicuro di voler eliminare questo profilo?')) {
      const result = await deleteProfile(profileId);
      if (!result.success) {
        setError(result.error || 'Errore nell\'eliminazione del profilo');
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div 
        className="bg-[#141414] rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Gestisci i profili</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Lista profili esistenti */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {profiles.map((profile) => (
            <div 
              key={profile.id}
              className="flex flex-col items-center p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition"
            >
              <img 
                src={profile.avatar_url || avatarOptions[0]}
                alt={profile.name}
                className="w-24 h-24 rounded-lg object-cover mb-3"
              />
              <p className="text-white text-center mb-2">{profile.name}</p>
              {profile.is_kids && (
                <span className="text-xs bg-yellow-600 px-2 py-1 rounded mb-2">Bambini</span>
              )}
              {!profile.is_default && (
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="text-red-500 text-sm hover:text-red-400"
                >
                  Elimina
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Form creazione nuovo profilo */}
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
          >
            + Aggiungi profilo
          </button>
        ) : (
          <form onSubmit={handleCreateProfile} className="bg-[#2a2a2a] p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4">Nuovo profilo</h3>
            
            <div className="mb-4">
              <label className="block text-white mb-2">Nome</label>
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full bg-[#333] text-white p-3 rounded border border-gray-600 focus:border-white focus:outline-none"
                placeholder="Inserisci il nome del profilo"
                maxLength={50}
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Avatar</label>
              <div className="grid grid-cols-5 gap-3">
                {avatarOptions.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    onClick={() => setNewProfileAvatar(avatar)}
                    className={`w-16 h-16 rounded cursor-pointer hover:ring-2 hover:ring-white transition ${
                      newProfileAvatar === avatar ? 'ring-2 ring-white' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={isKids}
                  onChange={(e) => setIsKids(e.target.checked)}
                  className="mr-2 w-5 h-5"
                  disabled={isSubmitting}
                />
                <span>Profilo bambini</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Creazione...' : 'Crea profilo'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewProfileName('');
                  setNewProfileAvatar('');
                  setIsKids(false);
                  setError('');
                }}
                disabled={isSubmitting}
                className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold hover:bg-gray-700 transition disabled:opacity-50"
              >
                Annulla
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileManagementModal;
