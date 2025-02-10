// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import communityReducer from '../features/community/communitySlice';
import authReducer from '../features/auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용

// 두 slice를 합쳐서 rootReducer 생성
const rootReducer = combineReducers({
  community: communityReducer,
  auth: authReducer,
});

// persist 설정: persist할 slice 이름들을 whitelist에 추가
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['community', 'auth'], // community와 auth 모두 persist
};

// rootReducer를 persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist 관련 액션은 무시
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
