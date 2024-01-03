import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { id } = useParams()

  const getSingleTask = async () => {
    const response = await fetch(`http://localhost:4000/${id}`)
    const result = await response.json()
    if (!response.ok) {
      console.log(result.error);
      setError(result.error)
    }
    if (response.ok) {
      setError("")
      console.log(result);
      setTask(result.task)
    }
  }



  const handelUpdate = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_API_LINK}${id}`, {
      method: "PATCH",
      body: JSON.stringify({ task }), 
      headers: {
        "Content-Type": "application/json",

      }
    })
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error)
    }
    if (response.ok) {
      console.log(result);
      setError("")
      setTask("")
      navigate("/")
    }
  }
  useEffect(() => {
    getSingleTask()
  }, [])
  return (
    <div className='container my-2'>
      <h1 className='text-center'>Update Task here</h1>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handelUpdate}className='d-flex justify-content-center'>
      <div className="mb-3 d-flex col-12 col-sm-7">
          <input type="text" placeholder='Enter Your Task Here...' className="form-control" value={task} onChange={(e) => setTask(e.target.value)} />
        
          <button type="submit" className="btn btn-warning mx-2">Update</button>
        
        </div>
      </form>
    </div>
  )
}
