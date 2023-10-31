export function limitedFunction(isSuccess, address) {
  const currentDate = new Date().toLocaleDateString();
  let callCounts = JSON.parse(localStorage.getItem("callCounts")) || {};

  if (callCounts[address] && callCounts[address].callCount >= 3 && !isSuccess) {
    return false;
  }

  if (isSuccess) {
    if (
      callCounts[address] &&
      callCounts[address].lastCalled === currentDate.toString()
    ) {
      callCounts[address].callCount += 1;
    } else {
      callCounts[address] = {
        callCount: 1,
        lastCalled: currentDate.toString(),
      };
    }
    localStorage.setItem("callCounts", JSON.stringify(callCounts));
  } else {
    return true;
  }
}
