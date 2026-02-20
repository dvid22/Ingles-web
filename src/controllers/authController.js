import { auth, db } from "../firebase/config";
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

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

async function upsertUserProfile(user, extra = {}) {
  if (!user?.uid) return;

  const ref = doc(db, "usersINGLES", user.uid);
  const snap = await getDoc(ref);

  const baseData = {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    providerId: user.providerData?.[0]?.providerId ?? "unknown",
    lastLoginAt: serverTimestamp(),
    ...extra,
  };

  // Si es nuevo, guardamos createdAt. Si existe, no lo pisamos.
  if (!snap.exists()) {
    await setDoc(ref, { ...baseData, createdAt: serverTimestamp() }, { merge: true });
  } else {
    await setDoc(ref, baseData, { merge: true });
  }
}

export const authController = {
  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  async loginWithEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertUserProfile(cred.user);
    return cred;
  },

  async registerWithEmail({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    if (name?.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }

    // Important: recargar datos actualizados del user (displayName)
    await upsertUserProfile(auth.currentUser, { displayName: auth.currentUser?.displayName ?? name?.trim() });

    return cred;
  },

  async loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    await upsertUserProfile(cred.user);
    return cred;
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