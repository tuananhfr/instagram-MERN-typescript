import { createSlice } from "@reduxjs/toolkit";
interface isSearchGlobalState {
  isSearchGlobalState: boolean;
}
const initialState: isSearchGlobalState = {
  isSearchGlobalState: false,
};
const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setIsSearchGlobalState: (state) => {
      state.isSearchGlobalState = !state.isSearchGlobalState;
    },
  },
});

export const { setIsSearchGlobalState } = globalStateSlice.actions;
export default globalStateSlice.reducer;
