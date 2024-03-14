import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TbLoader, TbX } from "react-icons/tb";
import { useMessages } from "../context/MessagesContext";
import { useForm } from "react-hook-form";
import { useBalance } from "../hook/useBalance";
import toast from "react-hot-toast";

function SettingDialog({ children }) {
  const [isSettingShow, setIsSettingShow] = useState(false);

  const { chatKey, setChatKey, chatModel, setChatModel } = useMessages();
  const { balance, isFetching, clickFetch } = useBalance();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    setChatKey(data.chatKey);
    setChatModel(data.chatModel);
    localStorage.setItem("chatKey", data.chatKey);
    localStorage.setItem("chatModel", data.chatModel);
    toast.success("Saved successfully : )");
  }

  return (
    <Dialog.Root open={isSettingShow} onOpenChange={setIsSettingShow}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <AnimatePresence>
        {isSettingShow && (
          <Dialog.Portal forceMount>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dialog.Content className=" fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md bg-zinc-200 p-4 shadow-xl dark:bg-zinc-800">
                <Dialog.Title className="flex justify-between">
                  <div className=" text-xl font-semibold dark:text-zinc-200">
                    Setting
                  </div>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-2 hover:bg-zinc-300 focus:bg-zinc-300 focus:outline-none focus:ring focus:ring-zinc-400 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700">
                      <TbX size="1rem" />
                    </button>
                  </Dialog.Close>
                </Dialog.Title>

                <div className="flex flex-col gap-4">
                  <div className=" space-y-2 py-2 dark:text-zinc-200">
                    <div className="flex flex-col">
                      <label className=" font-semibold text-zinc-500 dark:text-zinc-300">
                        Model selection
                      </label>
                      <select
                        className="rounded-md bg-zinc-300 p-2 focus:outline-none focus:ring focus:ring-zinc-400 dark:bg-zinc-700"
                        defaultValue={chatModel}
                        {...register("chatModel")}
                      >
                        <option value="gpt-3.5-turbo">GPT-3.5</option>
                        <option value="gpt-4-0613">GPT-4.0</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="font-semibold text-zinc-500 dark:text-zinc-300">
                        Chat-Key
                      </label>
                      <input
                        type="password"
                        className="rounded-md bg-zinc-300 p-2 focus:outline-none focus:ring focus:ring-zinc-400 dark:bg-zinc-700"
                        defaultValue={chatKey}
                        {...register("chatKey")}
                      />
                    </div>

                    <div className="flex flex-col ">
                      <label className="font-semibold text-zinc-500 dark:text-zinc-300">
                        Balance inquiry
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="rounded-md bg-zinc-300 p-2 focus:outline-none focus:ring focus:ring-zinc-400 dark:bg-zinc-700"
                          value={balance}
                          disabled={true}
                        />
                        <button
                          className="flex w-16 items-center justify-center  rounded-md bg-green-300 py-1 font-semibold text-green-700 hover:bg-green-400 focus:outline-none focus:ring focus:ring-zinc-400 sm:px-4 sm:text-base"
                          onClick={clickFetch}
                        >
                          {isFetching ? (
                            <TbLoader size="1.5rem" className="animate-spin" />
                          ) : (
                            "Query"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Dialog.Close asChild>
                      <button
                        className="rounded-md bg-blue-300 px-4 py-1 font-semibold text-blue-700 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-zinc-400"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Save Settings
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default SettingDialog;
