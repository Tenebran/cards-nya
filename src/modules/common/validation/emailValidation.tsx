import styles from "./emailValidation.module.css";


export const validateEmail = (email: string) => {
  const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regEx.test(String(email).toLowerCase());
}

export const validateEmailStyles = (email: string) => {
  return ((email && (validateEmail(email))) ? {borderBottom: '2px solid green'} : {})
}

export const emailErrorMessage = (email: string) => {
  return ((email && (!validateEmail(email))) ?
      <div className={styles.errorMessage}>incorrect
        email...</div> : '')
}