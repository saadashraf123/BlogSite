import { useStateContext } from "../../context/StateContext"
import "./Register.css"

export default function Register() {

    const { username, setUsername, email, setEmail, password, setPassword, submitRegister, registerError } = useStateContext();

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={submitRegister}>
                <label>Username</label>
                <input className="registerInput" type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Email</label>
                <input className="registerInput" type="text" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input className="registerInput" type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="registerButton">Register</button>
                {registerError && <span style={{ color: "red", marginTop: "10px" }}>Username or Email Already Exist</span>}
            </form>
        </div>
    )
}