import { buildSlice } from "@thecodingmachine/redux-toolkit-wrapper";
import SetUserAction from "./SetUserAction";

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  user: null,
};

export default buildSlice("userr", [SetUserAction], sliceInitialState).reducer;
