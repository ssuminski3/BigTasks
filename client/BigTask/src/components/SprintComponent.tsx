import { useRef, useState } from 'react'
import { BiPencil } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type Sprint = {
    name: string,
    key_my: number,
    done: boolean,
    dl: (index: number) => void
}

function SprintComponent(props: Sprint) {
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(props.name)

    const div = useRef<HTMLDivElement | null>(null);

    function onDelete() {
        if (confirm("Do you want to delete sprint ?")) {
            div.current?.classList.add("delete")
            setTimeout(() => { div.current?.classList.remove("delete"); props.dl(props.key_my) }, 2000)
        }
    }

    return (
        <div className='bg-white p-5 shadow-2xl w-full m-auto mb-5' ref={div}>
            <div className="flex">
                <div className="w-full flex">

                    {edit ? (
                        <input
                            defaultValue={name}
                            autoFocus={true}
                            maxLength={15}
                            onChange={(e) => setName(e.target.value)}
                            // Optionally add a type and styling
                            type="text"
                        />
                    ) : (
                        <label>
                            {props.done ? <del>{name}</del> : name}
                        </label>
                    )}

                </div>
                <div onClick={() => setEdit(!edit)} className="m-2">
                    {edit ?
                        <AiOutlineCheck color={'#FFD700'} size={'22px'} /> :
                        <BiPencil color={'#FFD700'} size={'22px'} />
                    }
                </div>
                <div onClick={onDelete}>
                    <BiTrash color='#ff0000' size={'22px'} className="m-2" />
                </div>
            </div>
        </div>
    )
}

export default SprintComponent
