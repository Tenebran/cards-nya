import React from 'react';
import './Profile.scss';
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {logOutTC} from "../../redux/reducers/authReducer";
import {Button} from "../../common/Button/Button";
import {Redirect} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import {AppStoreType} from "../../redux/store";
import {Preloader} from "../../common/preloader/Preloader";

export const Profile = () => {
    const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized);
    const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe);
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    if (!authMe) {
        return <Redirect to={PATH.LOGIN}/>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {initialized && <Preloader/>}
            <Button title={'logout'} onClickHandler={logOutHandler}/>
        </div>
    );
};
