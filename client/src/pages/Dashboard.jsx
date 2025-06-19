import React from "react";
import { Link } from "react-router-dom";
import RoomList from "../components/RoomList";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            
            <h2 className="text-2xl text-gray-300 max-w-2xl mx-auto">
              Create or join virtual study rooms among the stars
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mb-12">
            <Link
              to="/create-room"
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="mr-2 text-xl">+</span> Create Room
            </Link>
           
          </div>

          {/* Rooms Section */}
          <div className="mb-12 bg-neutral-900 flex flex-col py-5 px-4 justify-center container mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-8">
              Active Study Rooms
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-6 mb-4 justify-center">
              <RoomList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
