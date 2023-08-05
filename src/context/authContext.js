import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
// import { context } from "../context/authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup, //con que cuenta quiero hacer login
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext(); // 1.devuelve un objeto para poder definir un proveedor y crear o devolver objetos
//5. este context es el que contiene la informacion del user y de todo lo deas

export const useAuth = () => {
  //creamos un hook
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};
export function AuthProvider({ children }) {
  //3.todos los hijos podran accerder al componente padre

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }); //devueve una funcion que es un observador que esta pendiente de los cambios y sabe el usuario que esta logueado
  }, []);
  return (
    //2.desde context traera un provider para colocar components, home, alert etc
    //4. todos lo elementos hijos podran accerder al objeto user
    //< authContext.Provider value={{ user }} >
    <authContext.Provider
      value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword }}
    >
      {children}
    </authContext.Provider> //el auth provider nos permite utilizar el objeto en el cualquier componente
  );
}
