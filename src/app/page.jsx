import React from 'react'
import FormTasks from './components/FormTasks'
import ListTasks from './components/ListTasks'

// export const dynamic = "force-dynamic";

function Homepage() {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center'>
      <h1 className='text-5xl p-4 text-slate-200 font-extrabold border-t-2 border-b-2 border-slate-200 rounded-xl my-4'> My Task Manager</h1>
      </div>
      <div className='flex gap-x-10 m-3'>

        <FormTasks />
        <ListTasks />
      </div>
    </div>
  )
}

export default Homepage
