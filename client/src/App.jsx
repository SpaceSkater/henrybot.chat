import { MessagesProvider } from "./context/MessagesContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToImageProvider } from "./context/ToImageContext";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import ChatHeader from "./ui/ChatHeader";
import DialogWindow from "./ui/DialogWindow";
import InputBar from "./ui/InputBar";
import Footer from "./ui/Footer";
import IsDarkModeButton from "./ui/IsDarkModeButton";

function App() {
  return (
    <MessagesProvider>
      <Analytics />
      <DarkModeProvider>
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#fafafa",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#fafafa",
              },
            },
          }}
        />

        <IsDarkModeButton />

        <div className="flex h-screen justify-center p-4">
          <div className="grid w-[360px] grid-rows-[auto_1fr_auto] gap-2 rounded-xl bg-zinc-300 p-2 shadow-xl dark:bg-zinc-700 dark:text-zinc-200 sm:w-[640px]">
            <ToImageProvider>
              <ChatHeader />
              <DialogWindow />
            </ToImageProvider>
            <InputBar />
          </div>
        </div>

        <Footer />
      </DarkModeProvider>
    </MessagesProvider>
  );
}

export default App;
