import React from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const ModelDel = ({ isOpen, onClose, onDelete, entityID, setIsChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const handleDel = async () => {
    if (!entityID) console.log("ID is missing.");
    try {
      const res = await onDelete(entityID);
      if (res.status === 200) {
        console.log(res);
        dispatch(addToast({ message: res.data.Message, type: "success" }));
        onClose();
        setIsChange();
        if(location.pathname.includes("Movies")){
          //important: this is reload the page :)
          // window.location.href = "/Movies";
          //important: replace the old state with the new state so react can re-render the old component 
          //finally: the problem relate to redux state
          navigate('/admin/Movies');
        }
      }else{
        dispatch(addToast({ message: res.data?.Message, type: "failed" }));
      }
    } catch (error) {
      console.error("Error: ", error);
        dispatch(addToast({ message: error.response?.data?.Message, type: "failed" }));
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/55  flex justify-center items-center z-50" onClick={()=>onClose()}>
        <div className="bg-white max-h-[90vh] p-6 w-[500px] rounded overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
          <div className="flex justify-center items-center flex-col gap-3">
            <h1 className="text-black font-bold text-2xl">
              {" "}
              Bạn đã chắc chắn xóa chứ{" "}
            </h1>
            <div className="flex gap-5">
              <button
                onClick={() => handleDel()}
                className="text-xl p-3 text-white bg-red-600 transition-all cursor-pointer rounded-[10px] hover:bg-red-400"
              >
                Delete
              </button>
              <button
                onClick={() => onClose()}
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

export default ModelDel;
