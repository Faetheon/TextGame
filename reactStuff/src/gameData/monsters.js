export default [
  {name: 'goblin', health: 20, attack: 1, exp: 2},
  {name: 'orc', health: 40, attack: 3, exp: 5},
  {
    name: "Yoshikage Kira",
    effects: "BitesTheDust" /* When health falls below 50, resets to beginning of fight and next time health falls below 50 and it doesn't kill the unit, automatically applies death to player*/,
    health: 100,
    attack: 4,
    weapons: "The fact that Killer Queen has already touched the doorknob",
    exp: 10,
    description: "A middle-aged businessman trying to lead a peaceful life.",
    weaknesses: "Ambulances"
  },
  {
    name: "Ice Witch",
    effects: ["freeze", "fear"],
    health: 50,
    attack: 8,
    weapons: ["ice breath", "conjure barrage"/* icicles */, "ice dagger"],
    exp: 13,
    desc: "A being so corrupted by the feeling of joy felt when staring down a helpless victim seconds from death with her cold soulless eyes, she's ascended to the level of a demon queen."
  },
  {
    //by James C.
    name: "Basilisk",
    effects: ["petrify", "fear"],
    health: 300,
    attack: 10,
    weapons: ["teeth", "gaze"],
    exp: 500,
    desc:  "A snakelike monster whose very gaze can turn you to stone.",
  }    
];