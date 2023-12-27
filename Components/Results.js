import React from "react";
import Layout from "./Layout";
import Thumbnail from "./Thumbnail";

const Results = ({ requests }) => {
  return (
    <Layout>
      <div className="px-4 my-10 sm:grid md:grid-cols-4 grid-cols-3 xl:grid-cols-4 3xl:flex justify-center flex-wrap">
        {requests?.map((result, index) => (
          <Thumbnail key={result.id} result={result} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Results;
