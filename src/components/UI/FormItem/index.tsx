import { Field } from 'rc-field-form';
import React from 'react';

interface FormItemProps {
  children: any;
  name?: string;
  hideError?: boolean;
  className?: string;
  [k: string]: any;
}

const FormItem = ({
  children,
  hideError = false,
  className,
  ...props
}: FormItemProps) => {
  return (
    <Field {...props}>
      {({ onChange, value }, meta, context) => {
        const { errors } = meta;

        const hasError: string = errors && errors[0];

        if (typeof children === 'function') {
          return (
            <div className={className}>
              <div className='relative shadow-sm'>
                {children({ onChange, value, meta, hasError }, context)}
              </div>
              {!hideError && hasError && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '5px',
                  }}
                >
                  {hasError}
                </p>
              )}
            </div>
          );
        }

        return (
          <div className={className}>
            <div className='relative shadow-sm'>
              {React.cloneElement(children, {
                onChange,
                value,
                ...children.props,
              })}
            </div>

            {!hideError && hasError && (
              <p
                style={{
                  color: 'red',
                  fontSize: '12px',
                  marginTop: '5px',
                }}
              >
                {hasError}
              </p>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
