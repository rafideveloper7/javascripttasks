// callback hell

// on, put clothes, water, wash, drain, dry
function onMachine(cb) {
  setTimeout(() => {
    console.log("Machine is on");
    cb(takeWater); // clothes ka callback
  }, 2000);
}

function clothes(cb) {
  setTimeout(() => {
    console.log("Putting clothes into machine");
    cb(wash); // takeWater ka callback hai
  }, 5000);
}

function takeWater(cb) {
  setTimeout(() => {
    console.log("Machine is taking water");
    cb(drain); // wash ka callback hai
  }, 3000);
}

function wash(cb) {
    setTimeout(() => {
        console.log("wahing clothes ...");
        cb(drying);
    }, 6000);
}

function drain(cb) {
  setTimeout(() => {
    console.log("Draining water...")
    cb()
  }, 4000);
}

function drying() {
    setTimeout(() => {
        console.log("clothes dried !")
    }, 3000);
}

onMachine(clothes);

console.log("Last console which in synchronous");
