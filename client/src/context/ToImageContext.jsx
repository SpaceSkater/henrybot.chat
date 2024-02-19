import { createContext, useCallback, useContext, useRef } from "react";
import { toPng } from "html-to-image";

const toImageContext = createContext();

function ToImageProvider({ children }) {
  const imageRef = useRef(null);

  // 点击图片按钮，将对话框转换为图片
  const imageClick = useCallback(() => {
    if (imageRef.current === null) {
      return;
    }

    // 获取伪随机数
    const randomNum = Math.floor(Math.random() * 9000) + 1000;

    toPng(imageRef.current, { cacheBust: true }) // cacheBust: true 防止缓存
      .then((dataUrl) => {
        const link = document.createElement("a"); 
        link.download = `chat-with-henrybot-${randomNum}.png`; // 设置a标签的download属性
        link.href = dataUrl; // 将图片的src属性设置为生成的图片的dataUrl
        link.click(); // 模拟点击a标签
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageRef]);

  return (
    <toImageContext.Provider value={{ imageRef, imageClick }}>
      {children}
    </toImageContext.Provider>
  );
}

function useToImage() {
  const context = useContext(toImageContext);

  if (context === undefined) {
    throw new Error("useToImage must be used within a ToImageProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ToImageProvider, useToImage };
