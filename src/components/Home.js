// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Home() {
  const { user, logout, loading } = useAuth(); //compartir el ususario en distintos componentes
  // const navigate = useNavigate();
  console.log({ user });
  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/login");
    } catch (error) {
      console.log({ error });
    }
  };
  console.log({ loading });
  if (loading) return <h1>Cargando....</h1>;
  return (
    <div className="">
      Bienvenido {user.displayName || user.email}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
