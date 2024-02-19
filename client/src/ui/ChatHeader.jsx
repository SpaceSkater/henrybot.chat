import { useMessages } from "../context/MessagesContext";
import { useToImage } from "../context/ToImageContext";
import { useWorkTest } from "../hook/useWorkTest";

import { TbSettings } from "react-icons/tb";
import { TbEraser } from "react-icons/tb";
import { TbPhotoDown } from "react-icons/tb";

import DeleteDialog from "./DeleteDialog";
import SettingDialog from "./SettingDialog";

function ChatHeader() {
  const isWorking = useWorkTest();
  const { isTyping } = useMessages();
  const { imageClick } = useToImage();

  return (
    <div className="rounded-lg bg-zinc-50 shadow-inner dark:bg-zinc-900">
      <div>
        <div className=" flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <span
              className={`mb-[1px] h-3 w-3 rounded-full ${isWorking ? "bg-green-600" : "bg-red-600"} `}
            ></span>
            <div className="font-semibold text-zinc-400">HenryBot</div>
            {isTyping && (
              <div className="animate-bounce text-xs text-zinc-400">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <button>
              <TbPhotoDown
                size="1.5rem"
                className="hover:text-zinc-800 dark:hover:text-zinc-200"
                onClick={imageClick}
              />
            </button>

            <DeleteDialog>
              <button>
                <TbEraser
                  size="1.5rem"
                  className="hover:text-zinc-800 dark:hover:text-zinc-200"
                />
              </button>
            </DeleteDialog>

            <SettingDialog>
              <button>
                <TbSettings
                  size="1.5rem"
                  className="hover:text-zinc-800 dark:hover:text-zinc-200"
                />
              </button>
            </SettingDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
