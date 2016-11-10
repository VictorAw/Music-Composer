import React from "react";
import { Stage,
         Layer,
         Rect, 
         Text, 
         Line } from "react-konva";
import { rowIdxToNoteName,
         FREQUENCIES } from "../../utils/editor_utils";
import { Note } from "../../utils/player_utils";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.ctx = new AudioContext();
    this.mouseDown = false;
    this.note = null;

    this.state = {
      highlighted: -1
    }
  }

  handleMouseDown(id) {
    return (e) => {
      console.log("Sidebar Row " + id + " mouse down");
      this.mouseDown = true;
      this.note = new Note(this.ctx,
                           FREQUENCIES[rowIdxToNoteName(id)],
                           0.3, 0.3,
                           60, 0);
    }
  }
  
  handleMouseUp(id) {
    return (e) => {
      console.log("Sidebar Row " + id + " mouse up");
      this.mouseDown = false;
      this.note.stop();
      this.note = null;
    }
  }
  
  handleMouseEnter(id) {
    return (e) => {
      this.setState({highlighted: id}); 
      if (this.mouseDown) {
        this.note = new Note(this.ctx,
                             FREQUENCIES[rowIdxToNoteName(id)],
                             0.3, 0.3,
                             60, 0); 
      }
    }
  }
 
  handleMouseLeave(id) {
    return (e) => {
      this.setState({highlighted: -1}); 
      if (this.mouseDown && this.note) {
        this.note.stop();
        this.note = null;
      }
    }
  }

  buildComponents() {
    this.rects = [];
    this.text = [];
    for (let rowId=0; rowId<this.props.pitchCount; rowId++) {
      // Alternate colors
      let color = "gray";
      let textColor = "white";
      if (this.state.highlighted === rowId) {
        color = "white";
        textColor = "black";
      }
      else if (rowId % 2 === 0) {
        color = "lightgray";  
        textColor = "black";
      }

      let rowHeight = this.props.rowHeight;
      this.rects.push(
        <Rect key={rowId}
              x={0}
              y={rowId * rowHeight}
              width={this.props.width}
              height={rowHeight}
              fill={color} 
              onMouseDown={this.handleMouseDown(rowId)}
              onMouseUp={this.handleMouseUp(rowId)}
              onMouseEnter={this.handleMouseEnter(rowId)}
              onMouseLeave={this.handleMouseLeave(rowId)}/>
      )

      let textY = (rowId * rowHeight) + (rowHeight / 2) - 5;
      this.text.push(
        <Text key={rowId}
              x={this.props.width/4}
              y={textY}
              text={rowIdxToNoteName(rowId)}
              fontSize={12}
              fill={textColor}
              onMouseDown={this.handleMouseDown(rowId)}
              onMouseUp={this.handleMouseUp(rowId)}
              onMouseEnter={this.handleMouseEnter(rowId)}
              onMouseLeave={this.handleMouseLeave(rowId)}/>
      )
    }


  }

  render() {
    this.buildComponents();
    return (
      <Stage
        width={this.props.width}
        height={this.props.height}>
        <Layer>
          {this.rects}
          {this.text}
            <Line
              points={[
                this.props.width-2, 0,
                this.props.width-2, this.props.height
              ]}
              stroke="red"
              strokeWidth={4} />
        </Layer>
      </Stage>
    )
  }
};

export default Sidebar;
