import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './SuperButton.scss';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  color?: string;
  error?: string;
  name?: string;
  buttonWidth?: string;
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  color,
  className,
  name,
  buttonWidth,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${color ? `superButton__${color}` : 'superButton__default'} ${className}`;

  return (
    <button className={finalClassName} style={{ minWidth: buttonWidth }}>
      {name}
    </button>
  );
};

export default SuperButton;
