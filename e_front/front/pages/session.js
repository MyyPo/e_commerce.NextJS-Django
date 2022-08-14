import { signIn, signOut, useSession } from "next-auth/react";

export default function Session() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <>
        Signed in as {session.first_name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <br />
        <div>Token: {session.accessToken}</div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
