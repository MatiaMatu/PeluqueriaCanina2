export const WORKING_HOURS = {
  start: 10,  // Hora de inicio 10:00 AM
  end: 17,    // Hora de fin 5:00 PM
  interval: 1 // Intervalo de 1 hora
};


export function generateAvailableTimes(date: string, bookedTimes: string[], currentTime: string): string[] {
  const availableTimes = [];
  const today = new Date().toISOString().split('T')[0]; // Obtén la fecha de hoy en formato 'YYYY-MM-DD'
  const selectedDate = date.split('T')[0]; // Obtén la parte de la fecha en 'date' // Obtén la fecha de hoy en formato 'YYYY-MM-DD'
console.log(today)
console.log(date)  
  // Si la fecha seleccionada es hoy, filtra las horas pasadas
  if (selectedDate === today) {
    const currentHour = parseInt(currentTime.split(':')[0], 10);

    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour += WORKING_HOURS.interval) {
      if (hour > currentHour) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;
        const dateTimeSlot = `${date}T${timeSlot}`;
        if (!bookedTimes.includes(timeSlot)) {
          availableTimes.push(dateTimeSlot);
        }
      }
    }
  } else {
    // Si la fecha seleccionada no es hoy, genera todas las horas disponibles
    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour += WORKING_HOURS.interval) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;
      const dateTimeSlot = `${date}T${timeSlot}`;
      if (!bookedTimes.includes(timeSlot)) {
        availableTimes.push(dateTimeSlot);
      }
    }
  }

  return availableTimes;
}

