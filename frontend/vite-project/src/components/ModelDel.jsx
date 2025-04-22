import axios from "axios";
import React from "react";
import {useSelector} from 'react-redux'

const ModelDel = ({ isOpen, onClose,setIsChange }) => {
  if (!isOpen) return null;
  const user = useSelector((state)=>state.userDetail.user)
  const {customer_id} = user;
  const handleDelete = async (customer_id)=>{
    if(!customer_id) console.error("Khong tim thay ID nay");
    const res = await axios.delete(`http://localhost:8000/api/v1/user/deleteUser/${customer_id}`);
    if(res.status === 200) {
        setIsChange();
        onClose();
    }
    return; 
  }
  return (
    <>
      <div className="fixed inset-0 bg-black/55  flex justify-center items-center z-50" onClick={()=>onClose()}>
        <div className="bg-white max-h-[90vh] p-6 w-[500px] rounded overflow-y-auto">
          <div className="flex justify-center items-center flex-col gap-3">
            <h1 className="text-black font-bold text-2xl">
              {" "}
              Bạn đã chắc chắn xóa chứ{" "}
            </h1>
            <div className="flex gap-5">
              <button onClick={()=>handleDelete(customer_id)} 
              className="text-xl p-3 text-white bg-red-600 transition-all cursor-pointer rounded-[10px] hover:bg-red-400">
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
