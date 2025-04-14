import { useRef } from 'react'
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

type Sprint = {
    name: string,
    key_my: number,
    done: boolean,
    dl: (index: number) => void
}

function SprintComponent(props: Sprint) {

    const div = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();
    const edit = () => {
        navigate(`/createsprint/${props.key_my}`)
    }

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


                    <label>
                        {props.done ? <del>{props.name}</del> : props.name}
                    </label>


                </div>
                <div onClick={edit} className="m-2">
                    <BiPencil color={'#FFD700'} size={'22px'} />
                </div>
                <div onClick={onDelete}>
                    <BiTrash color='#ff0000' size={'22px'} className="m-2" />
                </div>
            </div>
        </div>
    )
}

export default SprintComponent
