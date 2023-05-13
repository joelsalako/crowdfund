import React from "react";
import { CrowdFundItem } from "../../components";
import { useAuth, useData } from "../../context";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { crowdfunds } = useData();
  const { user } = useAuth();
  return (
    <main>
      <section className="container mx-auto mt-10" id="crowdfunds">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-8">Registered Crowdfunds</h1>
          {user && (
            <Link
              to="/admin/add-crowdfund"
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-md  px-6 py-4  text-sm font-medium"
            >
              Add New
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crowdfunds?.map((crowdfund) => (
            <CrowdFundItem key={crowdfund.id} crowdfund={crowdfund} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminHome;
