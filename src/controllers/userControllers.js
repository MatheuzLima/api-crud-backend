import User from '../models/User.js'
import crypto from 'node:crypto'

//GET
export const getAllUsers = async (request, reply) => { 

    try {
        const users = await User.findAll()  //Verificar

        reply.status(200).send(users)
    } catch (err) {
        reply.status(500).send({ erro: 'Erro ao buscar dados de usuários' })
    }
}

//POST
export const createUser = async (request, reply) => {

    try {
        const userToCreate = {
            id: crypto.randomUUID(),
            name: request.body.name,
            age: request.body.age,
            email: request.body.email,
        }

        const user = await User.create(userToCreate)

        reply.status(201).send(user)
    } catch (err) {
        reply.status(500).send(err)
    }
}

//PUT
export const updateUser = async (request, reply) => {
  const { id } = request.params
  const { name, age, email } = request.body

  try {
    const [updatedRows] = await User.update(
      { name, age, email },
      { where: { id } }
    )

    if (updatedRows === 0) {
      return reply.status(404).send({ error: 'Usuário não encontrado' })
    }

    reply.status(200).send({ message: 'Usuário atualizado com sucesso' })
    console.log('Usuário atualizado com sucesso')
  } catch (err) {
    reply.status(500).send({ error: 'Erro ao atualizar usuário', details: err.message })
  }
}

//DELETE
export const deleteUser = async (request, reply) => {
  const { id } = request.params

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado' })
    }

    await user.destroy()
    reply.status(204).send()
    console.log('Usuário deletado')
  } catch (err) {
    reply.status(500).send({ error: 'Erro ao deletar usuário', details: err.message })
  }
}

//PUT
// export const updateUser = async (request, reply) => {
    
//     const { id } = request.params
//     const { name, age, email } = request.body

//     try {         

//         const [updateRows] = await User.update(
//             { name, age, email, },
//             { where: { id } }
//         )

//         if (updateRows === 0) {
//             reply.status(404).send({ error: 'Usuário não encontrado' })
//         }
        
//         reply.status(200).send(), console.log("Usuário atualizado com sucesso")
//     } catch (err) {
//         reply.status(500).send({ error: 'Erro ao atualizar usuário' })
//     }
// }


// //DELETE
// export const deleteUser = async (request, reply) => {
    
//     const id = request.params.id  
    
//     try {
//         const user = await User.findByPk(id)
    
//         if (!user) {
//             reply.status(404).send({ error: 'Usuário não encontrado' })
//         }

//         await user.update()

//         reply.status(204).send({ message: 'Usuário deletado' }), console.log("Usuário deletado")
//     } catch (err) {
//         return reply.status(500).send({ error: 'Erro ao deletar usuário' })
//     }

// //return reply.status(204).send({ message: 'Usuário deletado' })  
// }