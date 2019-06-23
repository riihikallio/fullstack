import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Filter = ({filter, handler}) => (
  <p>Filter shown with <input 
      value={filter}
      onChange={handler}
  /></p>
)

const Form = ({submit, name, nameHandler, number, numberHandler}) => (
  <form onSubmit={submit}>
  <div>
    name: <input 
      value={name}
      onChange={nameHandler} />
  </div>
  <div>
    number: <input
      value={number}
      onChange={numberHandler} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Persons = ({rows}) => (
  <div>
    {rows}
  </div>
)

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const setError = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
        .then(initial => setPersons(initial))
        .catch(setError('Retrieving list...'))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase() )
    if (!existing) {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      personService
        .create(person)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          setError(`'${person.name}' added`)
        })
        .catch(setError(`Error adding '${person.name}'`))
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old phone number with the new one?`)) {
        const replacing = {...existing, number: newNumber}
        personService
          .update(replacing)
          .then(returned => {
            const newList = persons.filter(p => p.id !== existing.id)
            newList.push(replacing)
            setPersons(newList)
            setNewName('')
            setNewNumber('')
            setError(`'${replacing.name}' edited`)
          })
          .catch(setError(`Error adding '${replacing.name}'`))
      }
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(whatever => {
          setPersons(persons.filter(p => p.id !== person.id))
          setError(`'${person.name}' was deleted`)
        })
        .catch(setError(`Error deleting '${person.name}'`))
    }
  }

  const rows = () =>  persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(p => <div key={p.name}>{p.name} {p.number} <button onClick={() => deletePerson(p)}>Delete</button></div>)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <h2>Filter</h2>
      <Filter 
        filter={filter}
        handler={handleFilterChange}
      />
      <h2>Add a new</h2>
      <Form
        submit={addPerson}
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        rows={rows()}
      />
    </div>
  )
}

export default App