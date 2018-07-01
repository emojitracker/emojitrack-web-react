import React from "react";
import "./styles.css";

class EmojiMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scores: {} };
  }

  componentDidMount() {
    var req = new Request(this.props.source);
    fetch(req).then(response => {
      response
        .json()
        .then(data => {
          let initialScores = {};
          for (const record of data) {
            initialScores[record.id] = {
              id: record.id,
              name: record.name,
              char: record.char,
              score: record.score
            };
          }
          this.setState({ scores: initialScores });
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
        let newScores = Object.assign({}, prevState.scores);
        for (const [k, v] of Object.entries(update)) {
          newScores[k].score += v;
        }
        return { scores: newScores };
      });
    };
  }

  stopStreaming() {
    this.scoreUpdates.close();
  }

  render() {
    const matrixEntries = Object.keys(this.state.scores).map(id => {
      const c = this.state.scores[id];
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

class MatrixEntry extends React.PureComponent {
  render() {
    return (
      <li title={this.props.name}>
        <span className="char">{this.props.char}</span>
        <span className="score">{this.props.score}</span>
      </li>
    );
  }
}

export default EmojiMatrix;
