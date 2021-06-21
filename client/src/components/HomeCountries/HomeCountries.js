// aqui se deben renderizar todos los paises: componente CardCountry
//tener en cuenta que es con paginacion
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { getActivities, getCountries, getCountriesByAct } from '../../actions'
import { Country } from '../CountryCard/CountryCard'
import './HomeCountries.css'


export function Countries(props) {
    const [page, setPages] = useState(0)
    const [size, setSize] = useState(10)
    const [name, setName] = useState('')
    const [continent, setContinent] = useState('')
    const [activity, setActivity] = useState('')
    const [form , setForm] = useState({filter:'', order: '', typeOrder: ''})
    
    let continentes = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas', 'Polar']
  
    useEffect(() => {
        const data = { name, page, size, continent }
        props.getCountries(data)
        props.getActivities();
    }, [page, size, name, continent]) 

    useEffect(() => {
        props.getCountriesByAct(activity)
    }, [activity])

    function onPageChanged(data) {
        const { currentPage, totalPages, pageLimit } = data;

    }
    

    function handleChange(e) {
        var prop = e.target.name
        var value = e.target.value
        setName(value)
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function onfilter(e) {
        var prop = e.target.name
        var value = e.target.value
        setForm({...form, [prop]:value})
    }

    function filterContinent(e) {
        var value = e.target.value
        setContinent(value)
    }

    function filterActivity(e) {
        var value = e.target.value
        setActivity(value)
    }

        
    return (
        <div>
            <form className="form-selection" >
            <p><input placeholder="Buscar país" onChange={handleChange} style={{borderRadius: '1px'}} onSubmit={null}></input></p>
            {/* <button type="submit" onSubmit={handleSubmit}><i class="fas fa-search"></i></button></p> */}
            
            <p>Filtrar por
                <select name="filter" value={form.filter} onChange={onfilter}>
                    <option value=""></option>
                    <option value="continente">Continente</option>
                    <option value="actividad">Actividad turistica</option>
                </select>
                    {form.filter ? 
                        form.filter === 'continente' ?
                            <select name="continent" value={continent} onChange={filterContinent}>
                                <option value=""></option>
                                {continentes.map(continent => <option key={continent}>{continent}</option>)}
                            </select>
                        :
                            <select name="activity" value={activity} onChange={filterActivity}>
                                <option value=""></option>
                                {props.activities ? props.activities.map(actividad => <option key={actividad.name}>{actividad.name}</option>): null}
                            </select>
                    :null}
            </p>
            <p>Ordenar por
                <select name="order" onChange={onfilter}>
                    <option value=""></option>
                    <option value="pais">Pais</option>
                    <option value="poblacion" >Población</option>
                </select>{form.order ?
                    <select name="typeOrder" onChange={onfilter}>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente" >Descendente</option>
                </select>
                :null}</p>
            </form>
            <div className="container-countries">
                {activity ? 
                    props.countriesByAct && props.countriesByAct.map(obj => 
                            obj.countries.map(country => <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />)
                    )
                :    props.countries && props.countries.map(country =>
                        <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />
                )}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        countries: state.countriesLoaded,
        activities: state.countriesActivity,
        countriesByAct: state.countriesByAct
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        getCountries: name => dispatch(getCountries(name)),
        getActivities: activity => dispatch(getActivities(activity)),
        getCountriesByAct: activity => dispatch(getCountriesByAct(activity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)