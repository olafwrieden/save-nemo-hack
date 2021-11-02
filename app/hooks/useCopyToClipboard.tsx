import { message } from "antd";
import { useCallback, useEffect, useState } from "react";

/**
 * Copies the given string to the clipboard.
 * @param {Number} resetInterval milliseconds before user is able to copy again
 */
const useCopyToClipboard = (resetInterval = 2000) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text, notify = true) => {
    if (typeof text === "string" || typeof text == "number") {
      navigator.clipboard.writeText(text.toString());
      setCopied(true);
      notify && message.success("Copied!");
    } else {
      setCopied(false);
      notify && message.error("Failed to copy to clipboard");
    }
  }, []);

  useEffect(() => {
    let timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return { isCopied, handleCopy };
};

export default useCopyToClipboard;
