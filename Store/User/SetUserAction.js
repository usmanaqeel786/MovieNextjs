import { createAction } from "@reduxjs/toolkit";

export default {
  initialState: {},
  action: createAction("user/setUser"),
  reducers(state, { payload }) {
    if (typeof payload !== "undefined") {
      state.user = payload;
    } else {
      state.user = null;
    }
  },
};
