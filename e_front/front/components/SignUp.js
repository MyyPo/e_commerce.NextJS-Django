import React, { useState, useReducer } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Mailbox from "../public/mailbox.svg";

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
};
const initialValidityState = {
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
  passwordMatchError: false,
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIRST_NAME":
      return {
        ...state,
        firstName: action.payLoad,
      };
    case "UPDATE_LAST_NAME":
      return {
        ...state,
        lastName: action.payLoad,
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payLoad,
      };
    case "RESET_EMAIL":
      return {
        ...state,
        email: "",
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payLoad,
      };
    case "UPDATE_PASSWORD2":
      return {
        ...state,
        password2: action.payLoad,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const formValidityReducer = (state, action) => {
  let isValid = false;
  switch (action.type) {
    case "VALIDATE_FIRST_NAME":
      isValid = action.payLoad.firstName.length > 2 ? true : false;
      return {
        ...state,
        ...{
          firstNameError: !isValid,
          isFormValid:
            isValid &&
            !state.lastNameError &&
            !state.ageError &&
            !state.emailError &&
            !state.passwordError,
        },
      };
    case "VALIDATE_LAST_NAME":
      isValid = action.payLoad.lastName.length > 2 ? true : false;
      return {
        ...state,
        ...{
          lastNameError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.ageError &&
            !state.emailError &&
            !state.passwordError,
        },
      };
    case "VALIDATE_EMAIL":
      isValid =
        action.payLoad.email.length > 0 &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          action.payLoad.email
        )
          ? true
          : false;
      return {
        ...state,
        ...{
          emailError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.ageError &&
            !state.passwordError,
        },
      };
    case "VALIDATE_PASSWORD":
      isValid =
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
          action.payLoad.password
        );
      return {
        ...state,
        ...{
          passwordError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.ageError &&
            !state.emailError,
        },
      };
    case "VALIDATE_PASSWORD_MATCH":
      isValid = action.payLoad.password2 == action.payLoad.password;
      return {
        ...state,
        ...{
          passwordError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.ageError &&
            !state.emailError,
        },
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [formValidityData, setFormValidityData] = useReducer(
    formValidityReducer,
    initialValidityState
  );
  const [submitted, setSubmitted] = useState(false);
  const [responseErrors, setResponseErrors] = useState("");

  const errorEmailMessage = () => {
    return (
      <div
        className="text-sm text-center"
        style={{
          visibility:
            formValidityData.emailError || responseErrors ? "" : "hidden",
        }}
      >
        Please, provide a valid email address
        <br />
        <p className="text-red-700">{responseErrors}</p>
      </div>
    );
  };
  const errorMatchPasswordMessage = () => {
    return (
      <div
        className="text-sm text-center"
        style={{
          visibility: formValidityData.passwordMatchError ? "" : "hidden",
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
          visibility: formValidityData.passwordError ? "" : "hidden",
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
        <p className="self-auto mx-4 mb-3 text-orange-600">{/* {email} */}</p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidityData.isFormValid) {
      const response = await fetch(
        "http://192.168.0.105:8000/api/products/",
        // process.env.NEXT_PUBLIC_CREATE_USER
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
          }),
        }
      );
      let data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else if (data.detail) {
        setFormData({ type: "RESET_EMAIL" });
        setResponseErrors(data.detail);
      }
    }
  };

  return (
    <div className="">
      <div className="mt-12 lg:justify-center lg:mt-24 lg:flex lg:gap-12">
        <div className={`hidden ${submitted && "lg:hidden"} lg:block`}>
          <Mailbox className="w-full h-full" />
        </div>
        <form
          className="p-3 text-center bg-white border-2 rounded-lg shadow-lg md:p-6 md:w-2/3 lg:w-1/3"
          onSubmit={handleSubmit}
          style={{
            display: submitted ? "none" : "",
          }}
        >
          <div className="mb-4 text-lg font-bold ">
            Create an account via mail
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3 gap-y-4">
            <input
              className="input"
              placeholder="First name"
              type="text"
              autoComplete="off"
              name="firstName"
              required
              onChange={(e) =>
                setFormData({
                  type: "UPDATE_FIRST_NAME",
                  payLoad: e.target.value,
                })
              }
              onBlur={(e) =>
                setFormValidityData({
                  type: "VALIDATE_FIRST_NAME",
                  payLoad: formData,
                })
              }
            />
            <input
              className="input"
              placeholder="Last name"
              type="text"
              autoComplete="off"
              name="lastName"
              required
              onChange={(e) =>
                setFormData({
                  type: "UPDATE_LAST_NAME",
                  payLoad: e.target.value,
                })
              }
              onBlur={(e) =>
                setFormValidityData({
                  type: "VALIDATE_LAST_NAME",
                  payLoad: formData,
                })
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <input
              className={`input ${
                formValidityData.errorEmail || responseErrors
                  ? "border-red-700"
                  : ""
              }`}
              placeholder="Email"
              type="text"
              autoComplete="off"
              name="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ type: "UPDATE_EMAIL", payLoad: e.target.value })
              }
              onBlur={(e) =>
                setFormValidityData({
                  type: "VALIDATE_EMAIL",
                  payLoad: formData,
                })
              }
            />
            {errorEmailMessage()}
            <input
              className={`input ${
                formValidityData.passwordError ? "border-red-700" : ""
              }`}
              placeholder="Password"
              type="password"
              name="password"
              required
              onChange={(e) =>
                setFormData({
                  type: "UPDATE_PASSWORD",
                  payLoad: e.target.value,
                })
              }
              onBlur={(e) =>
                setFormValidityData({
                  type: "VALIDATE_PASSWORD",
                  payLoad: formData,
                })
              }
            />
            {errorInvalidPasswordMessage()}

            <input
              className={`input ${
                formValidityData.passwordMatchError ? "border-red-700" : ""
              }`}
              placeholder="Repeat password"
              type="password"
              name="password2"
              required
              onChange={(e) =>
                setFormData({
                  type: "UPDATE_PASSWORD2",
                  payLoad: e.target.value,
                })
              }
              onBlur={(e) =>
                setFormValidityData({
                  type: "VALIDATE_PASSWORD_MATCH",
                  payLoad: formData,
                })
              }
            />
            {errorMatchPasswordMessage()}

            <button
              type="sumbit"
              className="block w-full py-4 text-base font-normal bg-blue-400 rounded-lg "
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          {successMessage()}
        </div>
      </div>
    </div>
  );
}
