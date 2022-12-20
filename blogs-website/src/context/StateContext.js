import React, { useState, useEffect, createContext, useReducer, useContext, useRef } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom';
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

const Context = createContext(INITIAL_STATE);

const StateContext = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    const userRef = useRef();
    const passRef = useRef();
    const currentPassRef = useRef();

    const [post, setPost] = useState([])
    const [category, setCategory] = useState([])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [registerError, setRegisterError] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const [singlePost, setSinglePost] = useState([])
    const [updateTitle, setUpdateTitle] = useState("")
    const [updateDesc, setUpdateDesc] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [updateUsername, setUpdateUsername] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [profilePic, setProfilePic] = useState(null)
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [success, setSuccess] = useState(false)
    const [newCat, setNewCat] = useState([])


    const { search } = useLocation();

    useEffect(() => {
        axios.get("/posts" + search)
            .then((res) => {
                setPost(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [search])

    useEffect(() => {
        axios.get("/categories" + search)
            .then((res) => {
                setCategory(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [search])

    useEffect(() => {
        axios.get("/categories")
            .then((res) => {
                setCategory(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);


    const submitRegister = (e) => {
        setRegisterError(false)
        e.preventDefault();
        axios.post("/auth/register", {
            username,
            email,
            password
        })
            .then((res) => {
                res.data && window.location.replace("/login")
            })
            .catch((err) => {
                setRegisterError(true)
            })
    }


    const loginSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            res.data && window.location.replace("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.location.reload();
    }

    const handleSelectCategory = (options) => {
        setNewCat(options);
    };

    const submitNewPost = async (e) => {
        e.preventDefault();
        console.log(newCat);
        const categories = newCat?.map(({ value }) => ({ name: value }));
        const newPost = {
            username: state.user.username,
            title,
            desc,
            categories
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/");
        } catch (err) { }
    }

    const deletePost = (id) => [
        axios.delete(`/posts/${id}`,
            { data: { username: state.user.username } },
        )
            .then((res) => {
                window.location.replace("/")
            })
            .catch((err) => {
            })
    ]
    const editPost = async (id) => {
        const title = updateTitle;
        const desc = updateDesc;
        try {
            await axios.put(`/posts/${id}`,
                { username: state.user.username, title, desc, }
            )
            window.location.replace("/");
            setEditMode(false)
        } catch (error) {
        }
    }

    const editUser = async (e) => {
        e.preventDefault();
        setSuccess(false)
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: state.user._id,
            username: updateUsername ? updateUsername : state.user.username,
            email: updateEmail ? updateEmail : state.user.email,
        };
        if (profilePic) {
            const data = new FormData();
            const filename = Date.now() + profilePic.name;
            data.append("name", filename);
            data.append("file", profilePic);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put(`/users/${state.user._id}`, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setSuccess(true)
            // window.location.replace("/");
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    const getSinglePost = async (id) => {
        await axios.get(`/posts/${id}`)
            .then((res) => {
                setSinglePost(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const validatePass = async (e) => {
        e.preventDefault();
        setErrorMsg("")
        try {
            dispatch({ type: "VALIDATION_START" });
            try {
                const res = await axios.post("/auth/validate", {
                    username: state.user.username,
                    password: currentPassRef.current.value,
                });
                dispatch({ type: "VALIDATION_SUCCESS" });
                res.data && editPassword()
            } catch (err) {
                dispatch({ type: "VALIDATION_FAILURE" });
                setErrorMsg("Current Password is Not Correct!")
            }
        } catch (error) {

        }
    };

    const editPassword = async () => {
        setSuccess(false)
        setErrorMsg("")
        if (newPassword == newPassword2) {
            try {
                dispatch({ type: "PASS_UPDATE_START" });
                try {
                    const updatedUser = {
                        userId: state.user._id,
                        password: newPassword
                    };
                    const res = await axios.put(`/users/${state.user._id}`, updatedUser);
                    console.log(res);
                    dispatch({ type: "PASS_UPDATE_SUCCESS", payload: res.data });
                    setSuccess(true)
                    res && logout();
                    window.location.replace("/");
                } catch (err) {
                    dispatch({ type: "PASS_UPDATE_FAILURE" });
                    setErrorMsg("Password is Not Updated!")
                }
            } catch (error) {

            }
        }
        else {
            dispatch({ type: "PASS_UPDATE_FAILURE" });
            setErrorMsg("Password is Not Same!")
        }
    }

    return (
        <Context.Provider
            value={{
                post, category, username, setUsername, email, setEmail, password, setPassword, submitRegister,
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
                loginSubmit,
                userRef,
                passRef,
                logout,
                title, setTitle, desc, setDesc, file, setFile, submitNewPost,
                deletePost,
                updateTitle, updateDesc, editMode, setUpdateTitle, setUpdateDesc, setEditMode, editPost,
                editUser, updateUsername, setUpdateUsername, updateEmail, setUpdateEmail, setProfilePic, profilePic,
                newPassword2, newPassword, setNewPassword2, setNewPassword, currentPassRef, validatePass,
                success, registerError, handleSelectCategory, errorMsg
            }}>
            {children}
        </Context.Provider>
    )
}

export default StateContext

export const useStateContext = () => useContext(Context);
