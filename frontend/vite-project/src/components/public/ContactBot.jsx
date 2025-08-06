import React from "react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import botHead from "../../images/botHead.png";
import userChat from "../../images/userIcon.png";
import { useRef } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

function ContactBot() {
  const [isHover, setIsHover] = useState(false);
  const chatRef = useRef();
  const [chat, setChat] = useState([]);
  const [say, setSay] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const socketRef = useRef(null);
  console.log(chat);
  useEffect(() => {
    console.log("in websocket");
    socketRef.current = new WebSocket("ws://localhost:8001/ws");
    socketRef.current.onopen = () => {
      console.log(console.log("✅ WebSocket connected"));
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, data.content, data.server, data?.server?.kwargs?.content);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: data?.server?.kwargs?.content
            ? data?.server?.kwargs?.content
            : data.server,
        },
      ]);
    };
    socketRef.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };
    return () => {
      socketRef.current.close();
    };
  }, []);
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(say);
    if (say === "") return;
    setChat((prev) => [...prev, { role: "user", text: say }]);
    sendMessage(say);
    setSay("");
  };
  const sendMessage = (text) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(text);
    }
  };
  const openChat = () => {
    setAnimate(true);
    setIsOpen(true);
  };
  const closeChat = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  console.log(isOpen);
  return (
    <>
      <div className="fixed z-50 bottom-6 right-6">
        {isOpen && (
          <div
            className={`relative ${animate ? "chatAppear" : "chatDisappear"}`}
          >
            <div className="absolute flex flex-col z-20 bottom-[-10px] right-[50px] w-80 h-[450px] bg-black/40 backdrop-blur-2xl">
              <header className="w-full flex items-center justify-between gap-2 bg-black h-[45px] px-1">
                <div className="h-full w-14 flex justify-between items-center bg-white">
                  <img
                    src={botHead}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="h-fit text-yellow-300 text-2xl">
                  Bot Hào Quang
                </h2>
                <FaX
                  className="justify-self-end w-fit h-5 text-red-500 cursor-pointer"
                  onClick={() => closeChat()}
                />
              </header>
              <main className="h-[380px] w-full flex flex-col gap-1 pt-3 px-1 overflow-y-auto">
                {chat.length > 0
                  ? chat.map((c) => (
                      <>
                        <div
                          className="flex flex-col gap-1 w-full"
                          ref={chatRef}
                          key={uuid().slice(0, 8)}
                        >
                          <div
                            className={`w-8 h-8 rounded-[50%] bg-white p-0.5 ${
                              c.role === "user" ? "self-end" : ""
                            }`}
                          >
                            <img
                              src={c.role === "user" ? userChat : botHead}
                              alt=""
                              className="w-full h-full "
                            />
                          </div>
                          <p
                            className={`bg-white w-fit max-w-[70%] p-3 ${
                              c.role === "user" ? "self-end mr-2" : "ml-2"
                            } text-[12px] rounded-3xl whitespace-pre-line`}
                          >
                            {`${c.text}`}
                          </p>
                        </div>
                      </>
                    ))
                  : ""}
                {/* <div className="flex flex-col gap-1 w-full">
                <div className="w-8 h-8 rounded-[50%] bg-white p-0.5">
                  <img src={botHead} alt="" className="w-full h-full " />
                </div>
                <p
                  className={`bg-white w-fit max-w-[70%] p-3 ml-2 text-[12px] rounded-3xl`}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Architecto aperiam ducimus nostrum pariatur, quasi dolore quam
                  vero impedit accusantium quod aliquam, deserunt aliquid
                  voluptas commodi, culpa facilis consequatur quo nulla libero
                  assumenda ipsa. Veritatis ratione cum perferendis fugiat culpa
                  assumenda?
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="w-8 h-8 rounded-[50%] bg-white p-0.5 self-end">
                  <img src={userChat} alt="" className="w-full h-full " />
                </div>
                <p
                  className={`bg-white w-fit max-w-[70%] p-3 mr-2 text-[12px] rounded-3xl self-end`}
                >
                  Lorem ipsum{" "}
                </p>
              </div> */}
              </main>
              <div className="w-full h-[50px] bg-black outline-none ">
                <form
                  className="w-full h-full flex p-1.5 justify-between items-center"
                  onSubmit={onSubmit}
                >
                  <input
                    type="text"
                    placeholder="Nhắn gì đi"
                    className="placeholder:text-white w-[85%] text-white rounded-2xl p-1.5 outline-none ring-2"
                    value={say}
                    onChange={(e) => setSay(e.target.value)}
                  />
                  <button className="w-[15%] flex justify-center items-center">
                    <FaPaperPlane className="text-white text-2xl cursor-pointer" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={` ${
            isHover ? "hardShakeAnimation" : "lightShakeAnimation"
          }  w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 cursor-pointer `}
          onClick={() => (isOpen === true ? closeChat() : openChat())}
        >
          <FaRobot size={24} />
        </div>
      </div>
    </>
  );
}

export default ContactBot;
