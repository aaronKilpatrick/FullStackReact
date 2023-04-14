import {useState} from 'react'

const Heading = ({heading}) => <h1>{heading}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Total = ({text, total}) => <p>{text}: {total}</p>

const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Heading heading="Give Feedback" />
      <div>
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick} text="Neutral"/>
        <Button handleClick={handleBadClick} text="Bad"/>
      </div>

      <Heading heading="Statistics" />

      <div>
        <Total text="Good" total={good} />
        <Total text="Neutral" total={neutral} />
        <Total text="Bad" total={bad} />
      </div>
    </div>
    
  )
}

export default App;
