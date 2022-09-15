import { createSlice } from "@reduxjs/toolkit";
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    status: "All",
    priorities: [],
    search: "",
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
      console.log(state.search);
    },
    statusFilterChange: () => {},
    prioritiesFilterChange: () => {},
  },
});
export default filtersSlice;
