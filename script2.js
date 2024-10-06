const raceURL = "https://www.dnd5eapi.co/api/races/"

const raceSelector = document.getElementById("race")

let ability_bonuses = null
let starting_proficiencies = null
let starting_proficiency_options = null
let traits = null

async function parseRace(event) {
    const promise = await fetch(raceURL+event.target.value);
    const processedResponse = await promise.json();
    ability_bonuses = processedResponse.ability_bonuses;
    starting_proficiencies = processedResponse.starting_proficiencies;
    starting_proficiency_options = processedResponse.starting_proficiency_options;
    traits = processedResponse.traits;
    console.log(ability_bonuses)
    console.log(starting_proficiencies)
    console.log(starting_proficiency_options)
    console.log(traits)
    updateData()
  }


raceSelector.addEventListener("change", parseRace);