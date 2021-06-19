import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getCountryDetail } from '../../actions/index'


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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h2>{name}</h2>
                <img src={flag} style={{ width: '300px', height: 'auto' }} />
                <p>Id: {id}</p>
                <p>Continente: {continent}</p>
                <p>Capital: {capital}</p>
                <p>Subregión: {subregion}</p>
                <p>Area: {area}</p>
                <p>Población: {population}</p>
            </div>
            {activities?
            <div style={{alignItems: 'center'}}>
                <h3>Actividades turisticas</h3>
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
                        {activities.map(act => {
                            return (
                                <tr>
                                    <td>{act.name}</td>
                                    <td>{act.difficulty}</td>
                                    <td>{act.duration}</td>
                                    <td>{act.season}</td>
                                </tr>
                            )
                        })}
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