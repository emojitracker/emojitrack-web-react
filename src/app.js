import React from "react"
import ReactDOM from "react-dom"

const REST_API   = process.env.REST_API   || "http://emojitracker.com/api"; // TODO: migrate to prod v1
const STREAM_API = process.env.STREAM_API || "http://stream.emojitracker.com";

var EmojiMatrix = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },

    componentDidMount: function () {
        var req = new Request(this.props.source);
        fetch(req).then( (response) => {
            response.json().then( (data) => {
                this.setState({ data: data });
            });
        });
    },

    render: function() {
        var matrixEntries = this.state.data.map( entry => {
            const { id, score, char, name } = entry;
            return <MatrixEntry key={id} initialScore={score} char={char} name={name} />
        });

        return (
            <div id="emojiMatrix">
                <ul>
                {matrixEntries}
                </ul>
            </div>
        );
    }
});

var MatrixEntry = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        return (
            <li title={this.props.name}>
                <div className="char">{this.props.char}</div>
                <div className="score">{this.props.initialScore}</div>
            </li>
        );
    }
});

ReactDOM.render(
    <EmojiMatrix source={REST_API + "/rankings"} />, root
);
