import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Row from "./row";
import Timeline from "./timeline";

import { Rect } from "react-konva";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.setConstants();

    this.state = {
      mousePos: {
        x: 0,
        y: 0
      }
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  handleRowClick(id) {
    return (e) => {
      console.log(e);
      console.log(`Row ${id} clicked at ` + e.evt.layerX);
      this.setState({mousePos: {x: e.evt.layerX, y: e.evt.layerY}});
    }
  }

  handleScroll(e) {
    let row = e.nativeEvent.target;
    this.refs.timeline.scrollLeft = row.scrollLeft;
    this.refs.sidebar.scrollTop = row.scrollTop;
  }

  render() {
    // Calculate where the note blocks go using the redux store's track

    return (
      <div className="editor-container">
        <div className="editor-main-column">
          
          <div className="editor-timeline" ref="timeline">
            <Stage width={this.timelineWidth} height={this.timelineHeight}>
              <Layer>
                <Rect x={0} y={0}
                      width={this.timelineWidth}
                      height={this.timelineHeight}
                      fill="blue" listening="false"/>
                <Rect x={5} y={5}
                      width={20}
                      height={20}
                      fill="black" listening="false"/>
              </Layer>
            </Stage>
          </div>
       
          <div className="editor-row" onScroll={this.handleScroll}>
            <div className="editor-sidebar" ref="sidebar">
              <Stage width={this.pitchSidebarWidth} height={this.pitchSidebarHeight}>
                <Layer>
                  <Rect x={0} y={0}
                    width={this.pitchSidebarWidth}
                    height={this.pitchSidebarHeight}
                    fill="green" listening="false"/>
                  <Rect x={this.state.scroll.x + 5} y={5}
                    width={20} height={20}
                    fill="black" listening="false"/>
                </Layer>
              </Stage>
            </div>
            
            <div className="editor-canvas-container">
              <Stage width={this.canvasWidth} height={this.canvasHeight}>
                <Layer>
                  {this.rows}
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setConstants() {
    // Workspace size vars
    this.pitchCount = 88;

    this.qbeatWidth = 40;
    this.qbeatsPerRow = 480;

    this.rowWidth = this.qbeatsPerRow * this.qbeatWidth;
    this.rowHeight = 20;

    this.pitchSidebarWidth = 40;
    this.timelineWidth = this.rowWidth + this.pitchSidebarWidth;

    this.timelineHeight = this.rowHeight;
    this.pitchSidebarHeight = (this.pitchCount * this.rowHeight) + this.timelineHeight;

    this.canvasWidth = (this.qbeatsPerRow * this.qbeatWidth);
    this.canvasHeight = (this.pitchCount * this.rowHeight);

    // Row array population
    this.rows = [];
    for (let rowId=0; rowId<this.pitchCount; rowId++) {
      // Alternate colors
      let color = "gray";
      if (rowId % 2 === 0) {
        color = "lightgray";
      }

      this.rows.push(
        <Row x={0} 
          y={rowId * this.rowHeight} 
          width={this.rowWidth} 
          height={this.rowHeight} 
          color={color}
          key={rowId}
          handleRowClick={this.handleRowClick(rowId)}
        />
      )
    }
  }
}

export default Editor;
