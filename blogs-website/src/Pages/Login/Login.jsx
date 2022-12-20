import { useStateContext } from "../../context/StateContext";
import "./Login.css";


export default function Login() {

    const { userRef, passRef, loginSubmit, error, isFetching } = useStateContext();
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={loginSubmit}>
                <label>Username</label>
                <input className="loginInput" type="text" placeholder="Enter your Username..." ref={userRef} />
                <label>Password</label>
                <input className="loginInput" type="password" placeholder="Enter your password..." ref={passRef} />
                <button className="loginButton" disabled={isFetching}>Login</button>
                {error && <span style={{ color: "red", marginTop: "10px" }}>Incorrect Credentials</span>}
            </form>
        </div>
    );
}