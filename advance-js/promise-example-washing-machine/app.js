function machineOn() {
  return new Promise((resolve, reject) => {
    const isMachineOn = true;
    if (isMachineOn) {
      setTimeout(() => {
        resolve("Machine is on");
      }, 2000);
    } else {
      reject("Something went wrong...");
    }
  });
}

function delay(message, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(message), time);
  });
}

machineOn()
  .then((response) => {
    console.log(response);
    return delay("Putting clothes...", 2000);
  })
  .then((response) => {
    console.log(response);
    return delay("Taking water...", 1000);
  })
  .then((response) => {
    console.log(response);
    return delay("Washing clothes...", 4000);
  })
  .then((response) => {
    console.log(response);
    return delay("Draining water", 2000);
  })
  .then((response) => {
    console.log(response);
    return delay("Dry clothes...", 3000);
  })
  .then((response) => {
    console.log(response);
    return delay("Finished...", 500);
  })
  .then((response) => console.log(response))
  .catch((error) => console.log(error));