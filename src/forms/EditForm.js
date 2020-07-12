import React, { useState, useContext, useEffect } from 'react'
import { api } from '../services/api'
import UserContext from '../context/userContext'
import ImageDropzone from './Dropzone'

const EditForm = props => {
    const context = useContext(UserContext)
    const {offering, typeOf} = props
    const [title, setTitle] = useState(offering.title)
    const [description, setDescription] = useState(offering.description)
    const [location, setLocation] = useState(offering.location)
    const [value, setValue] = useState(offering.value)
    const [seeking, setSeeking] = useState(offering.seeking)
    const [images, setImages] = useState(!!offering.image ? [offering.image] : [])
    const [id, setId] = useState(offering.id)
    const [error, setError] = useState(false)
    const [complete, setComplete] = useState(false)

    const addImages = (photos) => {
        setImages([...images, ...photos])
      }
  
    const removeImage = (photo) => {
        setImages([...images.filter(x => x !== photo)])
      }

      const submitEdits = event => {
        event.preventDefault();
        const formData = new FormData();
        if (typeOf == "Item"){ 
            formData.append('item[title]', title);
            formData.append('item[typeOf]', typeOf)
            formData.append('item[description]', description);
            formData.append('item[location]', location);
            formData.append('item[value]', value);
            formData.append('item[seeking]', seeking);
            formData.append('item[user_id]', context.current_user.id);
            formData.append('item[image]', images[0]);
            api.update.editItem(formData, id).then(resp => {
                if (!resp.error){
                    setComplete(true)
                    props.resetForm()
                } else {
                    setError(resp.error)
                }
            })
        } else {
            formData.append('service[title]', title);
            formData.append('service[typeOf]', typeOf)
            formData.append('service[description]', description);
            formData.append('service[location]', location);
            formData.append('service[value]', value);
            formData.append('service[seeking]', seeking);
            formData.append('service[user_id]', context.current_user.id);
                formData.append('service[image]', images[0]);
            formData.append('service[id]', id)
            api.update.editService(formData, id).then(resp => {
            if (!resp.error){
                setComplete(true)
                props.resetForm();
            } else {
                setError(resp.error)
                }
            })
        }
    };
  

    return (
        <div className="col-md-8">
        <div className="card">
            <div className="card-body" >
            <div className={!!offering.image ? 'col-md-7' : 'col-md-11'}>
                <form onSubmit={submitEdits}>
                    <h4><label className="card-title">Offering: &ensp;</label>
                        <input type='text' placeholder={offering.title} name='title' value={title} onChange={(e) => setTitle(e.target.value)}></input></h4>
                        <label style={{'marginBottom': '5px'}}><b>Give us some deets!</b></label><br/>
                        <textarea rows='5' col='60' style={{'width': '70%'}}name='description' placeholder={offering.description} value={description} onChange={e => setDescription(e.target.value)}></textarea><br/><br/>
                    <label>Ideal Swap:</label>
                        <input type='text' placeholder={offering.seeking} value={seeking} name='seeking' onChange={e => setSeeking(e.target.value)}></input><br/><br/>
                        
                {!!offering.image ?
                    <div className= 'col-md-4'><br/>
                    <p><img src={!!offering.image.url ? `${offering.image.url}` : "https://cultmtl.com/wp-content/uploads/2016/07/barter.jpg"} width="160" alt={`${offering.title} - photo1`}/></p>
                <small>Apologies, you are not able to edit this photo at this time</small>
            </div> : null} 

                    <span style={{'lineHeight': '2'}}>Add or Change Image?</span><br/>
                    <ImageDropzone {...props} image={offering.image} addImages={addImages} removeImage={removeImage}/>
                    <label><small className='text-muted'><i>Location: </i></small></label>
                        <input type='text' placeholder={offering.location} name='location' value={location} onChange={e => setLocation(e.target.value)}></input><br/>
                    <label><small className='text-muted'><i>Estimated Value: </i></small></label>
                        <input type='text' placeholder={offering.value} name='value' value={value} onChange={e => setValue(e.target.value)}></input>
                    <br/><br/>
                    <input type="hidden" name="id" value={offering.id}></input>
                    <input className='btn-pink-submit'  type='submit' value="Submit"></input>
                </form>
                </div>
            </div>
        </div>
        <br/><br/>
        </div>
    )
}

export default EditForm;