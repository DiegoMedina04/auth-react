import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      {error && <p>error </p>}

      <form onSubmit={handleSubmit} action="">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          placeholder="youremail@company.com"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
        <button> Register</button>
      </form>
    </div>
  );
}
