import { useState } from "react"
import { useInputType } from "./Pinify.types"
import useInput from "./useInput"
import classes from './Pinify.module.css'

export const usePinify = (length: number) => {
    const [value, setValue] = useState("")
    const valueChangeHandler = (v: any)=> {
      setValue(v)
    }
    const arr: useInputType<string>[] = []
  
    for (let i = 0; i < length; i++) {
      arr.push(
        useInput<string>(
          (val) => val?.toString().trim().length == 1
        ) as useInputType<string>
      );
    }
    const submitEventHandler = () => {
      let tr = "";
      for (let i = 0; i < length; i++) {
        console.log(arr[i]);
        if (!arr[i].isValid) {
          arr[i].blurHandler();
          return arr[i].focusHandler();
        }
        tr += arr[i].value;
      }
      return tr;
    };
    return {
      valueChangeHandler,
      value,
      ref: arr,
      submitEventHandler
    }
}

export default function Pinify({reference, onChange}: {reference: useInputType<string>[], onChange: (v:any) => void}){
  const valueChangeHandler = (value: string, index: number) => {
    reference[index].valueChangeHandler(value);
    if (value.length != 0) {
      if (index != reference.length - 1) {
        console.log(index);
        console.log(reference);
        reference[index + 1].focusHandler();
      }
    }

    let val = "";
    reference.forEach((input) => {
      if (input.isValid) val += input.value;
    })

    onChange(val)
  };

  
  return <>
  <div className={classes.InputContainer}>
    {reference.map((item: useInputType<string>, i: number) => {
      return (
        <input
          key={i}
          maxLength={1}
          ref={item.ref}
          onChange={(e) => {
            valueChangeHandler(e.target.value, i);
          }}
          onBlur={item.blurHandler}
          style={{
            outlineColor: item.isError ? "red" : "black",
            borderBlockColor: item.isError ? "red" : "black",
          }}
        />
      );
    })}
  </div>
</>
}
