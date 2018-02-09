import React from "react";
import Shape from "./Shape"
import { API_ROOT, HEADERS } from './constants';
import { ActionCable } from 'react-actioncable-provider';

class ShapeArena extends React.Component {
  state = {
    shapes: [],
    generatedShape: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/shapes`)
      .then(res => res.json())
      .then(shapes => this.setState({ shapes }), console.log(this.state.shapes, "hi"));
  };

  handleReceivedShape = response => {
    const { shape } = response;
    // console.log("received: ", shape)

    let foundShape = this.state.shapes.find(s => s.id === shape.id)
    let arr = this.state.shapes

    if (foundShape) {
      // console.log("old array: ", arr)
      const new_arr = arr.map(s => {
        if (s.id === shape.id) {
          return shape
        } else {
          return s
        }
      })

      // console.log("new array: ", new_arr)

      this.setState({
        shapes: new_arr
      });

    } else {
      this.setState({
        shapes: [...arr, shape]
      });
      // console.log('new shape')
    }
  };

  addShape = async () => {
    if (!this.state.generatedShape) {
      let id = this.fakeId()
      let newShape = { x_coord: 50, y_coord: 50, id: id }

      await fetch(`${API_ROOT}/shapes`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(newShape)
      })

      await this.setState({
        generatedShape: id
      })

    }
  }

  fakeId = () => {
    let time = new Date()
    return "" + time.getHours() + time.getMinutes() + time.getSeconds()
  }

  updateShape = (id, x, y) => {
    let arr = this.state.shapes
    let shape = arr[arr.findIndex(s => s.id === id)]
    // console.log(id, x, y);
    // console.log(arr)
    // console.log(arr[arr.findIndex(s => s.id === id)])
    // console.log("first", shape, id)

    shape.x_coord = x
    shape.y_coord = y

    // console.log("second", shape, id)

    fetch(`${API_ROOT}/shapes/${shape.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(shape)
    })

    this.setState({
      shapes: arr
    })
  }

  render() {
    const shapes = this.state.shapes
    // console.log(shapes)
    return (
      <div>
        <button onClick={ this.addShape }>Add Shape</button>
        <div>
          <ActionCable
         channel={{ channel: 'ShapesChannel' }}
         onReceived={this.handleReceivedShape}
         />
       {this.state.shapes.map(s => <Shape
            activeShape={parseInt(s.id) === parseInt(this.state.generatedShape)}
            key={s.id}
            id={s.id}
            x={s.x_coord}
            y={s.y_coord}
            color={s.id % 2 ? "blue" : "red"}
            updateShape={this.updateShape}/>)}
        </div>
      </div>
    )
  }
}

export default ShapeArena
