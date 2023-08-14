export const convert = (seconds) => {
  seconds = Math.floor(seconds);

  let minutes = Math.floor(seconds / 60).toString();
  seconds = (seconds % 60).toString();

  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }

  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  let time = `${minutes}:${seconds}`;
  return time;
};
