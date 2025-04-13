import React, { useRef, useState } from "react";
import "../App.css";
import { BiPencil } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type Task = {
  name: string,
  done: boolean,
  key_my: number,
  color?: string,
  inputClass?: string
  children?: React.ReactNode,
  dl: (index: number) => void, //function on delete
  dof?: () => void, //function on done
}

function TaskComponent(props: Task) {
  const [done, setDone] = useState(props.done);
  // Start in view mode (not editing)
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.name)
  const [doneName, setDoneName] = useState(props.name)

  const div = useRef<HTMLDivElement | null>(null);
  const text = useRef<HTMLLabelElement | null>(null);

  function onChecked() {
    setDone(!done)
    div.current?.classList.add("expanse")
    setTimeout(() => div.current?.classList.remove("expanse"), 1000)
    props.dof?.()
    if (!done) {
      setDoneName('')
      animateText()
    } else {
      setName('')
      animateTextBack()
    }
  }

  function animateText() {
    let index = -1;
    const anim = setInterval(() => {
      setDoneName(n => n + name[index])
      index += 1
      if (index >= name.length - 1)
        clearInterval(anim)
    }, 10)
  }
  function animateTextBack() {
    let index = -1;
    const anim = setInterval(() => {
      setName(n => n + doneName[index])
      index += 1
      if (index >= doneName.length - 1)
        clearInterval(anim)
    }, 10)
  }

  function onDelete() {
    if (confirm("Do you want to delete task ?")) {
      div.current?.classList.add("delete")
      setTimeout(() => {div.current?.classList.remove("delete"); props.dl(props.key_my)}, 2000)
    }
  }
  return (
    <div className='bg-white p-5 shadow-2xl w-full m-auto mb-5' ref={div}>
      <div className="flex">
        <div className="w-full flex">
          <input
            id={props.key_my.toString()}
            checked={done}
            onChange={onChecked}
            type="checkbox"
            className={`appearance-none input-task ${props.inputClass || 'input-task-color'} w-5 h-5 text-center mr-3`} />
          {edit ? (
            <input
              defaultValue={name}
              autoFocus={true}
              maxLength={15}
              onChange={(e) => {setName(e.target.value); setDoneName(e.target.value)}}
              // Optionally add a type and styling
              type="text"
            />
          ) : (
            <label
              htmlFor={props.key_my.toString()}
              ref={text}
              onLoad={() => done && animateText}
            >
              {done ? <del>{doneName}</del> : name}
            </label>
          )}

        </div>
        <div onClick={() => setEdit(!edit)} className="m-2">
          {edit ?
            <AiOutlineCheck color={props.color || '#29B6F6'} size={'22px'} /> :
            <BiPencil color={props.color || '#29B6F6'} size={'22px'} />
          }
        </div>
        <div onClick={onDelete}>
          <BiTrash color='#ff0000' size={'22px'} className="m-2" />
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default TaskComponent;
