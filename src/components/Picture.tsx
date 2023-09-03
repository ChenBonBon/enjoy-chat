import { ChangeEvent, useRef } from "react";
import { User } from "../db";
import FileUpload from "./FileUpload";
import PictureIcon from "./Icon/Picture";

interface IPicture {
  chatId: number;
  userId: number;
  user?: User;
  onChange?: (result: string | ArrayBuffer | null) => void;
}

export default function Picture(props: IPicture) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  function selectPicture() {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }

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
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleSelectPicture}
      />
    </>
  );
}
