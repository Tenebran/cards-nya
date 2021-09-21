import styles from "./emailValidation.module.css";
import React from "react";


export const passwordErrorMessage = (password: string) => {
  return (password && password.length < 8 ?
      <div className={styles.errorMessage}>password should be more
        than 7 symbols...</div> : '')
}

export const confirmPasswordMessage = (password: string, passwordConfirm: string) => {
  return (((password) || (passwordConfirm)) && (password !== passwordConfirm) ?
      <div className={styles.errorMessage}>passwords do not match</div> : '')
}
export const validatePasswordStyles = (password: string) => {
  return (password) && (password.length > 7) ? {borderBottom: '2px solid green'} : {}
}

export const confirmPasswordStyles = (password: string, passwordConfirm: string) => {
  return (((password) || (passwordConfirm))
  && (password === passwordConfirm)
  && (password.length > 7) ? {borderBottom: '2px solid green'} : {})
}