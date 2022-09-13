class HTTPError extends Error {}
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const fetchOrders = async () => {
  const session = await getSession();
  const request = await fetch(process.env.NEXT_PUBLIC_ORDERS, {
    method: "GET",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
  if (!request.ok) {
    throw new HTTPError(`Fetch error: ${request.statusText}`);
  }
  const data = await request.json();
  return data;
};

const useOrders = (session) => {
  return useQuery(["orders"], () => fetchOrders(session));
};

export { fetchOrders, useOrders };
