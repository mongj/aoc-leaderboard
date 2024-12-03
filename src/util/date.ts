// Get the current day in the Advent Calendar
function getCurrentAdventDay() {
  const now = new Date();
  const day = now.getDate();
  return day;
}

export default getCurrentAdventDay;
