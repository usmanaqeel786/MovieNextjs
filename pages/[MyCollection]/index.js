import CollectionTable from "@/Components/CollectionTable";
import EmptyRecord from "@/Components/EmptyRecord";
import GenLoader from "@/Components/GenLoader";
import IconLabel from "@/Components/IconLabel";
import Layout from "@/Components/Layout";
import { GET_COLLECTION } from "@/lib/endpoints";
import SetMyCollectionAction from "@/Store/MyCollection/SetMyCollectionAction";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyCollection = ({ loading, myCollection }) => {
  const dispatch = useDispatch();
  const myCollectionsData = useSelector(
    (state) => state.collectionn.mycollection
  );
  const router = useRouter();

  useEffect(() => {
    myCollection && dispatch(SetMyCollectionAction.action(myCollection));
  }, []);

  if (loading) return <GenLoader />;

  if (myCollectionsData?.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <EmptyRecord
          title={"No Movies"}
          subtext={"you can add movies from here any time"}
        />
        <div className="py-5">
          <IconLabel
            Icon={PlusCircleIcon}
            title={"Add your first movie"}
            isClick
            onClick={() => {
              router.push("/AddMovie");
            }}
          />
        </div>
      </div>
    );

  return (
    <Layout>
      <Head>
        <title>My Collection</title>
        <meta name="description" content="Movie Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-10 w-52">
        <IconLabel
          Icon={PlusCircleIcon}
          title={"Add a New Movie"}
          isClick
          onClick={() => {
            router.push("/AddMovie");
          }}
        />
      </div>
      <div className="px-4 my-10 sm:grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 3xl:flex justify-center flex-wrap">
        {myCollectionsData?.map((item, index) => (
          <CollectionTable key={index} item={item} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default MyCollection;

export const getServerSideProps = async (context) => {
  let number = context.query.MyCollection;
  const myCollection = await fetch(GET_COLLECTION + `?number=${number}`).then(
    (res) => res.json()
  );
  return {
    props: {
      myCollection: myCollection.data,
    },
  };
};
