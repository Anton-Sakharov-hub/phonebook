import { useState } from 'react';
import ContactsList from 'components/ContactsList';
import styles from './Filter.module.css';

function Filter({ value, onFilterChange, contacts = [], deleteHandler }) {
  // кастомный хук, чтобы обрабатывать ввод
  // перед сохранение в переменную filter

  // перенести контроль state ввода фильтра и 
  // рeндераконтактов в App
  // const [filterInput, setFilter] = useState('');

  // const filtredContacts = contacts.filter(
  //   ({ name, number }) =>
  //     name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase().trim()) ||
  //     number.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase().trim())
  // );

  return (
    <div className={styles.filter}>
      <div className={styles.filterWrap}>
        <label>Filter:</label>
        <input
          type="text"
          onChange={onFilterChange}
          value={value}
        />
      </div>
      {/* <ContactsList contacts={filtredContacts} deleteHandler={deleteHandler}/> */}
    </div>
  );
}

export default Filter;
