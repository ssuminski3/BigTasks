import { useRef, useState } from "react"
import "../App.css"

type Task = {
  name: string,
  done: boolean, 
  key_my: number
}

function TaskComponent(props: Task) {

  const [done, setDone] = useState(props.done)
  const div = useRef<HTMLDivElement | null >(null)
  const text = useRef<HTMLLabelElement | null>(null)

  function onChecked(){
    setDone(!done)
    div.current?.classList.add("expanse")
    text.current?.classList.toggle('struck')
    setTimeout(() => div.current?.classList.remove("expanse"), 1000)
  }

  return (
    <div className='bg-white p-5 shadow-2xl w-full m-auto flex ' ref={div}>
      <input
        id={props.key_my.toString()}
        checked={done}
        onChange={onChecked}
        type="checkbox"
        className='appearance-none input-task w-5 h-5 text mr-3' />
        <label htmlFor={props.key_my.toString()} className={`strike-event ${done && 'struck'}`} ref={text}>{props.name}</label>
    </div>
  )
}

export default TaskComponent

