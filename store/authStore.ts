import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfile } from '../lib/supabase';

interface AuthState {
    accessToken: string | null;
    userId: string | null;
    profileCompleted: boolean;
    setAuth: (token: string, userId: string) => void;
    setProfileCompleted: (complete: boolean) => void;
    logout: () => void;
    fetchProfileStatus: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    userId: null,
    profileCompleted: false,
    setAuth: (token, userId) => {
        AsyncStorage.setItem('access_token', token);
        AsyncStorage.setItem('user_id', userId);
        set({ accessToken: token, userId: userId });
    },

    setProfileCompleted: (complete) => {
        set({ profileCompleted: complete });
    },

    logout: () => {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('user_id');
        set({ accessToken: null, userId: null, profileCompleted: false });
    },

    fetchProfileStatus: async () => {
        const { accessToken, userId } = get();
        if (!accessToken || !userId) {
            return;
        }

        const response = await fetchProfile(userId, accessToken);
        if (Array.isArray(response) && response[0]?.is_profile_completed) {
            set({ profileCompleted: true });
        } else {
            set({ profileCompleted: false });
        }
    },
}));


// !call before home, during startup page;
export const loadStoreAuth = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const userId = await AsyncStorage.getItem('user_id');
    if (token && userId) {
        useAuthStore.getState().setAuth(token, userId);
    }
};

