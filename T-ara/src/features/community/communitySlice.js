// src/features/community/communitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: "공지사항", // 탭 상태
  selectedCommunityId: null, // 상세보기할 게시글 ID
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedCommunityId: (state, action) => {
      state.selectedCommunityId = action.payload;
    },
    clearSelectedCommunityId: (state) => {
      state.selectedCommunityId = null;
    },
  },
});

export const { setActiveTab, setSelectedCommunityId, clearSelectedCommunityId } = communitySlice.actions;
export default communitySlice.reducer;
