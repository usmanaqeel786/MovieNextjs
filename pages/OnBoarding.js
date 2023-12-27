import Layout from "@/Components/Layout";
import { CREATE_USER } from "@/lib/endpoints";
import SetUserAction from "@/Store/User/SetUserAction";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-nextjs-toast";
import { useDispatch } from "react-redux";

const OnBoarding = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");

  const handleOnConfirm = async () => {
    if (name === "" || password === "" || number === "") {
      toast.notify(`All fields are required`, { type: "error" });
    } else {
      await fetch(CREATE_USER, {
        method: "POST",
        body: JSON.stringify({ number, name, password }),
      }).then((response) =>
        response.json().then((response) => {
          if (response.status === 200) {
            router.push("/");
            toast.notify(`Registered`, { type: "success" });
            dispatch(SetUserAction.action(response.data));
          } else {
            toast.notify(`Something Went Wrong`, { type: "error" });
          }
        })
      );
    }
  };

  const handleLogin = async () => {
    router.push("/login");
  };
  const clearUserData = () => {
    setname("");
    setnumber("");
    setpassword("");
  };

  return (
    <Layout>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center flex flex-col  justify-center">
        <p className="text-sm font-normal text-gray-500">
          Please enter your details to continue
        </p>
        <input
          type="number"
          className="form-input bg-transparent focus:border-cyan-800 border-cyan-800 rounded m-4 mb-0 text-gray-100"
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => {
            setnumber(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-input bg-transparent rounded m-4 mb-0 text-gray-100 border-cyan-800"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="password"
          className="form-input bg-transparent rounded m-4 text-gray-100 border-cyan-800"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          className="bg-cyan-700 p-2 px-5 rounded-md shadow-lg cursor-pointer hover:bg-cyan-800 transition"
          onClick={handleOnConfirm}
        >
          Continue
        </button>
        <div className="w-2/4 h-0.5 m-10 mb-2 bg-gray-700 flex" />
        <p
          className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer transition select-none hover:scale-105"
          onClick={handleLogin}
        >
          Sign in using Existing Account
        </p>
      </div>
    </Layout>
  );
};

export default OnBoarding;
