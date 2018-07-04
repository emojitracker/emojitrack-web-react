// @flow
import React from "react";
import EmojiMatrix from "./components/Matrix";

// import logo from './logo.svg';
import "./App.css";

// These defaults are defined in .env, but fallback here to make Flow happy
const _defaultRestApi = "https://api.emojitracker.com/v1";
const _defaultStreamApi = "https://stream.emojitracker.com";
const REST_API = process.env.REACT_APP_REST_API || _defaultRestApi;
const STREAM_API = process.env.REACT_APP_STREAM_API || _defaultStreamApi;

class App extends React.Component<{}> {
  render() {
    return (
      <EmojiMatrix
        source={REST_API + "/rankings"}
        stream={STREAM_API + "/subscribe/eps"}
      />
    );
  }
}

export default App;
