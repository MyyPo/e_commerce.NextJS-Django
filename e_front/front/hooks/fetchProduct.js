class HTTPError extends Error {}

const fetchProduct = async (slug) => {
  const request = await fetch(
    process.env.NEXT_PUBLIC_PRODUCTS + slug + "/"
    // `http://192.168.0.105:8000/api/products/${slug}/`
  );
  if (!request.ok) {
    throw new HTTPError(`Fetch error: ${request.statusText}`);
  }
  const data = await request.json();
  return data;
};

export { fetchProduct };
