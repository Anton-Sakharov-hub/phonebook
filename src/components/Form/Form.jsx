import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import styles from './Form.module.css';

// 2. Сделать нормальную проверку на существующий номер

const schema = object({
  name: string().required(),
  phone: string().min(10).max(10).required(),
});

function PhonebookForm(props) {
  // function formatingNumber(number) {
  //   function addPrefix(number) {
  //     return '+38' + number;
  //   }
  //   let formatedNumber = addPrefix(number);

  //   if (formatedNumber.length > 8) {
  //     formatedNumber = formatedNumber.split('');
  //     formatedNumber.splice(3, 0, '(');
  //     formatedNumber.splice(7, 0, ')');
  //     formatedNumber.splice(11, 0, '-');
  //     formatedNumber.splice(14, 0, '-');
  //     formatedNumber = formatedNumber.join('');
  //   }

  //   return formatedNumber;
  // }

  function onSubmitHandler(values, { resetForm }) {
    resetForm();
    
    console.log(props.setContacts)
    props.setContact(prevState => {
      const isNumberInPrevState = prevState.find(
        ({ number }) => number === values.phone
      );
      if (isNumberInPrevState) {
        alert('this number is already in the phone book!');
        return prevState;
      }

      const newContat = {
        id: nanoid(),
        name: values.name,
        number: values.phone,
      };

      localStorage.setItem(
        'contacts',
        JSON.stringify([...prevState, newContat])
      );

      return [...prevState, newContat];
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
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Name Surname"
          required
        />
        <ErrorMessage name="name" component="div" />

        <label htmlFor="phone">Your phone:</label>
        <Field
          type="tel"
          id="phone"
          name="phone"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Phone"
          required
        />
        <ErrorMessage name="phone" component="div" />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}

export default PhonebookForm;
