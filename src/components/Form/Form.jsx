import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {object, string} from 'yup';
import Button from '../Button';
import styles from './Form.module.css';

//  ?? необязательное ??
// 1. Допилить валидацию формы
// 2. Нормальную проверку на существующий номер
// 3. Использовать Формик

const schema = object({
  name: string().required(),
  phone: string().min(10).max(10).required(),
})

function PhonebookForm(props) {
  function formatingNumber(number) {
    function addPrefix(number) {
      return '+38' + number;
    }
    let formatedNumber = addPrefix(number);

    if (formatedNumber.length > 8) {
      formatedNumber = formatedNumber.split('');
      formatedNumber.splice(3, 0, '(');
      formatedNumber.splice(7, 0, ')');
      formatedNumber.splice(11, 0, '-');
      formatedNumber.splice(14, 0, '-');
      formatedNumber = formatedNumber.join('');
    }

    return formatedNumber;
  }

  function onSubmitHandler(values, { resetForm }) {
    console.log(values);
    resetForm();
    // evt.preventDefault();
    // const form = evt.currentTarget;
    // console.log(form);
    // // const {name, number} = form.elements;
    // const nameInputValue = form.elements.name.value;
    // const telInputValue = formatingNumber(form.elements.tel.value);
    props.setContact(prevState => {
      const isNumberInPrevState = prevState.find(
        ({ number }) => number === values.phone
      );
      if (isNumberInPrevState) {
        alert('this number is already in the phone book!');
        return prevState;
      }
      return [
        ...prevState,
        {
          id: nanoid(),
          name: values.name,
          number: values.phone,
        },
      ];
    });
  }

  return (
    <Formik
      initialValues={{ name: 'Anne Hathway', phone: '0985451011' }}
      onSubmit={onSubmitHandler}
      validationSchema={schema}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Your name:</label>
        <Field
          type="text"
          id="name"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Name Surname"
          required
        />
        <ErrorMessage name="name" component="div"/>

        <label htmlFor="phone">Your phone:</label>
        <Field
          type="tel"
          id="phone"
          name="phone"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Phone"
          required
        />
        <ErrorMessage name="phone" component="div"/>
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}

export default PhonebookForm;
