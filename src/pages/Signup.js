import Header from "../components/Header"
import SignupPage from "../components/Signup"

export default function Signup(){
    return(
        <>
            <Header
              heading="Lets get you started!"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/login"
            />
            <SignupPage/>
        </>
    )
}