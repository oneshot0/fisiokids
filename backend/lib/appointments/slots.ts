const START = 12 * 60;
export function generateSlots(date: Date, now = new Date()) {
  const day = new Date(date); day.setHours(0, 0, 0, 0);
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  if (day < today) return [];
  const isToday = day.getTime() === today.getTime();
  const currentMinute = now.getHours() * 60 + now.getMinutes();
  const firstMinute = isToday ? Math.max(START, (Math.floor(currentMinute / 60) + 1) * 60) : START;
  const slots = Array.from({ length: Math.max(0, Math.floor((21 * 60 - firstMinute) / 60) + 1) }, (_, i) => {
    const start = new Date(day); start.setMinutes(firstMinute + i * 60);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return { startsAt: start, endsAt: end, label: start.toISOString().slice(11, 16) };
  });
  return slots;
}
