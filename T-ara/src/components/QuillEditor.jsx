import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Quill 에디터 초기화
    if (editorRef.current && !quillRef.current) {
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ];

      const options = {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
        placeholder: "내용을 입력하세요...",
      };

      quillRef.current = new Quill(editorRef.current, options);

      // 내용 변경 이벤트 핸들러
      quillRef.current.on("text-change", () => {
        if (onChange) {
          const content = quillRef.current.root.innerHTML;
          onChange(content);
        }
      });
    }

    // 초기 값 설정
    if (quillRef.current && value) {
      if (quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value;
      }
    }

    // 컴포넌트 언마운트 시 cleanup
    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, [value]);

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
};

export default QuillEditor;
