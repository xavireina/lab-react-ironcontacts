import "./App.css";
import contacts from "./contacts.json";
import { useState } from 'react'

function App() {

  const [firstNContacts, setContacts] = useState(contacts.slice(0, 5))

  const randomContact = () => {
    const newContact = contacts[Math.floor(Math.random()*contacts.length -1)]
    const isIncluded = firstNContacts.find(contact => contact.name === newContact.name)
    if (!isIncluded) setContacts([newContact, ...firstNContacts])
    else randomContact();
  }

  const sortPopularity = () => {
    setContacts(contacts => {
      const sortedPopularity = contacts.sort((a,b) => b.popularity - a.popularity)
      return [... sortedPopularity]
    })
  }

  const sortName = () => {
    setContacts(contacts => {
      const sortedNames = contacts.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
      return [...sortedNames]
    })
  }

  const deleteContact = (id) => {
    const filteredContacts = firstNContacts.filter((contact) => {
      return contact.id !== id
    })
    setContacts(filteredContacts)
  }
  return <div className="App">

<h1>IronContacts</h1>

<button onClick={randomContact}> Add Random Contact</button>
<button onClick={sortPopularity}>Sort by popularity</button>
<button onClick={sortName}>Sort by name</button>

<table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
       {firstNContacts.map(contact => {

       return (
        <tbody>
          <td>
            <img src={contact.pictureUrl} alt='' height='150' />
          </td>
          <td>{contact.name}</td>
          <td>{contact.popularity.toFixed(2)}</td>
          <td>{contact.wonOscar ?  <p>🏆</p> : <p></p> }</td>
          <td>{contact.wonEmmy ?  <p>🏆</p> : <p></p> }</td>
          <td> <button onClick={() => deleteContact(contact.id)}> Delete </button></td>
        </tbody>

       )})}
      </table>
  </div>;
}
export default App;
