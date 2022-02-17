import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./render";
console.log('👋 This message is being logged by "renderer.js", included via webpack');

ReactDOM.render(<App />, document.body);
