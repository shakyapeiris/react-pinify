import { LegacyRef, useRef, useState } from 'react'

interface useInputType<Type> {
    value: Type | string | number| undefined,
    valueChangeHandler: (v: Type) => void,
    focusHandler: () => void,
    ref: LegacyRef<HTMLInputElement>,
    isValid: boolean,
    isError: boolean,
    blurHandler: () => void
  }

function useInput<Type> (validator: (value: Type | string | number | undefined) => boolean): useInputType<Type> {
    const [value, setValue] = useState<Type | string | number>("");
    const ref = useRef<HTMLInputElement>(null)
    const isValid = validator(value);
    const [isFocused, setIsFocused] = useState(false);
    const isError = isFocused && !isValid

    const valueChangeHandler = (v: Type) => {
        setValue(v)
    }

    const focusHandler = () => {
        ref.current?.focus()
    }

    const blurHandler = () => {
        setIsFocused(true)
    }

    return {
        value,
        valueChangeHandler,
        focusHandler,
        ref,
        isValid,
        isError,
        blurHandler
    }
}

export default useInput