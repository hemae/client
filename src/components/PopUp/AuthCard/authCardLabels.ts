export const authCardLabels = {
    ru: {
        authorization: 'Авторизация',
        login: 'Логин',
        password: 'Пароль',
        repeatPassword: 'Повторите пароль',
        signIn: 'Войти',
        signUp: 'Регистрация',
        warnings: {
            loginIsRequired: 'Логин обязателен',
            minimumSix: 'Минимальная длина пароля 6 символов',
            loginNotAvail: 'Логин недоступен',
            userRegisterSuccess: 'Пользователь успешно зарегестрирован',
            incorrectData: 'Некорректные данные',
            passwordsNotMatched: 'Пароли не совпадают',
            success: 'Идем в проекты',
            somethingWentWrong: 'Что-то пошло не так'
        }
    },
    en: {
        authorization: 'Authorization',
        login: 'Login',
        password: 'Password',
        repeatPassword: 'Repeat password',
        signIn: 'Sign in',
        signUp: 'Sign up',
        warnings: {
            loginIsRequired: 'Login is required',
            minimumSix: 'Minimum length of password is 6 characters',
            loginNotAvail: 'Login is not available',
            userRegisterSuccess: 'User has been registered successfully',
            incorrectData: 'Incorrect login data',
            passwordsNotMatched: 'Passwords is not matched',
            success: 'Success',
            somethingWentWrong: 'Something went wrong'
        }
    }
}

export type AuthCardLabelsType = typeof authCardLabels.en