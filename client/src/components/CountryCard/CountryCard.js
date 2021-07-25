import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import './Country.css'



export function Country(props) {
    const { flag, name, continent, idPais } = props

    return (
        <div className='country-card'>
            <div className="container-country">
                <Link to={`/countries/${idPais}`} className="container-flag ">
                    <img src={flag} />
                </Link>
                <div className="container-inf">
                    <h5>{name}</h5>
                    <p>{continent}</p>
                </div>
            </div>
        </div>

    )
}
