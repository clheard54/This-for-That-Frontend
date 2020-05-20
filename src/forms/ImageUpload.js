import React from 'react'
import AddOffering from './AddOffering'
import ImageDropzone from './Dropzone'

class ImageUpload extends React.Component{
  state = {
    selectedImageFiles: []
    };

    getNumberOfSelectedFiles = () => {
        return this.state.selectedImageFiles.filter(el => {
          return el._destroy !== true;
        }).length;
      }
      
    renderUploadImagesButton = () => {
    return (
        <div>
        <input
            name="images[]"
            ref={field => (this.itemImagesField = field)}
            type="file"
            multiple={true}
            accept="image/*"
            style={{
              width: 0.1,
              height: 0.1,
              opacity: 0,
              overflow: 'hidden',
              position: 'absolute',
              zIndex: -1
            }}
            id="item_images"
            onChange={e => this.handleImagesChange(e)}
            className="form-control"
        />
        <label
            className="btn btn-primary"
            htmlFor="item_images">
            <span className="glyphicon glyphicon-cloud-upload" />
            Upload Images
        </label><br/>
        <small className='text-muted'><i>...or</i></small>
        </div>
    );
    }

    handleImagesChange() {
        let selectedFiles = this.itemImagesField.files;
        let { selectedImageFiles } = this.state;
        for (let i = 0; i < selectedFiles.length; i++) {
          selectedImageFiles.push(selectedFiles.item(i));
        } //end for
      
        this.setState(
          {
            selectedImageFiles: selectedImageFiles
          },
          () => {
            this.itemImagesField.value = null;
          }
        );
      }
      
      renderSelectedImageFiles() {
        let fileDOMs = this.state.selectedImageFiles.map((el, index) => {
          if (el._destroy) { 
            return null;
          }
      
          return (
            <li key={index}>
              <div className="photo">
                <img
                  width={150}
                  src={el.id ? el.url : URL.createObjectURL(el)}
                  style={{ alignSelf: 'center' }}
                />
                <div
                  className="remove"
                  onClick={() => this.removeSelectedImageFile(el, index)}>
                  <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
                </div>
              </div>
              <div className="file-name">
                {el.name}
              </div>
            </li>
          );
        });
      
        return (
          <ul className="selected-images">
            {fileDOMs}
          </ul>
        );
      }

      removeSelectedImageFile(image, index) {
        let { selectedImageFiles } = this.state;
        if (image.id) { // cover file that has been uploaded will be marked as destroy
          selectedImageFiles[index]._destroy = true;
        } else {
          selectedImageFiles.splice(index, 1);
        }
      
        this.setState({
          selectedImageFiles: selectedImageFiles
        });
      }

      addDropped = (files) => {
        
      }
      
      handleFormSubmit = () => {
          this.props.addImages(this.state.selectedImageFiles)
      }

    render() {
      const numberOfSelectedImages = this.getNumberOfSelectedFiles();
        return (
          <div className="ItemForm">
            <form>
              <div className="form-group">
                {/* <label>Images</label> */}
                {this.renderUploadImagesButton()}
                {this.renderSelectedImageFiles()}
              </div>
            <ImageDropzone />
            <div>
            {numberOfSelectedImages == 0 ? null :
              <><button
                onClick={e => this.handleFormSubmit()}
                className="btn btn-primary">
                 Add {numberOfSelectedImages} file{numberOfSelectedImages !== 1
                ? 's'
                : ''}
              </button>
              <button
                onClick={e => this.handleCancel()}
                className="btn btn-default">
                Cancel
              </button></>}
              </div>
              
              
      
            </form>
            <br />
          </div>
        );
      }
}

export default ImageUpload;