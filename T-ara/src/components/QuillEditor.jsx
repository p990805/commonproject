import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import imageCompression from "browser-image-compression"; // 설치한 라이브러리

// Quill의 Image 포맷의 sanitize 함수를 오버라이드하여 data URL을 그대로 허용
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

      // composition 이벤트 처리 (한글 조합 등)
      quillRef.current.root.addEventListener("compositionstart", () => {
        setIsComposing(true);
      });
      quillRef.current.root.addEventListener("compositionend", () => {
        setIsComposing(false);
        if (onChange) {
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
      quillRef.current.setContents(value);
      initialLoadRef.current = true;
    }
  }, [value]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (!file) {
        console.warn("파일이 선택되지 않았습니다.");
        return;
      }
      console.log("선택된 파일:", file);

      try {
        // 압축 옵션 설정 (필요에 따라 조정)
        const options = {
          maxSizeMB: 1,          // 최대 1MB
          maxWidthOrHeight: 800, // 최대 너비 또는 높이 800px
          useWebWorker: true,
        };

        // 파일 압축
        const compressedFile = await imageCompression(file, options);
        console.log("압축된 파일:", compressedFile);

        // Base64로 변환 (FileReader 사용)
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result; // data:image/png;base64,~~~~
          console.log("Base64 이미지 URL:", base64Image);

          const range = quillRef.current.getSelection();
          if (range) {
            quillRef.current.insertEmbed(range.index, "image", base64Image);
          } else {
            quillRef.current.insertEmbed(quillRef.current.getLength(), "image", base64Image);
          }
        };
        reader.onerror = (error) => {
          console.error("파일을 Base64로 변환 중 오류:", error);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("이미지 압축 오류:", error);
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
