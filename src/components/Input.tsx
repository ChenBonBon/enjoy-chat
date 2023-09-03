import { TextField } from "@radix-ui/themes";
import {
  ChangeEvent,
  CompositionEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface IInput {
  value?: string;
  children?: ReactNode;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

export default function Input(props: IInput) {
  const compositionRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleCompositionStart() {
    compositionRef.current = true;
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    compositionRef.current = false;
    if (props.onChange) {
      props.onChange(value);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (compositionRef.current) return;

    const value = event.currentTarget.value;
    if (props.onChange) {
      props.onChange(value);
    }
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (props.onEnter) {
        props.onEnter();
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.value ?? "";
    }
  }, [props.value]);

  return (
    <TextField.Root style={{ flex: 1 }}>
      <TextField.Input
        ref={inputRef}
        placeholder="请输入…"
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <TextField.Slot>{props.children}</TextField.Slot>
    </TextField.Root>
  );
}
