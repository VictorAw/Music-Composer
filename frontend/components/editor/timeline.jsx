import React from "react"
import { Stage, 
         Layer, 
         Rect,
         Line, 
         Text } from "react-konva"

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  populateGuidelines(lines, endY) {
    // We want to draw a line at the beginning
    // and also one at the end, so we go from
    // 0 to <= number of qbeats
    let qbeatWidth = this.props.qbeatWidth;
    for (let i=0; i<=this.props.qbeatsPerRow; i++) {
      let thickness = 1;
      if (i % 4 === 0) {
        thickness = 3;
      }

      let offset = this.props.pitchSidebarWidth + (thickness / 2);
      let lineX = offset + (i * qbeatWidth);
      let startY = this.props.height / 2;
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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let text = [];
    let lines = [];
    this.populateGuidelines(lines, this.props.height);

    let offset = this.props.pitchSidebarWidth;
    let qbeatWidth = this.props.qbeatWidth;
    for (let i=1; i<=this.props.qbeatsPerRow; i++) {
      // Text every beats
      let textX = offset + (((i-1) * qbeatWidth) * 4) - 2;
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

    return (
      <Stage 
          width={this.props.width}
          height={this.props.height}>
        <Layer>
          <Rect
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            fill="gray"
            listening="false"/> 
          {lines}
          {text}
        </Layer>
      </Stage>
    );
  }
}

export default Timeline;

