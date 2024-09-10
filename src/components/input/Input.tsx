import React, { InputHTMLAttributes, Ref, forwardRef, memo } from 'react';
import './input.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>;

interface PassedProps extends HTMLInputProps {
  fieldTitle: string;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  value?: string | number;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Input = memo(
  forwardRef<HTMLInputElement, PassedProps>(
    (props: PassedProps, ref: Ref<HTMLInputElement>) => {
      const {
        fieldTitle,
        isFocused,
        setIsFocused,
        type = 'text',
        value,
        onChange,
        readonly,
        ...otherProps
      } = props;

      const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (e.currentTarget.value.length === 0) {
          setIsFocused(!isFocused);
        }
      };

      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      };

      const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        handleFocus(e);
      };

      return (
        <div className={'input-field'}>
          <input
            className="input-field-input"
            value={value}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={e => {
              onChangeHandler(e);
            }}
            readOnly={readonly}
            {...otherProps}
            ref={ref}
          />
          <span className={`input-field-title${isFocused ? ' active' : ''}`}>
            {fieldTitle}
          </span>
        </div>
      );
    },
  ),
);
