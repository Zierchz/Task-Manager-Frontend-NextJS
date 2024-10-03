'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"



function FormTasks() {
  const [title,setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter() 


  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,{
      method : "POST",
      body : JSON.stringify({title, description}),
      headers : {
        "Content-Type": "application/json"
      }
    })
    setTitle('')
    setDescription('')
    const data = await res.json()
    router.refresh()
  }

  return (
    <div className='bg-slate-200 p-10 font-bold text-black w-96 max-h-80 rounded-3xl'>
      <h1 className='mb-4 text-2xl'>Add Task</h1>
      <form onSubmit={handleSubmit} 
      className='font-medium'>

        <label htmlFor="title">Title</label>  
        <input type="text" name='title' id='title' value={title}
          className='bg-slate-300 rounded-lg p-2 mb-2 block w-full'
          onChange={(event) => setTitle(event.target.value)} />

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" value={description}
          className='bg-slate-300 rounded-lg p-2 mb-2 block w-full'
          onChange={(event) => setDescription(event.target.value)}></textarea>

        <button className='container mx-auto bg-slate-400 rounded-lg p-2 m-2 font-bold text-xl hover:bg-slate-500'>Save</button>

      </form>

    </div>
  )
}

export default FormTasks 