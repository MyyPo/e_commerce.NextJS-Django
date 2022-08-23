import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export function Login() {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const router = useRouter();

  const [email, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let data = await response.json();
    if (response.status === 200) {
      const refreshToken = data.refresh;
      const accessToken = data.access;
      setAuth({ email, password, refreshToken, accessToken });
      sessionStorage.setItem("refresh", refreshToken);
      setUsername("");
      setPassword("");
      router.push("/");
    } else {
      alert("FUUUUUUUUUUUUUUUUUUU");
    }
  };

  return (
    <form className="p-16" onSubmit={handleSubmit}>
      <input
        className="bg-blue-300 border border-black"
        type="text"
        ref={userRef}
        autoComplete="off"
        value={email}
        required
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="bg-blue-300 border border-black"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button>Sign in</button>
    </form>
  );
}

export default Login;
