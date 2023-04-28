const maleNames = [
    "Adam",
    "Benjamin",
    "Caleb",
    "Christian",
    "Daniel",
    "David",
    "Ethan",
    "Gabriel",
    "Isaac",
    "Jacob",
    "James",
    "John",
    "Jonathan",
    "Joseph",
    "Joshua",
    "Levi",
    "Lucas",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Noah",
    "Oliver",
    "Peter",
    "Samuel",
    "Simon",
    "Thomas",
    "Timothy",
    "William"
];

const femaleNames = [
    "Abigail",
    "Anna",
    "Bethany",
    "Caroline",
    "Charlotte",
    "Chloe",
    "Elizabeth",
    "Emily",
    "Emma",
    "Grace",
    "Hannah",
    "Isabella",
    "Jennifer",
    "Jessica",
    "Julia",
    "Katherine",
    "Lauren",
    "Lily",
    "Madison",
    "Megan",
    "Olivia",
    "Rachel",
    "Rebecca",
    "Sarah",
    "Sophia",
    "Stephanie",
    "Taylor",
    "Victoria",
    "Zoe"
];

const eitherNames = [
    "Avery",
    "Bailey",
    "Charlie",
    "Dakota",
    "Emerson",
    "Finley",
    "Harper",
    "Jordan",
    "Kai",
    "Logan",
    "Mo",
    "Parker",
    "Quinn",
    "Reese",
    "Riley",
    "Rowan",
    "Sage",
    "Sawyer",
    "Skyler",
    "Spencer",
    "Taylor",
    "Tyler",
    "Vivian",
    "Wren",
    "Avery",
    "Cameron",
    "Dylan",
    "Hayden",
    "Phoenix",
    "Sutton"
];

const surnames = [
    "Blackwood",
    "Crestfall",
    "Dawnrider",
    "Elmwood",
    "Frostwhisper",
    "Goldvale",
    "Hawthorne",
    "Ironclad",
    "Jadehammer",
    "Knightblade",
    "Lionheart",
    "Moonstone",
    "Netherwood",
    "Oakenshield",
    "Proudfoot",
    "Queensguard",
    "Roberson",
    "Silverscale",
    "Thornbriar",
    "Underhill",
    "Valewalker",
    "Wolfhaven",
    "Xandermere",
    "Yellowhawk",
    "Zephyrwind",
    "Amberhelm",
    "Bloodsword",
    "Crownguard",
    "Dragonfire",
    "Fireheart"
];

const descriptions = [
    "short and stocky with a bushy beard",
    "tall and lean with piercing blue eyes",
    "athletic build with scars on their arms",
    "plump and jolly with rosy cheeks",
    "muscular with a shaved head",
    "slender with long blonde hair",
    "curvy and strong with piercing green eyes",
    "thin and wiry with a sharp nose",
    "broad shouldered with a thick beard",
    "short and slim with curly brown hair",
    "tall and broad with a deep voice",
    "lithe and graceful with a sharp wit",
    "stout and sturdy with a friendly smile",
    "sleek and agile with piercing brown eyes",
    "portly and jovial with a booming laugh",
    "lean and rugged with a rugged beard",
    "delicate and refined with a gentle voice",
    "robust and hearty with a deep laugh",
    "willowy and elegant with a regal bearing",
    "brawny and powerful with a fierce gaze",
    "petite and charming with a sweet disposition",
    "bony and angular with a sharp tongue",
    "sturdy and dependable with a kind heart",
    "graceful and poised with a melodious voice",
    "sinewy and tough with a stern demeanor",
    "dainty and fragile with a delicate touch",
    "stocky and muscular with a friendly demeanor",
    "lithe and nimble with a mischievous grin",
    "athletic and toned with a quick wit",
    "portly and jovial with a twinkle in their eye",
    "muscular and imposing with a deep voice"
];


function init() {

    // Getting Elements (allows better flexibility for changes in future)
    // Get Genders
    let genders = []
    document.querySelector('#gender').querySelectorAll("option").forEach(op => genders.push(op.value));
    genders = genders.slice(1);

    // Get Professions
    let professions = []
    document.querySelector('#profession').querySelectorAll("option").forEach(op => professions.push(op.value));
    professions = professions.slice(1);

    /* Random content courtesy of ChatGPT */

    const form = document.querySelector("form")

    form.addEventListener("submit", (e) => {
        // Eat Default Behaviour
        e.preventDefault();

        // Try and Grab Values
        let name = document.querySelector('#name').value
        let surname = document.querySelector('#surname').value
        let gender = document.querySelector('#gender').value
        let profession = document.querySelector('#profession').value
        let pronouns = ""

        // If Value not Entered, Generate One
        if (gender == "random") {
            gender = choice(genders);
        }

        switch (gender) {
            case "male":
                pronouns = "He is"
                break;
            case "female":
                pronouns = "She is"
                break;
            default:
                pronouns = "They are"
                break
        }

        if (profession == "random") {
            profession = choice(professions);
        }

        if (name == "") {
            switch (gender) {
                case "male":
                    name = choice(maleNames)
                    break;
                case "female":
                    name = choice(femaleNames)
                    break;
                default:
                    name = choice(eitherNames)
                    break;
            }
        }

        if (surname == "") {
            surname = choice(surnames)
        }

        // Output Element
        const output = document.querySelector(".fresh-npc")
        output.textContent = `${name} ${surname} is a ${gender} ${profession}. ${pronouns} ${choice(descriptions)}.`
    })
}

function choice(list) {
    // Chooses and returns one element from the given list
    return list[Math.floor((Math.random() * list.length))];
}

init()