import React from 'react'
import AddOffering from './AddOffering'
import ImageDropzone from './Dropzone'

class ImageUpload extends React.Component{
  state = {
    selectedImageFiles: []
    };

      
    handleImagesChange(e) {
      debugger
        let selectedFiles = this.itemImagesField.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.state.selectedImageFiles.push(selectedFiles[i]);
        } 
        this.setState(
          {
            selectedImageFiles: [...selectedFiles]
          },
          () => {
            this.itemImagesField.value = null;
          }
        );
      }
      
      renderSelectedImageFiles() {
        let fileDOMs = this.state.selectedImageFiles.map((el, index) => {
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
      
      handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        console.log(formData)
        this.props.addImages(formData)
      }

    render() {
        return (
          <div className="ItemForm">
            <form onSubmit={this.handleFormSubmit}>
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
                    Upload Images
                </label><br/>
                <small className='text-muted'><i>...or</i></small>
                {this.renderSelectedImageFiles()}
              </div>

            <ImageDropzone />
            <div>
            {this.state.selectedImageFiles.length == 0 ? null :
              <><input
                type='submit'
                className="btn btn-primary">
                value={`Add ${this.state.selectedImageFiles.length} file(s)`}>
              </input>
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
