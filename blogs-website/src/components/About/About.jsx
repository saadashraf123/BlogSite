import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import "./About.css";

const About = () => {
    const { category, user } = useStateContext();
    const PF = "http://localhost:5000/images/"

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                {user && user.profilePic ?
                    <img
                        src={PF + user.profilePic}
                        alt=""
                    />
                    : ""}
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {category.map((item, index) => (
                        <li key={item._id} className="sidebarListItem">
                            <Link className="link" to={`/?cat=${item.name}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default About