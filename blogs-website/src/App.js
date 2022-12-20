import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import StateContext, { useStateContext } from './context/StateContext';
import ChangePass from './Pages/ChangePass/ChangePass';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Settings from './Pages/Settings/Settings';
import SinglePost from './Pages/SinglePost/SinglePost';
import Write from './Pages/Write/Write';

function App() {
    const { user } = useStateContext()
    return (
        <>
            <StateContext>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/Settings' element={user ? <Settings /> : <Login />} />
                    <Route path='/changePass' element={user ? <ChangePass /> : <Login />} />
                    <Route path='/Write' element={user ? <Write /> : <Login />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/post/:id' element={<SinglePost />} />
                </Routes>
                <Footer />
            </StateContext>
        </>
    );
}

export default App;
