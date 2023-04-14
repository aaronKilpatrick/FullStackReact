import {useState} from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <p>
        The app is used by pressing the buttons
      </p>
    )
  }
  return (
    <p>
      Button Press History: {props.allClicks.join(' ')}
    </p>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(left + 1)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(right + 1)
    setTotal(updatedRight + left)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      {right}

      <History allClicks={allClicks} />
      <p>Total Clicks: {total}</p>
    </div>
  )
}
export default App;
