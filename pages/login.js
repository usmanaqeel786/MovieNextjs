import Layout from "@/Components/Layout";
import { CREATE_USER } from "@/lib/endpoints";
import SetUserAction from "@/Store/User/SetUserAction";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-nextjs-toast";
import { useDispatch } from "react-redux";

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");

  const handleOnConfirm = async () => {
    if (password === "" || number === "") {
      toast.notify("All fields are required", { type: "error" });
    } else {
      await fetch(CREATE_USER + `?number=${number}`, {
        method: "GET",
      }).then((response) =>
        response.json().then((response) => {
          if (response.status === 200) {
            if (response.data.password !== password) {
              toast.notify("Invalid Credentials", { type: "error" });
            } else {
              dispatch(SetUserAction.action(response.data));
              toast.notify("Logged In", { type: "success" });
              router.push("/");
            }
          } else {
            toast.notify(response.error, { type: "error" });
          }
        })
      );
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center flex flex-col  justify-center">
        <ChevronLeftIcon
          className="h-12  m-5 hover:text-gray-100 cursor-pointer bg-amber-600 hover:bg-cyan-700 transition rounded-full shadow-xl "
          onClick={() => {
            router.back();
          }}
        />
        <p className="text-sm font-normal text-gray-500">
          Please login to continue
        </p>
        <input
          type="number"
          className="form-input bg-transparent rounded m-4 mb-0 text-gray-100 border-cyan-800"
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => {
            setnumber(e.target.value);
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
      </div>
    </Layout>
  );
};

export default login;
