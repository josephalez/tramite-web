import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Media } from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
// Pages Components
import WelcomeComp from "./WelcomeComp";
import ActivityComp from "./ActivityComp";
import MonthlyEarning from "./MonthlyEarning";

 const Dashboard = (props) => {

     //const [modal, setmodal] = useState(false);

          const reports = [
                { 
                    title: "POR RECEPCIONAR", 
                    textClass:"success", 
                    iconClass: "fas fa-download", 
                    description: "50" },
                { 
                    title: "POR CONCLUIR/DERIVAR", 
                    textClass:"warning", 
                    iconClass: "fas fa-copy", 
                    description: "20" },
                { 
                    title: "EXPEDIENTES VENCIDOS", 
                    textClass:"danger", 
                    iconClass: "fas fa-tag", 
                    description: "2" }
            ];
         const email = [
                { title: "Semana", linkto: "#", isActive: false },
                { title: "Mes", linkto: "#", isActive: false },
                { title: "Año", linkto: "#", isActive: true }
            ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Row>
                            <Col xl="4">
                                <WelcomeComp />
                                <MonthlyEarning />
                            </Col>
                            <Col xl="8" className="pb-3" >
                                <Card className="mb-3 align-items-center justify-content-center" >
                                    <CardBody className="py-4 mt-2" >
                                        <CardTitle>
                                        Bandeja Secretaria Gerencia General
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        reports.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody className="px-5">
                                                        <Media>
                                                            <Media body>
                                                                <p className={"font-weight-bold text-"+report.textClass}>{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle align-self-center">
                                                                <span className={"avatar-title bg-"+report.textClass}>
                                                                    <i className={"fas " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>

                                <Card className="mt-4" >
                                    <CardBody>
                                        <CardTitle className="mb-4 float-sm-left">
                                            Estadistica Trámites
                                        </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <StackedColumnChart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="12">
                                <ActivityComp />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }

export default Dashboard;