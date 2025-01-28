'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserInfo, handleSignOut } from '@/app/lib/supabase/user';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<{ user: User | null, signOut: () => Promise<void> }>({
  user: null,
  signOut: function (): Promise<void> {
    throw new Error('Loading');
  }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user info on component mount
    const fetchUser = async () => {
      const userInfo = await fetchUserInfo();
      setUser(userInfo);
    };

    fetchUser();
  }, []);


  const signOut = async () => {
    const error = await handleSignOut();
    if(error) {
      console.error('Log-out error: ', error)
    }
    setUser(null);
    window.location.reload(); 
  }

  return (
    // setUser in props, prolly dont need
    <UserContext.Provider value={{ user, signOut }}> 
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);