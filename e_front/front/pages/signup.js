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
  const [errors, setErrors] = useState("");
  const [error_email, setErrorEmail] = useState(false);
  const [error_match_password, setErrorMatchPassword] = useState(false);
  const [error_invalid_password, setErrorInvalidPassword] = useState(false);

  const errorEmailMessage = () => {
    return (
      <div
        className="text-sm text-center"
        style={{
          visibility: error_email || errors ? "" : "hidden",
        }}
      >
        Please, provide a valid email address
        <br />
        <p className="text-red-700">{errors}</p>
      </div>
    );
  };
  const errorMatchPasswordMessage = () => {
    return (
      <div
        className="text-sm text-center"
        style={{
          visibility: error_match_password ? "" : "hidden",
        }}
      >
        Provided passwords should match
      </div>
    );
  };
  const errorInvalidPasswordMessage = () => {
    return (
      <div
        className="text-sm text-center"
        style={{
          visibility: error_invalid_password ? "" : "hidden",
        }}
      >
        Passwords should be at least 6 characters long and contain both letters
        and numbers
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
          <Image src="/email.svg" alt="Email icon" width="64" height="64" />
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
    setErrors("");
    setErrorEmail(false);
    setErrorInvalidPassword(false);
    setErrorMatchPassword(false);
    const formIsValid = true;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorEmail(true);
      formIsValid = false;
    }
    if (password1 != password2) {
      setErrorMatchPassword(true);
      formIsValid = false;
    }
    if (
      !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
        password1
      )
    ) {
      setErrorInvalidPassword(true);
      formIsValid = false;
    }
    if (formIsValid) {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
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
      let data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else if (data.detail) {
        setEmail("");
        setErrors(data.detail);
      }
    }
  };

  return (
    <>
      <form
        className="absolute w-9/12 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-lg shadow-lg md:w-2/3 lg:w-1/3 top-1/2 left-1/2"
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
        <div className="grid grid-cols-1 gap-2">
          <input
            className={`input ${error_email || errors ? "border-red-700" : ""}`}
            placeholder="Email"
            type="text"
            autoComplete="off"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmailMessage()}
          <input
            className={`input ${
              error_invalid_password ? "border-red-700" : ""
            }`}
            placeholder="Password"
            type="password"
            value={password1}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
          {errorInvalidPasswordMessage()}

          <input
            className={`input ${error_match_password ? "border-red-700" : ""}`}
            placeholder="Repeat password"
            type="password"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
          {errorMatchPasswordMessage()}

          <button
            type="sumbit"
            className="block w-full py-4 text-base font-normal bg-orange-200 rounded-lg "
          >
            Sign up
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center h-96">
        {successMessage()}
      </div>
    </>
  );
}
