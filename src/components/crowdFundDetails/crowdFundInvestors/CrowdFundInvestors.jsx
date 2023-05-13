import { useEffect, useState } from "react";
import { useData } from "../../../context";

export const CrowdFundInvestors = ({ crowdfund }) => {
  const { getInvestmentsByCrowdfundId } = useData();
  const [investments, setInvestments] = useState([]);

  // get investments by crowdfund id
  useEffect(() => {
    (async () => {
      const investments = await getInvestmentsByCrowdfundId(crowdfund?.id);
      setInvestments(investments);
    })();
  }, [crowdfund, getInvestmentsByCrowdfundId]);

  console.log("investments", investments);
  return (
    <main className="container mx-auto my-20">
      <div className="flex flex-col">
        <div className="overflow-hidden sm:-mx-6 lg:-mx-8 mt-6">
          <div className="align-middle inline-block w-full sm:px-6 lg:px-8">
            <div
              className={`bg-white border-[#D4D4D8] border px-6 py-4 whitespace-nowrap flex flex-col md:flex-row justify-between`}
            >
              <h3 className="text-sm font-bold">Investments</h3>
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
                  {/* if no investments */}
                  {investments?.length === 0 && (
                    <tr className="h-[30vh]">
                      <td colSpan="4" className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center  justify-center">
                          <div className="text-sm text-gray-900">
                            No investments yet
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* show investments if any */}
                  {investments?.map((investment, index) => {
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
