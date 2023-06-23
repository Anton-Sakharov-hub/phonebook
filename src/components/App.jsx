import { useState } from 'react';
import Form from './Form';
import Filter from './Filter';
import Section from './Section';

const CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContact] = useState([...CONTACTS]);

  // сделать метод с хорошей производительностью для удаления
  function deleteContact(id) {
    setContact(contacts.filter(contact => contact.id !== id))
  }

  return (
    <div>
      <Form setContact={setContact} />
      <Section title="Contacts">
        <Filter contacts={contacts} deleteHandler={deleteContact}/>
      </Section>

    </div>
  );
};