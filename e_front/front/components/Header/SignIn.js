import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { useEffect, useState, useReducer } from "react";
import Google from "../../public/google.svg";
import Facebook from "../../public/facebook.svg";
import XMark from "../../public/x.svg";
import EmailIcon from "../../public/email_icon.svg";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};
const initialValidityState = {
  errors: "",
};

function formReducer(formData, action) {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...formData, email: action.payLoad };
    case "CHANGE_PASSWORD":
      return { ...formData, password: action.payLoad };
    default:
      throw new Error();
  }
}

function SignIn(props) {
  const [providers, setProviders] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [credentialsLogin, setCredentialsLogin] = useState(false);

  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [formValidityData, setFormValidityData] = useReducer(
    formValidityReducer,
    initialValidityState
  );

  async function formValidityReducer() {
    signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
  }

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      const csrfToken = await getCsrfToken();
      setProviders(providers);
      setCsrfToken(csrfToken);
    })();
  }, []);

  if (!props.signInWindow) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-5/6 m-auto transition ease-in-out bg-gray-300 rounded-lg h-fit md:w-2/3 lg:w-1/3 ring-4 ring-gray-200 z-60">
      <div className="flex flex-col items-center">
        <div className="absolute self-end">
          <button
            className="w-8 h-8 md:w-10 md:h-10"
            onClick={() => props.setWindow(false)}
          >
            <XMark className="fill-gray-600" />
          </button>
        </div>
        <button
          className="flex items-center justify-center w-2/3 h-20 mt-8 bg-gray-700 border-4 border-gray-600 rounded-lg md:w-7/12"
          onClick={() => signIn(providers.google.id)}
        >
          <Google className="w-12 h-12 ml-3" />
          <p className="mx-auto text-white"> Continue with Google</p>
        </button>
        <button
          className="flex items-center justify-center w-2/3 h-20 mt-6 bg-gray-700 border-4 border-gray-600 rounded-lg md:w-7/12"
          onClick={() => signIn(providers.Facebook.id)}
        >
          <Facebook className="w-12 h-12 ml-3" />
          <p className="mx-auto text-white"> Continue with Facebook</p>
        </button>
        <div className="mt-6 font-bold text-md">OR</div>
        <button
          className={`flex items-center justify-center w-2/3 md:w-7/12 h-20 my-6 bg-gray-700 border-4 border-gray-600 rounded-lg ${
            credentialsLogin && "hidden"
          }`}
          onClick={() => setCredentialsLogin(true)}
        >
          <EmailIcon className="w-12 h-12 ml-3 fill-gray-100" />
          <p className="mx-auto text-white"> Login with credentials</p>
        </button>
        {credentialsLogin && (
          <form
            method="post"
            action="/api/auth/callback/credentials"
            defaultValue={csrfToken}
            className="flex flex-col items-center mb-8 space-y-6 animate-appear"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input
              className="flex h-16 text-center rounded-md shadow-md md:h-12"
              placeholder="Email"
              name="email"
              type="text"
              onChange={(e) =>
                setFormData({ type: "CHANGE_EMAIL", payLoad: e.target.value })
              }
              value={formData.email}
            />
            <input
              className="flex h-16 text-center rounded-md shadow-md md:h-12"
              placeholder="Password"
              name="password"
              type="password"
              onChange={(e) =>
                setFormData({
                  type: "CHANGE_PASSWORD",
                  payLoad: e.target.value,
                })
              }
              value={formData.password}
            />
            <button
              type="submit"
              className="relative text-sm font-medium text-center text-white rounded-full w-44 hover:from-gray-600 hover:to-gray-700 h-14 md:rounded-lg md:h-10 bg-gradient-to-b from-gray-900 to-gray-600"
            >
              Login
            </button>
          </form>
        )}
        <div className="mb-6 text-center border-t-2">
          <p>Don&apos;t have an account?</p>
          <Link href="/">
            <a className="text-2xl font-bold md:text-lg text-sky-600">
              Create one!
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
