import EmojiMatrix from "./components/Matrix"

import React from "react"
import ReactDOM from "react-dom"

const REST_API   = process.env.REST_API   || "http://emojitracker.com/api"; // TODO: migrate to prod v1
const STREAM_API = process.env.STREAM_API || "http://stream.emojitracker.com";

ReactDOM.render(
    <EmojiMatrix source={REST_API + "/rankings"} />, root
);
