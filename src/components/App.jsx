import { nanoid } from 'nanoid';
import { useState, useEffect, useMemo } from 'react';

import Container from './Container';
import { ContactFormed } from './Form/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

// const LS_KEY = 'raeder_item_index';

export default function App() {
  const initialState = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContact] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initialState
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const nameFilter = contacts.map(contact => contact.name);
    if (nameFilter.includes(name)) {
      alert(`${name} is already in contacts`)
    }
    else {
      const contact = {
        id: nanoid(),
        name,
        number,
      }
      setContact(prevState => [...prevState, contact]);
    }
  }

  const handlerFilter = e => {
    setFilter(e.target.value)
  }

  const deleteContact = contactId => {
    setContact(prevState => {
      return prevState.filter(contact => (
        contact.id !== contactId
      ))
    });
  };

  const filteredPlanets = useMemo(
    () => {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter) || contact.name.toUpperCase().includes(filter))
    },
    [contacts, filter]
  );

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactFormed
        addContact={addContact}
      />

      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={handlerFilter}
      />
      <ContactList
        value={filteredPlanets}
        onDeleteContact={deleteContact}
      />
    </Container>
  )
}