import { useState} from 'react'
export default function ToDoForm({toggle , editData ,handleClearState}){
    const editedData = Object.entries(editData)
    const [ form , setForm ] = useState(editedData.length !==0 ?{
        name:editData.name,
        priority:editData.priority
    }:{
        name:'',
        priority:''
    })
    const handleChange = (e)=>{
        const { name , value } = e.target
        setForm({...form , [name]:value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(form)
        const formData = {
            id:editedData.length !== 0?editData.id:Number(new Date()),
            name:form.name,
            priority:form.priority,
            completed:editedData.length !== 0?editData.completed:false
        }
        const data = localStorage.getItem('data')
        const updateData = data ? JSON.parse(data):[]
        if(Object.entries(editData).length !==0){
            const updatedData = updateData.map((ele)=>{
                if(ele.id === editData.id){
                    return formData
                }else{
                    return ele
                }
            })
            localStorage.setItem('data' , JSON.stringify(updatedData))
            handleClearState()
        }else{
            localStorage.setItem('data' , JSON.stringify([...updateData , formData]))
        }
        setForm({name:'' , priority:''})
        toggle()
    }
    return (
        <div>
            <h4>Add Task</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Enter Name</label><br/>
                <input type="text" value={form.name} onChange={handleChange} name='name' id='name'/><br/>
                <label htmlFor='priority'>Select Priority</label><br/>
                <select value={form.priority} onChange={handleChange} name='priority' id='priority'>
                    <option value=''>select</option>
                    <option value='High'>High</option>
                    <option value='Moderate'>Moderate</option>
                    <option value='Low'>Low</option>
                </select><br/>
                <input type='submit'/>
            </form>
            
        </div>
    )
}