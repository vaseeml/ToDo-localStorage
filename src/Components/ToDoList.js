import { useEffect, useState , useCallback} from "react"
export default function ToDoList({toggle , handleEdit}){
    const [ tasks , setTasks] = useState([])
    const localStorage = useCallback(() => localStorage.getItem('data'), [])
    useEffect(()=>{
        const data = localStorage.getItem('data')
        const taskData = data ? data : '[]'
        console.log('useEffect Called')
        setTasks(JSON.parse(taskData))
    },[localStorage])
    const handleRemove = (id)=>{
        const confimation = window.confirm('Are You Sure?')
        if(confimation){
            const data = localStorage.getItem('data')
            const updatedData = JSON.parse(data).filter(ele=>ele.id !== id)
            setTasks(updatedData)
            localStorage.setItem('data' , JSON.stringify(updatedData))
        }
    }
    const handleCompleted = (id)=>{
        const updatedData = tasks.map((ele)=>{
            if(ele.id === id ){
                return {...ele , completed:!ele.completed}
            }else{
                return ele
            }
        })
        setTasks(updatedData)
        localStorage.setItem('data' , JSON.stringify(updatedData))
    }
    const priorityOrder = {
        'High': 3,
        'Moderate': 2,
        'Low': 1
    }

    const sortedTasks = tasks.slice().sort((a, b) => {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    return (
        <div>
            <h4>Listing The Tasks - {tasks.length}</h4>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedTasks.map((ele)=>{
                            return <tr key={ele.id}>
                                <td>{ele.name}</td>
                                <td>{ele.priority}</td>
                                <td><input type="checkbox" checked={ele.completed} onChange={()=>handleCompleted(ele.id)}/></td>
                                <td><button style={{backgroundColor:'blue' , color:'white'}} onClick={()=>{
                                    toggle()
                                    handleEdit(ele) 
                                    }}
                                    >edit
                                    </button>{' '}
                                    <button onClick={()=>handleRemove(ele.id)} style={{backgroundColor:'red' , color:'white'}}>remove</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}