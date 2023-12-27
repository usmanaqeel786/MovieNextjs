import { buildSlice } from "@thecodingmachine/redux-toolkit-wrapper";
import SetMyCollectionAction from "./SetMyCollectionAction";

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  mycollection: null,
};

export default buildSlice(
  "collectionn",
  [SetMyCollectionAction],
  sliceInitialState
).reducer;
