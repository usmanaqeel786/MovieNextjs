import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  CalendarIcon,
  FilmIcon,
  StarIcon,
  ChatIcon,
  TagIcon,
  PlusCircleIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import IconLabel from "@/Components/IconLabel";
import { useDispatch, useSelector } from "react-redux";
import SetMyCollectionAction from "@/Store/MyCollection/SetMyCollectionAction";
import Success from "@/Components/Success";
import {
  GET_MARKET,
  GET_REVIEWS,
  GET_TICKETS,
  INSERT_COLLECTION_ITEM,
} from "@/lib/endpoints";
import MovieTabs from "@/Components/MovieTabs";
import Reviews from "@/Containers/Reviews";
import Tickets from "@/Containers/Tickets";
import { toast } from "react-nextjs-toast";
import MovieMarket from "@/Containers/MovieMarket";
import CreditsCast from "@/Components/CreditsCast";
import { shimmer, toBase64 } from "@/lib/helpers";
import Layout from "@/Components/Layout";

const movieDetails = ({
  results,
  credits,
  loading,
  reviews,
  tickets,
  market,
}) => {
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userr.user);

  const getmyData = () => {
    let arr = [];
    market.data.forEach((element) => {
      if (element.userNumber === userName.number) {
        arr.push(element);
      }
    });
    return arr[0];
  };
  const myData = getmyData();

  const [description, setdescription] = useState(
    !myData ? "" : myData.description
  );
  const [price, setprice] = useState(!myData ? null : parseInt(myData.price));

  const myCollectionsData = useSelector(
    (state) => state.collectionn.mycollection
  );
  const [userreview, setuserreview] = useState("");

  let myCollectionPayload = {
    userNumber: userName.number,
    id: results.id,
    title: results.title,
    createAt: new Date(),
    imgUrl:
      `${BASE_URL}${results.backdrop_path || results.poster_path}` ||
      `${BASE_URL}${results.poster_path}`,
  };

  let reviewPayload = {
    userName: userName.name,
    userNumber: userName.number,
    movieId: results.id,
    title: results.title,
    review: userreview,
    createAt: new Date(),
  };
  let marketPayload = {
    userName: userName.name,
    userNumber: userName.number,
    movieId: results.id,
    title: results.title,
    imgUrl:
      `${BASE_URL}${results.backdrop_path || results.poster_path}` ||
      `${BASE_URL}${results.poster_path}`,
    price: parseInt(price),
    description,
    createAt: new Date(),
  };

  const feedDatainDb = async () => {
    await fetch(INSERT_COLLECTION_ITEM, {
      method: "POST",
      body: JSON.stringify(myCollectionPayload),
    });
  };

  const feedReviewinDb = async () => {
    if (userreview === "") {
      toast.notify("Review field can not be empty", { type: "error" });
    } else {
      await fetch(GET_REVIEWS, {
        method: "POST",
        body: JSON.stringify(reviewPayload),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) =>
        res.json().then((res) => {
          if (res.status === 200) {
            router.replace(router.asPath, undefined, { scroll: false });
            toast.notify("Review Added Successfully", { type: "success" });
            setuserreview("");
          }
        })
      );
    }
  };

  const feedinMarket = async () => {
    if (price === "" || description === "") {
      toast.notify("fields can not be empty", { type: "error" });
    } else {
      await fetch(myData ? GET_MARKET + `?id=${myData["_id"]}` : GET_MARKET, {
        method: !myData ? "POST" : "PATCH",
        body: JSON.stringify(marketPayload),
      }).then((res) =>
        res.json().then((res) => {
          if (res.status === 200) {
            router.replace(router.asPath, undefined, { scroll: false });
            toast.notify(
              !myData ? "Added Successfully" : "Updated Successfully",
              { type: "success" }
            );
          } else {
            toast.notify(res.error, { type: "error" });
          }
        })
      );
    }
  };

  const handleCollectionInRedux = async () => {
    myCollectionsData
      ? dispatch(
          SetMyCollectionAction.action([
            ...myCollectionsData,
            myCollectionPayload,
          ])
        )
      : dispatch(SetMyCollectionAction.action([myCollectionPayload]));
  };
  const validateCollectionItem = () => {
    return myCollectionsData?.some((e) => e.title === results.title);
  };

  // console.log(credits);

  return (
    <Layout>
      <Head>
        <title>{results.title}</title>
        <meta name="description" content="Movie Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CreditsCast data={credits} />
        <div className="px-0 mb-0 mt-5 sm:grid md:grid-cols-1 xl:grid-cols-2 3xl:flex justify-center flex-wrap scrollbar-hide">
          <div className="">
            <Image
              src={
                `${BASE_URL}${results.backdrop_path || results.poster_path}` ||
                `${BASE_URL}${results.poster_path}`
              }
              width={1080}
              height={600}
              className="rounded-sm shadow-md"
              priority
              alt="image"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1080, 600)
              )}`}
            />

            <h1 className="font-bold text-xl p-5 py-2">{results.title}</h1>
            <div className="flex flex-shrink-0 flex-wrap  lg:space-x-5 p-5 py-2">
              <IconLabel Icon={CalendarIcon} title={results.release_date} />
              <IconLabel Icon={FilmIcon} title={results.status} />
              <IconLabel Icon={StarIcon} title={results.vote_average} />
              <IconLabel Icon={ChatIcon} title={results.original_language} />
            </div>
          </div>
          <div className="flex flex-col bg-opacity-30 pb-5 pt-2">
            <p className="lg:text-[18px] text-[14px] px-5 font-light text-justify ">
              {results.overview}
            </p>
            {/* <div className="p-4">
              {!validateCollectionItem() ? (
                <IconLabel
                  Icon={PlusCircleIcon}
                  title={"Add to my collection"}
                  isClick
                  onClick={() => {
                    if (!validateCollectionItem()) {
                      handleCollectionInRedux();
                      feedDatainDb();
                    }
                  }}
                />
              ) : (
                <Success title={"Added to Collection"} />
              )}
            </div> */}
            <div className="flex px-6 scrollbar-hide items-center space-x-5 p-2 overflow-auto">
              <IconLabel Icon={TagIcon} />
              {results?.genres?.map((item, index) => (
                <p
                  className="p-2 px-4 text-[13px] select-none flex-wrap flex-shrink-0 bg-cyan-800 shadow-lg rounded-lg "
                  key={index}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <MovieTabs />
            {router.query.tab === "reviews" ? (
              <Reviews
                data={reviews.data}
                userreview={userreview}
                setuserreview={setuserreview}
                feedReviewinDb={feedReviewinDb}
              />
            ) : router.query.tab === "tickets" ? (
              <Tickets data={tickets.data} />
            ) : (
              router.query.tab === "market" && (
                <MovieMarket
                  myData={myData}
                  data={market.data}
                  description={description}
                  setdescription={setdescription}
                  price={price}
                  setprice={setprice}
                  feedinMarket={feedinMarket}
                />
              )
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default movieDetails;

export const getServerSideProps = async (context) => {
  const id = context.query.MovieDetails;
  const number = context.query.number;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  ).then((res) => res.json());

  const getReviews = await fetch(
    GET_REVIEWS + `?number=${number}&movieId=${id}`
  ).then((res) => res.json());

  const getTickets = await fetch(GET_TICKETS).then((res) => res.json());
  const getMarket = await fetch(GET_MARKET + `?movieId=${id}`).then((res) =>
    res.json()
  );

  const getCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      results: request,
      credits: getCredits.cast,
      reviews: getReviews,
      tickets: getTickets,
      market: getMarket,
    },
  };
};
