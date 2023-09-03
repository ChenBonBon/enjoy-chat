import { TextField } from '@radix-ui/themes';
import {
  ChangeEvent,
  CompositionEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

interface IInput {
  value?: string;
  children?: ReactNode;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

/**
 * 渲染一个输入组件。
 *
 * @param {IInput} props - 输入组件的属性。
 * @return {JSX.Element} 渲染后的输入组件。
 */
export default function Input(props: IInput) {
  const compositionRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * 处理组合开始事件。
   *
   * @param {void}
   * @return {void}
   */
  function handleCompositionStart() {
    compositionRef.current = true;
  }

  /**
   * 处理组合结束事件。
   *
   * @param {void}
   * @return {void}
   */
  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    compositionRef.current = false;
    if (props.onChange) {
      props.onChange(value);
    }
  }

  /**
   * 处理输入事件。
   *
   * @param {void}
   * @return {void}
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (compositionRef.current) return;

    const value = event.currentTarget.value;
    if (props.onChange) {
      props.onChange(value);
    }
  }

  /**
   * 处理键盘事件。
   *
   * @param {void}
   * @return {void}
   */
  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (props.onEnter) {
        props.onEnter();
      }
    }
  }

  // 同步输入框的值和传入的值
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.value ?? '';
    }
  }, [props.value]);

  return (
    <TextField.Root style={{ flex: 1 }}>
      <TextField.Input
        ref={inputRef}
        placeholder='请输入…'
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <TextField.Slot>{props.children}</TextField.Slot>
    </TextField.Root>
  );
}
