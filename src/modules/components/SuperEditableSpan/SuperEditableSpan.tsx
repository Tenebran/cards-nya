import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  ChangeEvent,
} from 'react';
import SuperInput from '../SuperInput/SuperInput';
import './SuperEditableSpan.scss';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  inputName?: string;
  type?: string;
  spanProps?: DefaultSpanPropsType; // пропсы для спана
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  valuepass?: string;
  value: string;
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
          {...restProps}
        />
      ) : (
        <div className="wrapper__input">
          <span className="span__group " onClick={onDoubleClickCallBack} {...restSpanProps}>
            <input className="span__field" name={type} />
            <label htmlFor="name" className="span__label">
              {type === 'Password' && valuepass && value
                ? valuepass.replace(/[^\s]/g, '*')
                : type
                ? value || children
                : ''}
            </label>
          </span>
        </div>
      )}
    </>
  );
};

export default SuperEditableSpan;
