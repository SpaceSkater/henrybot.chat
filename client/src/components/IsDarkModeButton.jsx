import { TbMoonFilled } from "react-icons/tb";
import { TbSunFilled } from "react-icons/tb";
import { useDarkMode } from "../context/DarkModeContext";

<TbSunFilled />;

function IsDarkModeButton() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <>
      {isDark ? (
        <div className="fixed right-0 m-1 text-zinc-500 hover:text-zinc-800">
          <button onClick={toggleDarkMode}>
            <TbMoonFilled />
          </button>
        </div>
      ) : (
        <div className="fixed right-0 m-1 text-zinc-500 hover:text-zinc-800">
          <button onClick={toggleDarkMode}>
            <TbSunFilled />
          </button>
        </div>
      )}
    </>
  );
}

export default IsDarkModeButton;
