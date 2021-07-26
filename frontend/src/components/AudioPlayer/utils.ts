export function getMinuteAndSecondsString(songLengthInSeconds: number) {
  const secondsPerMinute = 60;
  const hours = Math.floor(songLengthInSeconds / secondsPerMinute / secondsPerMinute);
  const minutes = Math.floor(songLengthInSeconds / secondsPerMinute);
  const seconds = Math.ceil(songLengthInSeconds % secondsPerMinute);
  
  return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
}