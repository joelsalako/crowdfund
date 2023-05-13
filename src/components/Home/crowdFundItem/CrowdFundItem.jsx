import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export const CrowdFundItem = ({ crowdfund }) => {
  // check to see if admin is present in the url
  const isAdmin = useMemo(() => window.location.pathname.includes("admin"), []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-2xl leading-6 font-bold  text-gray-900">
          {crowdfund.title}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{crowdfund?.description?.substring(0, 250) + "..."}</p>
        </div>
        <hr className="my-4" />
        {/* show amount needed, amount raised, and percentage raised, roi and investment period */}
        <div className="max-w-xl text-sm text-gray-500 flex flex-wrap justify-between gap-4">
          <p>
            <b>Amount Needed:</b>{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(crowdfund.amountNeeded)}
          </p>
          <p>
            <b>Amount Raised:</b>{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(crowdfund.amountRaised)}
          </p>
          <p>
            <b>Percentage Raised:</b>{" "}
            {Number(
              (crowdfund.amountRaised / crowdfund.amountNeeded) * 100
            ).toFixed(2)}
            %
          </p>
          <p>
            <b>Investment Period:</b> {crowdfund.period} months
          </p>
          <p>
            <b>ROI:</b> {crowdfund.roi} %
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="px-4 py-3 sm:px-6">
        <Link
          to={
            isAdmin
              ? `/admin/crowdfund/${crowdfund.id}`
              : `/crowdfund/${crowdfund.id}`
          }
          className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  w-full justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
