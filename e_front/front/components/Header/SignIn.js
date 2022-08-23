import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

function SignIn(props) {
  const [providers, setProviders] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

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
    <div className="fixed top-0 left-0 z-50 w-full h-full">
      <div className="fixed top-0 bottom-0 left-0 right-0 w-1/2 m-auto bg-slate-600 h-3/4">
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input name="email" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>

        <button
          className="w-10 h-10 bg-red-700"
          onClick={() => signIn(providers.google.id)}
        />
        <button
          className="w-10 h-10 bg-blue-700"
          onClick={() => props.setWindow(false)}
        />
      </div>
    </div>
  );
}

export default SignIn;
