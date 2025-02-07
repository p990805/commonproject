import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Quill의 Image 포맷의 sanitize 함수를 오버라이드하여 blob URL을 그대로 허용하도록 함
const ImageFormat = Quill.import("formats/image");
ImageFormat.sanitize = function(url) {
  return url; // 전달받은 url을 그대로 반환 (검증하지 않음)
};

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const initialLoadRef = useRef(false); // 초기 값 적용 여부 추적
  const [isComposing, setIsComposing] = useState(false);

  // 에디터 초기화 (마운트 시 한 번만 실행)
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

      // composition 이벤트 처리 (한글 등 조합 입력 대비)
      quillRef.current.root.addEventListener("compositionstart", () => {
        setIsComposing(true);
      });
      quillRef.current.root.addEventListener("compositionend", () => {
        setIsComposing(false);
        if (onChange) {
          // HTML 대신 Delta를 전달할 수 있습니다.
          const delta = quillRef.current.getContents();
          onChange(delta);
        }
      });

      // text-change 이벤트 처리
      quillRef.current.on("text-change", () => {
        if (!isComposing && onChange) {
          // HTML 대신 Delta를 전달합니다.
          const delta = quillRef.current.getContents();
          onChange(delta);
        }
      });
    }

    // cleanup: 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, []); // 빈 배열: 한 번만 실행

  // 부모의 초기 value를 한 번만 적용 (초기 로드)
  useEffect(() => {
    if (quillRef.current && value && !initialLoadRef.current) {
      // 초기 value가 Delta 형식이라면 clipboard를 사용하지 않고 setContents()를 쓸 수 있습니다.
      // 만약 초기 value가 HTML이라면 dangerouslyPasteHTML()을 사용하면 됩니다.
      // 여기서는 value가 Delta 형식이라고 가정합니다.
      quillRef.current.setContents(value);
      initialLoadRef.current = true;
    }
  }, [value]);

  // 커스텀 이미지 업로드 핸들러
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

      // 현재 커서 위치 확인 후 이미지 삽입
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
