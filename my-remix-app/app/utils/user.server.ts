// app/utils/user.server.ts
import bcrypt from 'bcryptjs'
import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            username: user.username,
            password: passwordHash,
            role: 'COACH',
        },
    })
    return { id: newUser.id, email: user.username }
}