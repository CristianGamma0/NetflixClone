import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb from '../config/pocketbase';

// Hook per ottenere tutti i profili dell'utente corrente
export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const records = await pb.collection('profiles').getFullList({
        sort: '-is_default,-created',
        filter: `user = "${pb.authStore.record?.id}"`,
      });
      return records;
    },
    enabled: !!pb.authStore.record,
  });
};

// Hook per creare un nuovo profilo
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const profileData = {
        ...data,
        user: pb.authStore.record.id,
      };
      return await pb.collection('profiles').create(profileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};
