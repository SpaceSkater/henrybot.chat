import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula, // 暗色
  // twilight, // 暗色主题2
  vs, //亮色主题
} from "react-syntax-highlighter/dist/esm/styles/prism";

const them = {
  dark: darcula,
  light: vs,
};

function DialogMarkdown({ textContent, darkMode }) {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line no-unused-vars
        code({ node, inline, className, children, ...props }) {
          // 通过正则匹配className
          const match = /language-(\w+)/.exec(className || "");
          // console.log(inline, match);
          return !inline && match ? (
            // 如果匹配到了相应语法，就使用SyntaxHighlighter组件
            <SyntaxHighlighter
              style={them[darkMode ? "dark" : "light"]}
              language={match[1]}
              PreTag="div"
              className="rounded-md"
              {...props}
            >
              {
                // children是代码块中的内容
                // 去除代码块末尾的多余换行符，以保持代码的整洁性
                String(children).replace(/\n$/, "")
              }
            </SyntaxHighlighter>
          ) : (
            // 如果没有匹配到，就使用code标签
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
}

export default DialogMarkdown;
