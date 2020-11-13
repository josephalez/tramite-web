import React, { Component } from "react";
import { Card, CardBody, CardTitle, Media } from "reactstrap";
import { Link } from "react-router-dom";

class ActivityComp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-5">
                            Ultimas Actividades
                        </CardTitle>
                        <ul className="verti-timeline list-unstyled">
                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="fas fa-arow-circle-right  font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">2020-09-01   10:35 <i className="fas fa-arrow-right font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                            Derivó Informe GA-12-2020 a Secretaria General
                                        </div>
                                    </Media>
                                </Media>
                            </li>

                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="fas fa-arow-circle-right  font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">2020-08-25   14:15 <i className="fas fa-arrow-right font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div id="activitytext">
                                            Se Concluyó documento Oficio 256 de Informaticá<Link to="#">Ver Más</Link>
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                            <li className="event-list active">
                                <div className="event-timeline-dot">
                                    <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">2020-08-20   09:10 <i className="fas fa-arrow-right font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                           Recepcionó el Expediente I2019000012 del Administrado Juan Perez
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="fas fa-arow-circle-right  font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">2020-08-13   11:00 <i className="fas fa-arrow-right font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                            Creó un Informe Interno 2562
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                        </ul>
                        <div className="text-center mt-4"><Link to="" className="btn btn-primary waves-effect waves-light btn-sm">Ver Más <i className="mdi mdi-arrow-right ml-1"></i></Link></div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default ActivityComp;
