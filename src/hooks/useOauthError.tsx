export type ErrorNameType = 
"OAuthSignin" 
| "OAuthCallback" 
| "OAuthCreateAccount" 
| "EmailCreateAccount"
| "Callback"
| "OAuthAccountNotLinked"
| "EmailSignin"
| "CredentialsSignin"
| "SessionRequired"
| "Default"
| null


const useOauthError = (errorName: ErrorNameType) => {
    
    const error = {
        OAuthSignin: "Ошибка при создании URL-адреса авторизации (1, 2, 3)",
        OAuthCallback: "Ошибка обработки ответа (1, 2, 3) при логинизации с паролем.",
        OAuthCreateAccount: "Не удалось создать пользователя под логином с паролем в базе данных.",
        EmailCreateAccount: "Не удалось создать пользователя под провайдером электронной почты в базе данных.",
        Callback: "Ошибка в пути обработчика колбэка логинизации с паролем.",
        OAuthAccountNotLinked: `Этот адрес электронной почты был зарегестрирован с паролем, поэтому не возможно уже войти под провайдером этой почты. Войдите с паролем или смените пользователя почтового провайдера`,
        EmailSignin: "Не удалось отправить электронное письмо с токеном подтверждения.",       
        CredentialsSignin: "Ошибка при авторизации",
        SessionRequired: "Содержимое этой страницы требует постоянного входа в систему.",
        Default: "Ошиба авторизации по дефолту"
    }
    const errorEn = {
        OAuthSignin: "Error in constructing an authorization URL (1, 2, 3)",
        OAuthCallback: "Error in handling the response (1, 2, 3) from an OAuth provider",
        OAuthCreateAccount: "Could not create OAuth provider user in the database",
        EmailCreateAccount: "Could not create email provider user in the database",
        Callback: "Error in the OAuth callback handler route",
        OAuthAccountNotLinked: "If the email on the account is already linked, but not with this OAuth account",
        EmailSignin: "Sending the e-mail with the verification token failed",        
        CredentialsSignin: "The authorization error.",
        SessionRequired: "The content of this page requires you to be signed in at all times.",
        Default: "Authorization error by default"
    }
if (!errorName) return null
   
    return error[errorName]

} 

export default useOauthError