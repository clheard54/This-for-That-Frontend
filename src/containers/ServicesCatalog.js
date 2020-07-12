import React, { useContext, useState, useEffect } from 'react';
import ServiceCard from "../components/ServiceCard";
import { CatalogContext } from '../context/CatalogContext'
import Select from "react-select";
import LoaderHOC_ from '../HOCs/LoaderHOC'

const colors = ['#00B8D9', '#0052CC', '#5243AA', '#FF5630', '#FF8B00','#FFC400', '#36B37E', '#00875A', '#253858', '#666666'];
  

const ServicesCatalog = props => {
    const context = useContext(CatalogContext)
    const { services, taskTags, populateContext } = context
    const [filters, setFilters] = useState([])

    useEffect(() => {
        if (services.length == 0){
            populateContext()
        };
        if (!!props.location.filter){
            setFilters(props.location.filter)
        }
    }, [])


    const renderServices = () => {
        if (filters.length == 0) {
            if (services.length == 0){
                return (<><h3>Alas! No offerings posted right now.</h3><p style={{'color': 'rgb(66, 230, 134)'}}>(Try again soon!)</p></>)
            } else {
                return services.map(service => {
                    return <ServiceCard {...props} service={service} onClick={() => goToDetail()}/>
                    })
            }
        } else {
            renderFiltered()
        }
    }

    const goToDetail = (e) => {
        console.log(e)
    }

    const renderFiltered = () => {
        let allFiltered = []
        filters.forEach(entry => {
            let x = services.filter(service => service.tags.map(tag => tag.category).includes(entry.value))
            x.forEach(entry => allFiltered.includes(entry) ? null : allFiltered.push(entry))
        })
        if (allFiltered.length == 0){
            return (<div><h3>Alas! No such offerings posted right now.</h3><p style={{'color': 'rgb(66, 230, 134)'}}>(Try again soon!)</p></div>)
        } else {
        return allFiltered.map(service => {
            return <ServiceCard {...props} service={service} />
            })
        }
    }

    const showTaskTags = () => {
        if(!!taskTags){
        return taskTags.map(tag => {
            return {label: tag, value: tag}
        })
        } 
    }

    const colorStyles = {
        option: (styles, state) =>
            state.isFocused || {
            ...styles,
            backgroundColor: state.isSelected ? "red" : styles.backgroundColor
            }
        }

    // const handleFilter = (e) => {
    //     e.preventDefault();
    // }

    return (
        <div className='container'>
            <h1 id='caption'>All that People Will Do For You.</h1>
            <br/>
            <div className='row-filter'>
            Filter by Category:&ensp;
            <Select styles={colorStyles} id='dropdown' isMulti options={showTaskTags()} values={filters.values} onChange={(values) => values==null ? setFilters([]) : setFilters([...values])} /></div>
            <br/><br/> 
            {filters.length == 0 ? 
                (<div className="card-row">
                    {renderServices()}
                </div>) :
                <div className="card-row">{renderFiltered()}</div>}
        </div>
           
    )
}

export default LoaderHOC_(ServicesCatalog);

/*
STUFF:
-antiques
-appliances
-arts+crafts
-car,truck;motorcycle
-beauty+hlth
-bikes
-books
-tech
-clothes+acc
-electronics
-farm+garden
-furniture
-kids + babies
-materials
-music
-sports + equip
-tickets
-tools
-toys+games
*/

