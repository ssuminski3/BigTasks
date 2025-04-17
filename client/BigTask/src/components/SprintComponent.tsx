import React, { useRef } from 'react'
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { Sprint } from '../lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteSprint } from '../lib/apiCalls';

function SprintComponent(props: Sprint) {

    const div = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    const { getAccessTokenSilently } = useAuth0();

    const edit = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigate(`/createsprint/${props.id}`)
    }
    
    const show = () => {
        navigate(`/showsprint/${props.id}`)
    }

    async function onDelete(e: React.MouseEvent) {
        e.stopPropagation()
        if (confirm("Do you want to delete sprint ?")) {
            div.current?.classList.add("delete")
            setTimeout(() => { div.current?.classList.remove("delete"); props.dl?.(props.id) }, 2000)
            await deleteSprint(props.id, await getAccessTokenSilently())
        }
    }

    return (
        <div className='bg-white p-5 shadow-2xl w-full m-auto mb-5' ref={div} onClick={show}>
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
