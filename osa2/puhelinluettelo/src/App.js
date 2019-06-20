import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

  useEffect(() => {
    personService
      .getAll()
        .then(initial => setPersons(initial))
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
        })
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
          })
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(whatever => setPersons(persons.filter(p => p.id !== person.id))
          )
    }
  }

  const rows = () =>  persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(p => <div key={p.name}>{p.name} {p.number} <button onClick={() => handleDelete(p)}>Delete</button></div>)

  return (
    <div>
      <h1>Phonebook</h1>
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