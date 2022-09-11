class HTTPError extends Error {}

const postSignup = await fetch(process.env.NEXT_PUBLIC_CREATE_USER, {
  method: "POST",
  body: JSON.stringify({ foo: true }),
  headers: {
    "content-type": "application/json",
  },
});

if (!response.ok) {
  throw new HTTPError(`Fetch error: ${response.statusText}`);
}

const json = await response.json();
