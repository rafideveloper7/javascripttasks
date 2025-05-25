// ✅ Syntax of Promise in JS (Real-life example: Sending a video from gallery)

let takingVideo = new Promise((resolve, reject) => {
    let isVideoSending = true;

    if (isVideoSending) {
        // Simulate picking video from gallery after 2 seconds
        setTimeout(() => {
            console.log("📁 Taking video from gallery...");
            resolve("Video is ready to send ✅");
        }, 2000);
    } else {
        reject("❌ Some error occurred while accessing the gallery.");
    }
});

/////////////////////////////////////////////////////

// ✅ Delay function to simulate waiting
const delay = (message, time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, time);
    });
};

/////////////////////////////////////////////////////

// ✅ Using the Promise with .then() chaining
takingVideo
    .then((result) => {
        console.log(result); // "Video is ready to send ✅"
        return delay("📤 Sending video now...", 3000);
    })
    .then((sendingMessage) => {
        console.log(sendingMessage); // "📤 Sending video now..."
        return delay("✅ Video sent successfully!", 2000);
    })
    .then((finalMessage) => {
        console.log(finalMessage); // "✅ Video sent successfully!"
    })
    .catch((error) => {
        console.log(error); // Catch any error from above steps
    });

/////////////////////////////////////////////////////

//  Promise States:
// 1) pending – when execution starts
// 2) fulfilled – when resolve() is called
// 3) rejected – when reject() is called

// JS doesn’t wait — it keeps going while  video on the way 
