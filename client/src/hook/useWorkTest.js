import { useEffect, useState } from "react";

export function useWorkTest() {
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    function fetchTestWork() {
      fetch(import.meta.env.VITE_VERCEL_IS_WORK)
        .then((res) => {
          if (res.status === 200) {
            setIsWorking(true);
          } else {
            setIsWorking(false);
          }
        })
        .catch(() => {
          setIsWorking(false);
        });
    }

    fetchTestWork();
  }, []);

  return isWorking;
}
