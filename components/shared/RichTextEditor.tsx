"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const RichTextEditor = ({
  fieldValue,
  onChange,
  placeholder,
  className,
}: {
  fieldValue: any;
  onChange: () => void;
  placeholder: string;
  className: string;
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={fieldValue}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default RichTextEditor;
