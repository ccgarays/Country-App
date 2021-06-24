import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getActivities, getCountryDetail } from '../../actions';

import './AddActivity.css'
import axios from 'axios'


export function AddActivity(props) {
  const [activity, setActivity] = useState({ name: "", duration: null, difficulty: null, season: "" });
  const [countries, setCountries] = useState([])
  const [numAct, setNumAct] = useState([1])
 

  useEffect(() => {
    props.getAllCountries('all')
  },[])

  function handleChange(e) {
    var prop = e.target.name
    var value = e.target.value
    setActivity({ ...activity, [prop]: value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const act = {
      name: activity.name,
      duration: activity.duration,
      difficulty: activity.difficulty,
      season: activity.season,
      country: countries.length ? countries.map(obj => obj.value) : ''
    };

    console.log(act.country)
    axios.post('http://localhost:3001/activity', act)
      .then(res => {
        console.log(res)
        console.log(res.data)
      }).catch(err => console.log(err))

    setActivity({ name: "", duration: null, difficulty: null, season: "" })
    console.log(activity)
  }


  function selectCountry(country) {
    setCountries( country)
  }

  function createNewAct(e){
    const prop = e.target.name
    console.log(numAct)
    if(prop === 'create') setNumAct([...numAct, 1])
  }
  return (
    <div className='form'>
      <form className='form-act' onSubmit={handleSubmit}>
        <h3 className='title-form'>AGREGAR ACTIVIDAD</h3>
        {numAct.map(el => 
          <p key={el + 1}>
          <label className='name-label' >Nombre</label>
          <input name="name" type="text" onChange={handleChange} />
          <label>Duracion</label>
          <input name="duration" type="text" onChange={handleChange} />
          <label>Dificultad</label>
          <input name="difficulty" type="text" onChange={handleChange} />
          <label>Temporada</label>
          <input name="season" type="text" onChange={handleChange} />
          {/* <button style={{borderRadius: '300px'}} name='delete' onClick={createNewAct}>x</button> */}
          </p>
          )}
          <p>{props.allCountries.length ? <Select autosize={true} isMulti name='countries' options={props.allCountries} onChange={selectCountry} placeholder='Selecciones país...'/> : null}</p>

        <button className='add' type="submit">Agregar</button>
        {countries.length ? <button className='add-new' type="submit" name='create' onClick={createNewAct} >Nueva Actividad</button> : null}
      </form>
    </div>
  )
};


function mapStateToProps(state) {
  return {
    activities: state.countriesActivity,
    allCountries: state.countryDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getActivities: activity => dispatch(getActivities(activity)),
    getAllCountries: country => dispatch(getCountryDetail(country))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity);