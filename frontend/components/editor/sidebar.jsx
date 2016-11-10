import React from "react";
import { Stage,
         Layer,
         Rect, 
         Text, 
         Line } from "react-konva";
import { rowIdxToNoteNames } from "../../utils/editor_utils";

const Sidebar = (props) => {
  let rects = [];
  let text = [];

  for (let rowId=0; rowId<props.pitchCount; rowId++) {
    // Alternate colors
    let color = "gray";
    if (rowId % 2 === 0) {
      color = "lightgray";  
    }

    let rowHeight = props.rowHeight;
    this.rows.push(
      <Row key={rowId}
           x={0}
           y={rowId * rowHeight}
           width={props.width}
           height={rowHeight}
           color={color} />
    )

    let textY = (rowId * rowHeight) + (rowHeight / 2);
    this.text.push(
      <Text key={rowId}
            x={props.width/2}
            y={textY}
            text={rowIdxToNoteNames(rowId)}
            fontSize={12}
            fill=""/>
    )
  }


  render() {
    <Stage
      width={props.width}
      height={props.height}>
      <Layer>
      </Layer>
    </Stage>
  }
};

export default Sidebar;
