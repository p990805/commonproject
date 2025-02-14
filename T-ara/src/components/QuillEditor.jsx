// src/components/community/QuillEditor.jsx
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Quill의 Image 포맷의 sanitize 함수를 오버라이드하여 blob URL을 그대로 허용
const ImageFormat = Quill.import("formats/image");
ImageFormat.sanitize = function(url) {
  return url;
};

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const initialLoadRef = useRef(false);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
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
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: handleImageUpload, // 커스텀 이미지 핸들러
            },
          },
        },
        theme: "snow",
        placeholder: "내용을 입력하세요...",
      };

      quillRef.current = new Quill(editorRef.current, options);

      // composition 이벤트 (한글 조합 등 대비)
      quillRef.current.root.addEventListener("compositionstart", () => {
        setIsComposing(true);
      });
      quillRef.current.root.addEventListener("compositionend", () => {
        setIsComposing(false);
        if (onChange) {
          // Delta 객체를 반환
          const delta = quillRef.current.getContents();
          onChange(delta);
        }
      });

      quillRef.current.on("text-change", () => {
        if (!isComposing && onChange) {
          const delta = quillRef.current.getContents();
          onChange(delta);
        }
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value && !initialLoadRef.current) {
      // 초기 value가 Delta 객체라면 그대로 적용
      quillRef.current.setContents(value);
      initialLoadRef.current = true;
    }
  }, [value]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files && input.files[0];
      if (!file) {
        console.warn("파일이 선택되지 않았습니다.");
        return;
      }
      console.log("선택된 파일:", file);
      // blob URL 생성 (임시 URL, 로컬 미리보기용)
      const imageUrl = URL.createObjectURL(file);
      console.log("임시 이미지 URL:", imageUrl);
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.insertEmbed(range.index, "image", imageUrl);
      } else {
        quillRef.current.insertEmbed(quillRef.current.getLength(), "image", imageUrl);
      }
    };
  };

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
};

export default QuillEditor;
