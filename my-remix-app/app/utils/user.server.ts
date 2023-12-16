// app/utils/user.server.ts
import bcrypt from 'bcryptjs'
import type {LoginForm, RegisterForm} from './types.server'
import {prisma} from './prisma.server'

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
export const updateUser = async (id: string, userData: LoginForm) => {
    return prisma.user.update({
        where: {
            id,
        },
        data:{
            username: userData.username,
            password: userData.password,
        },
    });
}
export const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
}