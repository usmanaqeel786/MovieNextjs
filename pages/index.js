import Head from "next/head";
import Header from "@/Components/Header";
import NavBar from "@/Components/NavBar";
import Results from "@/Components/Results";
import requests from "@/utils/requests";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CREATE_USER } from "@/lib/endpoints";
import GenLoader from "@/Components/GenLoader";

export default function Home({ results, loading }) {
  const userData = useSelector((state) => state.userr.user);
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/OnBoarding");
    }
  }, [userData]);
  if (!userData) return null;

  return (
    <>
      <Head>
        <title>Hulu</title>
        <meta name="description" content="The ocean of movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar requests={requests} />
        {loading ? <GenLoader /> : <Results requests={results} />}
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
};
