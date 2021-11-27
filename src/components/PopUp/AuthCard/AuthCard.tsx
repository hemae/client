import React, {FC, memo, useEffect, useState} from 'react'
import styles from './AuthCard.module.css'
import Button from '../../common/Button/Button'
import * as FiIcons from 'react-icons/fi'
import Loader from '../../common/Loader/Loader'
import {authCardLabels, AuthCardLabelsType} from './authCardLabels'
import {translator} from '../../../helpers/translator'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {authSlice} from '../../../redux/store/reducers/auth/authSlice'
import {signIn, signUp} from '../../../redux/store/reducers/auth/authThunkCreators'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


type AuthCardPropsType = {
    type: 'signUp' | 'signIn'
}

type FormType = {
    login: string
    password: string
}

const AuthCard: FC<AuthCardPropsType> = ({type}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {isLoading, error, notice} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./AuthCard${theme}.module.css`)
    const labels: AuthCardLabelsType = authCardLabels[language]

    useEffect(() => {
        return () => {
            dispatch(authSlice.actions.setError(''))
            dispatch(authSlice.actions.setNotice(''))
        }
    }, [])

    useEffect(() => {
        if (notice === 'Success') {
            // dispatch(authSlice.actions.setNotice(''))
            dispatch(popUpSlice.actions.closePopUp())
        }
    }, [notice])

    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const onRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepeatPassword(event.target.value)
    }

    const [form, setForm] = useState<FormType>({
        login: '', password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(authSlice.actions.setError(''))
        dispatch(authSlice.actions.setNotice(''))
        setForm({...form, [event.target.name]: event.target.value})
    }

    const signUpHandler = () => {
        if (repeatPassword === form.password) {
            dispatch(signUp({data: {...form}}))
            setForm({...form, password: ''})
        } else {
            dispatch(authSlice.actions.setError('Passwords is not matched'))
        }
    }

    const signInHandler = () => {
        dispatch(signIn({data: {...form}}))
        setForm({...form, password: ''})
    }

    const onEnterPress = (event: React.KeyboardEvent): void => {
        if (!isLoading && form.login.trim() && form.password.trim() && event.key === 'Enter') {
            signInHandler()
        }
    }

    const onCloseClick = (): void => {
        dispatch(popUpSlice.actions.closePopUp())
    }

    return (
        <div className={`${styles.authCard} + ${colorStyles.authCard}`}>

            <div
                className={`${styles.closeBtn} + ${colorStyles.closeBtn}`}
                onClick={onCloseClick}
            ><FiIcons.FiX/></div>

            <div className={`${styles.header} + ${colorStyles.header}`}>
                <h1>{labels.authorization}</h1>
            </div>

            <div
                className={`${styles.form} + ${colorStyles.form}`}

            >
                <input
                    placeholder={labels.login}
                    type='text'
                    id='login'
                    name='login'
                    onChange={changeHandler}
                    value={form.login}
                    disabled={isLoading}
                    onKeyPress={onEnterPress}
                />

                <input
                    placeholder={labels.password}
                    type='password'
                    id='password'
                    name='password'
                    onChange={changeHandler}
                    value={form.password}
                    disabled={isLoading}
                    onKeyPress={onEnterPress}
                />

                {type === 'signUp' &&
                <input
                    placeholder={labels.repeatPassword}
                    type='password'
                    id='repeatPassword'
                    name='password'
                    onChange={onRepeatPasswordChange}
                    value={repeatPassword}
                    disabled={isLoading}
                    onKeyPress={onEnterPress}
                />}

            </div>

            <div className={styles.warnings}>

                {error &&
                <span className={styles.error}>
                            {translator({
                                label: error,
                                dictionary: authCardLabels.en.warnings,
                                labels: labels.warnings
                            })}</span>}

                {notice &&
                <span className={styles.notice}>
                            {translator({
                                label: notice,
                                dictionary: authCardLabels.en.warnings,
                                labels: labels.warnings
                            })}</span>}

                {isLoading && <div className={styles.loading}><Loader size={20}/></div>}

            </div>

            <hr/>

            <div className={styles.submit}>

                {type === 'signIn' && <Button
                    label={labels.signIn}
                    onClickHandler={signInHandler}
                    icon={<FiIcons.FiLogIn/>}
                    color={'#b7b7ff'}
                    disabled={isLoading}
                />}

                {type === 'signUp' && <Button
                    label={labels.signUp}
                    onClickHandler={signUpHandler}
                    icon={<FiIcons.FiEdit/>}
                    color={'#8dd992'}
                    disabled={isLoading}
                />}

            </div>
        </div>
    )
}


export default memo<AuthCardPropsType>(AuthCard)