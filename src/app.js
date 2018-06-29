import React, { Component } from 'react';
import EmojiMatrix from "./components/Matrix"

// import logo from './logo.svg';
import './App.css';

/* TODO: there is probably a better way to import these now these days? */
const REST_API   = process.env.REST_API   || "http://emojitracker.com/api"; // TODO: migrate to prod v1
const STREAM_API = process.env.STREAM_API || "http://stream.emojitracker.com";

class App extends Component {
  render() {
    return (
      <EmojiMatrix source={REST_API + "/rankings"} />
    );
  }
}

export default App;
