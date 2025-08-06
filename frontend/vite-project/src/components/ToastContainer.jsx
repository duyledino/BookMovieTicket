import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../slices/toastSlice";
import { FaX } from "react-icons/fa6";

function ToastContainer() {
  const toasts = useSelector((state) => state.toasts.toasts);
  const dispatch = useDispatch();
  useEffect(() => {
    toasts.forEach((toast) => {
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 4000);
    });
  }, [toasts, dispatch]);
  return (
    <>
      <div className="fixed top-4 right-4 space-y-2 z-[99]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`relative px-4 py-2 w-48 bg-black ring-2 slideAnimation ${
              toast.type === "success" ? "ring-green-400" : "ring-red-400"
            } before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:bg-gradient-to-r before:from-blue-500 before:to-red-500 before-processAnimation flex gap-0.5 justify-between items-center`}
          >
            <div className="text-white">{toast.message}</div>
            <FaX className="text-white cursor-pointer" onClick={()=>{dispatch(removeToast(toast.id))}}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default ToastContainer;
