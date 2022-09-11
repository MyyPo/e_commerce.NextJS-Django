import React, { useState, useReducer } from "react";
import Categories from "./Categories";

const initialState = {
  category: [],
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      if (state.category.includes(action.payLoad)) {
        return {
          ...state,
          category: [
            ...state.category.filter((category) => category !== action.payLoad),
          ],
        };
      } else {
        return {
          ...state,
          category: [...state.category, action.payLoad],
        };
      }
    default:
      throw new Error();
  }
};

function ProductFilter() {
  const [searchData, setSearchData] = useReducer(searchReducer, initialState);

  return (
    <div className="w-full mt-12">
      <div className="flex items-center w-full md:justify-center lg:justify-start">
        <div className="w-3/4 border-4 h-5/6 rounded-xl">
          <div className="flex justify-center mt-5">
            <p className="text-lg font-bold">Sort by categories</p>
          </div>
          <div className="flex justify-center my-5">
            <Categories searchData={searchData} setSearchData={setSearchData} />
          </div>
          <div className="flex justify-center my-5">
            <button className="w-1/3 h-10 font-medium text-white rounded-lg bg-gradient-to-b from-gray-900 to-gray-600 hover:from-gray-600 hover:to-gray-700 ">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
