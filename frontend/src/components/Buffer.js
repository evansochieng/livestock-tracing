import React from 'react';
import {useFormik} from 'formik';
import "../App.css"

const Buffer = ({ setLivestockAtRisk }) => {

    const {handleSubmit, values, handleChange} = useFormik({
        initialValues: {buffer: 0},
        onSubmit: (values) => {
            console.log(values)
            fetch("http://127.0.0.1:5000/livestock_at_risk", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(data => setLivestockAtRisk(data))
        }
    });

  return (
    <form className='buffer-form' onSubmit={handleSubmit}>
        <h3>Change Risk Buffer</h3>
        <label htmlFor="buffer">Buffer</label>: {values.buffer}
        <input id='buffer' type="range" min={0} max={5000} value={values.buffer} onChange={handleChange}/>
        <button>Change</button>
    </form>
  )
}

export default Buffer