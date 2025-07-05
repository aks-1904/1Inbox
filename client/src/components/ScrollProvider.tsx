import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useAppDispatch } from "../redux/store";
import { setEmails } from "../redux/slice/emailSlice";

type Props = {
  children: React.ReactNode;
};

const ScrollProvider: React.FC<Props> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current!,
      smooth: true,
      lerp: 0.08,
    });

    scroll?.update();

    return () => {
      scroll.destroy(); // cleanup
    };
  }, [useAppDispatch, setEmails]);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default ScrollProvider;
