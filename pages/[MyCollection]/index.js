import CollectionTable from "@/Components/CollectionTable";
import EmptyRecord from "@/Components/EmptyRecord";
import GenLoader from "@/Components/GenLoader";
import Layout from "@/Components/Layout";
import { GET_COLLECTION } from "@/lib/endpoints";
import SetMyCollectionAction from "@/Store/MyCollection/SetMyCollectionAction";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyCollection = ({ loading, myCollection }) => {
  const dispatch = useDispatch();
  const myCollectionsData = useSelector(
    (state) => state.collectionn.mycollection
  );
  const userData = useSelector((state) => state.userr.user);
  const router = useRouter();

  useEffect(() => {
    myCollection && dispatch(SetMyCollectionAction.action(myCollection));
  }, []);

  if (loading) return <GenLoader />;

  if (myCollectionsData?.length === 0)
    return (
      <EmptyRecord
        title={"No Collections"}
        subtext={"you can add collections from details sections any time"}
      />
    );

  return (
    <Layout>
      <Head>
        <title>My Collection</title>
        <meta name="description" content="Movie Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
