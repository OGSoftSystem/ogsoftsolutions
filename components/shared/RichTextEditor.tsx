"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({
  fieldValue,
  onChange,
  placeholder,
}: {
  fieldValue: any;
  onChange: () => void;
  placeholder: string;
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={fieldValue}
      onChange={onChange}
      placeholder={placeholder}
      className="h-[250px]"
    />
  );
};

export default RichTextEditor;
