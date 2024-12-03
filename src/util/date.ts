// Get the current day in the Advent Calendar
function getCurrentAdventDay() {
  const now = new Date();
  // Adjust offset since AOC starts at midnight EST/UTC-5
  now.setHours(now.getHours() - 13);
  const day = now.getDate();
  return day;
}

export default getCurrentAdventDay;
