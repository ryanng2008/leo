import { CredentialResponse } from "./auth";

export {};

declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => void;
  }
}