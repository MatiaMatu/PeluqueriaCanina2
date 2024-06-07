export const WORKING_HOURS = {
  start: 10,  // Hora de inicio 10:00 AM
  end: 17,    // Hora de fin 5:00 PM
  interval: 1 // Intervalo de 1 hora
};

export function generateAvailableTimes(date: string, bookedTimes: string[]): string[] {
  const availableTimes = [];
  const dateObj = new Date(date);
  for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour += WORKING_HOURS.interval) {
    const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;
    const dateTimeSlot = `${date}T${timeSlot}`;
    if (!bookedTimes.includes(timeSlot)) {
      availableTimes.push(dateTimeSlot);
    }
  }
  return availableTimes;
}
