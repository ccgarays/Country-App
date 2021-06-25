import { React, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Country.css'



export function Country(props) {
    const { flag, name, continent, idPais } = props

    return (
        <div className="container-country">
            <div className="container-inf">
                <Link to={`/countries/${idPais}`} className='country-card'>
                    <h5>{name}</h5>
                </Link>
                <p>{continent}</p>
            </div>
            <div className="container-flag ">
                <img src={flag}/>
            </div>
        </div>
    )
}
