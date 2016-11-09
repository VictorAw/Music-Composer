import React from "react";
import { Rect, Line } from "react-konva";

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlight: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      highlight: true
    });
  }

  handleMouseLeave() {
    this.setState({
      highlight: false
    });
  }

  render() {
    let color = this.props.color;
    if (this.state.highlight) {
      color = "white"
    }
      
    return (
      <Rect
        draggable="false"
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={color}
        drawBorder={this.state.highlight}
        onClick={this.props.handleRowClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}/>
    );
  }
}

export default Row;
