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
    const [order, setOrder] = useState({order: 'name', type: 'ASC'})
    const [filter , setFilter] = useState('')
    
    let continentes = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas', 'Polar']
    const data = { page, size, continent, order } // ponemos { name, page, size, continent, order } si queremos que los paises vayan apareciendo en patanlla

    useEffect(() => {
        props.getCountries(data)
        props.getActivities();
    }, [page, size, continent, order, name]) 

    useEffect(() => {
        props.getCountriesByAct(activity)
    }, [activity])

    function onPageChanged(data) {
        const { currentPage, totalPages, pageLimit } = data;

    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.getCountries({...data, name})
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
        <div>
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
            <div className="container-countries">
                {activity ? 
                    props.countriesByAct && props.countriesByAct.map(obj => 
                            obj.countries.map(country => <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />)
                    )
                :    props.countries && props.countries.map(country =>
                        <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />
                )}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div >1</div>
                <div>2</div>
                <div>3</div>
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