import React, {useEffect, useRef, useState} from 'react';

const Timer = () => {
    const [start, setStart] = useState(true);


    const [time, setTime] = useState(60);

    useEffect(() => {
        if (start) {
            let timer = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(timer);
                        setStart(false);
                        return 0;
                    } else return time - 1;
                });
            }, 100);
        }

    }, [start]);

    const timer = () => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${minutes}:${seconds}`
    }


    return (
        <div className="code-again">
            {time === 0 ?
                <span className="span-again" onClick={() => {setStart(true)
                    setTime(60)}}>Wll send the code again.</span> :
                <span className="span-timer">{timer()}</span>}
        </div>
    );
};

export default Timer;
