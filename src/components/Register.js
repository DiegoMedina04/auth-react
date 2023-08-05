import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    //actualizar el estado
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const { signup } = useAuth(); //estoy exportando el metodo signup osea el valor
  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError(error);
    }
  };
  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <p>error </p>}

      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Email</label>
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            name="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.com"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">Password</label>
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Register</button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Already have an Account?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>
  );
}
