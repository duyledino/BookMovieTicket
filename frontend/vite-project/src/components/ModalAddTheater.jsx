import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModelVerify from "./ModelVerify";
import { addToast } from "../slices/toastSlice";
import axios from "axios";

const theaterTypes = [
  {
    type: "Thường",
  },
  {
    type: "VIP",
  },
];

const ModalAddTheater = ({ isOpen, onClose, setIsChange }) => {
  if (!isOpen) {
    return null;
  }
  const [theaterName, setTheaterName] = useState("");
  const [theaterType, setTheaterType] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useDispatch();
  const onCreate = async () => {
    if (theaterName === "" || theaterType === "") {
      dispatch(addToast({ message: "Info is missing.", type: "failed" }));
      return;
    }
    console.log("theater_name, theater_type",theaterName, theaterType);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/theater/createATheater`,
        {
          theater_name: theaterName,
          theater_type: theaterType,
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
            <h2 className="text-xl font-bold">Thêm Rạp Phim</h2>
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
              <label htmlFor="Name" className="text-xl w-[35%]">
                Đặt Tên Rạp{" "}
              </label>
              <input
                onChange={(e) => setTheaterName(e.target.value)}
                type="text"
                value={theaterName}
                id="Name"
                className={`w-full p-2 ring rounded-xs border-none outline-0  bg-white transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer`}
              />
              {/* <input
              type="text"
              name=""
              value={customer_id}
              readOnly
              id="ID"
              className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
            /> */}
            </div>

            <div className="flex items-center gap-3 w-full">
              <label htmlFor="Age" className="text-xl w-[35%]">
                Tong ghe{" "}
              </label>
              <input
                type="text"
                value={30}
                id="Age"
                className=" w-full p-2 ring rounded-xs border-none outline-0 bg-gray-300 transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer"
                readOnly={true}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="type" className="text-xl w-[35%]">
                Loại Rạp{" "}
              </label>
              <select
                id="type"
                value={theaterType}
                onChange={(e) => setTheaterType(e.target.value)}
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              >
                <option value="">Chọn Loại Rạp nào</option>
                {theaterTypes.map((type, index) => (
                  <option key={index} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
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

export default ModalAddTheater;
