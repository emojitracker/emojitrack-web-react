import React from "react";
import EmojiMatrix from "./components/Matrix";
import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <EmojiMatrix
//         source={process.env.REACT_APP_REST_API + "/rankings"}
//         stream={process.env.REACT_APP_STREAM_API + "/subscribe/eps"}
//       />
//     );
//   }
// }

/*
Things seem to have changed in React land from above format, to below. Leaving
commented out for now as a reminder to myself to understand a bit about how
these defaults have evolved to aide in migrating my components with best
practices.
*/

const App: React.FC = () => {
  return (
    <EmojiMatrix
      source={process.env.REACT_APP_REST_API + "/rankings"}
      stream={process.env.REACT_APP_STREAM_API + "/subscribe/eps"}
    />
  );
};

export default App;
