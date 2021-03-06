import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Row from "./row";
import Timeline from "./timeline";
import Sidebar from "./sidebar";
import { Rect, Line } from "react-konva";
import { FREQ_TO_NOTE_NAME, 
         NOTE_NAME_TO_ROW_IDX,
         NOTE_NAME_TO_FREQ, 
         ROW_IDX_TO_NOTE_NAME,
         overlappingNote } from "../../../utils/editor_utils";
import NoteBlock from "./note_block"
import _ from "lodash";

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.setConstants();

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleNoteBlockClick = this.handleNoteBlockClick.bind(this);
    this.scrollWithTrack = this.scrollWithTrack.bind(this);
    this.scrollToLeft = this.scrollToLeft.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToDefault = this.scrollToDefault.bind(this);
  }

  componentDidMount() {
    this.scrollToDefault();
  }

  componentDidUpdate() {
    this.scrollWithTrack(this.props.scrolling);
  }

  scrollToLeft() {
    this.refs.notes_canvas.scrollLeft = 0;
    this.refs.timeline.scrollLeft = 0;
  }

  scrollToTop() {
    this.refs.notes_canvas.scrollTop = 0;
    this.refs.sidebar.scrollTop = 0;
  }

  scrollToDefault() {
    let octaves = 12;
    this.refs.notes_canvas.scrollTop = 2.2 * octaves * this.rowHeight;
    this.refs.sidebar.scrollTop = 2.2 * octaves * this.rowHeight;
  }

  scrollWithTrack(scrolling) {
    if (scrolling && !this.scrollingHandle) {
      let startTime = Date.now();
      this.scrollToLeft();
      let bps = this.props.track.bpm / 60;
      let qbps = bps * 4;
      let pixelsPerSecond = qbps * this.qbeatWidth;

      scroll = () => {
        this.scrollingHandle = requestAnimationFrame(scroll);
        let deltaTime = Date.now() - startTime;
        let pos = (deltaTime/1000) * pixelsPerSecond;
        this.refs.notes_canvas.scrollLeft = pos;
      }

      scroll();
    }
    else if (this.scrollingHandle) {
      cancelAnimationFrame(this.scrollingHandle);
      this.scrollingHandle = null;
    }
  }

  handleRowClick(id) {
    return (e) => {
      if (e.evt.which === 1) {
        let qbeat = Math.floor(e.evt.layerX / this.qbeatWidth);
        let noteName = ROW_IDX_TO_NOTE_NAME[id];
        let freq = NOTE_NAME_TO_FREQ[noteName];
        let newNote = {
          freq: freq,
          waveform: "sine",
          starting_quarter_beat: qbeat,
          ending_quarter_beat: qbeat+1,
          start_volume: 0.3,
          end_volume: 0.3
        }

        let track = this.props.track;
        let notes = [];
        if (track.channels_attributes.length > 0) {
          let channel = track.channels_attributes[this.props.selectedChannel];
          notes = _.merge([], channel.notes_attributes);
        }

        notes.push(newNote);
        if (!overlappingNote(newNote, notes.length-1, notes)) {
          this.props.addNoteToTrack(newNote);
        }
      }
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
    offset = this.rowHeight;
    if (row.scrollHeight + offset === this.refs.sidebar.scrollHeight) {
      this.refs.sidebar.scrollTop = row.scrollTop;
    }
  }

  updateNoteInTrack(idx) {
    // Update Note in Track passing in idx
    return this.props.updateNoteInTrack(idx);
  }

  handleNoteBlockClick(idx) {
    return this.props.handleNoteBlockClick(idx);
  }

  render() {
    // Calculate where the note blocks go using the redux store's track
    let noteBlocks = [];
    let track = this.props.track;
    if (track.channels_attributes.length > 0) {
      let channel = track.channels_attributes[this.props.selectedChannel];
      let notes = channel.notes_attributes;
      for (let idx=0; idx<notes.length; idx++) {
        let note = notes[idx];
        
        if (note._destroy) {
          continue;
        }

        let note_name = FREQ_TO_NOTE_NAME[note.freq];
        let rowIdx = NOTE_NAME_TO_ROW_IDX[note_name];
        let noteDuration = note.ending_quarter_beat - note.starting_quarter_beat;
        let width = noteDuration * this.qbeatWidth;
        let offset = note.starting_quarter_beat % 4 === 0 ? 4 : 2;

        noteBlocks.push(
          <NoteBlock 
            key={idx}
            idx={idx}
            notes={notes}
            x={(note.starting_quarter_beat * this.qbeatWidth) + offset}
            y={(rowIdx * this.rowHeight)}
            width={width - offset - 2}
            height={this.rowHeight - 2}
            qbeatWidth={this.qbeatWidth}
            rowHeight={this.rowHeight}
            offsetY={1}
            freq={note.freq}
            updateNoteInTrack={this.updateNoteInTrack(idx)}
            handleNoteBlockClick={this.handleNoteBlockClick(idx)}
          /> 
        );
      }
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
                        0, this.timelineHeight,
                        this.pitchSidebarWidth, this.timelineHeight
                      ]}
                      stroke="#000000"
                      strokeWidth="4"/>
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
            
            <div className="workspace-notes-canvas" ref="notes_canvas">
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
    // Add one additional row for the sidebar to account for the scrollbar in the main canvas
    this.pitchSidebarHeight = ((this.pitchCount + 1) * this.rowHeight);

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
