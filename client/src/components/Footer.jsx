function Footer() {
  return (
    <footer className="absolute bottom-0 w-full pb-1 text-center text-sm text-zinc-500 sm:text-base">
      <div className="flex items-center justify-center gap-2 dark:text-zinc-700">
        <p>© Copyright {new Date().getFullYear()} </p>

        <a
          href="https://henrybot.chat"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Henrybot.Chat
        </a>

        <p>· All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
