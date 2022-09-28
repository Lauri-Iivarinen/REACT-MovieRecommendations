import React, {useState} from 'react'

function AuthenticationCreateNew() {

    //NOT SECURE, only a placeholder
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword:''
    })

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form>
            <h3>Create new account:</h3>
            <table>
                <tr><td><label htmlFor="username">Username: </label></td>
                    <td><input type="text" name="username" value={user.username} onChange={(e) => updateUser(e)} /></td></tr>
                <tr><td><label htmlFor="password">Password: </label></td>
                    <td><input type="password" name="password" value={user.password} onChange={(e) => updateUser(e)} /></td></tr>
                <tr><td><label htmlFor="confirmPassword">Repeat password: </label></td>
                    <td><input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => updateUser(e)} /></td></tr>
            </table>
            <input type="button" value="submit"></input>
        </form>
    )
}

export default AuthenticationCreateNew;