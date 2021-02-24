import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

 const  App = () => {
   const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([
])
//Toggle Reminder
const ToggleReminder = (id) => {
setTasks(tasks.map((task) => task.id ===id ? {...task, reminder:
  !task.reminder} :task

)
)
}


useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
getTasks()
}, [])


// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch ('http://localhost:5000/tasks')
  const data=await res.json()

 return data
}
// AddTask
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',
   { method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(task)
  
  
  
})
const data = await res.json()
setTasks([...tasks, data])
}





//const addTask = (task) => {
//const id = Math.floor(Math.random() * 1000) + 1
//const newTask = {  id, ...task}
//setTasks([...tasks, newTask])





//Delete Task
const deleteTask = async (id) => {
await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'DELETE',
})
setTasks(tasks.filter((task) => task.id !==id))
}



  
  return (
    <div className="container">
      <Header onAdd={() =>  setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      { showAddTask &&<AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={ToggleReminder}/> : 'No Task'}
  
     </div>
  );
}



export default App;
