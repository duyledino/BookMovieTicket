import axios from "axios";
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import { getAgeUser } from "../utils/getFormatUser.js";
import { DateTime } from "luxon";
import { fixFormatDate } from "../utils/getFormatDateNow.js";
function ModalEditUser({ isOpen, onClose, setIsChange }) {
  if (!isOpen) return null;
  const user = useSelector((state) => state.userDetail.user);
  if (!user) return;
  const { customer_id, customer_name, DateOfBirth, username, isAdmin } = user;
  const [name, setName] = useState(customer_name);
  const [usernameState, setUsernameState] = useState(username);
  const [admin, setAdmin] = useState(isAdmin);
  const [dob,setDob] = useState(DateOfBirth);
  const dispatch = useDispatch();
  const handleSubmit = async (
    e,
    customer_id,
    name,
    age,
    usernameState,
    admin
  ) => {
    e.preventDefault();
    if (!name || !age || !usernameState) {
      // console.error("");
      dispatch(addToast({message:'Chưa nhập đủ thông tin',type:'error'}));
      return;
    }
    console.log(age);
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/user/updateUser/${customer_id}`,
      {
        username: usernameState,
        dob: fixFormatDate(age),
        customer_name: name,
        customer_age: age,
        isAdmin: admin,
      }
      ,{withCredentials:true}
    );
    if (res.status === 200) {
      setIsChange();
      dispatch(addToast({message:'Edit successfully',type:'success'}));
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Sửa thông tin{" "}
            {
              <span className="bg-clip-text text-transparent bg-linear-90 from-gray-950 to-blue-600">
                {username}
              </span>
            }
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form
          className="flex w-full flex-col gap-1.5"
          onSubmit={(e) =>
            handleSubmit(e, customer_id, name, dob, usernameState, admin)
          }
        >
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="ID" className="text-xl w-[27%]">
              ID{" "}
            </label>
            <input
              type="text"
              name=""
              value={customer_id}
              readOnly
              id="ID"
              className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="name" className="text-xl w-[27%]">
              Name{" "}
            </label>
            <input
              type="text"
              value={name}
              id="name"
              className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="Age" className="text-xl w-[27%]">
              {"MM/dd/yyyy"}
            </label>
            <input
              type="date"
               value={new Date(dob).toISOString().split("T")[0]} 
              id="dob"
              className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="username" className="text-xl w-[27%]">
              Username{" "}
            </label>
            <input
              type="text"
              value={usernameState}
              id="username"
              className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              onChange={(e) => setUsernameState(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="ADMIN" className="text-xl w-[20%]">
              Admin{" "}
            </label>
            <input
              type="checkbox"
              checked={admin}
              id="ADMIN"
              className=" w-fit p-2 border-none  transition-all"
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </div>
          <input
            type="submit"
            value="Xác nhận sửa"
            className="p-4 cursor-pointer bg-amber-600 self-center text-xl text-white rounded-[10px]"
          />
        </form>
      </div>
    </div>
  );
}

export default ModalEditUser;
