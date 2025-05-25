function order() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let status = true;
            if (status) {
                resolve("✅ Order Received");
            } else {
                reject("❌ Order rejected! Please try again.");
            }
        }, 3000);
    });
}

function delay(message, time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(message), time);
    });
}

order()
    .then((msg) => {
        console.log(msg);
        return delay("🧂 Preparing Ingredients", 3000);
    })
    .then((msg) => {
        console.log(msg);
        return delay("🍳 Cooking Food", 3000);
    })
    .then((msg) => {
        console.log(msg); // this line mean to print the cooking food message
        return delay("📦 Packing the Order", 3000);
    })

    .then((msg) => {
        console.log(msg);
        return delay("🛵 Delivery on the way", 3000);
    })

    .then((msg) => {
        console.log(msg);
        return delay("✅ Delivered Successfully", 3000);
    })

    .then((msg) => {
        console.log(msg);
    })

    .catch((error) => {
        console.log(error);
    })

    .finally(() => {
        console.log("Thanks for using our delivery service!")
    });