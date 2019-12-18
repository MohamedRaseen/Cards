import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Form from './Form';
import axios from 'axios';
import { ContextOneProvider, ContextOne } from "./ContextOne";
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';

const App = () => {

  let { dispatch } = React.useContext(ContextOne);

  useEffect(() => {
    dispatch({ type: 'showLoader' });
    axios.get(`https://my-json-server.typicode.com/Srinivasan47/mockjson/posts`)
      .then(res => {
        dispatch({ type: 'updateFormData', data: res.data })
      })
  }, [dispatch])

  return (
    <Form />
  )
}

render(<ContextOneProvider>
  <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <App />
      </Col>
    </Row>
  </Container>

</ContextOneProvider>, document.getElementById('root'));
