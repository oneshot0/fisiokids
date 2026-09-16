const START = 12 * 60;
export function generateSlots(date: Date, now = new Date()) {
  const day = new Date(date); day.setHours(0, 0, 0, 0);
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  if (day < today) return [];
  return Array.from({ length: 10 }, (_, i) => {
    const start = new Date(day); start.setMinutes(START + i * 60);
    const end = new Date(start); end.setMinutes(start.getMinutes() + 60);
    return { startsAt: start, endsAt: end, label: start.toISOString().slice(11, 16) };
  }).filter((slot) => slot.startsAt > now || day.getTime() !== today.getTime());
}
