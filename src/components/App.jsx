import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container';
import ContactForm from './Form/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const nameFilter = this.state.contacts.some(nameContact => nameContact.name === name);

    const contact = {
      id: nanoid(),
      name,
      number,
    }

    if (nameFilter) {
      alert(`${name} is already in contacts`)
    }
    else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact]
      }));
    }
  }

  handlerFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => (
        contact.id !== contactId
      ))
    }))
  }

  render() {
    const { filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleList = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handlerFilter} />
        <ContactList value={visibleList} onDeleteContact={this.deleteContact} />
      </Container>
    )
  }
};

export default App;