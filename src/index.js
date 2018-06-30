import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/* serviceWorker is disabled to avoid caching in production while we're still
   working on the initial version...
   TODO: re-enable serviceWorker when/if closer to launch. */
// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
/* serviceWorker is disabled to avoid caching in production while we're still
   working on the initial version...
   TODO: re-enable serviceWorker when/if closer to launch. */
// registerServiceWorker();
