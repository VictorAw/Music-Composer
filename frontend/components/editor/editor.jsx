import React from "react";
import Workspace from "./workspace/workspace";

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor-container">
        <div className="editor-workspace-row">
          <Workspace
            track={this.props.track}
            selectedChannel={0}
          /> 
        </div>
      </div>
    );
  }
}

export default Editor;
