import React, { useContext, useState, useEffect } from 'react';
import ItemCard from "../components/ItemCard";
import { CatalogContext } from '../context/CatalogContext'
import Select from "react-select";
import LoaderHOC_ from '../HOCs/LoaderHOC'

const colors = ['#00B8D9', '#0052CC', '#5243AA', '#FF5630', '#FF8B00','#FFC400', '#36B37E', '#00875A', '#253858', '#666666'];
  

const ItemsCatalog = props => {
    const context = useContext(CatalogContext)
    const { items, itemTags, populateContext } = context
    const [filters, setFilters] = useState([])

    useEffect(() => {
        if (items.length == 0){
            populateContext()
        };
        if (!!props.location.filter){
            setFilters(props.location.filter)
        }
    }, [])


    const renderItems = () => {
        if (filters.length == 0) {
        return items.map(item => {
            return <ItemCard {...props} item={item} onClick={() => goToDetail()}/>
            })
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
            let x = items.filter(item => item.tags.map(tag => tag.category).includes(entry.value))
            x.forEach(entry => allFiltered.includes(entry) ? null : allFiltered.push(entry))
        })
        console.log(allFiltered)
        return allFiltered.map(item => {
            return <ItemCard {...props} item={item} />
        })
    }

    const showItemsTags = () => {
        if(!!itemTags){
        return itemTags.map(tag => {
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

    const handleFilter = (e) => {
        e.preventDefault();

    }

    return (
        <div className='container'>
            <h1 id='caption'>All the Things.</h1>
            <div className='row-filter'>
            Filter by Category:&ensp;
            <Select styles={colorStyles} id='dropdown' isMulti options={showItemsTags()} values={filters.values} onChange={(values) => values==null ? setFilters([]) : setFilters([...values])} /></div>
            <br/><br/>
            <div className='card-row'> 
            {filters.length == 0 ? renderItems() : renderFiltered()}
\            </div>
        </div>
           
    )
}

export default LoaderHOC_(ItemsCatalog);

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