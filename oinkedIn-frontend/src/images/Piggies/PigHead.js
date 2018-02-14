import React from 'react'

const PigHead = (props) => {
return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.3 165.6">
  <path d="M81.1 2.5c-62 0-80 58-78.5 93.5.8 20.1 20 65 72 67s82-31 85-68S124.8 2.5 81.1 2.5z" fill={ props.color } stroke="#000" stroke-width="5" stroke-miterlimit="10"/>
  <circle cx="114.2" cy="62.5" r="9.2" stroke="#000" stroke-miterlimit="10"/>
  <circle cx="47.5" cy="62.5" r="9.2" stroke="#000" stroke-miterlimit="10"/>
  <ellipse transform="rotate(-45 110.625 57.7099)" cx="110.6" cy="57.7" rx="3.4" ry="1.5" fill="#fff"/>
  <ellipse cx="107.9" cy="62.9" rx=".7" ry="1.2" fill="#fff"/>
  <ellipse transform="rotate(-45 43.8328 57.7091)" cx="43.8" cy="57.7" rx="3.4" ry="1.5" fill="#fff"/>
  <ellipse cx="41.1" cy="62.9" rx=".7" ry="1.2" fill="#fff"/>
</svg>)
}

export default PigHead
