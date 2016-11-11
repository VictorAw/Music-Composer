import React from "react";
import { Layer, Rect, Group } from "react-konva";
import { NOTE_NAME_TO_FREQ,
         ROW_IDX_TO_NOTE_NAME } from "../../../utils/editor_utils";

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
  }

  setCursor(type) {
    return (e) => {
      document.body.style.cursor = type;
    }
  }

  dragStart(evt) {
    
  }

  dragEnd(evt) {
    // Validation checks
    // Snap to nearest quarter_beat
    // If there is already a note there, resize the block
    //  so that the end of the block matches the start of the
    //  previous block
    // Snap to nearest row
    // Alter the note information to match the new position/size
    let qbeat = Math.floor(evt.target.getAbsolutePosition().x / this.props.qbeatWidth);
    let rowIdx = Math.floor((evt.target.getAbsolutePosition().y + (this.props.rowHeight / 2)) / this.props.rowHeight);
    let thisNote = this.props.notes[this.props.idx];

    thisNote.starting_qbeat = qbeat;
    let noteName = ROW_IDX_TO_NOTE_NAME[rowIdx];
    thisNote.freq = NOTE_NAME_TO_FREQ[noteName];
    
    this.props.updateNoteInTrack(thisNote);  
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
    let qbeat = Math.floor(evt.target.layerX / this.props.qbeatWidth);
    let thisNote = this.props.notes[this.props.idx];
    console.log(this.props.notes);
    console.log(this.props.idx);
    let freq = thisNote.freq;
    thisNote.starting_quarter_beat = qbeat;
    this.props.notes.forEach((note, idx) => {
      if (note.freq === freq && 
          idx !== this.props.idx &&
          note.ending_quarter_beat > qbeat) {
        thisNote.starting_quarter_beat = note.ending_quarter_beat;
      }
    });

    this.props.updateNoteInTrack(thisNote);
  }

  expandRightStart(evt) {
  }

  expandRightMove(evt) {
    let handle = evt.target; 
    let block = this.refs.block;
    
    block.setWidth(handle.getX() - block.getX());
  }

  expandRightEnd(evt) {
    // Get the block's next quarter beat from its position
    // ALter the note's quarter beat
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
        draggable="true"
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
          fill="blue"
          onMouseEnter={this.setCursor("move")}
          onMouseLeave={this.setCursor("default")}
        />
        <Rect
          ref="leftHandle"
          draggable="true"
          x={0}
          y={0}
          width={10}
          height={this.props.height}
          fill="red"
          onMouseEnter={this.setCursor("w-resize")}
          onMouseLeave={this.setCursor("default")}
          onDragStart={this.expandLeftStart}
          onDragMove={this.expandLeftMove}
          onDragEnd={this.expandLeftEnd}
        />
        <Rect
          ref="rightHandle"
          draggable="true"
          x={this.props.width-10}
          y={0}
          width={10}
          height={this.props.height}
          fill="red"
          onMouseEnter={this.setCursor("e-resize")}
          onMouseLeave={this.setCursor("default")}
          onDragStart={this.expandRightStart}
          onDragMove={this.expandRightMove}
          onDragEnd={this.expandRightEnd}
        />
      </Group>
    );
  }
}

export default NoteBlock;
