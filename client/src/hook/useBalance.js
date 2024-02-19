import { useState } from "react";
import toast from "react-hot-toast";

export function useBalance() {
  const [balance, setBalance] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const chatKey = localStorage.getItem("chatKey");

  async function clickFetch() {
    if (!chatKey) {
      toast.error("Please enter the Chat-key before querying : ( ");

      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    try {
      const res = await fetch(import.meta.env.VITE_VERCEL_GET_BALANCE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: chatKey,
        },
      });

      const data = await res.json();

      setIsFetching(false);
      setBalance(data.details.total_available);
    } catch (error) {
      setIsFetching(false);
      toast.error("Failed to query, please try again later : ( ");
    }
  }

  return { balance, isFetching, clickFetch };
}
