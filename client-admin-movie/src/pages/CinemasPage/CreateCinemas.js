import { Fragment, useState } from "react";
import { Col, Container, Form, Row , ListGroup, ButtonGroup, Button, Modal} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from 'axios';


import '../style/CinemasPage.css'

const CreateCinemas=()=>{

   // set state  
   const [show, setShow] = useState(false);
   const [theaterNum, setTheaterNum] = useState(0);
   const [cinemaName, setCinemaName] = useState('');
   const [cinemaArea, setCinemaArea] = useState('');
   const [cinemaTheaters, setCinemaTheaters] = useState([]);
   const [cinema, setCinema] = useState({
      cinema_name: '', 
      cinema_area: '',
      theater: [],
      movie: []
   });


   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


   // function onchange data 
   const onChangeCinemaName=(e)=>{
      e.preventDefault();
      setCinemaName(e.target.value);
   }

   const onChangeCinemaArea=(e)=>{
      e.preventDefault();
      setCinemaArea(e.target.value);
   }

   const onChangeAddCinemaTheaters=()=>{

      setTheaterNum(theaterNum + 1);

      setCinemaTheaters(()=>{
         return [...cinemaTheaters, {theaterName: theaterNum + 1}];
      });
   }

   const onChangeSubCinemaTheaters=()=>{

      setTheaterNum(theaterNum - 1);

      setCinemaTheaters(()=>{
         return [...cinemaTheaters].pop;
      });
      console.log(cinemaTheaters);
   }

   const onChangeResetCinemaTheaters=()=>{

      setTheaterNum(0);

      setCinemaTheaters(()=>{
         return []
      });
      console.log(cinemaTheaters);
   }

   const checkvalue=()=>{
      handleShow(true)
      setCinema(
         {
            cinema_name: cinemaName, 
            cinema_area: cinemaArea,
            theater: cinemaTheaters,
            movie: []
         }
      );

      console.log(cinema);
      console.log('---------------------------');

   }

   const onSaveCinema=(e)=>{
      e.preventDefault();

      console.log(cinemaName);
      console.log(cinemaArea);
      console.log(cinemaTheaters);
      console.log(cinema);

      axios.post('http://localhost:4000/cinemas/create',   cinema)
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
   }

   return (
      <Fragment>
         <div className="container-1">
            <Container className="pt-5">
               <Row>
                  <Col lg='1'></Col>
                  <Col lg='10'>
                     <div className="box-create p-5">
                        <h1>Create Cienmas</h1>

                        <Form onSubmit={onSaveCinema}>

                           <Form.Group className="mb-3" controlId="CinemaName">
                              <Form.Label>Cinema Name</Form.Label>
                              <Form.Control type="text" placeholder="Cinema name" onChange={onChangeCinemaName}/>
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="CinemaArea">
                              <Form.Label>Cinema Area</Form.Label>
                              <Form.Select size="xl" defaultValue={"กรุงเทพ"} onChange={onChangeCinemaArea}>
                                 <option value={"กรุงเทพ"}>กรุงเทพ</option>
                                 <option value={"กลาง"}>กลาง</option>
                                 <option value={"เหนือ"}>เหนือ</option>
                                 <option value={"ใต้"}>ใต้</option>
                                 <option value={"ตะวันออก"}>ตะวันออก</option>
                                 <option value={"อีสาร"}>อีสาร</option>
                                 <option value={"ตะวันตก"}>ตะวันตก</option>
                              </Form.Select>
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="CinemaTheater">
                              <div className="d-flex justify-content-between"> 
                                 <Form.Label> Number of Theater : {theaterNum} </Form.Label>
                                 <ButtonGroup>
                                    <Button variant="danger" onClick={()=>{ (theaterNum > 0) ? onChangeSubCinemaTheaters(): onChangeResetCinemaTheaters()}}> sub </Button>  
                                    <Button variant="secondary" onClick={()=>{onChangeResetCinemaTheaters()}}> reset </Button>  
                                    <Button variant="success"  onClick={()=>{onChangeAddCinemaTheaters()} }> add </Button>  
                                 </ButtonGroup>
                              </div>
                              <ListGroup>
                              {
                                 Array(theaterNum).fill(0).map((x, idx) => (    
                                    <ListGroup.Item key={idx} > Theater {idx + 1} </ListGroup.Item>
                                 ))}
                              </ListGroup>
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="CinemaMovie">
                              <div className="d-flex justify-content-between pe-5">
                                 <Form.Label>Movie Show</Form.Label>
                                 <Button>add</Button>
                              </div>
                              <Form.Select size="xl">
                                 <option>กรุงเทพ</option>
                                 <option>เหนือ</option>
                                 <option>ใต้</option>
                                 <option>ตะวันออก</option>
                                 <option>ตะวันออกเฉียงเหนือ</option>
                                 <option>ตะวันตก</option>
                              </Form.Select>
                           </Form.Group>

                           <Button variant="primary" type="submit" onClick={()=>{checkvalue()}} > create </Button>

                        </Form>

                        <Modal show={show} onHide={handleClose} animation={false}>
                           <Modal.Header closeButton>
                              <Modal.Title>Modal heading</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                           <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}> Close </Button>
                              <Link  to={'/cinemas'}>
                                 <Button variant="primary" onClick={handleShow} >
                                    Save Changes
                                 </Button>   
                              </Link>
                           </Modal.Footer>
                        </Modal>
                     </div>
                  </Col>
                  <Col lg='1'></Col>
               </Row>
            </Container>


         </div>

         <div className="bg-2"></div>


      </Fragment>
   )
} 

export default CreateCinemas;