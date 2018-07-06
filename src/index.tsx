import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

/* serviceWorker is disabled to avoid caching in production while we're still
   working on the initial version...
   TODO: re-enable serviceWorker when/if closer to launch. */
// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

/* serviceWorker is disabled to avoid caching in production while we're still
   working on the initial version...
   TODO: re-enable serviceWorker when/if closer to launch. */
// registerServiceWorker();
