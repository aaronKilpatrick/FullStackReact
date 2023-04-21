import { useState } from 'react'

const AnecdoteDisplay = ({heading, anecdote, points}) => {
  return (
    <div>
      <h2>{heading}</h2>
      <p>{anecdote}</p>
      <p>Has {points} votes</p>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleSelected = () => {
    const randomSelection = Math.floor( Math.random() * anecdotes.length )
    setSelected( randomSelection )
  }

  const handleVote = () => {
      const newPoints = [...points]
      newPoints[selected] += 1
      setPoints(newPoints)
  }

  const indexMostPoints = points.indexOf( Math.max( ...points ) )

  return (
    <div>
      <AnecdoteDisplay
        heading="Anecdote of the Day"
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={handleSelected} text="Next Anecdote" />
      <AnecdoteDisplay
        heading="Anecdote with Most Votes"
        anecdote={anecdotes[indexMostPoints]}
        points={points[indexMostPoints]}
      />
    </div>
  )
}

export default App;
