import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Create() {

  const [task, setTask] = useState("");
  const [error,setError]=useState("")

  const navigate=useNavigate()

  const handelSubmit=async(e)=>{
    e.preventDefault()
    console.log("chck 1");
    console.log(process.env.REACT_APP_API_LINK)
    const response=await fetch(process.env.REACT_APP_API_LINK,{
      method:"POST",
      body: JSON.stringify({ task }), 
      headers:{
        "Content-Type":"application/json",
      }
    })
    
    console.log("chck 2");
    const result=await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error)
    }
    if(response.ok){
      console.log(result);
setError("")
setTask("")
    }
  }
  return (
    <div className='container my-sm-2'>
      <h1 className='text-center'>Enter Task here</h1>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handelSubmit} className='d-flex justify-content-center'>
        <div className="mb-3 d-flex col-12 col-sm-7">
          <input type="text" placeholder='Enter Your Task Here...' className="form-control" value={task} onChange={(e) => setTask(e.target.value)} />
        
          <button type="submit" className="btn btn-success mx-2">Submit</button>
        
        </div>
      </form>
    </div>
  )
}
