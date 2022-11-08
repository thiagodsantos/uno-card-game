export const randomNumber = (min = 0, max = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
}