import {useState} from 'react'

const Heading = ({heading}) => <h1>{heading}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, total}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{total}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>No Feedback Given</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" total={good} />
        <StatisticLine text="Neutral" total={neutral} />
        <StatisticLine text="Bad" total={bad} />
        <StatisticLine text="Average" total={(good - bad) / total} />
        <StatisticLine text="Positive" total={( good / total ) * 100} />
      </tbody>
    </table>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    
  )
}

export default App;
