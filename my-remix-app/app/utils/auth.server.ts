// app/utils/auth.server.ts

import type {LoginForm, RegisterForm} from './types.server'
import {prisma} from './prisma.server'
import {createCookieSessionStorage, json, redirect} from '@remix-run/node'
import {createUser} from "~/utils/user.server";
import bcrypt from "bcryptjs";

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'kudos-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})
const languageStorage = createCookieSessionStorage({
    cookie: {
        name: 'language',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

export async function getLanguage(request: Request) {
    const session = await languageStorage.getSession(request.headers.get('Cookie'))
    return await session.get('language')
}
export async function setLanguage(language: string, redirectTo: string, request: Request) {
    const session = await languageStorage.getSession(request.headers.get('Cookie'))
    session.set('language', language)
    console.log('setLanguage', language, redirectTo)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await languageStorage.commitSession(session),
        },
    })
}
export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

export async function register(user: RegisterForm) {
    const exists = await prisma.user.count({where: {username: user.username}})
    if (exists) {
        return json({error: `User already exists with that email`}, {status: 400})
    }
    const newUser = await createUser(user)
    if (!newUser) {
        return json(
            {
                error: `Something went wrong trying to create a new user.`,
                fields: {email: user.username, password: user.password},
            },
            {status: 400},
        )
    }
    return createUserSession(newUser.id, '/');
}

export async function login({username, password}: LoginForm) {
    const user = await prisma.user.findUnique({
        where: {username},
    })
    if (!user || !(await bcrypt.compare(password, user.password)))
        return json({error: `Incorrect login`}, {status: 400})

    return createUserSession(user.id, '/');
}
export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }
    return userId
}

function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') return null
    return userId
}

export async function getUser(request: Request) {
    const userId = await getUserId(request)
    if (typeof userId !== 'string') {
        return null
    }

    try {
        return await prisma.user.findUnique({
            where: {id: userId},
            select: {id: true, username: true},
        })
    } catch {
        throw await logout(request)
    }
}

export async function logout(request: Request) {
    const session = await getUserSession(request)
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}