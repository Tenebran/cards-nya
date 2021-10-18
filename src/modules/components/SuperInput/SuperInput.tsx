import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react';
import './SuperInput.scss';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  inputName?: string;
  type?: string;
  onChangeCall?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  width?: string;
};

const SuperInput: React.FC<SuperInputTextPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  inputName,
  type,
  onChangeCall,
  value,
  width,
  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && // если есть пропс onChange
      onChange(e); // то передать ему е (поскольку onChange не обязателен)

    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    e.key === 'Enter' && // если нажата кнопка Enter
      onEnter && // и есть пропс onEnter
      onEnter(); // то вызвать его
  };

  const finalInputClassName = `${'superInput'} ${className ? className : ''} ${
    error ? 'superInput__errorInput' : ''
  }`;

  return (
    <div className="wrapper__input">
      <span className="form__group field">
        <input
          className="form__field"
          type={type}
          name={type}
          required
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          value={value}
          style={{ width: width }}
          {...restProps}
        />
        <label htmlFor="name" className="form__label">
          {inputName}
        </label>
      </span>
      {error && <span className={finalInputClassName}>{error}</span>}
    </div>
  );
};

export default SuperInput;
