import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
function Modal({ isOpen, onClose, setIsChange }) {
  if (!isOpen) return null;
  const user = useSelector((state) => state.userDetail.user);
  if (!user) return;
  const { customer_id, customer_name, customer_age, username, isAdmin } = user;
  const [name, setName] = useState(customer_name);
  const [age, setAge] = useState(customer_age);
  const [usernameState, setUsernameState] = useState(username);
  const [admin, setAdmin] = useState(isAdmin);
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
      console.error("Chưa nhập đủ thông tin");
      return;
    }
    if (Number.isNaN(age) || age < 18) {
      console.error("Nhap sai dinh dang so");
      return;
    }
    const res = await axios.patch(
      `http://localhost:8000/api/v1/user/updateUser/${customer_id}`,
      {
        username: usernameState,
        customer_name: name,
        customer_age: age,
        isAdmin: admin,
      }
    );
    if (res.status === 200) {
      setIsChange();
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
            handleSubmit(e, customer_id, name, age, usernameState, admin)
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
              Age{" "}
            </label>
            <input
              type="text"
              value={age}
              id="Age"
              className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              onChange={(e) => setAge(e.target.value)}
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

export default Modal;
