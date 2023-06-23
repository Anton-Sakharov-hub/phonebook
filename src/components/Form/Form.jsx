import { nanoid } from 'nanoid';
import Button from '../Button';
import styles from './Form.module.css';

//  ?? необязательное ??
// 1. Допилить валидацию формы
// 2. Нормальную проверку на существующий номер
// 3. Использовать Формик

function Form(props) {
  function formatingNumber(number) {
    function addPrefix(number) {
      return '+38' + number;
    }
    let formatedNumber = addPrefix(number);

    if (formatedNumber.length > 8){
      formatedNumber = formatedNumber.split("")
      formatedNumber.splice(3, 0, '(')
      formatedNumber.splice(7, 0, ')')
      formatedNumber.splice(11, 0, '-')
      formatedNumber.splice(14, 0, '-')
      formatedNumber = formatedNumber.join("")
    }
      
    return formatedNumber;
  }

  function onSubmitHandler(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    console.log(form);
    const nameInputValue = form.elements.name.value;
    const telInputValue = formatingNumber(form.elements.tel.value);
    props.setContact(prevState => {
      const isNumberInPrevState = prevState.find(
        ({ number }) => number === telInputValue
      );
      if (isNumberInPrevState) {
        alert('this number is already in the phone book!');
        return prevState;
      }
      return [
        ...prevState,
        {
          id: nanoid(),
          name: nameInputValue,
          number: telInputValue,
        },
      ];
    });
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="">Your name:</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor="">Your phone:</label>
      <input
        type="tel"
        name="tel"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form;
