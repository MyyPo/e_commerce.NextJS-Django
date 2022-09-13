import React from "react";
import { useReducer } from "react";
import { useSession } from "next-auth/react";

import PersonalInfo from "./PersonalInfo";
import TransactionHistory from "./TransactionHistory";
import Settings from "./Settings";
import ContactForm from "./ContactForm";

const initialState = {
  tabOpened: 1,
};

const tabReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_TAB":
      return {
        ...state,
        tabOpened: action.payLoad,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function Profile() {
  const { session, status } = useSession();

  console.log(session);
  const [tabData, setTabData] = useReducer(tabReducer, initialState);

  if (status === "loading") return <p>Loading...</p>;
  else if (status === "authenticated")
    return (
      <div className="flex items-start md:items-center h-[86vh] justify-center">
        <div className="flex flex-col w-full h-full border-4 gap-y-1 md:gap-y-3 lg:gap-y-6 md:h-5/6 md:mt-6 lg:w-3/5">
          <div className="flex items-center justify-center w-full text-2xl font-bold text-center md:mt-4">
            <p className="">Account</p>
          </div>
          <div className="grid items-center w-full grid-flow-col grid-rows-2 gap-y-3 lg:mt-0 md:grid-rows-1 justify-evenly">
            <button
              onClick={() => setTabData({ type: "OPEN_TAB", payLoad: 1 })}
              className={`bg-gray-200 rounded-3xl ${
                tabData.tabOpened == 1 && "bg-gray-400"
              }`}
            >
              <p className="p-4"> Personal Info</p>
            </button>
            <button
              className={`bg-gray-200 rounded-3xl ${
                tabData.tabOpened == 2 && "bg-gray-400"
              }`}
              onClick={() => setTabData({ type: "OPEN_TAB", payLoad: 2 })}
            >
              <p className="p-4">Transaction History</p>
            </button>
            <button
              className={`bg-gray-200 rounded-3xl ${
                tabData.tabOpened == 3 && "bg-gray-400"
              }`}
              onClick={() => setTabData({ type: "OPEN_TAB", payLoad: 3 })}
            >
              <p className="p-4">Settings</p>
            </button>
            <button
              className={`bg-gray-200 rounded-3xl ${
                tabData.tabOpened == 4 && "bg-gray-400"
              }`}
              onClick={() => setTabData({ type: "OPEN_TAB", payLoad: 4 })}
            >
              <p className="p-4">Contact Form</p>
            </button>
          </div>
          <div className="w-full h-2/3">
            {tabData.tabOpened == 1 && <PersonalInfo />}
            {tabData.tabOpened == 2 && <TransactionHistory session={session} />}
            {tabData.tabOpened == 3 && <Settings />}
            {tabData.tabOpened == 4 && <ContactForm />}
          </div>
        </div>
      </div>
    );
}

export default Profile;
