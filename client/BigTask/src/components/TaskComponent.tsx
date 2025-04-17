import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { BiPencil } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { doTask, editTask, doBigTask } from "../lib/apiCalls";
import { Task } from "../lib/types";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteTask, deleteBigTask } from "../lib/apiCalls";

function TaskComponent(props: Task) {


  const [done, setDone] = useState(props.done);
  // Start in view mode (not editing)
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.name)
  const [doneName, setDoneName] = useState(props.name)
  const { getAccessTokenSilently } = useAuth0();
  const div = useRef<HTMLDivElement | null>(null);
  const text = useRef<HTMLLabelElement | null>(null);

  async function onChecked() {
    setDone(!done)
    div.current?.classList.add("expanse")
    setTimeout(() => {
      div.current?.classList.add("delete")
      setTimeout(() => {
        div.current?.classList.remove("delete"); props.dof?.(props.id)
      }, 2000)
      div.current?.classList.remove("expanse")
    }, 1000)
    if (!done) {
      setDoneName('')
      animateText()
    } else {
      setName('')
      animateTextBack()
    }
    const token = await getAccessTokenSilently()
    props.inputClass ? await doBigTask(token, props.id) : await doTask(token, props.id)
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

  async function onDelete(e: React.MouseEvent) {
    e.stopPropagation()
    if (confirm("Do you want to delete task ?")) {
      const token = await getAccessTokenSilently()
      div.current?.classList.add("delete")
      setTimeout(() => { div.current?.classList.remove("delete"); props.dl?.(props.id) }, 2000)

      props.inputClass ? await deleteBigTask(props.id, token) : await deleteTask(props.id, token)
    }
  }

  useEffect(() => {
    div.current?.classList.add("showup")
    setTimeout(() => div.current?.classList.remove("showup"), 2000)
  }, [])

  const handleEdit = async () => {
    if (edit) {
      // we’re currently in “edit” mode, so this click means “submit”
      const token = await getAccessTokenSilently();
      await editTask(props.id, name, token);
    }
    // toggle into/out of edit mode
    setEdit(!edit);
  };


  return (
    <div className='bg-white p-5 shadow-2xl w-full m-auto mb-5' ref={div} >
      <div className="flex">
        <div className="w-full flex">
          <input
            id={props.id}
            checked={done}
            onChange={onChecked}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            className={`appearance-none input-task ${props.inputClass || 'input-task-color'} w-5 h-5 text-center mr-3`} />
          {edit ? (
            <input
              defaultValue={name}
              className='max-w-1/2'
              autoFocus={true}
              maxLength={15}
              onChange={(e) => { setName(e.target.value); setDoneName(e.target.value) }}
              // Optionally add a type and styling
              type="text"
            />
          ) : (
            <label
              htmlFor={props.id.toString()}
              ref={text}
              onLoad={() => done && animateText}
            >
              {done ? <del>{doneName}</del> : name}
            </label>
          )}

        </div>
        <div onClick={(e: React.MouseEvent) => props.edit?.(e) || handleEdit()} className="m-2">
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
