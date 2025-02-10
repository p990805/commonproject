// src/utils/urlUtils.js
export const getImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http")
      ? url
      : `${process.env.REACT_APP_BASE_URL || ""}/${url}`;
  };
  