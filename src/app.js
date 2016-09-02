import React from "react"
import ReactDOM from "react-dom"

const fakeData = [
    {"char":"😂","id":"1F602","name":"FACE WITH TEARS OF JOY","score":1397651871},
    {"char":"❤️","id":"2764","name":"HEAVY BLACK HEART","score":624547033},
    {"char":"♥️","id":"2665","name":"BLACK HEART SUIT","score":614600997},
    {"char":"😍","id":"1F60D","name":"SMILING FACE WITH HEART-SHAPED EYES","score":542582955},
    {"char":"😭","id":"1F62D","name":"LOUDLY CRYING FACE","score":402957193},
    {"char":"😊","id":"1F60A","name":"SMILING FACE WITH SMILING EYES","score":399685085},
    {"char":"😒","id":"1F612","name":"UNAMUSED FACE","score":396431595},
    {"char":"😘","id":"1F618","name":"FACE THROWING A KISS","score":320977411},
    {"char":"💕","id":"1F495","name":"TWO HEARTS","score":319657281},
    {"char":"☺️","id":"263A","name":"WHITE SMILING FACE","score":299525397},
    {"char":"😩","id":"1F629","name":"WEARY FACE","score":293557978},
    {"char":"👌","id":"1F44C","name":"OK HAND SIGN","score":280859947},
    {"char":"😔","id":"1F614","name":"PENSIVE FACE","score":248312894},
    {"char":"😏","id":"1F60F","name":"SMIRKING FACE","score":238971456},
    {"char":"😁","id":"1F601","name":"GRINNING FACE WITH SMILING EYES","score":233218261},
    {"char":"♻️","id":"267B","name":"BLACK UNIVERSAL RECYCLING SYMBOL","score":178759396}
];

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
    <EmojiMatrix source="http://emojitracker.com/api/rankings" />, root
    // <EmojiMatrix data={fakeData} />, root
);
