import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
function ModalAddUser({ isOpen, onClose, setIsChange }) {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [usernameState, setUsernameState] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("123456789");
  const [errors, setErrors] = useState([]);
  const handleAge = (e) => {
    const age = e.target.value;
    setAge(age);
    if (age === "0") {
      dispatch(addToast({ message: "Tuoi phai lon hon 0", type: "failed" }));
      setErrors((old) => [...old, "age"]);
      return;
    }
    if (age === "") {
      dispatch(addToast({ message: "Tuoi khong duoc trong", type: "failed" }));
      setErrors((old) => [...old, "age"]);
      return;
    }
    if (isNaN(age)) {
      dispatch(addToast({ message: "Tuoi phai la so", type: "failed" }));
      setErrors((old) => [...old, "age"]);
      return;
    }
    setErrors((old) => old.filter((o) => o !== "age"));
  };
  const handleUserName = (e) => {
    const name = e.target.value;
    setUsernameState(name);
    if (name === "") {
      dispatch(
        addToast({ message: "Username khong duoc trong", type: "failed" })
      );
      setErrors((old) => [...old, "username"]);
      return;
    }
    setErrors((old) => old.filter((o) => o !== "username"));
  };
  const handlePassword = (e) => {
    const password = e.target.values;
    setPassword(password);
    if (password === "") {
      dispatch(
        addToast({ message: "Password khong duoc trong", type: "failed" })
      );
      setErrors((old) => [...old, "password"]);
      return;
    }
    setErrors((old) => old.filter((o) => o !== "password"));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password,age,usernameState);
    if (!password || !age || !usernameState) {
      dispatch(addToast({ message: "Chưa nhập đủ thông tin", type: "error" }));
      return;
    }
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/createUser`,
      {
        username: usernameState,
        customer_name: name,
        customer_age: Number(age),
        password: password,
      }
    );
    console.log(res.data);
    if (res.status === 200) {
      setIsChange();
      dispatch(addToast({ message: "Tao User Thanh Cong", type: "success" }));
      onClose();
    } else {
      dispatch(addToast({ message: res.data.Message, type: "error" }));
    }
  };
  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Tao User{" "}
            {
              <span className="bg-clip-text text-transparent bg-linear-90 from-yellow-700 to-blue-600">
                {usernameState}
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
            handleSubmit(e)
          }
        >
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="name" className="text-xl w-[27%]">
              Name{" "}
            </label>
            <input
              type="text"
              value={name}
              id="name"
              className={` w-full p-2  rounded-xs border-none outline-0 ring transition-all focus:ring-blue-600 focus:ring-3`}
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
              className={` w-full p-2 ring rounded-xs border-none outline-0 transition-all ${
                errors.length > 0 && errors.find((err) => err === "age")
                  ? "ring-red-500"
                  : " focus:ring-blue-600 focus:ring-3"
              } `}
              onChange={handleAge}
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
              className={` w-full p-2 ring rounded-xs border-none outline-0 transition-all ${
                errors.length > 0 && errors.find((err) => err === "username")
                  ? "ring-red-500"
                  : " focus:ring-blue-600 focus:ring-3"
              }`}
              onChange={handleUserName}
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <label htmlFor="password" className="text-xl w-[27%]">
              Password{" "}
            </label>
            <input
              type="text"
              value={password}
              id="password"
              className={` w-full p-2 ring rounded-xs border-none outline-0 transition-all ${
                errors.length > 0 && errors.find((err) => err === "password")
                  ? "ring-red-500"
                  : " focus:ring-blue-600 focus:ring-3"
              }`}
              onChange={handlePassword}
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

export default ModalAddUser;
