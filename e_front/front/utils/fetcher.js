import { getSession } from "next-auth/react"

async function updateOptions(options) {
  const { data: session, status} = await getSession()
  console.log(session)
  const update = { ...options };
  if (session?.accessToken) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}