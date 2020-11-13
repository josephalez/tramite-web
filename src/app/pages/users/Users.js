import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from '../../../_metronic/_partials/controls';
import axios from "axios";
import { AppSettings } from '../../../app.settings';
import { Pagination } from 'react-bootstrap';
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { CreateUser } from '../../components/users/CreateUsers';
import { UserDetails } from '../../components/users/UserDetails';

export const Users = () =>{

    const [users, setUsers] = useState([]);

    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState(1);
    const [filters,setFilters] = useState('');
    const [order,setOrder] = useState('DESC');
    const [profile,setProfile] = useState('');
    const [name,setName] = useState('');
 
    const [createShow,setCreateShow] = useState(false);

    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [success,setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  
    
    const [detailShow, setDetailShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const successCallback = (text)=>{
        emitSuccess(text);
        fetchUsers();
    }

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

    const fetchUsers= useCallback((page=1,filterLabel='')=>{

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

        if(profile) filterQuery+="&profile="+profile;

        if(name) filterQuery+="&name="+name;

        console.log(filterQuery);

        axios.get(AppSettings.apiUrl+"seg_users?page="+page+filterQuery)
        .then(res=>{
            console.log(res);
            setUsers(res.data.data);
            setCurrentPage(res.data.currentPage);
            setLastPage(res.data.lastPage);
            
        })
        .catch(err=>{
            console.log(err.response?err.response:err)
        });
    },[filters, order, profile, name]);

    const cleanParams = ()=>{
        setFilters('');
        setProfile('');
        setName('');
        fetchUsers();   
    }

    useEffect(()=>{        
        fetchUsers();
    },[fetchUsers]);

    return (<>
        <CreateUser
            show={createShow} 
            onClose={()=>{setCreateShow(false)}} 
            onSuccess={successCallback}
            onErr={emitError}
        >
        </CreateUser>

        <UserDetails
            show={detailShow}
            user={selectedUser}
            onClose={()=>setDetailShow(false)}
            onSuccess={successCallback}
            onErr={emitError}
        >
        </UserDetails>
    
        <div className="form-group form-group-inline">         
            <div>
                <button
                    type="button"
                    onClick={()=>setCreateShow(true)}
                    className="btn btn-sm btn-success font-weight-bolder font-size-sm"
                    >
                    <i className="fa fa-plus"></i> Nuevo Usuario
                </button>
            </div>
        </div>
        <Card >
            <CardHeader title="Lista de Usuarios">
            </CardHeader>
            <CardBody>
                <div className="form-group row">
                    <div className="col-md-6">
                        <small className="form-text text-muted">
                        <b>Buscar por Perfil</b>
                        </small>
                        <input
                        type="text"
                        className="form-control"
                        name="profile"
                        value={profile}
                        onChange={(e) => {setProfile(e.target.value)}}
                        />
                    </div>
                    <div className="col-md-6">
                        <small className="form-text text-muted">
                        <b>Buscar Por Nombre/Apellidos</b>
                        </small>
                        <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="form-group form-group-inline">
                    
                    <div>
                        <button
                            onClick={fetchUsers}
                            type="button"
                            className="btn btn-sm btn-primary font-weight-bolder font-size-sm"
                        >
                            <i className="fa fa-search"></i> Buscar
                        </button>
                        <button
                            onClick={cleanParams}
                            type="button"
                            className="btn btn-sm btn-danger font-weight-bolder font-size-sm ml-4"
                        >
                            <i className="fa fa-trash"></i> Limpiar
                        </button>
                    </div>
                </div>
                <div className="react-bootstrap-table table-responsive" >
                    <table className="table table-sm table-head-custom table-vertical-center overflow-hidden">
                        <thead>
                            <tr>
                                <th className="text-sm text-center selection-cell-header" tabIndex="0" >
                                    Ver Detalles
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('USER_VC_NOMBRE')} onClick={()=>{fetchUsers(currentPage,'USER_VC_NOMBRE')}} tabIndex="0">
                                    Nombres
                                    {
                                        filters==='USER_VC_NOMBRE'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('USER_VC_PATERNO')} onClick={()=>{fetchUsers(currentPage,'USER_VC_PATERNO')}} tabIndex="0">
                                    Apellidos
                                    {
                                        filters==='USER_VC_PATERNO'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('USER_VC_LOGIN')} onClick={()=>{fetchUsers(currentPage,'USER_VC_LOGIN')}} tabIndex="0">
                                    Login
                                    {
                                        filters==='USER_VC_LOGIN'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                                <th className={"text-sm cursor-pointer "+getActiveOrder('PERF_IN_CODIGO')} onClick={()=>{fetchUsers(currentPage,'PERF_IN_CODIGO')}} tabIndex="0">
                                    Perfil
                                    {
                                        filters==='PERF_IN_CODIGO'&&
                                        <i className={(order==="DESC"?"flaticon2-arrow-down":"flaticon2-arrow-up")+" text-sm ml-1"} ></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody
                        >{users.length?users.map((el,i)=>{
                                return(
                                    <tr key={i+1} >
                                        <td className="selection-cell text-center" onClick={()=>{setSelectedUser(el);setDetailShow(true);}} >
                                            <div className="btn btn-icon btn-light-primary btn-hover-primary btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <i className="fas fa-eye text-primary h2 m-0 p-0" ></i>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-sm" >
                                            {el.USER_VC_NOMBRE}
                                        </td>
                                        <td className="text-sm" >
                                            {(el.USER_VC_PATERNO?el.USER_VC_PATERNO:'')+" "+(el.USER_VC_MATERNO?el.USER_VC_MATERNO:"")}
                                        </td>
                                        <td className="text-sm" >
                                            {el.USER_VC_LOGIN}
                                        </td>
                                        <td className="text-sm" >
                                            {el.PERF_IN_CODIGO?el.PERF_IN_CODIGO:''}
                                        </td>
                                    </tr>
                                )
                            }):null}
                        </tbody>
                    </table>
                    <Pagination >
                        {currentPage>1
                            &&<Pagination.First onClick={()=>{fetchUsers(1)}} />
                        }
                        {currentPage>1
                            &&<Pagination.Prev onClick={()=>{fetchUsers(currentPage-1)}} />
                        }
                        {currentPage>1
                            &&<Pagination.Item onClick={()=>fetchUsers(currentPage-1)} >{currentPage-1}</Pagination.Item>
                        }
                        
                        <Pagination.Item active>{currentPage}</Pagination.Item>

                        {currentPage<lastPage
                            &&<Pagination.Item onClick={()=>fetchUsers(currentPage+1)} >{currentPage+1}</Pagination.Item>
                        }
                        {currentPage<lastPage
                            &&<Pagination.Next onClick={()=>{fetchUsers(currentPage+1)}} />
                        }
                        {currentPage<lastPage
                            &&<Pagination.Last onClick={()=>{fetchUsers(lastPage)}} />
                        }
                    </Pagination>
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