"use client";
import dynamic from "next/dynamic";
import React from "react";
// import ChartOne from "../Charts/ChartOne";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import TableThree from "../Tables/TableThree";
// import CardDataStats from "../CardDataStats";

// const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
//   ssr: false,
// });

// const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
//   ssr: false,
// });

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableThree />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
