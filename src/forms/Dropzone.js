import React, { PureComponent } from 'react';
import DropzoneComponent from 'react-dropzone-component';


const djsConfig = {
  acceptedFiles: "image/jpeg,image/png,image/gif, image/jpg",
  autoProcessQueue: false,
  uploadMultiple: true,
  addRemoveLinks: true
}

const componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif', '.jpeg'],
  showFiletypeIcon: false,
  maxFiles: 10,
  postUrl: 'https://api.cloudinary.com/v1_1/clahon54/upload'
}

export default class ImageDropzone extends PureComponent {
    state = {
        addedImages: []
    }

  showPreview = image => {
    if(image == null) return;

    let mockFile = {
      name: image.name,
      size: image.byte_size,
      dataURL: image.url,
    };

    this.myDropzone.files.push(mockFile);
    this.myDropzone.emit("addedfile", mockFile);
    this.myDropzone.createThumbnailFromUrl(
      mockFile,
      this.myDropzone.options.thumbnailWidth,
      this.myDropzone.options.thumbnailHeight,
      this.myDropzone.options.thumbnailMethod,
      true,
      thumbnail => {
        this.myDropzone.emit('thumbnail', mockFile, thumbnail);
        this.myDropzone.emit("complete", mockFile);
      }
    );
  }

  addNew = (img) => {
      this.props.addImages(this.state.addedImages)
  }

  removeImage = (img) => {
    this.setState(prev => {
        return {
        addedImages: [...prev.addedImages.filter(file => file !== img)]
        }
    }, () => this.props.removeImage(img))
}

  render() {
    const { image } = this.props;
    const eventHandlers = {
      init: dropzone => {
        this.myDropzone = dropzone;
        this.showPreview(image);
        this.setState({
            addedImages: dropzone.files
        })
      },
      addedfile: image => this.addNew(image),
      removedfile: (image) => this.removeImage(image)
    }

    return (
      <>
        <div className='drop-border'>
        <div className='drop-inner'>
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
          </div>
        </div>
        <br/>
      </>
    );
  }
}
