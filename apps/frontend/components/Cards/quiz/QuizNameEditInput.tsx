import { TextInput, Loader } from '@mantine/core';
import { Code } from 'phosphor-react';
import React, { forwardRef, SyntheticEvent } from 'react';

interface Props {
  editedName: string;
  isLoading: boolean;
  onKeyUp: (e: SyntheticEvent) => void;
  onBlurHandler: (e: SyntheticEvent) => void;
  setEditedName: (name: string) => void;
}

// TODO: move to zustand?
const QuizNameEditInput = forwardRef<HTMLInputElement, Props>(
  function QuizNameEditInput(
    { editedName, isLoading, onKeyUp, onBlurHandler, setEditedName }: Props,
    ref
  ) {
    return (
      <TextInput
        ref={ref}
        variant="filled"
        size="xs"
        sx={() => ({ flex: 1 })}
        styles={{
          input: {
            fontSize: 16,
            fontWeight: 500,
          },
        }}
        rightSection={isLoading ? <Loader size="sm" /> : <Code>↵</Code>}
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
        onKeyUp={onKeyUp}
        onBlur={onBlurHandler}
        disabled={isLoading}
      />
    );
  }
);

export default QuizNameEditInput;
