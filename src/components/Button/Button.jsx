import styles from './Button.module.css';

const Button = ({ children, ...other }) => {

  return (
    <button className={styles.button} {...other}>
      {children}
    </button>
  );
};

export default Button;
