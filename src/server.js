import fastify from 'fastify' 
import User from './models/User.js'
import Sequelize from 'sequelize'
import config from './config/database.js'
import userRoutes from './routes.js'

const app = fastify()
const sequelize = new Sequelize(config)

User.init(sequelize)

app.register(userRoutes, { prefix: '/usuarios' })

sequelize
    .authenticate()
    .then(() => {
        console.log('Banco de dados Conectado')
        app.listen({ port: 3000 }, () => {
            console.log('Server ON! = localhost:3000')
        })
    })
    .catch(err => {
        console.error(err)
    })