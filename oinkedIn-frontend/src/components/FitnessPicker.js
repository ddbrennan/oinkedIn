import React from "react";


const FitnessPicker = (props) => {
  return (
    <div id="fitness-picker">
      <h3>How fit is your pig?</h3>
      <form>
        <input type="radio" checked={ 0 === props.fitness } value="0" label="Less Toned" onChange={props.handleFitnessChoice}/>
        <input type="radio" checked={ 1 === props.fitness } value="1" label="Reasonably Toned" onChange={props.handleFitnessChoice}/>
        <input type="radio" checked={ 2 === props.fitness } value="2" label="Very Toned" onChange={props.handleFitnessChoice}/>
      </form>
    </div>
  )
}
export default FitnessPicker
