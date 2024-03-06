import { LegacyRef } from "react";

export interface useInputType<Type> {
    value: Type | string | number | undefined;
    valueChangeHandler: (v: Type) => void;
    focusHandler: () => void;
    ref: LegacyRef<HTMLInputElement>;
    isValid: boolean;
    isError: boolean;
    blurHandler: () => void;
  }