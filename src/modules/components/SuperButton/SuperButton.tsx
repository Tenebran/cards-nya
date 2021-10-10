import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './SuperButton.scss';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  color?: string;
  error?: string;
  name?: string;
  buttonWidth?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabledBtn?: boolean;
  entityStatus?: boolean;
  backColor?: string;
  className: string;
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  color,
  className,
  name,
  buttonWidth,
  onClickHandler,
  disabledBtn,
  entityStatus,
}) => {
  return (
    <button
      className={className}
      style={{ minWidth: buttonWidth }}
      onClick={onClickHandler}
      disabled={disabledBtn}
    >
      {name}
    </button>
  );
};

export default SuperButton;
