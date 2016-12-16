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
    document.body.style.cursor = "crosshair";
  }

  handleMouseLeave() {
    this.setState({
      highlight: false
    });
    document.body.style.cursor = "default";
  }

  render() {
    let color = this.props.color;
    if (this.state.highlight) {
      color = "white"
    }
    
    return (
      <Rect
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
