export default function uniqueId() {
  return parseInt(`${Date.now() * Math.random()}`).toString();
}
