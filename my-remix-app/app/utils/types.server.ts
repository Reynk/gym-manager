// app/utils/types.server.ts
export type RegisterForm = {
    username: string
    password: string
}

export type LoginForm = {
    username: string
    password: string
}

export type ClientForm = {
    name: string
    age: number
    height: string
    weight: string
    gender: 'M' | 'F' | 'X'
    userId: string
}