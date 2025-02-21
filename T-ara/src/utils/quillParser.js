// utils/quillParser.js

import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export function deltaToHtml(deltaInput) {
  try {
    let deltaObj;
    // deltaInput이 이미 객체인 경우 바로 사용
    if (typeof deltaInput === "object") {
      deltaObj = deltaInput;
    } else if (typeof deltaInput === "string") {
      deltaObj = JSON.parse(deltaInput);
    } else {
      return "";
    }
    const converter = new QuillDeltaToHtmlConverter(deltaObj.ops, {});
    return converter.convert();
  } catch (error) {
    console.error("Quill Delta 파싱 오류:", error);
    return typeof deltaInput === "string" ? deltaInput : "";
  }
}
