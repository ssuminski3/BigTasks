import { Outlet, Link } from 'react-router-dom'

function MainPage() {

  return (<>
    <div className="bg-black p-5 text-white">
        <Link to={"/signup"}>
            <div className='bg-white w-full'>MainPage</div>
        </Link>
    </div>
    <Outlet />
  </>)
}

export default MainPage
