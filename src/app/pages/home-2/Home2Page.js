import React from 'react';
import { Card, CardHeader, CardHeaderToolbar, CardBody } from '../../../_metronic/_partials/controls';

export const Home2Page = () =>{

    return (<>
    {false&&<div className="form-group form-group-inline">         
        <div>
            <button
                type="button"
                disabled
                className="btn btn-sm btn-success font-weight-bolder font-size-sm"
            >
                <i className="fa fa-plus"></i> Nuevo
            </button>
            &nbsp;
            &nbsp;                        
            <button
                type="button"
                disabled
                className="btn btn-sm btn-info font-weight-bolder font-size-sm"
            >
                <i className="fa fa-edit"></i> Editar
            </button>
            &nbsp;
            &nbsp;                        
            <button
                type="button"
                disabled
                className="btn btn-sm btn-danger font-weight-bolder font-size-sm"
            >
                <i className="fa fa-trash"></i>Eliminar
            </button>
            &nbsp;
            &nbsp;                        
            <button
                type="button"
                className="btn btn-sm btn-primary font-weight-bolder font-size-sm"
            >
                <i className="fa fa-sync-alt"></i>Actualizar
            </button>
        </div>
    </div>}
        <Card >
            <CardHeader title="Tramites externos">
                <CardHeaderToolbar >
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={()=>{}}
                    >
                        <i className="fa fa-sync-alt"></i>Deshacer Remision                
                    </button>
                    &nbsp;
                    &nbsp; 
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={()=>{}}
                    >
                        <i className="fas fa-print"></i>Imprimir Tupa       
                    </button>
                    &nbsp;
                    &nbsp; 
                    <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={()=>{}}
                    >
                        Anexos                
                    </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="form-group row">
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                            <b>Nro Trámite</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="I20200007515"
                        onChange={()=>{}}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                        <b>Tipo</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="EXPEDIENTE"
                        onChange={()=>{}}
                        
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                        <b>Fecha</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="21-08-20 12:47pm"
                        onChange={()=>{}}
                        
                        />
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Asunto</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        value={"LICENCIA DE FUNCIONAMIENTO"}
                        onChange={()=>{}}
                        
                        /> 
                    </div>
                    <div className="col-12">
                        <span className="form-text text-muted">
                            <b>Sumilla</b>
                        </span>
                        <textarea
                        type="text"
                        className="form-control"
                        name="status"
                        />
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Dirigir a:</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        value={"GERENCIA DE DESARROLLO ECONÓMICO Y LICENCIAS"}
                        onChange={()=>{}}
                        
                        /> 
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Administrado:</b>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="status"
                            placeholder="12345"
                            value={"TALAVERANO PALOMINO JESUS"}
                        onChange={()=>{}}
                            
                        />
                        <button
                            type="button"
                            className="ml-2 float-right btn btn-light-primary btn-sm font-weight-bolder font-size-sm"
                        >
                            <i className="fas fa-poll"></i> Rentas
                        </button>
                    </div>

                    <div className="col-12">
                        <span className="form-text text-muted">
                            <b>Dirección:</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        value={"LUIS PASTEUR NRO 1475"}
                        onChange={()=>{}}
                        
                        /> 
                    </div>
                    
                </div>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <div className="form-group row">
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                            <b>Documento</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="OTROS"
                        onChange={(e) => {}}                        
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                        <b>Referencia</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="EXPEDIENTE"
                        onChange={(e) => {}}                        
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <span className="form-text text-muted">
                        <b>Nro. Folios</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value="15"
                        onChange={(e) => {}}                        
                        />
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Recibo Pago</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        value={"1"}
                        onChange={(e) => {}}                        
                        /> 
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Monto</b>
                        </span>
                        <input
                        type="text"
                        className="form-control text-danger"
                        name="status"
                        placeholder="12345"
                        value={"0.00"}
                        onChange={(e) => {}}                        
                        /> 
                    </div>
                    <div className="col-md-6">
                        <span className="form-text text-muted">
                            <b>Creado por:</b>
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        value={"Karla Poma"}
                        onChange={(e) => {}}                        
                        /> 
                    </div>
                    
                </div>
            </CardBody>
        </Card>
        <Card >
            <CardBody>
                <div className="react-bootstrap-table table-responsive" >
                    <table className="table table-sm table-head-custom table-vertical-center overflow-hidden">
                        <thead>
                            <tr>
                                <th className="text-sm"tabIndex="0">
                                    Nro
                                </th>
                                <th className="text-sm"tabIndex="0">
                                    Requisitos
                                </th>
                                <th className="text-sm"tabIndex="0">
                                    Tipo
                                </th>
                                <th className="text-sm"tabIndex="0">
                                    Fecha Presentación
                                </th>
                                <th className="text-sm"tabIndex="0">
                                    S/.
                                </th>
                                <th className="text-sm"tabIndex="0">
                                    Check
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </CardBody>
        </Card>
    </>)
}