import { useStateContext } from "../../context/StateContext";
import "./Settings.css";

export default function Settings() {
    const { user, editUser, updateUsername, setUpdateUsername, updateEmail, setUpdateEmail, setProfilePic, profilePic, success, error } = useStateContext();
    const PF = "http://localhost:5000/images/"

    return (
        <div className="setting">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <form className="settingsForm">
                <div className="settingsPP">
                    {(user && user.profilePic || profilePic) &&
                        <img
                            className="singlePostImg"
                            src={profilePic ? URL.createObjectURL(profilePic) : (PF + user.profilePic)}
                            alt={user.username}
                        />
                    }
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        className="settingsPPInput"
                        placeholder="Upload Photo"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                    />

                    <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-user-circle"
                            style={{ fontSize: (user && user.profilePic || profilePic) ? "20px" : "80px" }}></i>{" "}
                    </label>

                </div>
                <div className="settingInputs">
                    <label>Username</label>
                    <input type="text" placeholder={user && user.username} name="name" value={updateUsername} onChange={e => setUpdateUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user && user.email} name="email" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} />
                    {/* <label>Password</label> */}
                    {/* <input type="password" placeholder="" name="password" value={updatePassword} onChange={e => setUpdatePassword(e.target.value)} /> */}
                </div>
                <button className="settingsSubmitButton" type="submit" onClick={editUser}>
                    Update
                </button>
            </form >
            {success && <span style={{ color: "green", marginTop: "10px" }}>Update Success..</span>}
            {error && <span style={{ color: "red", marginTop: "10px" }}>Something Went Wrong</span>}
        </div >
    );
}