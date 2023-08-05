import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    //actualizar el estado
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const { login, loginWithGoogle, resetPassword } = useAuth(); //estoy exportando el metodo signup osea el valor

  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError(error.code);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };


  const handleResetPassword = async () => {
    const { email } = user
    if (!email) return setError('Ingresa el correo')
    try {
      const res = await resetPassword(email)
      console.log({ res });
      setError('Enviado al correo')
    } catch (error) {
      console.log({ error })
    }
  }
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">

          <label htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="youremail@company.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Google login
      </button>
      <p className="my-4 text-sm flex justify-between px-3">
        Don't have an account?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Register
        </Link>
      </p>
    </div>
  );
}
