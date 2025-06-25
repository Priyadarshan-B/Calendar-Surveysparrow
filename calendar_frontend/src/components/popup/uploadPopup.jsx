import { useState } from "react";
import CustomPopup from "../popup/CustomPopup";
import JsonUpload from "../upload/JsonUpload";
import FloatingAddButton from "../button/FloatButton";

export default function UploadPopupWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FloatingAddButton onClick={() => setIsOpen(true)} />

      <CustomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
       <JsonUpload onSuccess={() => setIsOpen(false)} />
      </CustomPopup>
    </>
  );
}
