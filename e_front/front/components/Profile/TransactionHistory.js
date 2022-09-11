import React, { useState } from "react";

const skeletonTransactions = Array(8).fill(0);
const skeletonProducts = Array(3).fill(0);

function TransactionHistory(props) {
  return (
    <div className="grid w-full h-full grid-flow-row overflow-auto divide-y-2 divide-black">
      {skeletonTransactions.map((transaction) => (
        <div
          className="grid grid-flow-row first:border-t-2 first:border-black"
          key={transaction}
        >
          <div
            className={`grid grid-flow-col md:py-4 m-1 md:m-2 text-center border-2 rounded-md  md:rounded-full place-items-center`}
          >
            <div className="w-full h-full">Transaction ID: 123951203</div>
            <div className="w-full h-full">The total price: 129.99$</div>
            <div className="w-full h-full">Date: 01.09.2022</div>
            <div className="w-full h-full">Status: Delivered</div>
          </div>
          {skeletonProducts.map((product) => (
            <div
              className="grid grid-flow-col grid-rows-2 py-4 border-b-2 md:grid-rows-1 last:border-b-0 place-items-center"
              key={product}
            >
              <div className="">Name: Bronze 3D</div>
              <div className="w-24 h-20 bg-gray-300 rounded-lg"></div>
              <div>Quantity: 3</div>
              <div>Total Price: 99.99$</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
