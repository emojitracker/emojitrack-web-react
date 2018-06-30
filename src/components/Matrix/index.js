import React from 'react';
import "./styles.css";

class EmojiMatrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        var req = new Request(this.props.source);
        fetch(req).then( (response) => {
            response.json().then( (data) => {
                this.setState({ data: data });
            });
        });
    }

    render() {
        var matrixEntries = this.state.data.map( entry => {
            const { id, score, char, name } = entry;
            return <MatrixEntry key={id} score={score} char={char} name={name} />
        });

        return (
            <div id="emojiMatrix">
                <ul>
                {matrixEntries}
                </ul>
            </div>
        );
    }
};

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
