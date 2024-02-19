import { createContext, useContext, useState } from "react";

const messagesContext = createContext();

function MessagesProvider({ children }) {
  const [chatKey, setChatKey] = useState(localStorage.getItem("chatKey"));
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.And your name is HenryBot",
    },
  ]);

  return (
    <messagesContext.Provider
      value={{
        chatKey,
        setChatKey,
        messages,
        setMessages,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </messagesContext.Provider>
  );
}

function useMessages() {
  const context = useContext(messagesContext);

  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { MessagesProvider, useMessages };
