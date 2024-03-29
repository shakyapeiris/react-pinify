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

export function Pinify({reference, onChange, defaultStyles, style}: {reference: useInputType<string>[], onChange: (v:any) => void, defaultStyles: string, style ?: {
  borderWidth ?: string,
  borderColor ?: string,
  spacing ?: string,
  fontSize ?: string,
  padding ?: string,
  fontColor ?: string,
  error ?: {
    borderColor ?: string
    fontColor ?: string
  }
}}){

  // if (){
  //   console.error('Default parameter is also expected')
  // }

  const valueChangeHandler = (value: string, index: number) => {
    reference[index].valueChangeHandler(value);
    if (value.length != 0) {
      if (index != reference.length - 1) {
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
            borderWidth: style?.borderWidth,
            borderColor: item.isError ? (style?.error?.borderColor || 'red') : style?.borderColor,
            marginRight: style?.spacing,
            padding: style?.padding,
            fontSize: style?.fontSize,
            color: item.isError ? (style?.error?.fontColor ||style?.error?.borderColor|| 'red') : style?.error?.borderColor 
          }}
          className={defaultStyles}
        />
      );
    })}
  </div>
</>
}
export const Underlined = classes.UnderLined
