import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import Profile from "../components/Profile/Profile";
import { fetchOrders } from "../hooks/fetchOrders";
import { useOrders } from "../hooks/fetchOrders";

function ProfilePage() {
  return <Profile />;
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   // await queryClient.prefetchQuery(["orders"], () => fetchOrders());

//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }

export default ProfilePage;
