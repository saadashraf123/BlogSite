import './Home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import About from '../../components/About/About'

const Home = () => {
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <About />
            </div>
        </>
    )
}

export default Home