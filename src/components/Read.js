import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Read() {

    const [data,setData]=useState([])
    const [error,setError]=useState("")
    async function getAllData(){

        const response=await fetch(process.env.REACT_APP_API_LINK)
        const result=await response.json()

        if(!response.ok){
            setError(`Error: ${result.message}`); // Adjust this based on your API response structure

        }
        if(response.ok){
            setError("")
            setData(result)
        }
    } 
    const handelDelete=async(id)=>{
        const response=await fetch(`${process.env.REACT_APP_API_LINK}${id}`,{
            method:"DELETE"
        })
        const result=await response.json();
        if(!response.ok){
            setError(response.error)
        }
        if(response.ok){
            setError("deleted succesfully")
        }
        setTimeout(()=>{
            setError("")
            getAllData()
        },3000)
    }

    useEffect(()=>{
        getAllData()
    })
    let srno=1;
    
    return (
        <div className='container py-2'>
            
            {error && <div className='alert alert-danger'>{error}</div>}
            <table className='col-md-6 table mx-auto'>
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Task</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                data?.map((ele,index)=>{
                    return( 
                    <tr key={index}>
                        <td>{srno++}</td>
                        <td align='start'><b>{ele.task}</b></td>
                            
                        <td><Link to={`/${ele._id}`} class="text-warning  mx-4 "><EditNoteIcon/> </Link>
                            <a onClick={()=>{handelDelete(ele._id)}} class="text-danger"> <DeleteIcon/> </a>
                        </td>
                    
                </tr>
                )
                
                })}
                </tbody>
                

               
            </table>
        </div>
    )
}
