import React from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../context/StateContext'
import './Navbar.css'
const Navbar = () => {
    const { logout, user } = useStateContext();
    const PF = "http://localhost:5000/images/"
    return (
        <nav className="navbar navbar-expand navbar-light bg-light sticky-top">
            <Link className='link' to='/'>
                <span className="navbar-brand">Blog Site</span>
            </Link>
            <div className="navbar-collapse">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to='/'>
                            <span className="nav-link">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/about'>
                            <span className="nav-link">About</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/write'>
                            <span className="nav-link" href="">Write</span>
                        </Link>
                    </li>
                </ul>
                {user ?
                    <div className="dropleft btn-sm navbar-nav mr-0">
                        <img className='topImg' id="dropdownMenuButton" data-toggle="dropdown" src={user.profilePic ? PF + user.profilePic : "https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg"} alt="" srcSet="" />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <Link to={`/?user=${user.username}`}>
                                <span className="nav-link">My Blogs</span>
                            </Link>
                            <Link to='/settings'>
                                <span className="nav-link">Settings</span>
                            </Link>
                            <Link to='/changePass'>
                                <span className="nav-link">Change Password</span>
                            </Link>
                            <Link>
                                <span onClick={logout} className="nav-link">Logout</span>
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        <ul className="navbar-nav mr-2">
                            <li className="nav-item">
                                <Link to='/login'>
                                    <span className="nav-link">Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/register'>
                                    <span className="nav-link">Register</span>
                                </Link>
                            </li>
                        </ul>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar