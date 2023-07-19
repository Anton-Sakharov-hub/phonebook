import { useState, useEffect } from 'react';
import Form from './Form';
import Filter from './Filter';
import Section from './Section';
import ContactsList from './ContactsList/ContactsList';
import Button from './Button/Button';

const CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const lclStorageKey = 'contacts';

export const App = () => {
  const [contacts, setContact] = useState([]);
  const [filterInput, setFilter] = useState('');

  useEffect(() => {
    const hasKey = Boolean(localStorage.getItem(lclStorageKey));
    if (!hasKey)
      localStorage.setItem(lclStorageKey, JSON.stringify([...CONTACTS]));

    setContact(() => JSON.parse(localStorage.getItem(lclStorageKey)));
  }, []);

  useEffect(() => {
    return () => {
      // console.log('unmount')
      localStorage.setItem(lclStorageKey, JSON.stringify([...contacts]));
    };
    
  });

  function onFilterChange(evt) {
    setFilter(evt.currentTarget.value);
  }

  const filtredContacts = contacts.filter(
    ({ name, number }) =>
      name
        .toLocaleLowerCase()
        .includes(filterInput.toLocaleLowerCase().trim()) ||
      number
        .toLocaleLowerCase()
        .includes(filterInput.toLocaleLowerCase().trim())
  );

  // сделать метод с хорошей производительностью для удаления
  function deleteContact(id) {
    setContact(() => {
      const clearedContacts = contacts.filter(contact => contact.id !== id);

      localStorage.setItem(lclStorageKey, JSON.stringify([...clearedContacts]));

      return clearedContacts;
    });
  }

  return (
    <div>
          <Form setContact={setContact} />
          <Section title="Contacts">
            <Filter onFilterChange={onFilterChange} value={filterInput} />
            <ContactsList
              contacts={filtredContacts}
              deleteHandler={deleteContact}
            />
          </Section>
    </div>
  );
};
