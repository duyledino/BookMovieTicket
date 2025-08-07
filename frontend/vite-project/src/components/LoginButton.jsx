import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ModalSelectLogin from "./ModalSelectLogin";
import Loading from "./Loading";

function LoginButton({ user }) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {loading ? <Loading /> : ""}
      <Link
        className={`lg:flex hidden items-center justify-between bg-transparent p-2.5 gap-2 relative`}
        to={user ? "/" : `Login`}
        onMouseLeave={user ? () => setIsOpen(false) : ""}
        onMouseEnter={user ? () => setIsOpen(true) : ""}
      >
        <FaUser className="text-white text-xl" />
        <h3 className="text-white text-xl uppercase">
          {user ? user.username : "Dang Nhap"}
        </h3>
        <ModalSelectLogin
          setLoading={setLoading}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
        />
      </Link>
    </>
  );
}

export default LoginButton;
