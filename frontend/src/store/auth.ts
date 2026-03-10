import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    email?: string;
    full_name?: string;
    role?: string;
}

interface AuthState {
    user: User | null;
    session: any;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setSession: (session: any) => void;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
    },
    checkSession: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            // Typically fetch the profile to get the role as well
            const { data: profile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
            set({ session, user: { ...session.user, ...profile }, isLoading: false });
        } else {
            set({ session: null, user: null, isLoading: false });
        }
    }
}));
