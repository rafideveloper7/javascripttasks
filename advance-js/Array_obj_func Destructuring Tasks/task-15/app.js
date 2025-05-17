// 15. Destructure Object with Array Property
// Destructure skills from the object and get the first skill.

const developer = {
  name: "Ali",
  skills: ["JavaScript", "React", "Node"]
};

// here destructuring array from obj
const {skills} = developer;

// bahi skills ko nekal do array say
const [firstSkill, secondSkill, thirdSkill] = skills;

// and consoling first skill 
console.log("🚀 ~ first skill is : ", firstSkill)



// Note 📝
// i use shortcut command for console thats why in all tasks shows similar like > "🚀 ~ first skill is : " etc 
// command is ctrl + Alt + l