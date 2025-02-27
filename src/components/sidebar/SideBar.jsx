import React, { useState } from "react";
import { HomeOutlined,OrderedListOutlined } from '@ant-design/icons';


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sideBarData = [
    { name: "Dashboard", path: "/dashboard", icon: <HomeOutlined />},
    { name: "Student List", path: "/list", icon: <OrderedListOutlined /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <React.Fragment>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-0 left-0 z-50 p-2 m-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none bg-white shadow-lg"
        >
          {/* Icon for the open button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      <div
        className={`z-40 fixed top-0 left-0 w-96 h-full shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col w-96 h-screen px-4 py-8 bg-white overflow-y-auto border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-center text-blue-800">
              Fees Management System
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {/* Toggle Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <aside>
            <ul>
              {sideBarData.map((data) => (
                <li key={data.name} className="mb-4">
                  <a
                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md "
                    href="#"
                  >
                    {data.icon}

                    <span className="mx-4 font-medium">{data.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
