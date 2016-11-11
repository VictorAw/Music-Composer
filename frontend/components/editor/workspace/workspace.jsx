import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Row from "./row";
import Timeline from "./timeline";
import Sidebar from "./sidebar";
import { Rect, Line } from "react-konva";
import { NOTE_NAMES } from "../../../utils/editor_utils";

class Workspace extends React.Component {
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
      console.log(`Row ${id} clicked at ` + e.evt.layerX);
      this.setState({mousePos: {x: e.evt.layerX, y: e.evt.layerY}});
    }
  }

  handleScroll(e) {
    let row = e.nativeEvent.target;
    // Sometimes scrolling past the end of the scrollbar produces weird behavior
    // This prevents the timeline from jumping around due to the weird behavior
    // Offset is because the canvas is shifted over by the sidebar
    // and because the sidebar is increased in length to account
    // for the extra distance that the canvas can scroll
    let offset = this.pitchSidebarWidth * 2;
    if (row.scrollWidth + offset === this.refs.timeline.scrollWidth) {
      this.refs.timeline.scrollLeft = row.scrollLeft;
    }

    // Canvas
    if (row.scrollHeight === this.refs.sidebar.scrollHeight) {
      this.refs.sidebar.scrollTop = row.scrollTop;
    }
  }

  handleNoteBlockClick(id) {
    return (e) => {
      console.log("Block " + id + " clicked");
    } 
  }

  render() {
    // Calculate where the note blocks go using the redux store's track
    let noteBlocks = [];
    let track = this.props.track;
    if (track.channels_attributes.length > 0) {
      let channel = track.channels_attributes[this.props.selectedChannel];
      let notes = channel.notes_attributes;
      let note_name = FREQ_TO_NOTE_NAME[notes.freq];
      let rowIdx = NOTE_NAME_TO_ROW_IDX[note_name];
      notes.forEach((note, idx) => {
        noteBlocks.push(
          <NoteBlock 
            key={note}
            note={note}
            x={note.starting_quarter_beat * this.qbeatWidth}
            y={rowIdx * this.rowHeight}
            width={this.qbeatWidth}
            height={this.rowHeight}   
          /> 
        )
      });
    }

    return (
      <div className="workspace-container">
        <div className="workspace-main-column">
          <div className="workspace-timeline-row">
            <div className="workspace-corner">
                <Stage
                  width={this.pitchSidebarWidth}
                  height={this.timelineHeight}>
                  <Layer>
                    <Rect
                      x={0}
                      y={0}
                      width={this.pitchSidebarWidth}
                      height={this.timelineHeight}
                      fill="gray"/>
                    <Line
                      points={[
                        this.pitchSidebarWidth-2, 0,
                        this.pitchSidebarWidth-2, this.timelineHeight
                      ]}
                      stroke="red"
                      strokeWidth={4} />
                  </Layer>
                </Stage>
              </div>

            <div className="workspace-timeline" ref="timeline">
              <Timeline
                x={0} y={0}
                width={this.timelineWidth}
                height={this.timelineHeight}
                pitchSidebarWidth={this.pitchSidebarWidth}
                qbeatWidth={this.qbeatWidth}
                qbeatsPerRow={this.qbeatsPerRow}
              /> 
            </div>
          </div>
       
          <div className="workspace-notes-row" onScroll={this.handleScroll}>
            <div className="workspace-sidebar" ref="sidebar">
              <Sidebar
                x={0}
                y={0}
                width={this.pitchSidebarWidth}
                height={this.pitchSidebarHeight}
                pitchCount={this.pitchCount}
                rowHeight={this.rowHeight}
              />
            </div>
            
            <div className="workspace-notes-canvas">
              <Stage width={this.canvasWidth} height={this.canvasHeight}>
                <Layer>
                  {this.rows}
                  {this.guidelines}
                  {noteBlocks}
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
    this.rowHeight = 25;

    this.pitchSidebarWidth = 40;
    // We need to make the timeline an extra sidebar width wider
    // because the editor rows are shifted over by a sidebar width
    // but their canvas starts at the same location as the
    // sidebar's canvas, so it has more distance that it can scroll
    this.timelineWidth = this.rowWidth + (this.pitchSidebarWidth * 2);

    this.timelineHeight = this.rowHeight;
    this.pitchSidebarHeight = (this.pitchCount * this.rowHeight);

    this.canvasWidth = this.rowWidth;
    this.canvasHeight = (this.pitchCount * this.rowHeight);

    // Row array population
    this.rows = [];
    this.populateRows();

    // Guideline array population
    this.guidelines = [];
    this.populateGuidelines();
  }

  populateRows() {
    for (let rowId=0; rowId<this.pitchCount; rowId++) {
      // Alternate colors
      let color = "gray";
      if (rowId % 2 === 0) {
        color = "lightgray";
      }

      this.rows.push(
        <Row x={0} 
          key={rowId}
          y={rowId * this.rowHeight} 
          width={this.rowWidth} 
          height={this.rowHeight} 
          color={color}
          handleRowClick={this.handleRowClick(rowId)}
        />
      )
    }
  }

  populateGuidelines() {
    // We want to draw a line at the beginning
    // and also one at the end, so we go from
    // 0 to <= number of qbeats
    let qbeatWidth = this.qbeatWidth;
    let lineEndY = this.canvasHeight;
    for (let i=0; i<=this.qbeatsPerRow; i++) {
      let thickness = 1;
      if (i % 4 === 0) {
        thickness = 3;
      }

      let lineX = (i * qbeatWidth) + (thickness / 2);

      this.guidelines.push(
        <Line
          key={i}
          points={[
            lineX, 0, lineX, lineEndY
          ]}
          stroke="#3a3f47"
          strokeWidth={thickness}
        />
      );
    }
  }

}

export default Workspace;
