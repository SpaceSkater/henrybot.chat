import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMessages } from "../context/MessagesContext";

function DeleteDialog({ children }) {
  const { setMessages } = useMessages();
  const [isAlertShow, setIsAlertShow] = useState(false);

  return (
    <AlertDialog.Root open={isAlertShow} onOpenChange={setIsAlertShow}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AnimatePresence>
        {isAlertShow && (
          <AlertDialog.Portal forceMount>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertDialog.Content className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md bg-zinc-200 p-4 shadow-xl dark:bg-zinc-800">
                <AlertDialog.Title className="text-xl font-semibold dark:text-zinc-200">
                  Are you sure to clear the conversation??
                </AlertDialog.Title>
                <AlertDialog.Description className="mb-4 mt-4 space-y-2 rounded-md bg-zinc-300 px-2 py-2 text-sm font-semibold text-red-700 dark:bg-zinc-700 dark:text-red-400">
                  You can start a new dialogue after clearing it.
                </AlertDialog.Description>
                <div className="flex justify-end gap-4">
                  <AlertDialog.Action asChild>
                    <button
                      className="rounded-md bg-green-300 px-4 py-1 font-semibold text-green-700 hover:bg-green-400 focus:outline-none focus:ring focus:ring-zinc-400"
                      onClick={() => {
                        setMessages([
                          {
                            role: "system",
                            content:
                              "You are a helpful assistant.And your name is HenryBot",
                          },
                        ]);
                      }}
                    >
                      Confirm
                    </button>
                  </AlertDialog.Action>
                  <AlertDialog.Cancel asChild>
                    <button className="rounded-md bg-red-300 px-4 py-1 font-semibold text-red-700 hover:bg-red-400 focus:outline-none focus:ring focus:ring-zinc-400">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                </div>
              </AlertDialog.Content>
            </motion.div>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}

export default DeleteDialog;
