import React from 'react';

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

        const MonthlyEarning = (props) => {
          return (
           <React.Fragment> <Card className="mb-4" >
                <CardBody>
                    <CardTitle className="mb-4">
                        Trabajo por Mes
                    </CardTitle>
                    <Row>
                        <Col sm="6">
                            <p className="text-muted">Trámites de Setiembre</p>
                            <h3>1,252</h3>
                            <p className="text-muted"><span className="text-success mr-2"> 12% <i className="mdi mdi-arrow-up"></i> </span> Trámites por resolver</p>
                            <div className="mt-4">
                                <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">Ver Más <i className="mdi mdi-arrow-right ml-1"></i></Link>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="mt-4 mt-sm-0">
                                <ApexRadial />
                            </div>
                        </Col>
                    </Row>
                    {/*<p className="text-muted mt-4 mb-3">Los cálculos se realizan con la variable tiempo.</p>*/}
                </CardBody>
            </Card>
            </React.Fragment>
          );
        }

export default MonthlyEarning;