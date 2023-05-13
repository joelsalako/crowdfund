import React, { useState } from "react";
import { useAuth, useData } from "../context";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { Button, Input, Modal, CrowdFundInvestors } from "../components";
import { toast } from "react-hot-toast";

const CrowdFundDetails = () => {
  // check to see if admin is present in the url
  const isAdmin = useMemo(() => window.location.pathname.includes("admin"), []);

  // get id from url
  const { id } = useParams();
  const { findCrowdFundById, saveInvestment } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const crowdfund = useMemo(
    () => findCrowdFundById(id),
    [id, findCrowdFundById]
  );

  const [investmentAmount, setInvestmentAmount] = useState(0);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (investmentAmount === 0) return;
    await saveInvestment({ crowdfundId: id, amount: investmentAmount });
    // navigate to investments page
    navigate("/investments");
    toast.success("Congratulations!! Your investment has been approved.");
  };

  return (
    <main className="container mx-auto my-20">
      {crowdfund ? (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-4xl leading-6 font-bold  text-gray-900 mb-10">
              {crowdfund.title}
            </h1>
            <div className="mt-2  text-sm text-gray-500">
              <p>{crowdfund.description}</p>
            </div>
            <hr className="my-4" />
            {/* show amount needed, amount raised, and percentage raised, roi and investment period */}
            <div className=" text-sm text-gray-500 flex flex-wrap justify-between gap-4">
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
                <b>ROI:</b> {crowdfund.roi}%
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
            </div>
          </div>

          {/* if user is admin, show list of investors */}

          {isAdmin ? (
            <CrowdFundInvestors crowdfund={crowdfund} />
          ) : (
            <>
              {/* show fund button if amount raised is less than amount needed */}
              {user && crowdfund.amountRaised < crowdfund.amountNeeded && (
                <>
                  <hr className="my-4" />
                  <div className="px-4 py-3 text-center">
                    <Modal
                      buttonTitle="Fund Now"
                      modalTitle={`Invest in ${crowdfund.title}`}
                    >
                      <form onSubmit={handleSubmission}>
                        <div className="flex flex-col gap-4">
                          <Input
                            label="Amount"
                            type="number"
                            name="amount"
                            value={investmentAmount}
                            onChange={(e) =>
                              setInvestmentAmount(e.target.value)
                            }
                          />
                          <Button
                            type="submit"
                            className="text-center justify-center"
                          >
                            Fund
                          </Button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
};

export default CrowdFundDetails;
