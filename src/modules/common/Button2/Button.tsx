import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
  purple?: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({
  red,
  purple,
  className,
  ...restProps
}) => {
  const finalClassName = `${
    red
      ? `${s.default} ${s.red}`
      : purple
      ? `${s.default} ${s.purple}`
      : s.default
  } ${className}`;

  return <button className={finalClassName} {...restProps} />;
};
