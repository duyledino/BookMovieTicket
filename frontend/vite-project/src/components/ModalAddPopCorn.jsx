import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../slices/toastSlice";
import axios from "axios";
import ModelVerify from "./ModelVerify";
import { convertToBase64 } from "../utils/converToBase64";

const ModalAddPopCorn = ({ isOpen, onClose, setIsChange }) => {
  if (!isOpen) {
    return null;
  }
  const [popCornName, setPopCornName] = useState("");
  const [image, setImage] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const handleUpload = async (file) => {
    const base64 = await convertToBase64(file);
    setImage(base64);
    console.log("base64: ", base64);
  };
  const onCreate = async () => {
    console.log("popCornName,image,price: ", popCornName, image, price);
    if (popCornName === "" || image === null || price === "") {
      dispatch(addToast({ message: "Info is missing.", type: "failed" }));
      return;
    }
    console.log(
      "popCornName, file, price: ",
      popCornName,
      image,
      Number(price)
    );
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/popCorn/createAPopCorn`,
        {
          name: popCornName,
          price: price,
          file: image,
        },
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      dispatch(
        addToast({ message: error.response?.data?.Message, type: "failed" })
      );
    }
  };
  return (
    <>
      <ModelVerify
        isOpen={openModel}
        onCloseModal={() => {
          setOpenModel(false);
        }}
        onClose={() => onClose()}
        onCreate={onCreate}
        setIsChange={setIsChange}
      />
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Thêm Bắp Nước</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form
            className="flex w-full flex-col gap-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              setOpenModel(true);
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="Name" className="text-sm w-[35%]">
                Đặt Tên Bắp Nước{" "}
              </label>
              <input
                onChange={(e) => setPopCornName(e.target.value)}
                type="text"
                value={popCornName}
                id="Name"
                className={`w-full p-2 ring rounded-xs border-none outline-0  bg-white transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer`}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="Name" className="text-sm w-[35%]">
                Giá Bắp Nước{" "}
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                value={price}
                id="Name"
                className={`w-full p-2 ring rounded-xs border-none outline-0  bg-white transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer`}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="image" className="text-sm w-[35%]">
                Hình ảnh Bắp Nước{" "}
              </label>
              <input
                onChange={(e) => handleUpload(e.target.files[0])}
                accept=".jpg, .png, .jpeg"
                type="file"
                required
                id="image"
                className={`w-full p-2 ring rounded-xs border-none outline-0  bg-white transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer`}
              />
            </div>
            <input
              type="submit"
              value="Xác nhận Them"
              className="p-4 cursor-pointer bg-amber-600 self-center text-xl text-white rounded-[10px]"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalAddPopCorn;
