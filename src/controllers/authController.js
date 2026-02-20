import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const authController = {
  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  async loginWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async registerWithEmail({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name?.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }
    return cred;
  },

  async loginWithGoogle() {
    return await signInWithPopup(auth, googleProvider);
  },

  async resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  },

  async logout() {
    return await signOut(auth);
  },
};

export function getAuthErrorMessage(error) {
  const code = error?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "El email no es válido.";
    case "auth/user-not-found":
      return "No existe un usuario con ese email.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    case "auth/email-already-in-use":
      return "Ese email ya está registrado.";
    case "auth/weak-password":
      return "La contraseña es muy débil (mínimo 6 caracteres).";
    case "auth/popup-closed-by-user":
      return "Cerraste la ventana de Google antes de terminar.";
    case "auth/network-request-failed":
      return "Error de red. Revisa tu conexión.";
    default:
      return "Ocurrió un error. Intenta nuevamente.";
  }
}