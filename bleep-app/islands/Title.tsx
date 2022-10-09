import { useState, useEffect } from "preact/hooks";

export default function Title() {
  const [title, setTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [titleWait, setTitleWait] = useState(0);
  const [direction, setDirection] = useState(1);
  // 1 is writing, 0 is waiting, -1 is deleting

  const titleTickMs = 75;
  const titlePauseMs = 1500;

  const titles = ["hate speech", "racism", "sexism", "homophobia"];

  function changeTitle() {
    if (direction == 0) {
      if (titleWait < titlePauseMs / titleTickMs) {
        setTitleWait(titleWait + 1);
      } else {
        setDirection(-1);
        setTitleWait(0);
      }
    } else {
      if (direction == -1 && title.length == 0) {
        setDirection(1);
        if (titleIndex == titles.length - 1) {
          setTitleIndex(0);
        } else {
          setTitleIndex(titleIndex + 1);
        }
      }
      if (direction == 1 && letterIndex > titles[titleIndex].length) {
        setDirection(0);
      } else {
        setTitle(titles[titleIndex].substring(0, letterIndex));
        setLetterIndex(letterIndex + direction);
      }
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      changeTitle();
    }, titleTickMs);
    return () => clearInterval(timerId);
  });
  return (<span className="bg-red-500 text-white">{title}</span>);
}
