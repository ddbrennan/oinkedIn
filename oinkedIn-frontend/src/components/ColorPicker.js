import React from "react";


const colors = [{"yellow": "#F7C45E"}, {"pink": "#EF8C7B"}, {"green": "#699B23"}, {"blue": "#50AEE2"}, {"purple": "#7D2FC1"}, {"red": "#D3313D"}, {"grey": "#696969"}]

const ColorPicker = (props) => {
  return (
    <div className="color-picker">
      {colors.map(col => <div key={Object.keys(col)[0]} id={Object.keys(col)[0]} style={{"backgroundColor": Object.values(col)[0] } } onClick={() => props.handleColorChoice(col)}/>)}
    </div>
  )
}
export default ColorPicker
