import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { useOrders } from "../../hooks/fetchOrders";
import Spinner from "../Spinner";

const skeletonTransactions = Array(8).fill(0);
const skeletonProducts = Array(3).fill(0);

function TransactionHistory({ session }) {
  const { data, isLoading, isFetching } = useOrders(session);

  if (isLoading) {
    return (
      <div className="grid h-1/3 place-items-center">
        <Spinner />
      </div>
    );
  }
  if (data) {
    console.log(data);
    return (
      <div className="grid w-full h-full grid-flow-row overflow-auto divide-y-2 divide-black">
        {data.results.map((transaction) => (
          <div
            className="grid grid-flow-row first:border-t-2 first:border-black"
            key={transaction}
          >
            <div
              className={`grid grid-flow-col grid-rows-2 md:grid-rows-1 md:py-4 m-1 md:m-2 text-center border-2 rounded-md  md:rounded-full place-items-center`}
            >
              <div className="grid w-full h-full grid-flow-row p-2 text-center border-b-2 border-r-2 md:h-1/2 md:p-0 md:border-0">
                <p>Transaction ID:</p>
                <p>{transaction.id}</p>
              </div>
              <div className="grid w-full h-full grid-flow-row p-2 text-center border-r-2 md:h-1/2 md:p-0 md:border-0">
                <p>The total price:</p>
                <p>129.99$</p>
              </div>
              <div className="grid w-full h-full grid-flow-row p-2 text-center border-b-2 md:h-1/2 md:p-0 md:border-0">
                <p>Date:</p>
                <p>{transaction.created_at}</p>
              </div>
              <div className="grid w-full h-full grid-flow-row p-2 text-center md:h-1/2 md:p-0">
                <p>Status:</p>
                <p>Delivered</p>
              </div>
            </div>
            {transaction.items.map((product) => (
              <div
                className="grid grid-flow-col grid-rows-2 py-4 border-b-2 md:grid-rows-1 last:border-b-0 place-items-center"
                key={product}
              >
                <div className="">Name: {product.product}</div>
                <div className="w-24 h-20 bg-gray-300 rounded-lg"></div>
                <div>Quantity: {product.quantity}</div>
                <div>Total Price: {product.price}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default TransactionHistory;
