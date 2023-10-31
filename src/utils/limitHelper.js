export function limitedFunction() {
  const currentDate = new Date().toLocaleDateString();
  const callCount = localStorage.getItem("callCount");

  if (callCount && callCount >= 3) {
    return false;
  }

  if (localStorage.getItem("lastCalled") === currentDate) {
    localStorage.setItem("callCount", parseInt(callCount) + 1);
  } else {
    localStorage.setItem("lastCalled", currentDate);
    localStorage.setItem("callCount", 1);
  }

  return true;
}
