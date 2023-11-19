import Header from "../components/Header"
import LoginPage from "../components/Login"

export default function Login(){
    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Signup"
                linkUrl="/signup"
            />
            <LoginPage/>
        </>
    )
}