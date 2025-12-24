import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />

      <div className="flex flex-1">
        {/* Middle Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 w-3/4 float-left">
          <Outlet />
        </main>
      </div>


      {/* Footer */}
      <Footer />
    </div>

  );
};

export default AdminDashboard;
