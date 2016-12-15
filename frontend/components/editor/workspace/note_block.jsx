import React from "react";
import { Layer, Rect, Shape, Group } from "react-konva";
import { NOTE_NAME_TO_FREQ,
         ROW_IDX_TO_NOTE_NAME,
         FREQ_TO_COLOR,
         overlappingNote } from "../../../utils/editor_utils";
import _ from "lodash";

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.expandLeftStart = this.expandLeftStart.bind(this);
    this.expandLeftMove = this.expandLeftMove.bind(this);
    this.expandLeftEnd = this.expandLeftEnd.bind(this);

    this.expandRightStart = this.expandRightStart.bind(this);
    this.expandRightMove = this.expandRightMove.bind(this);
    this.expandRightEnd = this.expandRightEnd.bind(this);

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);

    this.drawLeftTriangle = this.drawLeftTriangle.bind(this);
    this.drawRightTriangle = this.drawRightTriangle.bind(this);
  }

  setCursor(type) {
    return (e) => {
      document.body.style.cursor = type;
    }
  }
  
  dragStart(evt) {
  }

  dragEnd(evt) {
    if (evt.target === this.refs.this) {
      // If there is already a note there, resize the block
      //  so that the end of the block matches the start of the
      //  previous block
      // Snap to nearest row
      // Alter the note information to match the new position/size
      let note = this.props.notes[this.props.idx];
      let tempNote = _.merge({}, note);

      let qbeat = Math.floor(evt.target.getAbsolutePosition().x / this.props.qbeatWidth);
      let deltaQbeat = qbeat - tempNote.starting_quarter_beat;

      let rowIdx = Math.floor((evt.target.getAbsolutePosition().y + (this.props.rowHeight / 2)) / this.props.rowHeight);
      let noteName = ROW_IDX_TO_NOTE_NAME[rowIdx];
      tempNote.freq = NOTE_NAME_TO_FREQ[noteName];

      tempNote.starting_quarter_beat = qbeat;
      tempNote.ending_quarter_beat += deltaQbeat;

      if (overlappingNote(tempNote, this.props.idx, this.props.notes)) {
        this.props.updateNoteInTrack(note); 
      }
      else {

        this.props.updateNoteInTrack(tempNote); 
      }
    } 
  }

  expandLeftStart(evt) {
  }

  expandLeftMove(evt) {
    let handle = evt.target; 
    let block = this.refs.block;
    
    let blockRight = block.getX() + block.getWidth();
    let handleRight = handle.getX() + handle.getWidth();
    block.setWidth(blockRight - handleRight);
    block.setX(handleRight);
  }

  expandLeftEnd(evt) {
    // Get the block's quarter beat from its position
    // Alter the note's quarter beat
    let start_qbeat = Math.floor(evt.target.getAbsolutePosition().x / this.props.qbeatWidth);
    let note = this.props.notes[this.props.idx];
    let tempNote = _.merge({}, note);
    tempNote.starting_quarter_beat = start_qbeat;
    
    if (overlappingNote(tempNote, this.props.idx, this.props.notes)) {
      this.props.updateNoteInTrack(note);
    }
    else {
      this.props.updateNoteInTrack(tempNote);
    }

  }

  expandRightStart(evt) {
  }

  expandRightMove(evt) {
    let handle = evt.target; 
    let block = this.refs.block;
    
    block.setWidth(handle.getX() - block.getX());
  }

  expandRightEnd(evt) {
    // Get the block's quarter beat from its position
    // Alter the note's quarter beat
    let end_qbeat = Math.ceil((evt.target.getAbsolutePosition().x + evt.target.getWidth()) / this.props.qbeatWidth);
    let note = this.props.notes[this.props.idx];
    let tempNote = _.merge({}, note);
    tempNote.ending_quarter_beat = end_qbeat;
    
    if (overlappingNote(tempNote, this.props.idx, this.props.notes)) {
      this.props.updateNoteInTrack(note);
    }
    else {
      this.props.updateNoteInTrack(tempNote);
    }
  }

  drawLeftTriangle() {
    let height = this.props.height;
    return function(ctx) {
      ctx.beginPath();
      ctx.moveTo(2, height/2);
      ctx.lineTo(8, 4);
      ctx.lineTo(8, height-4);
      ctx.closePath();
      ctx.fillStrokeShape(this);
    }
  }

  drawRightTriangle() {
    let height = this.props.height;
    return function(ctx) {
      ctx.beginPath();
      ctx.moveTo(8, height/2);
      ctx.lineTo(2, 4);
      ctx.lineTo(2, height-4);
      ctx.closePath();
      ctx.fillStrokeShape(this);
    }
  }

  componentDidMount() {
    function boundY(pos) {
      return {
        x: pos.x,
        y: this.getAbsolutePosition().y
      }
    }
    this.refs.leftHandle.setDragBoundFunc(boundY);
    this.refs.rightHandle.setDragBoundFunc(boundY);

    function setChildrenSize(deltaWidth) {
      let block = this.refs.block;
      block.setWidth(block.getWidth() + deltaWidth);
      let rightHandle = this.refs.rightHandle;
      rightHandle.setX(rightHandle.getX() + deltaWidth);
    }

    this.refs.this.setWidth = setChildrenSize.bind(this);
  }

  render() {
    return (
      <Group
        ref="this"
        draggable="true"
        x={this.props.x}
        y={this.props.y + 1}
        onClick={this.props.handleNoteBlockClick}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        >
        <Rect
          ref="block"
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height}
          stroke="black"
          strokeWidth="1"
          fill={FREQ_TO_COLOR[this.props.freq]}
          onMouseEnter={this.setCursor("move")}
          onMouseLeave={this.setCursor("default")}
        />
        <Group
          ref="leftHandle"
          draggable="true"
          x={0}
          y={0}
          onMouseEnter={this.setCursor("w-resize")}
          onMouseLeave={this.setCursor("default")}
          onDragStart={this.expandLeftStart}
          onDragMove={this.expandLeftMove}
          onDragEnd={this.expandLeftEnd}
        >
          <Rect
            ref="leftHandleRect"
            x={0}
            y={0}
            width={10}
            height={this.props.height}
            fill="#eeeeee"
            stroke="black"
            strokeWidth="1"
          />
          <Shape
            ref="leftHandleTriangle"
            sceneFunc={this.drawLeftTriangle()}
            fill="#777777"
          />
        </Group>
        <Group
          ref="rightHandle"
          draggable="true"
          x={this.props.width-10}
          y={0}
          onMouseEnter={this.setCursor("e-resize")}
          onMouseLeave={this.setCursor("default")}
          onDragStart={this.expandRightStart}
          onDragMove={this.expandRightMove}
          onDragEnd={this.expandRightEnd}
        >
          <Rect
            ref="rightHandle"
            x={0}
            y={0}
            width={10}
            height={this.props.height}
            fill="#eeeeee"
            stroke="black"
            strokeWidth="1"
          />
          <Shape
            ref="rightHandleTriangle"
            sceneFunc={this.drawRightTriangle()}
            fill="#777777"/>
        </Group>
      </Group>
    );
  }
}

export default NoteBlock;
