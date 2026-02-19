import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import pb, { getAvatarUrl } from '../config/pocketbase';

// Hook per ottenere tutti i profili dell'utente corrente
export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const records = await pb.collection('profiles').getFullList({
        sort: '-is_default,-created',
        filter: `user = "${pb.authStore.model?.id}"`,
      });
      return records;
    },
    enabled: !!pb.authStore.model,
  });
};

// Hook per ottenere un singolo profilo
export const useProfile = (profileId) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const record = await pb.collection('profiles').getOne(profileId);
      return record;
    },
    enabled: !!profileId,
  });
};

// Hook per creare un nuovo profilo
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const profileData = {
        ...data,
        user: pb.authStore.model.id,
      };
      return await pb.collection('profiles').create(profileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

// Hook per aggiornare un profilo
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ profileId, data }) => {
      return await pb.collection('profiles').update(profileId, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
    },
  });
};

// Hook per eliminare un profilo
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileId) => {
      return await pb.collection('profiles').delete(profileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

// Helper per ottenere URL avatar profilo
export const getProfileAvatarUrl = (profile) => {
  if (profile.avatar) {
    return getAvatarUrl(profile, profile.avatar);
  }
  return profile.avatar_url || null;
};
