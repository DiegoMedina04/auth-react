import { useAuth } from "../context/authContext";

export function Home() {
  const { user } = useAuth();//compartir el ususario en distintos componentes

  console.log({ user });

  return (
    <div className="">Home</div>
  )
}
