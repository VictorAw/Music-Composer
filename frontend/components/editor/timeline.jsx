import React from "react"
import { Stage, 
         Layer, 
         Rect,
         Line, 
         Text } from "react-konva"

const Timeline = (props) => {
  function populateGuidelines(lines, endY) {
    // We want to draw a line at the beginning
    // and also one at the end, so we go from
    // 0 to <= number of qbeats
    let qbeatWidth = props.qbeatWidth;
    for (let i=0; i<=props.qbeatsPerRow; i++) {
      let thickness = 1;
      if (i % 4 === 0) {
        thickness = 3;
      }

      let offset = props.pitchSidebarWidth + (thickness / 2);
      let lineX = offset + (i * qbeatWidth);
      let startY = props.height / 2;
      lines.push(
        <Line
          key={i}
          points={[
            lineX, startY , lineX, endY
          ]}
          stroke="#3a3f47"
          strokeWidth={thickness}
        />
      );
    }
  }

  let text = [];
  let lines = [];
  populateGuidelines(lines, props.height);

  let offset = props.pitchSidebarWidth;
  let qbeatWidth = props.qbeatWidth;
  for (let i=1; i<=props.qbeatsPerRow; i++) {
    // Text every beats
    let textX = offset + ((i * qbeatWidth) * 4) - 2;
    // Cell every quarter beat
    text.push(
        <Text 
          key={i}
          x={textX} 
          y={0} 
          text={`${i}`} 
          fontSize={12}
          fill="white"/>
    )
  }

  console.log(lines);

  return (
    <Stage 
        width={props.width}
        height={props.height}>
      <Layer>
        <Rect
          x={props.x}
          y={props.y}
          width={props.width}
          height={props.height}
          fill="gray"
          listening="false"/> 
        {lines}
        {text}
      </Layer>
    </Stage>
  );
}

export default Timeline;

