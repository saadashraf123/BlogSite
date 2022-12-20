import { useStateContext } from "../../context/StateContext";
import "./ChangePass.css";

export default function ChangePass() {
    const { validatePass, newPassword2, newPassword, setNewPassword2, setNewPassword, currentPassRef, success, error, errorMsg } = useStateContext();
    return (
        <div className="setting">
            <span className="settingsTitleUpdate">Update Your Password</span>
            <form className="settingsForm">
                <div className="settingInputs">
                    <label>Enter Current Password</label>
                    <input type="password" placeholder="" name="password" ref={currentPassRef} />
                    <label>Enter New Password</label>
                    <input type="password" placeholder="" name="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <label>Enter New Password Again</label>
                    <input type="password" placeholder="" name="password" value={newPassword2} onChange={e => setNewPassword2(e.target.value)} />
                </div>
                <span style={{ color: "red", marginTop: "10px" }}>{error && errorMsg}</span>
                {success && <span style={{ color: "green", marginTop: "10px" }}>Update Success..</span>}
                <button className="settingsSubmitButton" type="submit" onClick={validatePass}>
                    Update
                </button>
            </form >
        </div >
    );
}