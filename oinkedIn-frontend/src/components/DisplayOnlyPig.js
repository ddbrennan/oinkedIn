import React from "react";
import VideoChat from "./VideoChat"
import { API_ROOT, HEADERS } from '../constants';



const DisplayOnlyPig = (props) => {

  // figure out greased and fitness

  return (
    <div className="body-display" style={{
        "color": props.color,
      }}>
    	<div className="face">
    		<div className="left_ear"></div>
    		<div className="right_ear"></div>
    		<div className="eyes"></div>
    		<div className="nose"></div>
    	</div>
    	<div className="stomach">
    		<div className="left_leg"></div>
    		<div className="right_leg"></div>
    	</div>
    	<div className="tail"></div>
    </div>
  )
}
export default DisplayOnlyPig
