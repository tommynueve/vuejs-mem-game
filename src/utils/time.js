export const formatTime = (seconds = 0) => {
  return `${Math.floor(seconds / 60)}:${('00' + Math.floor(seconds % 60)).slice(-2)}`;
};
