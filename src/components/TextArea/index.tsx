import {
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, ...rest }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      <textarea
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        defaultValue={defaultValue}
        ref={textAreaRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
