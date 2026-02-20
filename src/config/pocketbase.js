import PocketBase from 'pocketbase';

// Inizializza PocketBase client
export const pb = new PocketBase('http://127.0.0.1:8090');

// Abilita auto-cancellation delle richieste duplicate
pb.autoCancellation(false);

// Helper per ottenere l'URL dell'avatar
export const getAvatarUrl = (record, filename) => {
  if (!record || !filename) return null;
  return pb.files.getUrl(record, filename);
};

export default pb;
