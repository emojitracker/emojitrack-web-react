import * as React from "react";

import EmojiMatrix from "./components/Matrix";

import "./App.css";
// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <EmojiMatrix
        source={process.env.REACT_APP_REST_API + "/rankings"}
        stream={process.env.REACT_APP_STREAM_API + "/subscribe/eps"}
      />
    );
  }
}

export default App;
