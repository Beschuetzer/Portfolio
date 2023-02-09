export function getMinuteAndSecondsString(songLengthInSeconds: number) {
  const secondsPerMinute = 60;
  const hours = Math.floor(songLengthInSeconds / secondsPerMinute / secondsPerMinute);
  let minutes = Math.floor(songLengthInSeconds / secondsPerMinute);
  
  let seconds = Math.ceil(songLengthInSeconds % secondsPerMinute);
  if (seconds === 60)  {
    seconds = 0;
    minutes += 1;
  }

  return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}