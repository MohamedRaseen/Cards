import React, { useState } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Alert
} from 'reactstrap';
import { ContextOne } from "./ContextOne";

const CommonModal = (props) => {

  let { state: { modalData }, dispatch } = React.useContext(ContextOne);

  let [data, setData] = useState(modalData ? { ...modalData } : {});
  let [error, setError] = useState(null);

  const toggle = () => {
    dispatch({ type: 'showModal', data: null })
  };

  const handleOnChanegOnProp = (prop, e) => {
    setData({ ...data, [prop]: e.target.value });
  }

  const { Category, Description, ImageURL, author, title } = data;

  const onSaveHandler = () => {
    const { Category, Description, ImageURL, author, title } = data;
    if (!Category || !Description || !ImageURL || !author || !title ||
      Category === '' || Description === '' || ImageURL === '' || author === '' || title === '') {
      setError({ msg: 'All Fields Are Mandatory' });
    }
    else if (!(/\d/).test(title) && (/[a-zA-Z]/).test(title)) {
      setError({ msg: 'Title Should be in Alpha Numeric' });
    }
    else if (!(/[a-zA-Z]/).test(Category) || (/\d/).test(Category) || (/\d/).test(author)|| !(/[a-zA-Z]/).test(author)) {
      setError({ msg: 'Category and author allows only alphabets' });
    }
    else {
      setData({});
      setError(null);
      props.onSaveHandler(data);
    }
  }

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div>Title :
         <Input type="text" placeholder="title" value={title && title} onChange={(e) => handleOnChanegOnProp("title", e)} /></div>
      </ModalHeader>
      {error && <Alert color="danger">
        {error.msg}
      </Alert>}
      <ModalBody>
        <div>Category :
         <Input type="text" placeholder="Category" value={Category && Category} onChange={(e) => handleOnChanegOnProp("Category", e)} /></div>
        <div>Description :
         <Input type="text" placeholder="Description" value={Description && Description} onChange={(value) => handleOnChanegOnProp("Description", value)} /></div>
        <div>ImageURL :
         <Input type="text" placeholder="ImageURL" value={ImageURL && ImageURL} onChange={(value) => handleOnChanegOnProp("ImageURL", value)} /></div>
        <div>author :
         <Input type="text" placeholder="author" value={author && author} onChange={(value) => handleOnChanegOnProp("author", value)} /></div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" size="lg" block onClick={() => onSaveHandler()}>{(modalData.id ? 'Update' : 'Save')}</Button>{' '}
      </ModalFooter>
    </Modal>
  )
}

export default CommonModal;
