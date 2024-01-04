import { createAppointment } from '~/utils/client.server';
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const appointmentData = {
    date: String(form.get('date')),
    time: String(form.get('time')),
    workoutType: String(form.get('workoutType')),
    clientId: String(form.get('clientId')),
    coachId: String(form.get('coachId'))
  };

  // Validate the form data here

  // Create the new appointment
const newAppointment = await createAppointment({
    ...appointmentData,
    workoutType: appointmentData.workoutType as "CARDIO" | "MUSCLE" | "ENDURANCE",
});

// If the appointment was created successfully, redirect to the client page
if (newAppointment) {
    return 'Success adding appointment';
} else {
    // If there was an error, return a 400 response
    return json({ error: 'Could not create appointment' }, { status: 400 });
}
};