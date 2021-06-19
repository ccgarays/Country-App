// aqui se deben renderizar todos los paises: componente CardCountry
//tener en cuenta que es con paginacion
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { getCountries } from '../../actions'
import { Country } from '../CountryCard/CountryCard'
import './HomeCountries.css'


export function Countries(props) {
    const [page, setPages] = useState(0)
    const [size, setSize] = useState(15)
    const [name, setName] = useState('')
    const paises = props.countries

    useEffect(() => {
        const data = { name, page, size }
        props.getCountries(data)
    }, [page, size, name])

    function onPageChanged(data) {
        const { currentPage, totalPages, pageLimit } = data;

    }

    return (
        <div>
            <form className="form-selection">
            <p><input placeholder="Ingrese país"></input>
            <button type="submit">Buscar</button></p>
            <p>Filtrar por
            <select name="select">
                <option value="value1">Continente</option>
                <option value="value2" >Actividad turistica</option>
            </select></p>
            <p>Ordenar por
            <select name="select">
                <option value="value1">Pais</option>
                <option value="value2" >Población</option>
            </select><select name="select">
                <option value="value1">Ascendente</option>
                <option value="value2" >Descendente</option>
            </select></p>
            </form>
            <div className="container-countries">
                {paises && paises.map(country =>
                    <Country key={country.id} flag={country.flag} name={country.name} continent={country.continent} idPais={country.id} />
                )}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { countries: state.countriesLoaded }
}

function mapDispatchToProps(dispatch) {
    return { getCountries: name => dispatch(getCountries(name)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)