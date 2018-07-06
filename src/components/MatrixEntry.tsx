import * as React from "react";

export interface Props {
  char: string;
  name: string;
  score: number;
}

class MatrixEntry extends React.Component<Props> {
  /* commented out code in this component is working animation placeholder,
    preserving for the future but keeping off for now so we can focus on raw
    perf before adding that whole complexity in! */
  // constructor(props) {
  //   super(props);
  //   this.entryListItem = React.createRef();
  // }

  public shouldComponentUpdate(nextProps: Props) {
    return this.props.score !== nextProps.score;
  }

  public render() {
    return (
      // <li title={this.props.name} ref={this.entryListItem}>
      <div className="entry" title={this.props.name}>
        <div className="char emojifont">{this.props.char}</div>
        <div className="score">{this.props.score}</div>
      </div>
    );
  }

  public componentDidUpdate() {
    /* old animatin method, via timeout (no longer works well in chrome) */
    // this.entryListItem.current.classList.add("highlight-score-update");
    // setTimeout(() =>
    //   this.entryListItem.current.classList.remove("highlight-score-update")
    // );
    /* alternate animation method, manually triggering reflow */
    // this.entryListItem.current.classList.add("highlight-score-update");
    // void this.entryListItem.current.offsetWidth;
    // this.entryListItem.current.classList.remove("highlight-score-update");
  }
}

export default MatrixEntry;
