import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../slices/usersSlice.js";
import { setUser,resetUser } from "../slices/userDetail.js";

import Modal from "./Modal.jsx";
import ModelDel from "./ModelDel.jsx";

function UserTable() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const handleEditClick = (user) => {
    dispatch(setUser(user));
    setIsModalOpen(true);
  };
  const handleDelClick=(user)=>{
    dispatch(setUser(user))
    setIsModalDelOpen(true)
  }
  const users = useSelector((state) => state.users.users);
  //  TODO: use redux to store users
  // TODO: use modal to edit user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/getAllUser"
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(setUsers(data.allUser));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [isChange]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsChange={() => setIsChange(!isChange)}
      />
      <ModelDel isOpen = {isModalDelOpen} setIsChange={()=>setIsChange(!isChange)} onClose={()=>setIsModalDelOpen(false)} />
      <div className="overflow-x-auto">
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
                  <td className="px-6 py-4 border-b">{user.customer_age}</td>
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
                    <button className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 active:bg-red-500" onClick={()=>handleDelClick(user)}>
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
