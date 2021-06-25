import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getCountryDetail } from '../../actions/index'
import './CountryDetail.css'


export function Country(props) {
    const { flag, name, continent, id, capital, subregion, area, population, activities } = props.country
    useEffect(() => {
        const id = props.match.params.idPais
        props.detailCountry(id)
    }, [])
    
if(!name) {
    return (
        <h1 style={{textAlign: 'center'}}>Cargando...</h1>
    )
}

    return (
        <div className='container-detail' >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h2><b>{name}</b></h2>
                <img src={flag} style={{ width: '300px', height: 'auto' }} />
                <p><b>Id:</b> {id}</p>
                <p><b>Continente:</b> {continent}</p>
                <p><b>Capital:</b> {capital}</p>
                <p><b>Subregión:</b> {subregion}</p>
                <p><b>Area:</b> {area} km2</p>
                <p><b>Población:</b> {population} hab</p>
                {activities.length ? <h3 ><b>Actividades turisticas</b></h3>:null}
            </div>
            {activities.length ?
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Dificultad</th>
                            <th>Duracion</th>
                            <th>Temporada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(act => 
                                <tr>
                                    <td>{act.name}</td>
                                    <td>{act.difficulty}</td>
                                    <td>{act.duration}</td>
                                    <td>{act.season}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        :<>{null}</>}
        </div>
        
        )
}

function mapStateToProps(state) {
    return { country: state.countryDetail }
}

function mapDispatchToProps(dispatch) {
    return { detailCountry: idPais => dispatch(getCountryDetail(idPais)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);