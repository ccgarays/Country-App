import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addActivity } from '../../actions';

import axios from 'axios'


export function AddActivity(props) {
  const [activity, setActivity] = useState({name: "", duration: null, difficulty: null, season: ""});
  

  function handleChange(e) {
    var prop = e.target.name
    var value = e.target.value
    setActivity({...activity, [prop]:value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const act = {
        name: activity.name,
        duration: activity.duration,
        difficulty: activity.difficulty,
        season: activity.season,
        country: 'Argentina'
    };
    
    axios.post('http://localhost:3001/activity',  act )
        .then(res => {
            console.log(res)
            console.log(res.data)
        }).catch(err => console.log(err))
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="name" type="text" onChange={handleChange} />
        <label>Duracion</label>
        <input name="duration" type="text" onChange={handleChange}/>
        <label>Dificultad</label>
        <input name="difficulty" type="text" onChange={handleChange} />
        <label>Temporada</label>
        <input name="season" type="text" onChange={handleChange} />
        <button type="submit">Agregar</button>
      </form>
      <div style={{width: '50vw',  backgroundColor: 'red'}}>
          {/* <button></button> */}
          <h5>Seleccione país</h5>
          <select></select>
      </div>
    </div>
  )
};


function mapDispatchToProps(dispatch) {
  return {
    addActivity: activity => dispatch(addActivity(activity)),
  }
}

export default connect(null, null)(AddActivity);