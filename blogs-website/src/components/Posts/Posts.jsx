import { useStateContext } from '../../context/StateContext'
import Post from '../Post/Post'
import './Posts.css'

const Posts = () => {
    const { user, post } = useStateContext();
    return (
        <>
            <div className="sidebarItem">
                <span className="sidebarTitle">Blogs</span>
            </div>
            {post.length > 0 ?
                <div className='posts'>
                    {
                        post.map((item, index) => (
                            <Post key={item._id} data={item} />
                        ))
                    }
                </div>
                :
                <span className='empty'>No Blogs To Show</span>
            }
        </>
    )
}

export default Posts