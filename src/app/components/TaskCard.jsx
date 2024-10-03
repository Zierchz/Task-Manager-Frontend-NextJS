'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function TaskCard({task}) {
    const router = useRouter()
    const [editing, setediting] = useState(false);
    const [newTitle, setnewTitle] = useState(task.title);
    const [newDescription, setnewDescription] = useState(task.description);

    const handleDelete = async (id) => {
       if(window.confirm('Are you sure you want to delete this task?')){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,{
            method : "DELETE",
    })
    if(res.status === 204){
         router.refresh()
    }
}
}

    const handleDone = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,{
            method : "POST",
    })
    if(res.status === 200){
         router.refresh()
    }
    }

    const handleUpdate = async (id) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,{
          method : "PUT",
          body : JSON.stringify({title: newTitle, description: newDescription}),
          headers : {
            "Content-Type" : "application/json"
          }
      
  })
  const data = await res.json()
  setnewTitle(data.title)
  setnewDescription(data.description)
  if(res.status === 200){
       router.refresh()
  }
  }

  return (
    <div key={task.id} 
    className='w-full my-3 bg-slate-600 rounded-lg px-4 py-1 text-lg flex justify-between items-center'>
      <div className='flex flex-col text-slate-50 w-full'>

      { !editing ?  (<>
      <h2 className='text-2xl font-bold'>{newTitle}   {task.done ? <span className='text-blue-600 text-2xl w-40 font-bold'>✓</span> : null}</h2>
      <p className='text-md '>{newDescription}</p>
      </>)
      : (<>
        <input type="text" placeholder={task.title} 
        className='text-2xl font-bold w-full bg-slate-600 outline-none animate-pulse cursor-text'
        onChange={e => setnewTitle(e.target.value)}/>
        <input type="text" placeholder={task.description} 
        className='text-md w-full bg-slate-600 outline-none animate-pulse cursor-text'
        onChange={e => setnewDescription(e.target.value)}/>
        
        </>)
 }
      </div>
      <div className='flex justify-between gap-x-2'>
      {editing &&
      (<button className='bg-slate-100 rounded-md text-slate-700 p-1 font-bold hover:bg-slate-300 w-16'
        onClick={()=> {setediting(!editing);handleUpdate(task.id)}}>Save</button>)}
      <button className={" rounded-md p-1 font-bold text-slate-50 w-16 " + (!task.done ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500')}
      onClick={()=> handleDone(task.id)}>{task.done ? 'Undo' : 'Do'}</button>

        <button className='bg-red-500 hover:bg-red-600 rounded-md p-1 font-bold text-slate-50 w-16'
        onClick={()=> handleDelete(task.id)}>Delete</button>

        <button className='bg-indigo-500 hover:bg-indigo-600 rounded-md p-1 font-bold text-slate-50 w-16'
        onClick={()=> setediting(!editing)}>Update</button>
      </div>
    </div>
  )
}

export default TaskCard
