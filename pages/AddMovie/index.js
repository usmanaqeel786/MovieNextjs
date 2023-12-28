import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-nextjs-toast";
import { INSERT_COLLECTION_ITEM } from "@/lib/endpoints";
import { BASE_URI } from "@/lib/constants";
import { useRouter } from "next/router";

const AddMovie = () => {
  const router = useRouter();
  const [movieName, setmovieName] = useState("");
  const [publishDate, setpublishDate] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoadig, setisLoadig] = useState(false);

  const userName = useSelector((state) => state.userr.user);
  let isEdit = router.query.isEdit && router.query.isEdit === "true";
  let mName = router.query.name;
  let pDate = router.query.pDate;
  let mImg = router.query.img;

  console.log(mImg);

  useEffect(() => {
    if (isEdit) {
      setImage(mImg);
      setmovieName(mName);
      setpublishDate(pDate);
    }
  }, [router]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const feedDatainDb = async (payload) => {
    await fetch(INSERT_COLLECTION_ITEM, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const onAddMovie = () => {
    if (!movieName || !publishDate) {
      toast.notify("Missing Fields", { type: "error" });
    } else handleUpload();
  };

  const OnEditMovie = async () => {
    setisLoadig(true);
    let myCollectionPayload = {
      userNumber: userName.number,
      id: Math.floor(Math.random() * 90000) + 10000,
      title: movieName,
      createAt: publishDate,
      imgUrl: mImg,
    };
    await fetch(INSERT_COLLECTION_ITEM, {
      method: "POST",
      body: JSON.stringify(myCollectionPayload),
    });
    setisLoadig(false);
    router.replace(`/${userName.number}`);
  };

  const handleUpload = async () => {
    setisLoadig(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        let myCollectionPayload = {
          userNumber: userName.number,
          id: Math.floor(Math.random() * 90000) + 10000,
          title: movieName,
          createAt: publishDate,
          imgUrl: data.imageUrl,
        };
        feedDatainDb(myCollectionPayload);
        setisLoadig(false);
        router.replace(`/${userName.number}`);
      } else {
        setisLoadig(false);
        toast.notify(data.error, { type: "error" });
      }
    } catch (error) {
      setisLoadig(false);
      toast.notify("Error uploading image:" + error, { type: "error" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-[80vh]">
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3 space-y-5">
            <div
              className="relative h-72 rounded-lg 
              overflow-hidden
              border-dashed border-2 border-gray-100 
              bg-white/10 flex justify-center items-center"
            >
              {!image ? (
                <div className="absolute">
                  <div className="flex flex-col items-center">
                    <span className="block text-gray-400 font-normal">
                      Upload your image here
                    </span>
                  </div>
                </div>
              ) : (
                <img src={image} className="object-cover h-72" />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="h-full w-full z-30 opacity-0"
                name=""
              />
            </div>
            <input
              type="text"
              className="form-input 
              bg-transparent w-full
              rounded  
            text-gray-100 
            border-cyan-800"
              placeholder="Enter movie name"
              value={movieName}
              onChange={(e) => {
                setmovieName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-input 
              bg-transparent w-full
              rounded  
            text-gray-100 
            border-cyan-800"
              placeholder="Publisher Date"
              value={publishDate}
              onChange={(e) => {
                setpublishDate(e.target.value);
              }}
            />
            <button
              disabled={isLoadig}
              className="p-5 border-white/50 
            border 
            cursor-pointer
            rounded-lg 
            bg-gray-700"
              onClick={isEdit ? OnEditMovie : onAddMovie}
            >
              {isLoadig
                ? "Please Wait ...."
                : isEdit
                ? "Edit Movie"
                : "Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
