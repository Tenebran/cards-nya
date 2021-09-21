import stylesContainer from '../../common/styles/Container.module.css'
import eye from '../../../common/icons/eye.png'
import closedEye from '../../../common/icons/closedEye.png'
import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {emailErrorMessage, validateEmail, validateEmailStyles} from "../../../common/validation/emailValidation";
import {registrationTC} from "../../../redux/reducers/registrationReducer";
import {Preloader} from "../../../common/preloader/Preloader";
import {
    confirmPasswordMessage,
    confirmPasswordStyles,
    passwordErrorMessage,
    validatePasswordStyles
} from "../../../common/validation/passwordValidation";
import {Button} from "../../../common/Button/Button";
import {PATH} from "../../../routes/Routes";
import {Redirect} from "react-router-dom";


export const Registration = () => {
    const dispatch = useDispatch()
    const authoriseMe = useSelector<any, boolean>(state => state.registration.authoriseMe)
    const entityStatus = useSelector<any, boolean>(state => state.registration.entityStatus)
    const [openPassword, setOpenPassword] = useState(false)
    const [initialized, setInitialized] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)


    const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
        setDisabledBtn(!(validateEmail(e.currentTarget.value) && (password.length > 7) && (passwordConfirm === password)))
        setEmail(e.currentTarget.value)
    }

    const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
        setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7) && (passwordConfirm === e.currentTarget.value)))
        setPassword(e.currentTarget.value)
    }
    const passwordConfirmTarget = (e: ChangeEvent<HTMLInputElement>) => {
        setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7) && (password === e.currentTarget.value)))
        setPasswordConfirm(e.currentTarget.value)
    }

    const changeViewPassword = () => {
        setOpenPassword(!openPassword)
    }

    const registerHandler = () => {
        setInitialized(true)
        dispatch(registrationTC(email, password))
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setInitialized(false)
    }

    const clearAllInputs = () => {
        setEmail("")
        setPassword("")
        setPasswordConfirm("")
        setDisabledBtn(true)
    }

    if (authoriseMe) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div>
                <h1>Brain storm</h1>
                <h2>Sign up</h2>
            </div>
            {initialized && <Preloader/>}
            <form>
                <div>
                    <p>Email:</p>
                    <div style={validateEmailStyles(email)}>
                        <input
                            onChange={emailTarget}
                            value={email}
                            type="text"
                            placeholder="example@ddd.com"
                            autoFocus/>
                    </div>
                    {emailErrorMessage(email)}
                </div>
                <div>
                    <p>Password:</p>
                    <div style={validatePasswordStyles(password)}>
                        <input
                            onChange={passwordTarget}
                            value={password}
                            type={openPassword ? 'text' : 'password'}
                            placeholder="****"/>
                        <img onClick={changeViewPassword} alt=""
                             src={openPassword ? eye : closedEye}/>
                    </div>
                    {passwordErrorMessage(password)}
                </div>
                <div>
                    <p>Confirm password:</p>
                    <div style={confirmPasswordStyles(password, passwordConfirm)}>
                        <input
                            onChange={passwordConfirmTarget}
                            value={passwordConfirm}
                            type={openPassword ? 'text' : 'password'}
                            placeholder="****"/>
                        <img onClick={changeViewPassword} alt=""
                             src={openPassword ? eye : closedEye}/>
                    </div>
                    {confirmPasswordMessage(password, passwordConfirm)}
                </div>
                <div>
                    <Button onClickHandler={clearAllInputs} title="Cancel"/>
                    <Button entityStatus={entityStatus}
                            onClickHandler={registerHandler}
                            disabledBtn={disabledBtn} title="Register"/>
                </div>
            </form>
        </div>
    )
}