const LoginForm = ({ handleLogin, handleLoginFormChange, credentials }) => {
    return (
        <div>
            <h2>LOGIN</h2>
            <br />
            <form onSubmit={handleLogin}>
                <div>
                    name: <input type='text' name='username' value={credentials.username} onChange={handleLoginFormChange} />
                    <br />
                    password: <input type='password' name='password' value={credentials.password} onChange={handleLoginFormChange} />
                </div>
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm