import React from "react";
import { useData } from "../context";
import { Link } from "react-router-dom";

const Investments = () => {
  const { findCrowdFundById, userInvestments } = useData();
  return (
    <main className="container mx-auto my-20">
      <div className="flex flex-col">
        <div className="overflow-hidden sm:-mx-6 lg:-mx-8 mt-6">
          <div className="align-middle inline-block w-full sm:px-6 lg:px-8">
            <div
              className={`bg-white border-[#D4D4D8] border px-6 py-4 whitespace-nowrap flex flex-col md:flex-row justify-between`}
            >
              <h3 className="text-sm font-bold">My Investments</h3>
            </div>
            <div className="overflow-auto w-full border border-[#D4D4D8] border-t-0">
              <table className="w-full divide-y divide-[#D4D4D8]">
                <thead className="bg-white bg-white divide-y divide-[#D2E1EF] border-t-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      S/N
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      Crowdfund
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      ROI
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      Yield Period
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      Amount Invested
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      Expected Return
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                    >
                      Date Invested
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#D2E1EF]">
                  {userInvestments?.map((investment, index) => {
                    const crowdfund = findCrowdFundById(investment.crowdfundId);

                    return (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {index + 1}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900 underline">
                              <Link to={`/crowdfund/${investment.crowdfundId}`}>
                                {crowdfund?.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {crowdfund?.roi}%
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {crowdfund?.period} months
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(investment?.amount)}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(
                                Number(
                                  investment.amount * (crowdfund.roi / 100)
                                ) + Number(investment?.amount)
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {new Date(
                                investment.createdAt.seconds * 1000
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Investments;
