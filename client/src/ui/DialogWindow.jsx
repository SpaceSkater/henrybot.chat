import { useEffect, useRef } from "react";
import { useMessages } from "../context/MessagesContext";
import { useToImage } from "../context/ToImageContext";
import { TbX } from "react-icons/tb";

import DialogMarkdown from "./DialogMarkdown";

function DialogWindow() {
  const { messages, setMessages } = useMessages();
  const { imageRef } = useToImage();

  const scrollRef = useRef(null);

  function handleDeleteMessage(e, index) {
    e.preventDefault();

    setMessages((prevMessages) => {
      return prevMessages.filter((message, i) => i !== index);
    });
  }

  // 默认滚动条在底部
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="h-[640px] overflow-y-scroll rounded-lg bg-zinc-50 dark:bg-zinc-900 sm:h-[560px]"
    >
      <div
        className="bg-zinc-50 py-2 shadow-inner dark:bg-zinc-900"
        ref={imageRef}
      >
        {messages.map((chat, index) => (
          <div key={index}>
            <div
              className={`m-4 flex ${chat.role === "user" ? "flex-row-reverse justify-start" : "justify-start"} gap-2 ${chat.role === "system" ? "hidden" : ""}`}
            >
              <div
                className={`rounded-full ${chat.role === "user" ? "bg-blue-700" : "bg-zinc-500"} mt-2 flex h-6 w-6 items-center justify-center`}
              >
                <div className={`flex w-6 items-center justify-center`}>
                  <TbX
                    className={`hover:text-zinc-200 ${chat.role === "user" ? "text-blue-700 " : "text-zinc-500"}`}
                    onClick={(e) => handleDeleteMessage(e, index)}
                  />
                </div>
              </div>

              <div className="max-w-[260px] rounded-md bg-zinc-200 p-2 dark:bg-zinc-600 sm:max-w-[511px]">
                <div>
                  <DialogMarkdown textContent={chat.content} darkMode={true} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DialogWindow;
