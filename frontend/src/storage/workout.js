const getTodayWorkout = () => {
  const work = sessionStorage.getItem("todayWorkout");
  if (work === null) {
    return [];
  }
  return JSON.parse(work);
};
const addTodayWorkout = (exercise) => {
  const work = getTodayWorkout();
  const ids = work.map((e) => e.id);
  if (ids.includes(exercise.id)) {
    return false;
  }
  work.push(exercise);
  sessionStorage.setItem("todayWorkout", JSON.stringify(work));
  return true;
};

const clearTodayWorkout = () => {
  sessionStorage.removeItem("todayWorkout");
};

export { getTodayWorkout, addTodayWorkout, clearTodayWorkout };
