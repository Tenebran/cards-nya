import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react';
import './SuperSelect.scss';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  options: Array<string> | Array<null>;
  onChangeOption: (option: string) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value);
  };

  return (
    <select onChange={onChangeCallback} {...restProps} className="select">
      {options
        ? options.map((list, index) => {
            if (list)
              return (
                <option key={`${index}`} value={list} className="select__option">
                  {list}
                </option>
              );
            return '';
          })
        : ''}
    </select>
  );
};

export default SuperSelect;
