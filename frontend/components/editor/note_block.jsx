import React from "react";
import { Rect, Text } from "react-konva";

const NoteBlock = (props) => {
  return (
    <Rect
      draggable="true"
      x=props.x
      y=props.y
      width=props.width
      height=props.height
      onClick={props.handleNoteBlockClick}
    />
  );
}

export default NoteBlock;
