import React from 'react'
import AddOffering from './AddOffering'

class ImageUpload extends React.Component{
  state = {
    selectedImageFiles: [],
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    item: {
        id: this.props.match.params.id,
        title: '',
        description: '',
        location: '',
        value: '',
        seeking: '',
        errors: {}
      }
    };

    getNumberOfSelectedFiles() {
        return this.state.selectedImageFiles.filter(el => {
          return el._destroy !== true;
        }).length;
      }
      
    renderUploadImagesButton() {
    let numberOfSelectedImages = this.getNumberOfSelectedFiles();
    return (
        <div>
        <input
            name="images[]"
            ref={field => (this.itemImagesField = field)}
            type="file"
            disabled={this.state.isSubmittingForm}
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
            disabled={this.state.isSubmittingForm}
            className="btn btn-success"
            htmlFor="item_images">
            <span className="glyphicon glyphicon-cloud-upload" />
            &nbsp; &nbsp;
            {numberOfSelectedImages === 0
            ? 'Upload Files'
            : `${numberOfSelectedImages} file${numberOfSelectedImages !== 1
                ? 's'
                : ''} selected`}
        </label>
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
      
      handleFormSubmit() {
        let { item } = this.state;
        item.errors = {};
        this.setState(
          {
            isSubmittingForm: true,
            item: item
          },
          () => {
            this.submitForm();
          }
        );
      }
      
      buildFormData() {
        let formData = new FormData();
        formData.append('item[title]', this.state.item.title);
        formData.append('item[description]', this.state.item.description);
        formData.append('item[location]', this.state.item.location);
        formData.append('item[value]', this.state.item.value);
        formData.append('item[seeking]', this.state.item.seeking);
      
        let { selectedImageFiles } = this.state;
        for (let i = 0; i < selectedImageFiles.length; i++) {
          let file = selectedImageFiles[i];
          if (file.id) {
            if (file._destroy) {
              formData.append(`item[images_attributes][${i}][id]`, file.id);
              formData.append(`item[images_attributes][${i}][_destroy]`, '1');
            }
          } else {
            formData.append(
              `item[images_attributes][${i}][photo]`,
              file,
              file.name
            );
          }
        }
        return formData;
      }
      
      // submitForm() {
      //   let submitMethod = this.state.item.id ? 'patch' : 'post';
      //   let url = this.state.item.id
      //     ? `/items/${this.state.item.id}.json`
      //     : '/items.json';
      
      //   axiosClient
      //     [submitMethod](url, this.buildFormData(), {
      //       onUploadProgress: progressEvent => {
      //         let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
      //         this.setState({
      //           submitFormProgress: percentage
      //         });
      //       }
      //     })
      //     .then(response => {
      //       this.setState({
      //         didFormSubmissionComplete: true
      //       });
      //       this.props.history.push('/items');
      //     })
      //     .catch(error => {
      //       let { item } = this.state;
      //       item.errors = error.response.data;
      //       this.setState({
      //         isSubmittingForm: false,
      //         submitFormProgress: 0,
      //         item: item
      //       });
      //     });
      // }

    render() {
        return (
          <div className="ItemForm">
            <form>
      
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  onChange={e => this.handleTitleChange(e)}
                  value={this.state.item.title}
                />
              </div>
      
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  onChange={e => this.handleDescriptionChange(e)}
                  value={this.state.item.description}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <textarea
                  type="text"
                  onChange={e => this.handleLocationChange(e)}
                  value={this.state.item.location}
                />
              </div>

              <div className="form-group">
                <label>Value</label>
                <textarea
                  type="text"
                  onChange={e => this.handleValueChange(e)}
                  value={this.state.item.value}
                />
              </div>

              <div className="form-group">
                <label>Seeking</label>
                <textarea
                  type="text"
                  onChange={e => this.handleSeekingChange(e)}
                  value={this.state.item.seeking}
                />
              </div>
      
              <div className="form-group">
                <label>Images</label>
                {this.renderUploadImagessButton()}
                {this.renderSelectedImageFiles()}
              </div>
      
              {this.renderUploadFormProgress()}
      
              <button
                disabled={this.state.isSubmittingForm}
                onClick={e => this.handleFormSubmit()}
                className="btn btn-primary">
                {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
              </button>
              &nbsp;
              <button
                disabled={this.state.isSubmittingForm}
                onClick={e => this.handleCancel()}
                className="btn btn-default">
                Cancel
              </button>
      
            </form>
            <br />
          </div>
        );
      }
}

export default ImageUpload;