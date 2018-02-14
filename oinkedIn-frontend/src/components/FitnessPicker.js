import React from "react";


const FitnessPicker = (props) => {
  return (
    <div id="fitness-picker">
      <form>
        <label>Less Toned
        <input type="radio" checked={ 0 === props.fitness } value="0" onChange={props.handleFitnessChoice}/></label>
        <label>Reasonably Toned
        <input type="radio" checked={ 1 === props.fitness } value="1" onChange={props.handleFitnessChoice}/></label>
        <label>Very Toned
        <input type="radio" checked={ 2 === props.fitness } value="2" onChange={props.handleFitnessChoice}/></label>
      </form>
    </div>
  )
}
export default FitnessPicker
