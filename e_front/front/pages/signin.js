import { signIn, getCsrfToken, getProviders } from "next-auth/react";

function SignIn({ csrfToken, providers }) {
  return (
    <div>
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
    </div>
  );
}

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
