import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import "./SinglePost.css";

export default function SinglePost() {
    const { state } = useLocation();
    const singlePost = state.data
    const { deletePost, user, editPost, updateTitle, updateDesc, editMode, setUpdateTitle, setUpdateDesc, setEditMode } = useStateContext();

    useEffect(() => {
        setUpdateTitle(singlePost.title)
        setUpdateDesc(singlePost.desc)
    }, [])

    const PF = "http://localhost:5000/images/"
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {singlePost.photo &&
                    <img
                        className="singlePostImg"
                        src={PF + singlePost.photo}
                        alt={singlePost.title}
                    />}

                {editMode ?
                    <input type="text" className="singlePostTitleInput" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} /> :
                    <h1 className="singlePostTitle">
                        {singlePost.title}
                        {singlePost.username === user?.username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setEditMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={() => deletePost(singlePost._id)}></i>
                            </div>
                        }
                    </h1>
                }
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            <Link className="link" to={`/?user=${singlePost.username}`}>
                                {singlePost.username}
                            </Link>
                        </b>
                    </span>
                    <div className="singlepostCat">
                        {singlePost.categories.map((item) => (
                            <li key={item._id} className="singlepostCat">
                                <Link className="link" to={`/?cat=${item.name}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </div>
                    <span>{new Date(singlePost.createdAt).toDateString()}</span>
                </div>

                {editMode ? <textarea type="textarea" className="singlePostDescInput" value={updateDesc} onChange={(e) => setUpdateDesc(e.target.value)} /> :
                    <p className="singlePostDesc">
                        {singlePost.desc}
                    </p>
                }
                {
                    editMode &&
                    <button className="btn updateBtn" onClick={() => editPost(singlePost._id)}>Update</button>
                }
            </div>
        </div >
    );
}