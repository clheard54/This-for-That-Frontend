import React, { useState } from 'react'
// import 'react-dropzone-uploader/dist/styles.css'
import '../dropzone.css'
import Dropzone from 'react-dropzone-uploader'


const MyUploader = (props) => {
    const [images, setImages] = useState([])

    // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData()
    body.append('upload_preset', 'ywkmrwrqconst')
    body.append('api_key', '278228917863987')
    return { body, meta: meta, url: 'https://api.cloudinary.com/v1_1/clahon54/upload'}
      }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status, fileWithMeta) => {  
      console.log(meta)     
        if (status == 'done'){
            setImages(fileWithMeta)
        } 
    }

    const handleDrop = (file) => {
        console.log('adding')
        setImages([...images, file])
        props.addImages(images)
    }

    const handleAdd = (file) => {
        console.log('adding')
        setImages([...images, file])
        props.addImages(images)
    }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        files.forEach(img => {
            if (!images.includes(img)){
            setImages([...images, img])
            }
        })
        props.addImages(files)
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onChange={handleAdd}
        onDrop={handleDrop}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        maxFiles={5}
        styles={{ dropzone: { maxHeight: 150 }, previewImage: {minWidth: '80px'} }}
      />
    )
  }

  export default MyUploader;
