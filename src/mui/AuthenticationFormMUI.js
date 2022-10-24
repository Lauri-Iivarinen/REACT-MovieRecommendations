import React, {useState} from 'react'
import AuthenticationCreateNew from './AuthenticationCreateNew';
import AuthenticationLogin from './AuthenticationLoginMUI';

function AuthenticationForm() {

    const [action, setaction] = useState('')
    
    const changeAction = (e) => {
        setaction(e.target.value)
    }

    //Either returns form to create new account (not secure) or returns form to login to an existing user
    if(action === 'Login'){
        return (
            <AuthenticationLogin />
        )
    } else if (action === 'CreateNew') {
        return (
            <AuthenticationCreateNew />
        )
    } else {
        return (
            <div>
                <br></br>
            <button value="CreateNew" onClick={(e) => changeAction(e)}>New Account</button>
            <button value="Login" onClick={(e) => changeAction(e)}>Login</button>
                <br></br>
        </div>
        )
    }
    
}

export default AuthenticationForm;