import { combineReducers } from "redux";
import StudentReducer from "./StudentReducer";

const RootReducer = combineReducers({
  StudentReducer,
});

export default RootReducer;
