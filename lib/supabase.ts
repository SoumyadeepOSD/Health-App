import { SUPABASE_ANONKEY, SUPABASE_URL } from '../constant/env';

const headers = {
  apikey: SUPABASE_ANONKEY,
  'Content-Type':'application/json',
};

const signup = async({email, password}:{email:string;password:string;})=>{
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`,{
    method: 'POST',
    headers,
    body: JSON.stringify({email, password}),
  });
  const data = await res.json();
  if(!res.ok) {
    throw new Error(data.error?.message || 'Signup Failed');
  }
  return data;
};

const login = async({email, password}:{email:string;password:string;})=>{
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{
    method:'POST',
    headers,
    body: JSON.stringify({email, password}),
  });
  const data = await res.json();
  if(!res.ok){
    throw new Error(data.error?.message || 'Login Failed');
  }
  return data;
};

export const createProfile = async({
  userId,
  fullName,
  profilePicture,
  token,
}:{
  userId:string;
  fullName:string;
  profilePicture:string;
  token:string;
})=>{
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles`,{
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      id: userId,
      userName: fullName,
      profile_picture: profilePicture,
    }),
  });
  const data = await res.json();
  if(!res.ok){
    throw new Error(data?.message || 'Profile insert failed');
  }
  return data[0];
};

export const fetchProfile = async (userId: string, token: string) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data?.message || 'Fetch failed');
    (error as any).code = data?.code;
    throw error;
  }

  return data[0]; // Just return the first profile
};


export {
  signup,
  login,
};
