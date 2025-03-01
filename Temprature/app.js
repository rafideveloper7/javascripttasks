function temprature(mun1, sign) {
    if (num1 >-30 && num1 <70 ) {
        if (num1 <= 0) {
            console.log("Extremly heigh cool stay at home ")
            console.log("and take Hot  cooffe/Tea 🤡🤡🤡")
        }
        else if (num1 <= 10){
            console.log("its cool dear please take sweater!")
            console.log("and don't forget to eat soap 🍵")
        }
        else if (num1 <= 15){
            console.log("Weather is normal but still make sure to have sweater!")
            console.log("Now you can go out but stay away from cool drinks 🥛🍷🧁")
        }
        else if (num1 <= 25){
            console.log("Pretty good wheather , Let's take Ice-cream 🥧🍦🍧! ")
            console.log("and make a plan for Tower with friends! 🚕🚓🚓")
        }
        else if (num1 <=35 ){
            console.log("It's Hot dear take a shower! 🛀🛀🛀")
            console.log("If possible go for swim 🏊‍♀️🏊‍♂️🤽‍♀️🚣‍♀️")
        }
        else if (num1 <= 45){
            console.log("high Hot wheather please stay at home! 🏡")
            console.log("and take shower 🚣‍♀️🤽‍♀️ after every 2 hours🕐⌚")
        }
        else if (num1 <= 55){
            console.log("Please down the A.C to 0 ...")
            console.log("and Drink cool, ...")
        }
        else if (num1 >= 55){
            console.log("It's seem like ypu are out of earth! 🌎")
            console.log("Inter the possible temprature at Earth!🤣😂😂🤣🤣🤣")
            alert("Inter Possible temprature at the earth 🌎")
        }
    }

    else {
        console.log("Impossible Temprature at Earth 🤣😂😂, Inter real temp...")
        alert("Dear inter possible temprature at the earth 🌎")
    }
}

var num1 = prompt("Inter the temprature value :");
var sign = "℃"

console.log("Temprature is :" + " " + num1 + " " + sign);

var result = temprature(num1, sign);
