import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { uploadProfileImage } from './upload';
import { SUPABASE_ANONKEY, SUPABASE_URL } from '../constant/env';
import { ProfileResponse, UploadProfileParams } from '../types/mutationTypes';


export const useUploadProfileMutation = (): UseMutationResult<
    ProfileResponse,
    Error,
    UploadProfileParams> => {
    const userId = useAuthStore.getState().userId;
    const accessToken = useAuthStore.getState().accessToken;

    return useMutation({
        mutationFn: async ({ fileUri, fullName, is_profile_completed }: UploadProfileParams) => {
            if (!userId) {
                throw new Error('Missing user Id');
            }
            const avatar_url = await uploadProfileImage(fileUri, userId);
            console.log('Avatar URL', avatar_url);
            if(!avatar_url){
                throw new Error('Avatar upload failed');
            }
            const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
                method: 'POST',
                headers: {
                    apikey: SUPABASE_ANONKEY,
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation,resolution=merge-duplicates',
                },
                body: JSON.stringify({ id: userId, avatar_url:avatar_url, full_name: fullName, is_profile_completed:is_profile_completed }),
            });
            if (!res.ok) {
                const err = await res.text();
                console.error('Update profile error response:', err);
                throw new Error(err || 'Failed to update profile');
            }
            console.log('mutation', JSON.stringify(res));
            return await res.json();
        },
    });
};
