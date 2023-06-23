import { useState } from 'react';
import ContactsList from 'components/ContactsList';
import styles from './Filter.module.css';

function Filter({ contacts = [], deleteHandler }) {
  // кастомный хук, чтобы обрабатывать ввод
  // перед сохранение в переменную filter
  const [filter, setFilter] = useState('');

  const filtredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim()) ||
      number.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
  );

  return (
    <div className={styles.filter}>
      <div className={styles.filterWrap}>
        <h3>Filter:</h3>
        <input
          type="text"
          onChange={evt => setFilter(evt.currentTarget.value)}
        />
      </div>
      <ContactsList contacts={filtredContacts} deleteHandler={deleteHandler}/>
    </div>
  );
}

export default Filter;
