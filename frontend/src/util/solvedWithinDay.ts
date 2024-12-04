function isSolvedWithinDay(aocYear: number, aocDay: number, secondStarTimestamp: number) {
    // Releases are at 5am UTC or midnight EST or 1pm SGT
    // No AOC before 2015

    // Check if the second star was obtained before 5am UTC the next day
    return secondStarTimestamp < Date.UTC(aocYear, 11, aocDay + 1, 5, 0, 0, 0);
}

export default isSolvedWithinDay;