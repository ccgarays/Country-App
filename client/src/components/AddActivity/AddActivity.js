import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getActivities, getCountryDetail } from '../../actions';
import { Link } from 'react-router-dom'

import './AddActivity.css'
import axios from 'axios'


export function AddActivity(props) {
  const [activity, setActivity] = useState([{
    name: "",
    duration: null,
    difficulty: null,
    season: "",
    errors: {
      name: "",
      duration: "",
      difficulty: "",
      season: ""
    },
    disabled: true
  }]);

  const [countries, setCountries] = useState([])
  const [errorS, setErrorS] = useState(true)


  useEffect(() => {
    props.getAllCountries('all')
  }, [])


  function validarForm(actividades, errors, index) {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (valid) {
      actividades[index] = { ...actividades[index], disabled: false }
      setActivity(actividades)
    } else {
      actividades[index] = { ...actividades[index], disabled: true }
      setActivity(actividades)
    }
    return !valid
  }


  function handleChange(e) {
    const prop = e.target.name
    const value = e.target.value
    const validate = e.target.validity.valid
    const index = prop.slice(prop.length - 1, prop.length)
    const name = prop.slice(0, prop.length - 1)
    let errors = activity[index].errors

    switch (name) {
      case 'name':
        errors.name = value.length < 3 ? 'Nombre debe tener al menos 3 caracteres' : ''
        break;
      case 'duration':
        errors.duration = !validate ? 'Duración debe ser una valor 0-24' : 0 < value && value <= 24 ? '' : 'Duración debe ser una valor 0-24'
        break
      case 'difficulty':
        errors.difficulty = !validate ? 'Dificultad debe ser una valor 0-5' : 0 < value && value <= 5 ? '' : 'Dificultad debe ser una valor 0-5'
        break
      case 'season':
        errors.season = !value ? 'Seleccione temporada' : ''
        break
      default:
        break;
    }

    let actividades = [...activity]
    actividades[index] = { ...actividades[index], [name]: value }
    setActivity(actividades)

    let valid = validarForm(actividades, errors, index)
    setErrorS(valid)
  }


  function handleSubmit(e) {
    e.preventDefault();
    for (let act of activity) {
      const name = act.name
      const duration = act.duration
      const difficulty = act.difficulty
      const season = act.season
      const country = countries.length ? countries.map(obj => obj.value) : ''

      axios.post('http://localhost:3001/activity', { name, duration, difficulty, season, country })
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
    setActivity([...activity,
    {
      name: "",
      duration: null,
      difficulty: null,
      season: "",
      errors: {
        name: "",
        duration: "",
        difficulty: "",
        season: ""
      },
      disabled: true
    }])
  }

  return (
    <div className='container'>
      <Link to={'/countries'}><button className='home-button' >HOME</button></Link>
      <div className='form'>
        <div className='form-act form'>
          <form onSubmit={handleSubmit}>
            <h3 className='title-form'>AGREGAR ACTIVIDAD</h3>
            {activity.map((act, index) =>
              <div style={{ marginBottom: '30px' }} key={index}>
                <label className='name-label' >Nombre</label>
                <input className={activity[index].errors.name && 'danger'} name={`name${index}`} type="text" onChange={handleChange} placeholder='ski' />
                <label>Duracion</label>
                <input className={activity[index].errors.duration && 'danger'} name={`duration${index}`} type="text" onChange={handleChange} placeholder='Horas' pattern="^\d*(\.\d{0,2})?$" />
                <label>Dificultad</label>
                <input className={activity[index].errors.difficulty && 'danger'} name={`difficulty${index}`} type="text" onChange={handleChange} placeholder='0-5' pattern="^\d*(\.\d{0,2})?$" />
                <label>Temporada</label>
                <select name={`season${index}`} value={activity[index].season} onChange={handleChange}>
                  <option value=""></option>
                  <option value='Primavera'>Primavera</option>
                  <option value='Verano'>Verano</option>
                  <option value='Otoño'>Otoño</option>
                  <option value='Invierno'>Invierno</option>
                </select>
                {activity[index].name ? <p className='danger'>{activity[index].errors.name}</p> : null}
                {activity[index].duration ? <p className='danger'>{activity[index].errors.duration}</p> : null}
                {activity[index].difficulty ? <p className='danger'>{activity[index].errors.difficulty}</p> : null}
                {activity[index].season ? <p className='danger'>{activity[index].errors.season}</p> : null}
                {/* <button style={{borderRadius: '300px'}} name='delete' onClick={createNewAct}>x</button> */}
              </div>
            )}
  
            <p>{props.allCountries.length ? <Select autosize={true} isMulti name='countries' options={props.allCountries} onChange={selectCountry} placeholder='Selecciones país...' /> : null}</p>
            <button className='add' type="submit" disabled={errorS} >Agregar</button>
          </form>
          {countries.length ? <button className='add-new' type="submit" name='create' onClick={createNewAct} >Nueva Actividad</button> : null}
        </div>
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