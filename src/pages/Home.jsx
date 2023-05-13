import React from "react";
import { CrowdFundItem, Banner } from "../components";
import { useData } from "../context";

const Home = () => {
  const { crowdfunds } = useData();
  return (
    <main>
      <Banner
        caption="Invest in your future"
        imageSrc="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
      />

      <section className="container mx-auto mt-10" id="crowdfunds">
        <h1 className="text-4xl font-bold mb-8">
          Crowdfunds you can invest in
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crowdfunds?.map((crowdfund) => (
            <CrowdFundItem key={crowdfund.id} crowdfund={crowdfund} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
