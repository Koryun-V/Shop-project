import React, {useRef, useState} from 'react';


const PinInput = () => {
    const [code, setCode] = useState(new Array(6).fill(""));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = Array.from({length: code.length}, (_, i) => useRef())
    const [id, setId] = useState(0)
    const [isFormat, setIsFormat] = useState(false);

    const onChange = (e, i) => {
        setIsFormat(false)
        setId(i)
        if (isNaN(e.target.value)) return false
        setCode([...code.map((data, index) => (index === i ? e.target.value : data))])
        if (e.target.value && i !== 5) {
            inputRef[i + 1].current.focus()
        }
    }


    const onKeyDown = (e, i) => {
        if (e.keyCode === 8 && i !== 0 && code[i] === "") {
            inputRef[code[5] === "" || code[i] === "" ? i - 1 : i].current.focus()
            console.log('aaa')
        }
    }

    const formatNumber = (e, i) => {
        if (isNaN(e.key)) return false

        if (code[i] !== "" && isFormat || i === 5) {
            console.log(code[0])
            setCode([...code.slice(0, i), e.key, ...code.slice(i + 1)])
            inputRef[i !== 5 ? i + 1 : i].current.focus()
        }
    }

    console.log(isFormat)
    return (

        <div className="pin-input">
            {code.map((data, i) => (
                <input
                    onKeyPress={(e) => formatNumber(e, i)}
                    onBlur={()=>setId("")}
                    onClick={() => setIsFormat(true)}
                    onFocus={() => setId(i)}
                    maxLength={1}
                    ref={inputRef[i]}
                    onChange={(e) => onChange(e, i)}
                    value={data}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    autoFocus={i === 0}
                    style={{
                        border: id === i || code[i] !== "" ? "2px solid limegreen" : "1px solid #d1d1d1",
                    }}
                />
            ))}
        </div>
    );
};

export default PinInput;
