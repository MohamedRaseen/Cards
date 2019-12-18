import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button
} from 'reactstrap';
import { ContextOne } from "./ContextOne";
import CommonModal from './CommonModal';
import axios from 'axios';
import loader from './loader2.gif';

const Form = () => {

  let { state: { formsData, modalData, showLoader }, dispatch } = React.useContext(ContextOne);

  const onSaveHandler = (data) => {

    dispatch({ type: 'showLoader' });

    if (data && data.id) {
      axios.put(`https://my-json-server.typicode.com/Srinivasan47/mockjson/posts/${data.id}`, { ...data, showModal: undefined })
        .then(res => {
          const { data } = res;
          const updatedFormData = formsData.map((formData) => {
            return (formData.id === data.id) ? data : formData
          });
          dispatch({ type: 'updateFormData', data: updatedFormData })
        })
        .catch(() => {
          dispatch({ type: 'updateFormData', data: [...formsData] })
        })
    }
    else {
      axios.post(`https://my-json-server.typicode.com/Srinivasan47/mockjson/posts`, [...formsData, { ...data, showModal: undefined, id: (formsData.length + 1) }])
        .then(res => {
          const { data } = res;
          dispatch({ type: 'updateFormData', data: data })
        })
        .catch(() => {
          dispatch({ type: 'updateFormData', data: [...formsData] })
        })
    }
  }
  return (

    <div>
      <h1>Available Cards</h1>
      {

        showLoader ? <img src={loader} alt="Loader..." /> :

          (formsData && formsData.map((data, index) => {

            const { title, Category, author, ImageURL, Description } = data;

            return (
              <Card key={index}>
                <CardHeader>
                  <div>
                    <span>Title : {title && title} </span>
                    <Button color="primary" onClick={() => { dispatch({ type: 'showModal', data: { ...data, showModal: true } }) }}
                      size="sm" style={{ float: 'right' }}>Edit</Button></div>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <span>Category : {Category && Category}</span>
                  </CardTitle>
                  <CardSubtitle>
                    <span>Author : {author && author}</span>
                  </CardSubtitle>
                  <div>Image :
                  <CardImg top width="100%" src={ImageURL && ImageURL} alt="Form Image" /> </div>
                  <div>Description :
                  <CardText>{Description && Description}</CardText></div>
                </CardBody>
              </Card>
            )
          }))
      }
      {
        !showLoader && <div className="form-footer">
          <Button color="primary" size="lg" block onClick={() => { dispatch({ type: 'showModal', data: { showModal: true } }) }}>Add</Button>
        </div>
      }
      {
        (modalData && modalData.showModal) && <CommonModal onSaveHandler={onSaveHandler} />
      }
    </div>
  );
}
export default Form;
