import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { getActivities, getCountries, getCountriesByAct, configRouteCoutries } from '../../actions'
import { Country } from '../CountryCard/CountryCard'
import './HomeCountries.css'


export function Countries(props) {
    const [name, setName] = useState('')
    const [continent, setContinent] = useState('')
    const [activity, setActivity] = useState('')
    const [order, setOrder] = useState({order: 'name', type: 'ASC'})
    const [filter , setFilter] = useState('')
    
    let continentes = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas', 'Polar']
    const data = { continent, order, name }

    useEffect(() => {
        props.getCountries(data)
        props.getActivities();
        props.configRoute(data)
    }, [continent, order, name]) 

    useEffect(() => {
        props.getCountriesByAct(activity)
    }, [activity])

    
    function handleSubmit(e) {
        e.preventDefault();
        if(!props.countries.length){ 
            window.alert('Pais no encontrado')
        }
    }

    function handleChange(e) {
        var value = e.target.value
        setName(value)
    }


    function onfilter(e) {
        var value = e.target.value
        setFilter(value)
    }

    function filterContinent(e) {
        var value = e.target.value
        setContinent(value)
    }

    function filterActivity(e) {
        var value = e.target.value
        setActivity(value)
    }

    function orderBy(e) {
        let prop = e.target.name
        let value = e.target.value
        setOrder({...order, [prop]: value})
    }

    
        
    return (
        <div className='container-2'>
            <form className="form-selection" >
            <p><input placeholder="Buscar país" onChange={handleChange} style={{borderRadius: '1px'}} onSubmit={handleSubmit}></input>
            <button type="submit" onClick={handleSubmit}><i className="fas fa-search"></i></button></p>
            
            <p>Filtrar por
                <select name="filter" value={filter} onChange={onfilter}>
                    <option value=""></option>
                    <option value="continente">Continente</option>
                    <option value="actividad">Actividad turistica</option>
                </select>
                    {filter ? 
                        filter === 'continente' ?
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
                <select name="order" value={order.order} onChange={orderBy}>
                    <option value="name">Alfabético</option>
                    <option value="population" >Población</option>
                </select>{order.order ?
                    <select name="type" value={order.type} onChange={orderBy}>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC" >Descendente</option>
                </select>
                :null}</p>
            </form>
            <h3 style={{marginLeft: '150px', marginBottom: '70px'}}>{props.numCountriesLoad} / COUNTRIES </h3>
            <div className="container-countries">
                {activity ? 
                    props.countriesByAct && props.countriesByAct.map(obj => 
                            obj.countries.map(country => <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />)
                    )
                :    props.countries && props.countries.map(country =>
                        <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />
                )}
            </div>
            <div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        countries: state.countriesLoaded,
        activities: state.countriesActivity,
        countriesByAct: state.countriesByAct,
        numCountriesLoad: state.numCountriesLoad,
        route: state.routeCountries
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        getCountries: name => dispatch(getCountries(name)),
        getActivities: activity => dispatch(getActivities(activity)),
        getCountriesByAct: activity => dispatch(getCountriesByAct(activity)),
        configRoute: route => dispatch(configRouteCoutries(route)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)