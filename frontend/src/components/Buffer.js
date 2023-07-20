import React, { useState } from 'react';
import {useFormik} from 'formik';
import "../App.css"

const Buffer = ({ setLivestockAtRisk }) => {

  // // initialize state for buffer
  // const [values, setValues] = useState({ buffer: 0 });

  // // create handle change function
  // const handleChange = (event) => {
  //   setValues(event.target.value);
  // };

  // // define handle submit function
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   fetch("http://127.0.0.1:5000/livestock_at_risk", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setLivestockAtRisk(data);
  //     });
  // }

  // use formik
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
    <div
      className="buffer-div"
      style={{ position: "absolute", marginTop: "30px", right: "20px" }}
    >
      <h3>
        <strong>Change Risk Buffer</strong>
      </h3>
      <form className="buffer-form" onSubmit={handleSubmit}>
        <label htmlFor="buffer">Buffer: {values.buffer}</label>
        <input
          id="buffer"
          type="range"
          min={0}
          max={5000}
          value={values.buffer}
          onChange={handleChange}
        />
        <button>Change</button>
      </form>
    </div>
  );
}

export default Buffer