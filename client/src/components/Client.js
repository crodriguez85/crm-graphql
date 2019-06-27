import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';
import { Link } from 'react-router-dom';

const Contactos = () => (
    <Query query={CLIENTES_QUERY} pollInterval={500}>
    {({ loading, error, data, startPolling, stopPolling}) => {
        if(loading) return "Cargando"
        if(error) return `Error: ${error.message}`
        return (
            <Fragment>
                <h2 className="text-center"> Listado Clientes</h2>
                <ul className="list-group">
                    { data.getClientes.map(clientes => {
                        const {id} = clientes;
                        
                        return(
                        <li key={clientes.id} className="list-group-item">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-md-8 d-flex justify-content-between align-items-center">
                                    { clientes.nombre } { clientes.apellido } - {clientes.empresa}
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                <Mutation mutation={ELIMINAR_CLIENTE}>
                                    {eliminarCliente => (
                                        <button
                                            className="btn btn-danger d-block d-md-inline-block mr-2"
                                            type="button"
                                            onClick={ () => {
                                                if(window.confirm('Seguro Quieres Eliminar al Cliente')) {
                                                    eliminarCliente({
                                                    variables: {id}
                                                })
                                                }
                                            }}>
                                        &times; Eliminar
                                        </button>
                                    )}
                                </Mutation>
                                    <Link to={`/cliente/editar/${clientes.id}`} className="btn btn-success d-block d-md-inline-block">
                                        Editar Cliente
                                    </Link>
                                </div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </Fragment>
        )
    }}

    </Query>
);

export default Contactos;