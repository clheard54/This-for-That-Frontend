import React, { Fragment, useState, useEffect } from 'react'
import UserContext, { UserConsumer } from '../context/userContext'
import { CatalogProvider } from '../context/CatalogContext'
import { api } from '../services/api'

const AddItem = props => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [value, setValue] = useState(null)
    const [seeking, setSeeking] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(false)

    const [checkboxes, setCheckboxes] = useState({})

    setInitialState = (context) => {
        context.tags.forEach(tag => {
            if (!checkboxes[tag]){
                setCheckboxes({...checkboxes, 
                  [tag]: false
                })
            }
        })
    }

    const createCheckbox = (tag) => {
        <div className="form-check">
          <label>
            <input
                type="checkbox"
                name={tag.name}
                checked={checkboxes[tag]}
                onChange={handleCheckChange}
                className="form-check-input"
            />
            {tag.name}
          </label>
        </div>
    }

    handleCheckChange = e => {
        const { name } = e.target;
        setCheckboxes({...checkboxes, [name]: !checkboxes[name]
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      let newItem = {
          title,
          description,
          location,
          value,
          seeking,
          user_id: e.userId.value
      }
      api.posts.postItem(newItem).then(resp => {
          if (!resp.error){
              setComplete(true)
          } else {
              setError(resp.error)
          }
      })
      Object.keys(checkboxes)
        .filter(checkbox => checkboxes[checkbox])
          .forEach(checkbox => {
            //create new TagsOffering instance;
          });
      
      };

    return (
        <Fragment>
          <CatalogConsumer>{(catalogContext) => (
              <UserConsumer>{(userContext) => (
                <Fragment>
                {complete ? <><h3>Success! Your offering has been posted.</h3><br/><button>Back to Catalog</button><button>Back to Profile</button></> : error ? <><h3>Uh-Oh something went wrong. Please try again...</h3>{error}</> : <><h3>What you Got?</h3>
                    <form onSubmit={handleSubmit}>
                        <label>What do you have to offer?</label>
                        <input type='text' name='title' value={title}></input>
                        <br/>

                        <label>How would you classify your offering?</label>
                        {catalogContext.tags.map(createCheckbox())}
                        <br/>

                        <label>Please provide a brief decription.</label>
                        <textarea rows='5' columns='2' name='description' value={description}></textarea>
                        <br/>

                        <label>Where you at?</label>
                        <input type='text' name='location' value={location}></input>
                        <br/>

                        <label>Estimated Value (optional)</label>
                        <input type="number" name='value' value={value}></input>
                        <br/>

                        <label>Seeking anything in particular in exchange?</label>
                        <input type='text' name='seeking' value={seeking}></input>
                        <br/>
                        <br/>
                        <input type='hidden' name='userID' value={userContext.current_user.id}></input>
                        <input type="submit" value="Post it!"></input>
                    </form></> }
                  </Fragment>
            )}</UserConsumer>
          )}</CatalogConsumer>
        </Fragment>
    )
}

export default AddItem;