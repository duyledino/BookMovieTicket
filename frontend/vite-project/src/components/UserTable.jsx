import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../slices/usersSlice.js";
import { setUser, resetUser } from "../slices/userDetail.js";

import ModalEditUser from "./ModalEditUser.jsx";
import ModelDel from "./ModelDel.jsx";
import axios from "axios";
import ModalAddUser from "./ModalAddUser.jsx";
import { getAgeUser } from "../utils/getFormatUser.js";

function UserTable() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const handleEditClick = (user) => {
    dispatch(setUser(user));
    setIsModalOpen(true);
  };
  const handleDelClick = (user) => {
    dispatch(setUser(user));
    setIsModalDelOpen(true);
  };
  const users = useSelector((state) => state.users.users);
  //  TODO: use redux to store users
  // TODO: use modal to edit user
  const onDelete = async (entityID) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/user/deleteUser/${entityID}`,{withCredentials:true}
    );
    return res;
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/user/getAllUser`,
          { credentials: "include" }
        );
        if (response.status === 200) {
          const data = await response.json();
          dispatch(setUsers(data.allUser));
        } else if (response.status === 203) {
          dispatch(addToast({ message: res.data.Message, type: "failed" }));
          localStorage.removeItem("user");
          navigate("/404NotFound");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [isChange]);
  console.log(users);
  return (
    <>
      <ModalAddUser
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        setIsChange={setIsChange}
      />
      <ModalEditUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsChange={() => setIsChange(!isChange)}
      />
      <ModelDel
        isOpen={isModalDelOpen}
        onDelete={onDelete}
        entityID={useSelector((state) => state.userDetail.user).customer_id}
        setIsChange={() => setIsChange(!isChange)}
        onClose={() => setIsModalDelOpen(false)}
      />
      <div className="overflow-x-auto">
        <div className="min-w-full flex justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          <button
            className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
            onClick={() => setIsModalAddOpen(true)}
          >
            Them User
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-amber-500">
              <th className="px-6 py-3 border-b text-left">Customer ID</th>
              <th className="px-6 py-3 border-b text-left">Username</th>
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Age</th>
              <th className="px-6 py-3 border-b text-left">Admin Status</th>
              <th className="px-6 py-3 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr
                  key={user.customer_id}
                  className="cursor-pointer transition-all bg-gray-800 text-white hover:bg-amber-500 hover:text-black"
                >
                  <td className="px-6 py-4 border-b">{user.customer_id}</td>
                  <td className="px-6 py-4 border-b">{user.username}</td>
                  <td className="px-6 py-4 border-b">
                    {user.customer_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {getAgeUser(user.DateOfBirth)}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="px-3 py-4 border-b flex gap-2 items-center">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 active:bg-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 active:bg-red-500"
                      onClick={() => handleDelClick(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
