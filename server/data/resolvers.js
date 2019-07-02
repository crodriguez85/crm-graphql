import {Clientes} from './db';
import mongoose from 'mongoose';

export const resolvers = {
    Query: {
        getCliente : (root, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        getClientes: (root, { limite, offset }) => {
            return Clientes.find({}).limit(limite).skip(offset)
        },
        totalClientes : (root) => {
            return new Promise((resolve, object) => {
                Clientes.countDocuments({}, (error, count) => {
                    if(error) rejects (error)
                    else resolve(count)
                })
            })
        },
    },

    Mutation: {
        crearCliente: (root, { input }) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos
            });
            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object)=> {
                nuevoCliente.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoCliente)
                })
            });
        },
        actualizarCliente: (root, { input }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({_id: input.id}, input, {new:true}, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                })
            })
        },
        eliminarCliente: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndRemove({ _id: id }, (error) => {
                    if(error) rejects(error)
                    else resolve("Se elimino correctamente")
                })
            })
        }
    }
};