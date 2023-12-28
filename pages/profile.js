import Layout from "@/Components/Layout";
import { Accordion } from "@/Containers/Accordian";
import { ContentPlaceholder } from "@/Containers/Accordian/ContentPlaceholder";
import SetUserAction from "@/Store/User/SetUserAction";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DUMMY = [
  {
    title: "Haseeb",
    content: "haseeb manzoor",
  },
  { title: "Sameer", content: "Sameer Volua" },
];

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.userr.user);
  const handleLogout = async () => {
    await dispatch(SetUserAction.action(null));
    await router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center flex flex-col space-y-10 justify-center">
        <h1 className="text-xl font-bold text-gray-300">
          Hi , {userData?.name}
        </h1>
        <Image
          src={"https://cdn-icons-png.flaticon.com/512/1177/1177568.png"}
          width={200}
          height={200}
        />
        <button
          className="bg-cyan-700 p-2 px-5 rounded-md shadow-lg cursor-pointer hover:bg-cyan-800 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Profile;
