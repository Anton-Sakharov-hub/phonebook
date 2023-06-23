import Button from 'components/Button/';
import styles from './ContactsList.module.css';

function ContactsList({ contacts = [], deleteHandler }) {
  // const prefix = '+38-';

  return (
    <ul className={styles.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p className={styles.content}>{name} {number}</p>
          {/* {prefix} */}
          <Button onClick={() => deleteHandler(id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}

export default ContactsList;
