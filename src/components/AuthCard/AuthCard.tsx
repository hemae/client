import React, {FC, useEffect, useState} from 'react'
import {
    AuthCardContextPropsType,
    AuthCardExternalPropsType, FormType
} from './AuthCardTypes'
import {withAuthCardContextProps} from './authCardHOC'
import styles from './AuthCard.module.css'
import {Button} from '../common/Button/Button'
import * as FiIcons from 'react-icons/fi'
import Loader from '../common/Loader/Loader'
import {authCardLabels, AuthCardLabelsType} from './authCardLabels'
import {translator} from '../../helpers/translator'


const AuthCardComponent: FC<AuthCardContextPropsType & AuthCardExternalPropsType> = ({
                                                                                         isLoading,
                                                                                         error,
                                                                                         notice,
                                                                                         signUp,
                                                                                         signIn,
                                                                                         setError,
                                                                                         setNotice,
                                                                                         theme,
                                                                                         language,
                                                                                         type,
                                                                                         isShown,
                                                                                         closeCard
                                                                                     }) => {

    const colorStyles = require(`./AuthCard${theme}.module.css`)
    const labels: AuthCardLabelsType = authCardLabels[language]

    const [isBackground, setIsBackground] = useState<boolean>(false)
    const [localIsShown, setLocalIsShown] = useState<boolean>(false)

    useEffect(() => {
        if (isShown) {
            setTimeout(() => {
                setIsBackground(true)
            }, 450)
            setTimeout(() => {
                setLocalIsShown(true)
            }, 150)
        }

        return () => {
            setIsBackground(false)
        }
    }, [isShown])

    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const onRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepeatPassword(event.target.value)
    }

    const [form, setForm] = useState<FormType>({
        login: '', password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setError('')
        setNotice('')
        setForm({...form, [event.target.name]: event.target.value})
    }

    const signUpHandler = () => {
        if (repeatPassword === form.password) {
            signUp({...form})
            setForm({...form, password: ''})
        } else {
            setError('Passwords is not matched')
        }
    }

    const signInHandler = () => {
        signIn({...form})
        setForm({...form, password: ''})
        closeCard()
    }

    const onEnterPress = (event: React.KeyboardEvent): void => {
        if (!isLoading && form.login.trim() && form.password.trim() && event.key === 'Enter') {
            signInHandler()
        }
    }

    const onCloseClick = (): void => {
        closeCard()
    }

    return (
        <div className={`${styles.container} + ${localIsShown ? styles.active : ''}`}
             style={{backgroundColor: `${isBackground ? theme === 'Light' ? '#dcdcdc' : '#484747' : 'none'}`}}
        >
            <div className={styles.closeBtn}
                 onClick={onCloseClick}
            ><FiIcons.FiX/></div>
            <div className={`${styles.authCard} + ${colorStyles.authCard}`}>

                <div className={`${styles.header} + ${colorStyles.header}`}>
                    <h1>{labels.authorization}</h1>
                </div>
                <div
                    className={`${styles.form} + ${colorStyles.form}`}>
                    <input placeholder={labels.login}
                           type='text'
                           id='login'
                           name='login'
                           onChange={changeHandler}
                           value={form.login}
                           disabled={isLoading}
                           onKeyPress={onEnterPress}
                    />
                    <input placeholder={labels.password}
                           type='password'
                           id='password'
                           name='password'
                           onChange={changeHandler}
                           value={form.password}
                           disabled={isLoading}
                           onKeyPress={onEnterPress}
                    />
                    {type === 'signUp' && <input placeholder={labels.repeatPassword}
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
                    {error && <span className={styles.error}>
                        {translator({label: error, dictionary: authCardLabels.en, labels})}
                </span>}
                    {notice && <span className={styles.notice}>
                        {translator({label: notice, dictionary: authCardLabels.en, labels})}
                </span>}
                    {isLoading && <div className={styles.loading}><Loader size={20}/></div>}
                </div>
                <hr/>
                <div className={styles.submit}>

                    {type === 'signIn' && <Button label={labels.signIn}
                                                  onClickHandler={signInHandler}
                                                  icon={<FiIcons.FiLogIn/>}
                                                  color={'#b7b7ff'}
                                                  disabled={isLoading}
                    />}

                    {type === 'signUp' && <Button label={labels.signUp}
                                                  onClickHandler={signUpHandler}
                                                  icon={<FiIcons.FiEdit/>}
                                                  color={'#8dd992'}
                                                  disabled={isLoading}
                    />}

                </div>
            </div>
        </div>
    )
}


export default withAuthCardContextProps(AuthCardComponent) as FC<AuthCardExternalPropsType>