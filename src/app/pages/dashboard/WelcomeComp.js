import React from 'react';

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import avatar1 from "./avatar-1.jpg";
import profileImg from "./profile-img.png";

const WelcomeComp = (props) => {
          return (
           <React.Fragment>
                <Card className="overflow-hidden mb-4">
                    <div className="bg-soft-primary">
                        <Row>
                            <Col xs="7">
                                <div className="text-info p-3 pb-xl-5 ml-5 pl-5">
                                    <h5 className="text-info pt-4 mt-5">Bienvenido al!</h5>
                                    <p>Sistema de Trámite</p>
                                </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                                <img src={profileImg} alt="" className="img-fluid" />
                            </Col>
                        </Row>
                    </div>
                    <CardBody className="pt-0">
                        <Row>
                            <Col sm="4">
                                <div className="avatar-md profile-user-wid mb-4">
                                    <img src={avatar1} alt="" className="img-thumbnail rounded-circle" />
                                </div>
                                <h5 className="font-size-15 text-truncate">Karla Perez</h5>
                                <p className="text-muted mb-0 text-truncate">Asistente</p>
                            </Col>

                            <Col sm="8">
                                <div className="pt-4">
                                    <Row>
                                        <Col xs="6">
                                            <h5 className="font-size-15">2125</h5>
                                            <p className="text-muted mb-0">Recepciones</p>
                                        </Col>
                                        <Col xs="6">
                                            <h5 className="font-size-15">1245</h5>
                                            <p className="text-muted mb-0">Derivaciones</p>
                                        </Col>
                                    </Row>
                                    <div className="mt-4">
                                        <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">Ver Perfil <i className="mdi mdi-arrow-right ml-1"></i></Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
          );
        }
export default WelcomeComp;
 