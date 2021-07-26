export function getMinuteAndSecondsString(songLengthInSeconds: number) {
  const secondsPerMinute = 60;
  const minutes = songLengthInSeconds / secondsPerMinute;
  const seconds = songLengthInSeconds % secondsPerMinute;
  
  return `${minutes}:${seconds}`;
}