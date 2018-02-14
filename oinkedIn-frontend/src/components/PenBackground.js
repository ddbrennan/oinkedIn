import React from 'react'


const PenBackground = () => {
  return(
    <div id="the-pen">

      <div id="top-stuff">
        <img id="top-bar" src={require("../images/PigPen-long.svg")} />
        <img id="post-mid-top" src={require("../images/PigPen_post-mid-top.svg")} />
      </div>

      <div id="bottom-stuff">
        <img id="bottom-bar" src={require("../images/PigPen-long.svg")} />
        <img id="post-mid-bottom" src={require("../images/PigPen_post-mid-bottom.svg")} />
      </div>

      <div id="left-stuff">
        <svg id="left-bar" height="97vh" width="12%">
          <rect x="1%" y="1%" width="100%" height="100%"
          style={{fill: "rgb(104,69,43)", stroke: "black", "stroke-width": 5}}/>
        </svg>
        <svg id="left-bar-2" height="97vh" width="12%">
          <rect x="1%" y="1%" width="100%" height="100%"
          style={{fill: "rgb(104,69,43)", stroke: "black", "stroke-width": 5}}/>
        </svg>
        <img id="post-mid-left" src={require("../images/PigPen_post-mid-left.svg")} />
      </div>

      <div id="right-stuff">
        <svg id="right-bar" height="97vh" width="12%">
          <rect x="1%" y="1%" width="100%" height="100%"
          style={{fill: "rgb(104,69,43)", stroke: "black", "stroke-width": 5}}/>
        </svg>
        <svg id="right-bar-2" height="97vh" width="12%">
          <rect x="1%" y="1%" width="100%" height="100%"
          style={{fill: "rgb(104,69,43)", stroke: "black", "stroke-width": 5}}/>
        </svg>
        <img id="post-mid-right" src={require("../images/PigPen_post-mid-right.svg")} />
      </div>

      <img id="post-corn-bl" src={require("../images/PigPen_post-corn-bl.svg")} />
      <img id="post-corn-tl" src={require("../images/PigPen_post-corn-tl.svg")} />
      <img id="post-corn-br" src={require("../images/PigPen_post-corn-br.svg")} />
      <img id="post-corn-tr" src={require("../images/PigPen_post-corn-tr.svg")} />

      <div id="grass"></div>
      </div>
  )
}

export default PenBackground
