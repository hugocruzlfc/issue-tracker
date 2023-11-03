import { useEffect, useRef } from "react";

export function useScrollToBottomAction(
  container: HTMLElement | Document,
  callback: () => void,
  offset = 0
) {
  const callbackRef = useRef(callback);

  console.log("first");

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer =
        container instanceof Element ? container : document.scrollingElement!;
      if (
        scrollContainer?.scrollTop + scrollContainer?.clientHeight >=
        scrollContainer?.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [container, offset]);
}
