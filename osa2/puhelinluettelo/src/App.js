import React, { useState } from 'react'

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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 123' },
    { name: 'Peter Parker', number: '321 321' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let existing = persons.some(p => p.name.toLowerCase() === newName.toLowerCase() )
    if (!existing) {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
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

  const rows = () =>  persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(p => <div key={p.name}>{p.name} {p.number}</div>)

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