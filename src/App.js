import React, { Component } from "react";
import EmojiMatrix from "./components/Matrix";

// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  render() {
    return (
      <EmojiMatrix
        source={process.env.REACT_APP_REST_API + "/rankings"}
        stream={process.env.REACT_APP_STREAM_API + "/subscribe/eps"}
      />
    );
  }
}

export default App;
