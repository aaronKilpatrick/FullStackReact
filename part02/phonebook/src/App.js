import { useState, useEffect } from 'react'
import servicePersons from './services/persons'

const Notification = ({message}) => {
  if (message === null)
    return null

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

    return (
      <div style={style}>
        {message}
      </div>
    )
}

const SearchForm = ({newSearch, handleSearchChange}) => {
  return (
    <div>
        filter show with <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const AddPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        Name: <input value={props.name} onChange={props.handleNameChange} />
      </div>
      <div>
        Number: <input value={props.number} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const PeopleList = ({people, deletePerson}) => {
  return (
    <div>
      {people.map(person => 
        <Person 
          key={person.name} 
          name={person.name} 
          number={person.number} 
          id={person.id}
          deletePerson={deletePerson}
        />
      )}
    </div>
  )
}

const Person = ({name, number, id, deletePerson}) => {
  return (
    <div>
      {name} {number}
      <button onClick={() => deletePerson(id, name)}>Delete</button>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    servicePersons
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicatePerson = people.find(person => person.name === newName)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (duplicatePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        servicePersons
          .updateById(duplicatePerson.id, personObject)
          .then(returnedPerson => {
            setPeople(people.map(p => p.id !== duplicatePerson.id ? p : returnedPerson))
            event.target.value = ''
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    servicePersons
      .create(personObject)
      .then(createdPerson => {
        setPeople(people.concat(createdPerson))
        
        event.target.value = ''
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${createdPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id, name) => {
    if (! window.confirm(`Delete ${name}?`)) return

    servicePersons
      .deleteById(id)
      .then(() => {
        setPeople(people.filter(p => p.id !== id)) 
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value)
  }

  const searchList = people.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  const peopleToList = newSearch ? searchList : people

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <SearchForm 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a new person</h2>
      <AddPersonForm
        addPerson={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PeopleList people={peopleToList} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
