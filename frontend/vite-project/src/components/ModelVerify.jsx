import React from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

//onClose has to specific (2 onClose: Model vs Modal)
const ModelVerify = ({
  isOpen,
  onClose,
  onCloseModal,
  onCreate,
  setIsChange,
}) => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   console.log(location.pathname.split('/'));
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const HandleVerify = async () => {
    try {
      const res = await onCreate();
      if (res.status === 200) {
        dispatch(addToast({ message: "successfully", type: "success" }));
        onClose();
        setIsChange((old) => !old);
        // navigate(`/${location.pathname.split('/')[1]}`);
      } else {
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
      }
    } catch (error) {
      console.error("Error: ", error);
      dispatch(addToast({ message: error.response?.data?.Message, type: "failed" }));
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/55  flex justify-center items-center z-51"
        onClick={() => onClose()}
      >
        <div
          className="bg-white max-h-[90vh] p-6 w-[500px] rounded overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center items-center flex-col gap-3">
            <h1 className="text-black font-bold text-2xl">
              {" "}
              Bạn đã chắc chắn thông tin này{" "}
            </h1>
            <div className="flex gap-5">
              <button
                onClick={() => HandleVerify()}
                className="text-xl p-3 text-white bg-red-600 transition-all cursor-pointer rounded-[10px] hover:bg-red-400"
              >
                Chắc chắn
              </button>
              <button
                onClick={() => onCloseModal()}
                className="text-xl p-3 text-white bg-yellow-600 transition-all cursor-pointer rounded-[10px] hover:bg-yellow-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelVerify;
