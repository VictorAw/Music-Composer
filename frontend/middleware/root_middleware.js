import { applyMiddleware } from "redux";
import SessionMiddleware from "./session_middleware";
import TrackMiddleware from "./track_middleware";

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  TrackMiddleware
);

export default RootMiddleware;
