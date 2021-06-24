import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getActivities, getCountryDetail } from '../../actions';

import './AddActivity.css'
import axios from 'axios'


export function AddActivity(props) {
  const [activity, setActivity] = useState([{ name: "", duration: null, difficulty: null, season: "" }]);
  const [countries, setCountries] = useState([])


  useEffect(() => {
    props.getAllCountries('all')
  }, [])

  function handleChange(e) {
    const prop = e.target.name
    const value = e.target.value
    const index = prop.slice(prop.length - 1, prop.length)
    const name = prop.slice(0, prop.length - 1)
    let actividades = [...activity]
    actividades[index] = { ...actividades[index], [name]: value }
    setActivity(actividades)
  }


  function handleSubmit(e) {
    e.preventDefault();
    for (let act of activity) {
      const name = act.name
      const duration = act.duration
      const difficulty = act.difficulty
      const season = act.season
      const country = countries.length ? countries.map(obj => obj.value) : ''
      
      axios.post('http://localhost:3001/activity', {name, duration, difficulty, season, country})
        .then(res => {
          console.log(res)
          console.log(res.data)
        }).catch(err => console.log(err))
    }
  }


  function selectCountry(country) {
    setCountries(country)
  }


  function createNewAct(e) {
    const prop = e.target.name
    setActivity([...activity, { name: "", duration: null, difficulty: null, season: "" }])
  }

  return (
    <div className='form'>
      <div className='form-act'>
        <form  onSubmit={handleSubmit}>
          <h3 className='title-form'>AGREGAR ACTIVIDAD</h3>
          {activity.map((act, index) =>
            <p key={index}>
              <label className='name-label' >Nombre</label>
              <input name={`name${index}`} type="text" onChange={handleChange} />
              <label>Duracion</label>
              <input name={`duration${index}`} type="text" onChange={handleChange} />
              <label>Dificultad</label>
              <input name={`difficulty${index}`} type="text" onChange={handleChange} />
              <label>Temporada</label>
              <input name={`season${index}`} type="text" onChange={handleChange} />
              {/* <button style={{borderRadius: '300px'}} name='delete' onClick={createNewAct}>x</button> */}
            </p>
          )}
          <p>{props.allCountries.length ? <Select autosize={true} isMulti name='countries' options={props.allCountries} onChange={selectCountry} placeholder='Selecciones país...' /> : null}</p>
          <button className='add' type="submit">Agregar</button>
        </form>
        {countries.length ? <button className='add-new' type="submit" name='create' onClick={createNewAct} >Nueva Actividad</button> : null}
      </div>
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