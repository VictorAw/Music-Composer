import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Row from "./row";

import { Rect } from "react-konva";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.setConstants();

    this.state = {
      scroll: {
        x: 0,
        y: 0,
      },
      mousePos: {
        x: 0,
        y: 0
      }
    };

    this.scrollDelay = 0;
    this.mouseMoveDelay = 0;

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }
  
  handleRowClick(id) {
    return (e) => {
      console.log(e);
      console.log(`Row ${id} clicked at ` + e.evt.layerX);
    }
  }

  handleScrollEvent(e) {
    // Only handle every 30th scroll event to prevent
    // app slowdown
    if (this.scrollDelay == 30) {
      this.setState(_.merge(
        {}, 
        this.state, 
        { 
          scroll: {
            x: e.nativeEvent.target.scrollLeft,
            y: e.nativeEvent.target.scrollTop 
          }
        })
      );
      this.scrollDelay = 0;
    }
    else {
      this.scrollDelay++;
    }
  }

  render() {
    // Calculate where the note blocks go using the redux store's track

    return (
      <div id="canvas-container" 
           className="canvas-container" 
           onScroll={this.handleScrollEvent}>
        <Stage id="workspace" className="workspace" 
               width={this.canvas_width} height={this.canvas_height}>
          <Layer>
            <Rect x={0}
                  y={this.state.scrollY}
                  width={this.timeline_width}
                  height={this.timeline_height}
                  fill="blue"/>
            {this.rows}
            {/*
            <PitchSidebar 
              x={this.state.scrollX}
              y={this.timeline_height}
              width={this.pitch_sidebar_width}
              height={this.pitch_sidebar_height}/>
            */}

            <Rect x={this.state.scrollX}
              y={this.timeline_height}
              width={this.pitch_sidebar_width}
              height={this.pitch_sidebar_height}
              fill="green"/>
          </Layer>
        </Stage>
      </div>
    );
  }

  setConstants() {
    // Workspace size vars
    this.pitch_count = 88;

    this.qbeat_width = 40;
    this.qbeats_per_row = 480;

    this.row_width = this.qbeats_per_row * this.qbeat_width;
    this.row_height = 20;

    this.pitch_sidebar_width = 40;
    this.timeline_width = this.row_width + this.pitch_sidebar_width;

    this.timeline_height = this.row_height;
    this.pitch_sidebar_height = (this.pitch_count * this.row_height) + this.timeline_height;

    this.canvas_width = (this.qbeats_per_row * this.qbeat_width) + this.pitch_sidebar_width;
    this.canvas_height = (this.pitch_count * this.row_height) + this.timeline_height;

    // Row array population
    this.rows = [];
    for (let row_id=0; row_id<this.pitch_count; row_id++) {
      // Alternate colors
      let color = "gray";
      if (row_id % 2 === 0) {
        color = "lightgray";
      }

      this.rows.push(
        <Row x={this.pitch_sidebar_width} 
          y={this.timeline_height + (row_id * this.row_height)} 
          width={this.row_width} 
          height={this.row_height} 
          color={color}
          key={row_id}
          handleRowClick={this.handleRowClick(row_id)}
        />
      )
    }
  }
}

export default Editor;
