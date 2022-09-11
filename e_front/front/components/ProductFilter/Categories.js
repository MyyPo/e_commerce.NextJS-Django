import React from "react";

const categoriesArray = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
];

function Categories(props) {
  return (
    <div className="grid grid-flow-row grid-cols-2 w-fit">
      {categoriesArray.map((index) => (
        <label
          htmlFor={index}
          className="p-2 mx-4 rounded-md hover:bg-gray-200"
          key={index}
        >
          <input
            id={index}
            type={"checkbox"}
            className="w-4 h-4 border-gray-500 accent-gray-600"
            onClick={() =>
              props.setSearchData({
                type: "UPDATE_CATEGORY",
                payLoad: index,
              })
            }
          />
          <label htmlFor={index} className="ml-2">
            {index}
          </label>
        </label>
      ))}

      <label className="w-1/2 col-span-2 p-2 mx-auto text-center rounded-md hover:bg-gray-200">
        <input
          type={"checkbox"}
          className="w-4 h-4 border-gray-500 accent-gray-600"
          onClick={() =>
            props.setSearchData({
              type: "UPDATE_CATEGORY",
              payLoad: "In stock",
            })
          }
        />
        <label className="ml-2">In stock</label>
      </label>
    </div>
  );
}

export default Categories;
