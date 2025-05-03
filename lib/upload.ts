import { SUPABASE_ANONKEY, SUPABASE_URL } from '../constant/env';
import { useAuthStore } from '../store/authStore';

export const uploadProfileImage = async (
  fileUri: string,
  userId: string,
): Promise<string> => {
  const accessToken = useAuthStore.getState().accessToken;
  const bucket = 'avatars';
  const fileExtension = fileUri.split('.').pop() || 'jpg';
  const fileName = `${userId}-${Date.now()}.${fileExtension}`;
  const filePath = `${bucket}/${fileName}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${filePath}`;

  // Important: React Native's fetch expects `type` and `uri` to be correct
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    type: `image/${fileExtension}`,
    name: fileName,
  } as any);

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANONKEY,
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text(); // safer than .json() here
    console.error('Upload error response:', err);
    throw new Error('Failed to upload avatar');
  }

  // ✅ Return public URL (bucket must be public)
  return `${SUPABASE_URL}/storage/v1/object/public/${filePath}`;
};
