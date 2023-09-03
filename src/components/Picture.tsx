import { ChangeEvent, useRef } from 'react';
import { User } from '../db';
import FileUpload from './FileUpload';
import PictureIcon from './Icon/Picture';

interface IPicture {
  chatId: number;
  userId: number;
  user?: User;
  onChange?: (result: string | ArrayBuffer | null) => void;
}

/**
 * 渲染一个Picture组件。
 *
 * @param {IPicture} props - Picture组件的props。
 * @return {ReactElement} 渲染后的Picture组件。
 */
export default function Picture(props: IPicture) {
  // 文件上传 DOM
  const fileUploadRef = useRef<HTMLInputElement>(null);

  /**
   * 选择图片，通过点击文件上传引用元素。
   *
   * @return {void}
   */
  function selectPicture() {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }

  /**
   * 处理选择图片事件。
   *
   * @param {ChangeEvent<HTMLInputElement>} event - 选择图片事件。
   * @return {void}
   */
  function handleSelectPicture(event: ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (props.onChange) {
          props.onChange(result);
        }
      };
    }
  }

  return (
    <>
      <PictureIcon onClick={selectPicture} />
      <FileUpload
        ref={fileUploadRef}
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={handleSelectPicture}
      />
    </>
  );
}
