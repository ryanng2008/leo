'use client';

import { useEffect } from 'react';
import { supabaseClient } from '@/app/lib/supabase/client'; 
import { CredentialResponse } from './types/auth'; 

export default function GoogleAuthInitializer() {
  useEffect(() => {
    window.handleSignInWithGoogle = async function (response: CredentialResponse): Promise<void> {
      const { data, error } = await supabaseClient.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) {
        console.error('Error signing in with Google:', error);
        return;
      }
      window.location.reload();
      console.log('User signed in:', data);
      // it already sets to local storage
    };

    console.log('Google Sign-In handler attached to window');
  }, []);

  return null; // No UI elements needed
}

// 'use client'
// import { createClient } from '@/app/lib/supabase/server'; // Adjust as necessary
// import { CredentialResponse } from './types/auth';

// if (typeof window !== 'undefined') {
//   window.handleSignInWithGoogle = async function (response: CredentialResponse): Promise<void> {
//     const supabase = await createClient();
//     const { data, error } = await supabase.auth.signInWithIdToken({
//       provider: 'google',
//       token: response.credential,
//     });

//     if (error) {
//       console.error('Error signing in with Google:', error);
//       return;
//     }

//     console.log('User signed in:', data);
//   };
// }

