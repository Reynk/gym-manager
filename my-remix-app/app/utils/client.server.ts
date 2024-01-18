// app/utils/client.server.ts
import {prisma} from "~/utils/prisma.server";
import type {ClientForm, AppointmentForm } from './types.server'

export const createClient = async (client: ClientForm) => {
    const newClient = await prisma.client.create({
        data: {
            name: client.name,
            age: client.age,
            height: client.height,
            weight: client.weight,
            gender: client.gender,
            userId: client.userId,
        }
    })
    return { id: newClient.id, name: client.name }
}

export const createAppointment = async (appointment: AppointmentForm) => {
    const newAppointment = await prisma.appointment.create({
        data: {
          date: appointment.date,
          time: appointment.time,
          workoutType: appointment.workoutType,
          clientId: appointment.clientId,
          coachId: appointment.coachId,
        }
      })
    return { id: newAppointment.id, date: appointment.date, time: appointment.time }
  }

export const updateClient = async (clientId: string, client: ClientForm) => {
    return prisma.client.update({
        where: {id: clientId},
        data: {
            name: client.name,
            age: client.age,
            height: client.height,
            weight: client.weight,
            gender: client.gender,
            userId: client.userId
        }
    });
}

export const deleteClient = async (clientId: string) => {
    return prisma.client.delete({
        where: {id: clientId},
    });
}

export const getClient = async (clientId: string) => {
    return prisma.client.findUnique({
        where: {id: clientId},
    });
}

export const getClientsByUserId = async (userId: string) => {
    return prisma.client.findMany({
        where: {userId: userId},
    });
}