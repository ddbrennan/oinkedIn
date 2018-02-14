import React from "react";
import { Link } from 'react-router-dom'

const PigPenItem = (props) => {

  return (
    <div onClick={() => props.handlePigPenChoice(props.pigPen)}>
      <div className="pig-pen-item">
        <h2>{props.pigPen.name}</h2>
        <p>{props.pigPen.description}</p>
        <p>{`${props.pigPen.pig_pen_pigs.length} Pigs in this Pen`}</p>
      </div>
    </div>
  )
}
export default PigPenItem
