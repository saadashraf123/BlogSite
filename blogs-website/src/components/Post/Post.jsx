import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import "./Post.css";

const Post = ({ data }) => {
    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            {data.photo &&
                <img
                    className="postImg"
                    src={PF + data.photo}
                    alt=""
                />}
            <div className="postInfo">
                <ul className="catList">
                    {data.categories.map((item, index) => (
                        <li key={index} className="postCat">
                            <Link className="link" to={`/?cat=${item.name}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <span className="postTitle">
                    <Link to={`/post/${data._id}`} className="link" state={{ data }}>
                        {data.title}
                    </Link>
                </span>
                <hr />
                <span className="postDate">{new Date(data.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {data.desc}
            </p>
        </div >
    );
}

export default Post