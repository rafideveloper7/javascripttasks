// function machineOn() {
//   return new Promise((resolve, reject) => {
//     const isMachineOn = true;
//     if (isMachineOn) {
//       setTimeout(() => {
//         resolve("Machine is on");
//       }, 2000);
//     } else {
//       reject("Something went wrong...");
//     }
//   });
// }

// function delay(message, time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(message), time);
//   });
// }

// machineOn()
//   .then((response) => {
//     console.log(response);
//     return delay("Putting clothes...", 2000);
//   })
//   .then((response) => {
//     console.log(response);
//     return delay("Taking water...", 1000);
//   })
//   .then((response) => {
//     console.log(response);
//     return delay("Washing clothes...", 4000);
//   })
//   .then((response) => {
//     console.log(response);
//     return delay("Draining water", 2000);
//   })
//   .then((response) => {
//     console.log(response);
//     return delay("Dry clothes...", 3000);
//   })
//   .then((response) => {
//     console.log(response);
//     return delay("Finished...", 500);
//   })
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));

//   asyns await
// async function machineWork() {
//   try {
//     const r1 = await machineOn();
//     console.log(r1);
//     const r2 = await delay("Putting clothes", 2000);
//     console.log(r2);
//     const r3 = await delay("Taking water", 3000);
//     console.log(r3);
//     const r4 = await delay("Washing clothes", 5000);
//     console.log(r4);
//     const r5 = await delay("Draining water", 500);
//     console.log(r5);
//     const r6 = await delay("Dried and ready", 2500);
//     console.log(r6);
//     console.log("await ke baad wala console");
//   } catch (error) {
//     console.log(error);
//   }
// }

// machineWork();

//