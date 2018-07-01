import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

let eventSource;

class EmojiMatrix extends React.Component {
  static propTypes = {
    stream: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.source = eventSource
      ? eventSource
      : new EventSource(this.props.stream);

    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    var req = new Request(this.props.source);
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ data: data });
      });
    });

    this.source.addEventListener("message", this.handleData, false);
    this.source.onerror = err => console.log(err, "**** error");
  }

  componentWillUnmount() {
    this.source.close();
  }

  handleData(message) {
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      const newData = JSON.parse(message.data);
      Object.keys(newData).forEach(key => {
        // use Array.some to avoid processing entire array every time
        newState.data.some(obj => {
          if (obj.id === key) {
            obj.score += newData[key];
            return true;
          }
          return false;
        });
      });

      return {
        data: newState.data
      };
    });
  }

  render() {
    var matrixEntries = this.state.data.map(entry => {
      const { id, score, char, name } = entry;
      return <MatrixEntry key={id} score={score} char={char} name={name} />;
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
