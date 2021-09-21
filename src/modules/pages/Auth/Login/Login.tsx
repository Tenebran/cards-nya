import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {emailErrorMessage, validateEmail, validateEmailStyles} from "../../../common/validation/emailValidation";
import {passwordErrorMessage, validatePasswordStyles} from "../../../common/validation/passwordValidation";
import {Button} from "../../../common/Button/Button";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {PATH} from "../../../routes/Routes";
import eye from "../../../common/icons/eye.png";
import closedEye from "../../../common/icons/closedEye.png";
import {loginTC} from "../../../redux/reducers/authReducer";
import {Preloader} from "../../../common/preloader/Preloader";
import {AppStoreType} from "../../../redux/store";


export const Login = () => {
    let history = useHistory();

    const dispatch = useDispatch()
    const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe)
    const entityStatus = useSelector<AppStoreType, boolean>(state => state.user.entityStatus)
    const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized)
    const [openPassword, setOpenPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(true)

    console.log(authMe)
    const changeViewPassword = () => {
        setOpenPassword(!openPassword)
    }

    const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
        setDisabledBtn(!(validateEmail(e.currentTarget.value) && (password.length > 7)))
        setEmail(e.currentTarget.value)
    }

    const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
        setDisabledBtn(!(validateEmail(email) && (e.currentTarget.value.length > 7)))
        setPassword(e.currentTarget.value)
    }

    const loginHandler = () => {
        dispatch(loginTC(email, password, rememberMe))
        setEmail('')
        setPassword('')
        setRememberMe(false)
        setDisabledBtn(true)
    }

    if (authMe) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div>
            <div>
                <h1>Title</h1>
                <h2>Sign in</h2>
            </div>
            {initialized && <Preloader/>}
            <form>
                <div>
                    <p>Email:</p>
                    <div style={validateEmailStyles(email)}
                    >
                        <input onChange={emailTarget}
                               value={email}
                               type="text"
                               placeholder="enter email"/>
                    </div>
                    {emailErrorMessage(email)}
                </div>
                <div>
                    <p>Password:</p>
                    <div style={validatePasswordStyles(password)}
                    >
                        <input onChange={passwordTarget}
                               value={password}
                               type={openPassword ? "text" : "password"}
                               placeholder="enter password"/>
                        <img onClick={changeViewPassword} alt=''
                             src={openPassword ? eye : closedEye}/>
                    </div>
                    {passwordErrorMessage(password)}
                    <div>
                        <NavLink to={PATH.RESET_PASSWORD}>
                            forgot password?
                        </NavLink>
                    </div>
                </div>
                <div>
                    <input onClick={() => setRememberMe(!rememberMe)}
                           type="checkbox"/>
                    <span>remember me</span>
                </div>
                <Button
                    entityStatus={entityStatus}
                    disabledBtn={disabledBtn}
                    title="Login"
                    onClickHandler={loginHandler}/>
                <p>Don't have an account?</p>
                <div>
                    <NavLink to={PATH.REGISTRATION}>
                        Sign Up</NavLink>
                </div>
            </form>
        </div>
    )
}