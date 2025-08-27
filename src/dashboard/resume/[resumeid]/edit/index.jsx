import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditResume = () => {
    const params = useParams();
    useEffect(()=>{
        console.log(params.resumeid)
    },[])
  return (
    <div>EditResume</div>
  )
}

export default EditResume