import { applyMiddleware } from "redux";
import SessionMiddleware from "./session_middleware";
import TrackMiddleware from "./track_middleware";
import UserMiddleware from "./user_middleware";

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  TrackMiddleware,
  UserMiddleware
);

export default RootMiddleware;
