import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        emails: [Email]
        edad: Int
        tipo: TipoCliente
        pedidod: [PedidoInput]
    }

    type Email {
        email: String
    }

    type Pedido {
        producto: String
        precio: Int
    }

    """Asigna Categoria del Cliente"""
    enum TipoCliente {
        BASICO
        PREMIUM
    }

    type Query {
        getCliente(id: ID): Cliente
    }

    input PedidoInput {
        producto: String
        precio: Int
    }

    input EmailInput {
        email: String
    }

    """ Campos para nuevos Clientes"""
    input ClienteInput {
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        emails: [EmailInput]
        edad: Int!
        tipo: TipoCliente!
        pedidod: [PedidoInput]
    }

    """ Mutations para crear nuevos clientes"""
    type Mutation {
        #Nombre del Resolver, input con datos y valor que retorna
        """ Te permite crear nuevos clientes """
        crearCliente(input: ClienteInput): Cliente
    }
`);

export default schema;