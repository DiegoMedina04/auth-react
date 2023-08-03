import { createContext } from "react";
import { useContext } from "react"
import { context } from "../context/authContext"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

export const authContext = createContext()// 1.devuelve un objeto para poder definir un proveedor y crear o devolver objetos
//5. este context es el que contiene la informacion del user y de todo lo deas 


export const useAuth = () => {//creamos un hook
    const context = useContext(authContext)
    if (!context) throw new Error('There is not auth provider')
    return context;
}
export function AuthProvider({ children }) {//3.todos los hijos podran accerder al componente padre
    const user = {
        login: true
    }

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    return (
        //2.desde context traera un provider para colocar components, home, alert etc
        //4. todos lo elementos hijos podran accerder al objeto user
        //< authContext.Provider value={{ user }} >
        < authContext.Provider value={{ signup }} >
            {children}
        </authContext.Provider>//el auth provider nos permite utilizar el objeto en el cualquier componente
    )
}