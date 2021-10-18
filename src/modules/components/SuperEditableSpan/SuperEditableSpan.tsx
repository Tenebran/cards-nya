import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  ChangeEvent,
} from 'react';
import SuperInput from '../SuperInput/SuperInput';
import './SuperEditableSpan.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const srtingLenghtCutter = (value: string) => {
  return value.length > 10 ? value.substring(0, 40) + '...' : value;
};

type SuperEditableSpanType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  inputName?: string;
  type?: string;
  spanProps?: DefaultSpanPropsType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  valuepass?: string;
  value: string;
  width?: string;
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus, // игнорировать изменение этого пропса
  onBlur,
  onEnter,
  spanProps,
  inputName,
  error,
  type,
  onChange,
  valuepass,
  value,
  width,

  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {};

  const onEnterCallback = () => {
    setEditMode(false);
    onEnter && onEnter();
  };
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    onBlur && onBlur(e);
  };
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setEditMode(true);
    onDoubleClick && onDoubleClick(e);
  };

  const cutValue = srtingLenghtCutter(value);

  return (
    <>
      {editMode ? (
        <SuperInput
          autoFocus
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          inputName={inputName}
          error={error}
          type={type}
          onChange={onChange}
          value={value}
          width={width}
          {...restProps}
        />
      ) : (
        <div className="wrapper__input">
          <span className="span__group " onClick={onDoubleClickCallBack} {...restSpanProps}>
            <input className="span__field" name={type} style={{ width: width }} />
            <label htmlFor="name" className="span__label">
              {type === 'Password' && valuepass && value
                ? valuepass.replace(/[^\s]/g, '*')
                : type
                ? cutValue || children
                : ''}
            </label>
          </span>
        </div>
      )}
    </>
  );
};

export default SuperEditableSpan;
