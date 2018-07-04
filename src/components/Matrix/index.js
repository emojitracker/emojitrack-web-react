// @flow
import React from "react";
import "./styles.css";

type Props = {
  source: string,
  stream: string
};

type State = {
  matrixItemIds: Array<string>,
  matrixItems: { [id: string]: MatrixItem }
  // TODO: maybe replace above with a ES6 map, as they preserve order and thus can get rid of
  // the Ids array! Yay for being forced to think about types!...
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  //
  // ...but maybe not for updating state?? :(
  // https://stackoverflow.com/questions/49532382/correct-modification-of-es6-map-through-setstate
};

type MatrixItem = {
  id: string, // hyphenated codepoint id for emoji
  name: string, // the textual representation name of the emoji
  char: string, // rendered unicode string for the emoji glyph
  score: number // current score
};

// type ScoreUpdate = {
//   id: string,
//   val: number
// };

class EmojiMatrix extends React.Component<Props, State> {
  scoreUpdates: any; //EventSource;
  // TODO: flow doesnt seem to recognize EventSource?! https://github.com/facebook/flow/issues/6493

  constructor(props: Props) {
    super(props);
    this.state = { matrixItemIds: [], matrixItems: {} };
    this.scoreUpdates = null;
  }

  componentDidMount() {
    var req = new Request(this.props.source);
    fetch(req).then(response => {
      response
        .json()
        .then(data => {
          let initialMatrixItemIds = [];
          let initialMatrixItems: { [id: string]: MatrixItem } = {};

          for (const record of data) {
            initialMatrixItemIds.push(record.id);
            const entry: MatrixItem = {
              id: record.id,
              name: record.name,
              char: record.char,
              score: record.score
            };
            initialMatrixItems[record.id] = entry;
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

  parseStreamUpdate(data: any) {
    const update = JSON.parse(data);
    this.setState((prevState, props) => {
      /* TODO: need to profile, but I suspect this is where some of the inefficiency is,
      since updating state without mutation involves a heck of a lot of object creation
      and I'm guessing maybe heap allocation / gc pressure? */
      let updatedItems: { [id: string]: MatrixItem } = {};
      for (const [k, v] of Object.entries(update)) {
        if (typeof k === "string" && typeof v === "number") {
          // use type refinements to check at runtime
          updatedItems[k] = { ...prevState.matrixItems[k] };
          updatedItems[k].score += v;
        }
      }
      const mergedItems = { ...prevState.matrixItems, ...updatedItems };
      return { matrixItems: mergedItems };
    });
  }

  startStreaming() {
    // $FlowFixMe: f u flow, facebook never heard of eventsource?!
    this.scoreUpdates = new EventSource(this.props.stream);
    this.scoreUpdates.onmessage = (event: MessageEvent) => {
      this.parseStreamUpdate(event.data);
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

    return <div id="emojiMatrix">{matrixEntries}</div>;
  }
}

class MatrixEntry extends React.Component<{
  name: string,
  char: string,
  score: number
}> {
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
      <div className="entry" title={this.props.name}>
        <div className="char emojifont">{this.props.char}</div>
        <div className="score">{this.props.score}</div>
      </div>
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
