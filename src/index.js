import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

function generateCodeFromObject(obj) {
  let ans_str = "<";
  ans_str += obj.name + "";
  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    ans_str += " style{{";
    let style_keys = Object.keys(obj.style);
    for (let i = 0; i < Object.keys(obj.style).length; i++) {
      ans_str +=
        camelize(style_keys[i]) + ':"' + obj.style[style_keys[i]] + '",';
    }
    ans_str = ans_str.substr(0, ans_str.length - 1) + "}}";
  }
  //console.log(obj.children!=undefined && obj.children.length>0);
  if (obj.children !== undefined && obj.children.length > 0) {
    ans_str += ">\n";
    obj.children.forEach((ele) => {
      ans_str += generateCodeFromObject(ele);
    });
    ans_str += "</" + obj.name + ">\n";
  } else {
    ans_str += ">\n";
  }
  return ans_str;
  //return a code generated string
}
camelize = function camelize(str) {
  return str.replace(/\W+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
};

module.exports = generateCodeFromObject;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
