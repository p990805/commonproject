// Alternative 방법
import * as jwtDecodeModule from 'jwt-decode';
const jwt_decode = jwtDecodeModule.default || jwtDecodeModule;

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};
