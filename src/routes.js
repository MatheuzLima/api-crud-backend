import { getAllUsers, createUser, updateUser, deleteUser } from './controllers/userControllers.js'

async function userRoutes(app) {
    app.get('/todos', getAllUsers)
    app.post('/cadastro', createUser)
    app.put('/:id', updateUser)
    app.delete('/:id', deleteUser)
  }
  
  export default userRoutes