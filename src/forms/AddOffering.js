import React, { Fragment, useState, useRef } from 'react'
import UserContext, { UserConsumer } from '../context/userContext'
import ImageDropzone from './Dropzone'
import { CatalogConsumer } from '../context/CatalogContext'
import { api } from '../services/api'

const AddOffering = props => {
    const [typeOf, setTypeOf] = useState('Item')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [value, setValue] = useState('')
    const [seeking, setSeeking] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [checkboxes, setCheckboxes] = useState({})

    const setInitialState = (context) => {
        context.tags.forEach(tag => {
            if (!checkboxes[tag]){
                setCheckboxes({...checkboxes, 
                  [tag]: false
                })
            }
        })
    }

    const handleTypeChange = e => {
      document.getElementById(`option-${typeOf}`).style.backgroundColor = "#007bff"
      setTypeOf(e.target.value)
      document.getElementById(`option-${typeOf}`).style.backgroundColor = "#0069d9"
    };
    

    const createCheckbox = (tagList) => {
      return tagList.map(tag => {
        return (<div className="form-check">
          <label>
            <input
                type="checkbox"
                name={tag}
                checked={!!checkboxes[tag]}
                onChange={handleCheckChange}
                className="form-check-input"
            ></input>
            {tag}
          </label>
        </div>
      )
      })
    }

    const handleCheckChange = e => {
        const { name } = e.target;
        setCheckboxes({...checkboxes, [name]: !checkboxes[name]
      });
    }

    const addImages = (photos) => {
      setImages([...images, ...photos])
    }

    const removeImage = (photo) => {
      setImages([...images.filter(x => x !== photo)])
    }

    const buildFormData = (id) => {
      let formData = new FormData();
      formData.append('item[title]', title);
      formData.append('item[typeOf', typeOf);
      formData.append('item[description]', description);
      formData.append('item[location]', location);
      formData.append('item[value]', value);
      formData.append('item[seeking]', seeking);
      formData.append('item[user_id]', id)
      if (!!images[0]){
        formData.append(`item[image]`, images[0])}
      return formData;
    }

    // const handleImagesChange = () => {
    //   let selectedFiles = itemImagesField.current.files;
    //     for (let i = 0; i < selectedFiles.length; i++) {
    //       setImages([...images, selectedFiles[i]]);
    //     } 
    //   }

    const handleSubmit = event => {
      event.preventDefault();
      let id = event.target.userID.value;
      const newOffering = buildFormData(id)
      typeOf == "Item" ? 
      api.posts.postItem(newOffering).then(resp => {
          if (!resp.error){
              setComplete(true)
              id = resp.id
          } else {
              setError(resp.error)
          }
        })
        : 
      api.posts.postService(newOffering).then(resp => {
        if (!resp.error){
            setComplete(true)
            id=resp.id
        } else {
            setError(resp.error)
        }
      })
      Object.keys(checkboxes)
        .filter(checkbox => checkboxes[checkbox])
          .forEach(checkbox => {
            //create new TagsOffering instance;
            console.log(checkbox)
            api.posts.postTagOffering(checkbox, typeOf, id)
          });
      };

    return (
        <Fragment>
          <CatalogConsumer>{(catalogContext) => (
              <UserConsumer>{(userContext) => (
                <Fragment>
                {complete ? <><h3>Success! Your offering has been posted.</h3><br/><button className='btn' >Back to Catalog</button><button className='btn' >Back to Profile</button></> : error ? <><h3>Uh-Oh something went wrong. Please try again...</h3>{error}<br/><button className='btn' onClick={() => props.history.push('/catalog')}>Back to Catalog</button><button className='btn' onClick={() => props.history.push('/post')}>Try Again</button></> : <><h2>What you Got?</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Are you offering a: &ensp;</label>
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                          <label className={typeOf == 'Item' ? "btn btn-aqua active" : "btn btn-aqua"}>
                            <input type="radio" name="options" id="option-item" value="Item" checked={typeOf == 'Item'} onChange={handleTypeChange}></input>Thing</label><span style={{'alignSelf': 'center'}}>&emsp;-OR-&emsp;</span>
                          <label className={typeOf == 'Task' ? "btn btn-aqua active" : "btn btn-aqua"}>
                            <input type="radio" name="options" id="option-task" value="Task" checked={typeOf == 'Task'} onChange={handleTypeChange}></input>Task</label>
                        </div>
                        <br/><br/>

                        <label><b>How would you classify your offering?</b></label><br/><br/>
                        <ul className='checklist'>{createCheckbox(catalogContext.itemTags)}</ul>
                        <br/><br/>

                        <label><b>Title: &emsp;</b></label>
                        <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)}></input>
                        <br/><br/>

                        <label><b>Please provide a brief description of what you're offering.</b></label><br/><br/>
                        <textarea rows='5' cols='40' name='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <br/><br/>

                        <label>Where you at?&emsp;</label>
                        <input type='text' name='location' value={location} onChange={e => setLocation(e.target.value)}></input>
                        <br/><br/>

                        <label>Estimated Value (optional)&emsp;</label>
                        <input type="number" name='value' value={value} onChange={e => setValue(e.target.value)}></input>
                        <br/><br/>

                        <label>Seeking anything in particular in exchange?&emsp;</label>
                        <input type='text' name='seeking' value={seeking} onChange={e => setSeeking(e.target.value)}></input>
                        <br/><br/>

                      {/* <span style={{'position': 'relative', left: '10%'}}>Got Photos?&ensp;</span>
                        <label
                            className="btn btn-primary"
                            htmlFor="item_images"
                            style={{'position': 'relative', 'top':'2%', left: '10%'}}>
                            Upload Images
                        </label>
                        <span id="file-selected"></span> 
                        <input type="file" name="images" style={{ 'opacity': '0'}} accept="image/*" onChange={e => setImages([...images, e.target.value])}/> */}
                        Got images? <br/>
                        <small>(Upload up to 5 below)</small><br/><br/>
                        <ImageDropzone {...props} addImages={addImages} removeImage={removeImage}/>
                      
                        {/* <br/><small>...or</small><br/><br/> */}
                        {/* <div className='drop-border'>
                        <MyUploader {...props} addImages={addImages} />
                        </div> */}

                        <input type='hidden' name='userID' value={userContext.current_user.id}></input>
                        <br/><br/>

                        <button id='post-back' className='btn btn-submit' onClick={()=> setError(false)} >Go Back</button>
                        <input id='post-btn' className='btn btn-submit' type="submit" value="Post it!"></input>
                    </form></> }
                  </Fragment>
            )}</UserConsumer>
          )}</CatalogConsumer>
        </Fragment>
    )
}

export default AddOffering;


