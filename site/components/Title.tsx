import { time } from 'console';
import Image from 'next/image'
import { useEffect, useState } from 'react';


const Title = () => {
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
        if(direction == 0) {
            if(titleWait < titlePauseMs/titleTickMs) {
                setTitleWait(titleWait + 1);
                console.log("waiting... " + titleWait);
            } else {
                setDirection(-1);
                setTitleWait(0);
                console.log("done waiting");
            }
        } else {
            if(direction == -1 && title.length == 0) {
                setDirection(1);
                if(titleIndex == titles.length-1) {
                    setTitleIndex(0);
                } else {
                    setTitleIndex(titleIndex + 1);
                }
            }
            if(direction == 1 && letterIndex > titles[titleIndex].length) {
                setDirection(0);
                console.log("starting wait");
            } else {
                setTitle(titles[titleIndex].substring(0, letterIndex));
                setLetterIndex(letterIndex + direction);
                console.log("ticked: " + letterIndex);
            }
        }
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            changeTitle();
        }, titleTickMs);
        return () => clearInterval(timerId);
    });

    return (
        <>
            <section className="color-div w-full section-title">
                <h1 className="title">
                    <div>
                        <span className="title-text font-dark">Let&apos;s get rid of </span>
                        <span className="title-dynamic bg-red font-light" id="title-dynamic">{title}</span>
                    </div>
                    <div>
                        <span className="title-text font-dark">on the internet.</span>
                    </div>
                </h1>
            </section>
        </>
    )
}
 
export default Title;