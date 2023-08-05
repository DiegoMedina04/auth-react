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
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4">welcome {user.displayName || user.email}</p>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
}
