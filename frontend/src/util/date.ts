// Get the current day in the Advent Calendar
function getCurrentAdventDay() {
  const now = new Date();
  // Adjust offset since AOC starts at midnight EST/UTC-5
  now.setHours(now.getHours() - 13);
  const day = now.getDate();
  return day;
}

// Get the client's timezone with fallback
function getClientTimeZone(): string {
  try {
    if (Intl && Intl.DateTimeFormat) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  } catch (e) {
    console.error(e);
  }

  // Fallback to UTC
  return 'UTC';
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(navigator.language, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: getClientTimeZone(),
  });
}

export { getCurrentAdventDay, formatDate };
