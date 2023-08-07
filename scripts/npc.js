
const init = async () => {
    // Request Data from npc_info.json (Random content courtesy of ChatGPT)
    data = await getNpcData();

    // Getting Elements (allows better flexibility for changes in future)
    // Get Genders
    let genders = []
    document.querySelector('#gender').querySelectorAll("option").forEach(op => genders.push(op.value));
    genders = genders.slice(1);

    // Get Professions
    let professions = []
    document.querySelector('#profession').querySelectorAll("option").forEach(op => professions.push(op.value));
    professions = professions.slice(1);

    const form = document.querySelector("form")

    form.addEventListener("submit", (e) => {
        // Eat Default Behaviour
        e.preventDefault();

        // Try and Grab Values
        let name = document.querySelector('#name').value;
        let surname = document.querySelector('#surname').value;
        let gender = document.querySelector('#gender').value;
        let profession = document.querySelector('#profession').value;
        let pronouns = "";

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
                    name = choice(data["maleNames"])
                    break;
                case "female":
                    name = choice(data["femaleNames"])
                    break;
                default:
                    name = choice(data["eitherNames"])
                    break;
            }
        }

        if (surname == "") {
            surname = choice(data["surnames"])
        }

        // Output Element
        const output = document.querySelector(".fresh-npc")
        output.textContent = `${name} ${surname} is a ${gender} ${profession}. ${pronouns} ${choice(data["descriptions"])}.`
    })
}

function choice(list) {
    // Chooses and returns one element from the given list
    return list[Math.floor((Math.random() * list.length))];
}

const getNpcData = async () => {
    // Asynchronously Loads all NPC Data
    const response = await fetch("scripts/npc_info.json")
    const data = await response.json()
    return data;
}

// Initialize
init()