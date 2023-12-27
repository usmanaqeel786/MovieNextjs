import { createAction } from "@reduxjs/toolkit";

export default {
  initialState: {},
  action: createAction("collection/setMyCollection"),
  reducers(state, { payload }) {
    if (typeof payload !== "undefined") {
      state.mycollection = payload;
    } else {
      state.mycollection = null;
    }
  },
};
