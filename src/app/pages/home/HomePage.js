import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardHeaderToolbar, CardBody } from '../../../_metronic/_partials/controls';
import axios from "axios";
import { AppSettings } from '../../../app.settings';
import { Pagination } from 'react-bootstrap';
import { CreateDocument } from '../../components/docs/CreateDocument';
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
//import PdfComponent from '../../components/docs/pdf/PdfComponent'
//import PdfDocument from '../../components/docs/pdf/PdfDocument';

export const HomePage = () =>{

    
    const [documents, setDocuments] = useState([]);
    
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState(1);
    const [filters,setFilters] = useState('');
    const [order,setOrder] = useState('DESC');

    const [estado,setEstado] = useState('');
    const [asunto,setAsunto] = useState('');
    
    const [createShow,setCreateShow] = useState(false);
  
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [success,setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');    

    const emitSuccess = (text) => {
        setSuccessMessage(text);
        setSuccess(true);
    }

    const emitError = (text) => {
        setErrorMessage(text);
        setError(true);
    }
    
    const getActiveOrder = (label)=>{
        if(label!==filters) return '';
        
        else return 'text-primary';
    }
    
    const fetchDocs= useCallback((page=1,filterLabel='')=>{
        
        let filterQuery="";
        if(filterLabel===filters){
            if(order==="DESC"){
                setOrder('ASC');
                filterQuery+="&filter="+filters+"&order=ASC";
            }else{
                setFilters('');
            }
        }
        else if(filterLabel!==''){
            setFilters(filterLabel);
            setOrder('DESC');
            filterQuery+="&filter="+filterLabel+"&order=DESC";
        }
        else if(filters&&filters!==''){
            filterQuery+="&filter="+filters+"&order="+order;
        }

        if(estado) filterQuery+="&estado="+estado;

        if(asunto) filterQuery+="&asunto="+asunto;
        
        console.log(filterQuery);
        
        axios.get(AppSettings.apiUrl+"documents?page="+page+filterQuery)
        .then(res=>{
            console.log(res);
            setDocuments(res.data.data);
            setCurrentPage(res.data.currentPage);
            setLastPage(res.data.lastPage);
            
        })
        .catch(err=>{
            console.log(err.response?err.response:err);
            emitError('Ha ocurrido un error al cargar los documentos')
        });
    },[filters,order, estado, asunto])
    
    useEffect(()=>{        
        fetchDocs();
    },[fetchDocs]);
    
    return (<>
        <CreateDocument 
            show={createShow} 
            onClose={()=>{setCreateShow(false)}} 
            onSuccess={(text)=>{
                emitSuccess(text);
                fetchDocs();
            }}
            onErr={emitError}
        ></CreateDocument>
        <div className="form-group form-group-inline">         
            <div>
                <button
                    type="button"
                    onClick={()=>setCreateShow(true)}
                    className="btn btn-sm btn-success font-weight-bolder font-size-sm"
                    >
                    <i className="fa fa-plus"></i> Nuevo Documeto
                </button>
                    {/*
                &nbsp;
                &nbsp;                        
                <button
                    type="button"
                    className="btn btn-info btn-sm font-weight-bolder font-size-sm"
                >
                    <i className="fa fa-edit"></i> Editar
                </button>
                &nbsp;
                &nbsp;                        
                <button
                    type="button"
                    className="btn btn-danger btn-sm font-weight-bolder font-size-sm"
                >
                    <i className="fa fa-trash"></i>Eliminar
                </button>
                &nbsp;
                &nbsp;                        
                <button
                    type="button"
                    className="btn btn-primary btn-sm font-weight-bolder font-size-sm"
                >
                    <i className="fa fa-sync-alt"></i>Actualizar
                </button>
            */}
            </div>
        </div>
        <Card >
            <CardHeader title="Trámites externos">
                <CardHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={()=>{fetchDocs()}}
                >
                    Cambiar a búsqueda avanzada
                </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="form-group row">
                    {
                        /*
                        <div className="col-12">
                        <small className="form-text text-muted">
                            <b>Fecha Doc.</b>
                        </small>
                        <div className="row col-12 justify-content-between flex-wrap">
                            <input
                            type="text"
                            className="form-control col-5 col-lg-8 m-0"
                            name="status"
                            placeholder="12345"
                            onBlur={()=>{}}
                            onChange={(e) => {}}
                            />
                            <div className="d-flex mx-4 justify-content-center align-items-center" >
                                <h4 className="m-0">
                                Hasta
                                </h4>
                            </div>
                            <input
                            type="text"
                            className="form-control col-5 col-lg-8 m-0"
                            name="status"
                            placeholder="12345"
                            onBlur={()=>{}}
                            onChange={(e) => {}}
                            />  
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <small className="form-text text-muted">
                            <b>Nro Trámite</b>
                        </small>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="12345"
                        onBlur={()=>{}}
                        onChange={(e) => {}}
                        />
                    </div>
                    */}
                    <div className="col-md-6 col-lg-4">
                        <small className="form-text text-muted">
                            <b>Estado</b>
                        </small>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        placeholder="REMITIDO"
                        value={estado}
                        onChange={(e) => {setEstado(e.target.value)}}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <small className="form-text text-muted">
                        <b>Asunto</b>
                        </small>
                        <input
                        type="text"
                        className="form-control"
                        name="status"
                        value={asunto}
                        onChange={(e) => {setAsunto(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="form-group form-group-inline">
                    
                    <div>
                        <button
                            type="button"
                            className="btn btn-sm btn-light-primary font-weight-bolder font-size-sm"
                        >
                            <i className="fa fa-search"></i> Buscar
                        </button>
                        &nbsp;
                        &nbsp;                        
                        <button
                            type="button"
                            className="btn btn-sm btn-light-primary font-weight-bolder font-size-sm"
                        >
                            <i className="fa fa-edit"></i> Ruta
                        </button>
                        &nbsp;
                        &nbsp;                        
                        <button
                            type="button"
                            className="btn btn-sm btn-light-primary font-weight-bolder font-size-sm"
                        >
                            <i className="fa fa-sync-alt"></i>Limpiar
                        </button>
                        &nbsp;
                        &nbsp;                        
                        <button
                            type="button"
                            className="btn btn-sm btn-light-success font-weight-bolder font-size-sm"
                        >
                            <i className="fa fa-plus"></i>Remitir Seleccionados
                        </button>
                    </div>
                </div>
                <div className="react-bootstrap-table table-responsive" >
                    <table className="table table-sm table-head-custom table-vertical-center overflow-hidden">
                        <thead>
                            <tr>
                                <th className="text-sm selection-cell-header" > 
                                    <input type="checkbox" style={{display: 'none'}}/>
                                    <label className="checkbox checkbox-single" >
                                        <input type="checkbox"/>
                                        <span></span>
                                    </label>
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('nro_tramite')} onClick={()=>{fetchDocs(currentPage,'nro_tramite')}} tabIndex="0">
                                    Nro Tramite
                                    {
                                        filters==='nro_tramite'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('tipo')} onClick={()=>{fetchDocs(currentPage,'tipo')}} tabIndex="0">
                                    Tipo
                                    {
                                        filters==='tipo'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('destino')} onClick={()=>{fetchDocs(currentPage,'destino')}} tabIndex="0">
                                    Destino
                                    {
                                        filters==='destino'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('folios')} onClick={()=>{fetchDocs(currentPage,'folios')}} tabIndex="0">
                                    Folios
                                    {
                                        filters==='folios'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('asunto')} onClick={()=>{fetchDocs(currentPage,'asunto')}} tabIndex="0">
                                    Asunto
                                    {
                                        filters==='asunto'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('administrado')} onClick={()=>{fetchDocs(currentPage,'administrado')}} tabIndex="0">
                                    Administrado
                                    {
                                        filters==='administrado'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('registro')} onClick={()=>{fetchDocs(currentPage,'registro')}} tabIndex="0">
                                    F. Registro
                                    {
                                        filters==='registro'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className="text-sm cursor-pointer"  tabIndex="0">
                                    Dig
                                    {
                                        filters==='0'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('estado')} onClick={()=>{fetchDocs(currentPage,'estado')}} tabIndex="0">
                                    Estado
                                    {
                                        filters==='estado'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody
                        >{documents.length?documents.map((el,i)=>{
                                return(
                                    <tr key={i+1} >
                                        <td  className="selection-cell">
                                            <a href={AppSettings.apiUrl+"documents/"+el.id} download className="btn btn-icon btn-light-primary btn-hover-primary btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <i className="fas fa-eye"></i>
                                                </span>
                                            </a>
                                            {
                                            //<PdfComponent document={<PdfDocument documentData={el} />} ></PdfComponent>
                                            }
                                        </td>
                                        <td className="text-sm" >
                                            {el.nro_tramite}
                                        </td>
                                        <td className="text-sm" >
                                            {el.tipo}
                                        </td>
                                        <td className="text-sm" >
                                            {el.destino}
                                        </td>
                                        <td className="text-sm" >
                                            {el.folios}
                                        </td>
                                        <td className="text-sm" >
                                            {el.asunto}
                                        </td>
                                        <td className="text-sm" >
                                            {el.administrado}
                                        </td>
                                        <td className="text-sm" >
                                            {el.registro}
                                        </td>
                                        <td className="text-sm" >
                                        </td>
                                        <td className="text-sm" >
                                            {el.estado}
                                        </td>
                                    </tr>
                                )
                            }):null}
                        </tbody>
                    </table>
                    <Pagination >
                        {currentPage>1
                            &&<Pagination.First onClick={()=>{fetchDocs(1)}} />
                        }
                        {currentPage>1
                            &&<Pagination.Prev onClick={()=>{fetchDocs(currentPage-1)}} />
                        }
                        {currentPage>1
                            &&<Pagination.Item onClick={()=>fetchDocs(currentPage-1)} >{currentPage-1}</Pagination.Item>
                        }
                        
                        <Pagination.Item active>{currentPage}</Pagination.Item>

                        {currentPage<lastPage
                            &&<Pagination.Item onClick={()=>fetchDocs(currentPage+1)} >{currentPage+1}</Pagination.Item>
                        }
                        {currentPage<lastPage
                            &&<Pagination.Next onClick={()=>{fetchDocs(currentPage+1)}} />
                        }
                        {currentPage<lastPage
                            &&<Pagination.Last onClick={()=>{fetchDocs(lastPage)}} />
                        }
                    </Pagination>
                </div>
                <div className="react-bootstrap-table table-responsive" >
                    <table className="table table table-head-custom table-vertical-center overflow-hidden">
                        <thead>
                            <tr>
                                <th className="text-sm"  tabIndex="0">
                                    Bandeja
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Recepcion
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Unidad
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Fecha Remision
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Fecha Recepcion
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Fecha Derv/Conclusion
                                </th>
                                <th className="text-sm"  tabIndex="0">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </CardBody>
        </Card>
        
      <Snackbar open={success} autoHideDuration={6000} onClose={()=>{setSuccess(false);}} >
        <MuiAlert elevation={6} variant="filled" severity={"success"}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={()=>{setError(false);}} >
        <MuiAlert elevation={6} variant="filled" severity={"error"}>
          {errorMessage}
        </MuiAlert>
      </Snackbar> 
    </>)
}