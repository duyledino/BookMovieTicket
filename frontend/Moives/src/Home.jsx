import React from "react";
import Header from "./Header";
import Movies from "./Movies";

function Home() {
  return (
    <>
      <div className="bg-gray-700 w-full flex flex-col">
        <Header />
        <Movies />
      </div>
    </>
  );
}

export default Home;
