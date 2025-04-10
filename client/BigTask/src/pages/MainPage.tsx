import { Outlet } from 'react-router-dom'
import TaskComponent from '../components/TaskComponent'
import "../App.css"
function MainPage() {

  return (<>
    <div className="back w-full h-screen  p-5">
        <TaskComponent name='TASK 1' done={true} key_my={1}/>
    </div>
    <Outlet />
  </>)
}

export default MainPage
