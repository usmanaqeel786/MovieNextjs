import EmptyRecord from "@/Components/EmptyRecord";
import GenLoader from "@/Components/GenLoader";
import Layout from "@/Components/Layout";
import MarketPlaceCard from "@/Components/MarketPlaceCard";
import { GET_MARKET } from "@/lib/endpoints";
import Head from "next/head";
import React, { useEffect } from "react";

const market = ({ market, loading }) => {
  if (loading) return <GenLoader />;
  if (market?.length === 0)
    return <EmptyRecord title={"No Market Record"} subtext="" />;

  return (
    <Layout>
      <Head>
        <title>Market</title>
        <meta name="description" content="Movie Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-4 my-10 sm:grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 3xl:flex justify-center flex-wrap">
        {market
          .filter(
            (tag, index, array) =>
              array.findIndex(
                (t) => t.movieId === tag.movieId && t.title === tag.title
              ) === index
          )
          .map((item, index) => (
            <MarketPlaceCard key={index} item={item} index={index} />
          ))}
      </div>
    </Layout>
  );
};

export default market;

export const getServerSideProps = async (context) => {
  const marketPlace = await fetch(GET_MARKET).then((res) => res.json());
  return {
    props: {
      market: marketPlace.data,
    },
  };
};
