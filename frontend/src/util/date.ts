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
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: getClientTimeZone(),
  });
}

export { getCurrentAdventDay, formatDate };
