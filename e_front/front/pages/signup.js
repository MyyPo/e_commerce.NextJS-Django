import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const errorMessage = () => {
    return (
      <div
        className=""
        style={{
          display: errors ? "" : "none",
        }}
      >
        {errors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="w-64 font-mono text-center text-gray-900 bg-white border border-gray-300 rounded-lg shadow-lg"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <div className="mt-4">
          <Image src="/email.svg" alt="email_icon" width="64" height="64" />
        </div>
        <p className="self-auto mx-4">
          Please, verify your account by following the link sent to
        </p>
        <p className="self-auto mx-4 mb-3 text-orange-600">{email}</p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const formIsValid = true;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrors((errors) => errors.concat("Please, enter a valid email."));
      formIsValid = false;
    }
    if (password1 != password2) {
      setErrors((errors) => errors.concat("Passwords should match."));
      formIsValid = false;
    }
    if (!/^[A-Za-z]\w{7,14}$/.test(password1)) {
      setErrors((errors) =>
        errors.concat(
          "Password must contain between 7 to 16 characters numeric digits, underscore and first character must be a letter."
        )
      );
      formIsValid = false;
    }
    if (formIsValid) {
      const response = await fetch("http://127.0.0.1:8000/api/signup/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: password1,
          first_name,
          last_name,
        }),
      });
      setSubmitted(true);
      let data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else if (data.detail) {
        setEmail("");
        setErrors((errors) => errors.concat(data.detail));
      }
    }
  };

  return (
    <div className="">
      <form
        className="absolute p-6 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-lg shadow-lg w-96 top-1/2 left-1/2"
        onSubmit={handleSubmit}
        style={{
          display: submitted ? "none" : "",
        }}
      >
        <div className="grid grid-cols-2 gap-4 mb-3 gap-y-4">
          <input
            className="input"
            placeholder="First name"
            type="text"
            autoComplete="off"
            value={first_name}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Last name"
            type="text"
            autoComplete="off"
            value={last_name}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className="mb-8 input"
          placeholder="Email"
          type="text"
          autoComplete="off"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-3 input"
          placeholder="Password"
          type="password"
          value={password1}
          required
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          className="mb-8 input"
          placeholder="Repeat password"
          type="password"
          value={password2}
          required
          onChange={(e) => setPassword2(e.target.value)}
        />
        <div className="text-center">{errorMessage()}</div>
        <button
          type="sumbit"
          className="block w-full py-4 text-base font-normal bg-orange-200 rounded-lg "
        >
          Sign up
        </button>
      </form>
      <div className="flex flex-col items-center justify-center h-96">
        {successMessage()}
      </div>
    </div>
  );
}
