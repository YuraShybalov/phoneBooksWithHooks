import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container/Container';
import Phonebook from './Phonebook/Phonebook';

import defaultContacts from './data/contacts.json';
import Contacts from './Contacts/Contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? defaultContacts
  );

  const handleAddContact = (name, number) => {
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      return alert(`${name} is already in contact`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, newContact]);
  };
  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  return (
    <div>
      <Container title="Phonebook">
        <Phonebook handleAddContact={handleAddContact} />
      </Container>
      <Container>
        <Contacts contacts={contacts} handleDeleteContact={handleDelete} />
      </Container>
    </div>
  );
};

export default App;
