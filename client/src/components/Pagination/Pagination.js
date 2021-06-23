import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {getCountries} from '../../actions'


export function Pagination(props) {
    const [currentPage, setcurrentPage] = useState(0)
    const totalPaises = props.numCountriesLoad 
    const data = props.route

   
    //funcion para generar rangos de numeros
    let numPag  = Math.ceil(totalPaises/10)
    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    //creacion de intervalos de numeros a mostrar
    const min = 2
    let buttons = []
    if(numPag === 1) buttons = []
    else if(numPag <= 4) buttons = range(2,numPag-1)
    else if(numPag > 4) buttons = range(min + currentPage, min + currentPage + 2)

    

    function handleSubmit(e) {
        let prop = e.target.name
        if(prop === 'next') setcurrentPage(currentPage + 1)
        if(prop === 'prev') setcurrentPage(currentPage - 1)
    }


    function changePage(e) {
        e.preventDefault();
        let prop = e.target.name
        props.getCountries({...data, page: prop})
        
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button name={0} onClick={changePage} >1</button>
                {numPag <= 5 ? buttons.map(num => <button key={num} name={num-1} onClick={changePage}>{num}</button>): 
                    currentPage ? 
                        <>
                            <button name='prev' onClick={handleSubmit}><i className="fas fa-angle-double-left"></i></button> 
                            {buttons.map(num => <button key={num} name={num-1} onClick={changePage}>{num}</button> )}
                            
                            {currentPage < numPag && buttons[2] < numPag -1 ? <button name='next' onClick={handleSubmit}><i className="fas fa-angle-double-right"></i></button>: null}
                        </>
                        : 
                        <>
                        {buttons.map(num => <button key={num} name={num-1} onClick={changePage}>{num}</button> )}
                        <button name='next' onClick={handleSubmit}><i className="fas fa-angle-double-right"></i></button>
                        </>
                    }
                <button name={numPag-1} onClick={changePage}>{numPag}</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        numCountriesLoad: state.numCountriesLoad,
        route: state.routeCountries
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        getCountries: name => dispatch(getCountries(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);