import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export const useUserProfile = (enabled = true) => {
    const { accessToken, userId } = useAuthStore();

    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => fetchProfile(userId!, accessToken!),
        enabled: enabled && !!userId && !!accessToken,
        staleTime: 1000 * 60 * 5,
    });
};

