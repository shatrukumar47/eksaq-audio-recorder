export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(
    remainingSeconds
  )}`;
};
