import React from 'react'
import TaskCard from './TaskCard';


async function loadTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
    cache: 'no-store',
  });
  const tasks = await res.json()
  return tasks
  }

  
async function ListTasks() {

  const tasks = await loadTasks()
  

  return (
    <div className='bg-slate-700 p-3 w-full rounded-3xl'>
      <h1 className='text-slate-200 text-4xl font-bold pl-5'>Task List</h1>

      {tasks.map (task =>(
       <TaskCard task={task} key={task.id}/>
      ))}

    </div>
  )
}

export default ListTasks