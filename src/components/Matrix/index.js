import React from "react";
import "./styles.css";

class EmojiMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matrixItemIds: [], matrixItems: {} };
  }

  componentDidMount() {
    var req = new Request(this.props.source);
    fetch(req).then(response => {
      response
        .json()
        .then(data => {
          let initialMatrixItemIds = [];
          let initialMatrixItems = {};
          for (const record of data) {
            initialMatrixItemIds.push(record.id);
            initialMatrixItems[record.id] = {
              id: record.id,
              name: record.name,
              char: record.char,
              score: record.score
            };
          }
          this.setState({
            matrixItemIds: initialMatrixItemIds,
            matrixItems: initialMatrixItems
          });
        })
        .then(() => {
          this.startStreaming();
        });
    });
  }

  componentWillUnmount() {
    this.stopStreaming();
  }

  startStreaming() {
    this.scoreUpdates = new EventSource(
      `${process.env.REACT_APP_STREAM_API}/subscribe/eps`
    );

    this.scoreUpdates.onmessage = event => {
      const update = JSON.parse(event.data);
      this.setState((prevState, props) => {
        /* TODO: need to profile, but I suspect this is where some of the inefficiency is,
        since updating state without mutation involves a heck of a lot of object creation
        and I'm guessing maybe heap allocation / gc pressure? */
        let updatedItems = {};
        for (const [k, v] of Object.entries(update)) {
          updatedItems[k] = { ...prevState.matrixItems[k] };
          updatedItems[k].score += v;
        }
        const mergedItems = { ...prevState.matrixItems, ...updatedItems };
        return { matrixItems: mergedItems };
      });
    };
  }

  stopStreaming() {
    this.scoreUpdates.close();
  }

  render() {
    const matrixEntries = this.state.matrixItemIds.map(id => {
      const c = this.state.matrixItems[id];
      return (
        <MatrixEntry key={c.id} score={c.score} char={c.char} name={c.name} />
      );
    });

    return (
      <div id="emojiMatrix">
        <ul>{matrixEntries}</ul>
      </div>
    );
  }
}

class MatrixEntry extends React.Component {
  /* commented out code in this component is working animation placeholder,
  preserving for the future but keeping off for now so we can focus on raw
  perf before adding that whole complexity in! */
  // constructor(props) {
  //   super(props);
  //   this.entryListItem = React.createRef();
  // }

  shouldComponentUpdate(nextProps, _nextState) {
    return this.props.score !== nextProps.score;
  }

  render() {
    return (
      // <li title={this.props.name} ref={this.entryListItem}>
      <li title={this.props.name}>
        <span className="char emojifont">{this.props.char}</span>
        <span className="score">{this.props.score}</span>
      </li>
    );
  }

  componentDidUpdate() {
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

export default EmojiMatrix;
