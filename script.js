// Ссылки на запросы для API

const raceURL = "https://www.dnd5eapi.co/api/races/"
const classURL = "https://www.dnd5eapi.co/api/classes/"

// Селекторы элементов, которые прослушиваем

const raceSelector = document.getElementById("race")
const classSelector = document.getElementById("class")
const addButtons = document.getElementsByClassName("add");
const substractButtons = document.getElementsByClassName("substract");


//Параметры, полученные от расы
let ability_bonuses = null // Готово
let starting_proficiencies = null
let starting_proficiency_options = null
let traits = null // Готово
let hit_die = 8 // Готово


//Параметры, полученные от класса

let proficiencies = null
let proficiency_choices = null
let starting_equipment =null
let starting_equipment_options =null
let saving_throws = null // Готово


//Базовые показатели персонажа

// Характеристики (для расчета модификатора)
let str = 13
let cha = 11
let int = 7
let wis = 10
let dex = 14
let con = 12
// Бонусы характеристики от расы (для расчета модификатора)
let str_bon = 0
let cha_bon = 0
let int_bon = 0
let wis_bon = 0
let dex_bon = 0
let con_bon = 0

// Лимиты значений модификаторов характеристик

let min_value = -3
let max_value = 4

// Лимит свободных очков модификаторов

let limit = 3

// Значение бонуса мастерства (владения)
let prof_bon = 3

//Условный уровень персонажа

let lvl = 2

// Здоровье и броня

let health = null

let armor = null


// Список всех черт

const trait_list = [
    {
        id: "brave",
        trait_name: "Храбрый",
        trait_description: 'Вы совершаете с преимуществом спасброски от запугивания и состояния «испуганный»'
    },
    {
        id: "darkvision",
        trait_name: "Тёмное зрение",
        trait_description: "Увеличивает радиус видимости в темноте до 60 фт"
    },
    {
        id: "dwarven-resilience",
        trait_name: "Дварфийская устойчивость",
        trait_description: "Вы совершаете с преимуществом спасброски от яда и получаете сопротивление урону ядом"
    },
    {
        id: "fey-ancestry",
        trait_name: "Наследие фей",
        trait_description: "Вы совершаете с преимуществом спасброски от состояния «очарованный», вас невозможно магически усыпить"
    },
    {
        id: "gnome-cunning",
        trait_name: "Гномья хитрость",
        trait_description: "Вы совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы против магии"
    },
    {
        id: "halfling-nimbleness",
        trait_name: "Проворство полурослика",
        trait_description: "Вы можете проходить сквозь пространство, занятое существами, чей размер больше вашего"
    },
    {
        id: "keen-senses",
        trait_name: "Острые чувства",
        trait_description: "Вы совершаете с преимуществом проверки Внимания"
    },
    {
        id: "lucky",
        trait_name: "Удача полурослика",
        trait_description: "Если при броске у вас выпало «1», вы можете перебросить кость, и должны использовать новый результат, даже если это «1»"
    },
    {
        id: "hellish-resistance",
        trait_name: "Адское сопротивление",
        trait_description: "Вы получаете сопротивление урону огнём"
    },
    {
        id: "menacing",
        trait_name: "Угрожающий вид",
        trait_description: "Вы совершаете с преимуществом проверки Запугивания"
    },
    {
        id: "relentless-endurance",
        trait_name: "Непоколебимая стойкость",
        trait_description: "Если ваши хиты опустились до нуля, но вы при этом не убиты, ваши хиты вместо этого опускаются до 1. Раз в сутки"
    },
    {
        id: "savage-attacks",
        trait_name: "Свирепые атаки",
        trait_description: "Если вы совершили критическое попадание рукопашной атакой оружием, вы можете добавить к итоговому урону еще одну кость урона этого оружия"
    },
    {
        id: "trance",
        trait_name: "Транс",
        trait_description: "Эльфы не нуждаются во сне. Вместо длинного отдыха, вы проводите медитацию до 4 часов"
    },
    {
        id:"stonecunning",
        trait_name:"Знание камня",
        trait_description:`Если вы совершаете проверку, связанную с происхождением работы по камню, прибавьте к результату првоерки Истории +${2*prof_bon}`
    }

]

// Список происхождений драконорожденых
const dragon_list = {
    "gold": {
        name: "Золотой",
        element: "Огнём",
        saving_throw: "Ловкости",
        type:"15-фт конуса"
    },
    "silver": {
        name: "Серебряный",
        element: "Холодом",
        saving_throw: "Телосложения",
        type:"15-фт конуса"
    },
    "bronze": {
        name: "Бронзовый",
        element: "Электричеством",
        saving_throw: "Ловкости",
        type:"линии 5 на 30 фт"
    },
    "white": {
        name: "Белый",
        element: "Холодом",
        saving_throw: "Телосложения",
        type:"15-фт конуса"
    },
    "green": {
        name: "Зеленый",
        element: "Ядом",
        saving_throw: "Телосложения",
        type:"15-фт конуса"
    },
    "red": {
        name: "Красный",
        element: "Огнём",
        saving_throw: "Ловкости",
        type:"15-фт конуса"
    },
    "latun": {
        name: "Латунный",
        element: "Огнём",
        saving_throw: "Ловкости",
        type:"линии 5 на 30 фт"
    },
    "copper": {
        name: "Медный",
        element: "Кислотой",
        saving_throw: "Ловкости",
        type:"линии 5 на 30 фт"
    },
    "blue": {
        name: "Синий",
        element: "Электричеством",
        saving_throw: "Ловкости",
        type:"линии 5 на 30 фт"
    },
    "black": {
        name: "Чёрный",
        element: "Кислотой",
        saving_throw: "Ловкости",
        type:"линии 5 на 30 фт"
    },
};




//Функции, которые выполняются при запуске приложения
document.getElementById("limit").textContent = `${limit}`
updateData()



// Функция, которая обновляет все данные на экране
function updateData () {
    displayAbilities ()
    checkRules ()
    updateNumbers ()
    updateHealth ()
    updateSavingThrows ()
    removeRedOutlineOnInput()
    updatePDF () // Потом убрать??
}


// let trait_list = [

//                 "dwarven-combat-training",
//                 "skill-versatility",
//                 "tool-proficiency",




// Функция для преобразования модификаторов в нужный формат
function updateNumbers () {
    const numberFields = document.querySelectorAll('.ab-value');
    // Проходим по каждому элементу
    numberFields.forEach(field => {
    // Получаем значение текста
    let value = parseInt(field.innerText.trim(), 10); // Преобразуем текст в число

    // Форматируем в зависимости от значения
    if (value > 0) {
        field.innerText = `+${value}`;
    } else if (value === 0) {
        field.innerText = `0`;
    } else {
        field.innerText = `${value}`; // Для отрицательных чисел
    }
});

}



function updatePDF () {
    document.getElementById("char-name-page").innerText =
    `${document.getElementById("char-name").value}, ${document.getElementById("race").options[document.getElementById("race").selectedIndex].text}-${document.getElementById("class").options[document.getElementById("class").selectedIndex].text}`;
    document.getElementById("str-page").innerText = document.getElementById("str").innerText;
    document.getElementById("dex-page").innerText = document.getElementById("dex").innerText;
    document.getElementById("con-page").innerText = document.getElementById("con").innerText;
    document.getElementById("int-page").innerText = document.getElementById("int").innerText;
    document.getElementById("wis-page").innerText = document.getElementById("wis").innerText;
    document.getElementById("cha-page").innerText = document.getElementById("cha").innerText;

    document.getElementById("hits-value").innerText = document.getElementById("hits").innerText;
    document.getElementById("arm-value").innerText = document.getElementById("armor-value").innerText;

    

}


function generatePDF() {
    // Проверка на заполненность полей
    const requiredFields = document.querySelectorAll('.required'); // Находим все поля с классом 'required'
    let allFieldsValid = true; // Флаг для проверки заполненности всех полей

    requiredFields.forEach(field => {
        if (field.value.trim() === '') { // Если поле пустое
            field.style.outline = '2px solid #CC5803'; // Подсвечиваем красным
            allFieldsValid = false; // Устанавливаем флаг, что есть незаполненные поля
        } else {
            field.style.border = ''; // Убираем красную рамку, если поле заполнено
        }
    });

    // Если есть незаполненные поля, отменяем генерацию PDF
    if (!allFieldsValid) {
        alert("Please fill out all required fields!"); // Предупреждение пользователю
        return; // Прекращаем выполнение функции
    }

    // Если все поля заполнены, продолжаем генерацию PDF
    updatePDF();
    const pdfContent = document.getElementById('pdf-content');

    // Временно отображаем элемент для генерации PDF
    pdfContent.style.display = "block";

    // Убедимся, что контент загружен и подготовлен перед генерацией PDF
    setTimeout(() => {
        // Настройка кастомного размера страницы в PDF
        const options = {
            margin: 0,
            filename: `${document.getElementById("char-name-page").innerText}.pdf`,
            image: { type: 'jpeg', quality: 0.75 }, // Уменьшаем качество изображения
            html2canvas: { scale: 1 }, // Уменьшаем масштаб для меньшего разрешения
            jsPDF: {
                unit: 'px',
                format: [1750, 1240], // Уменьшаем размер страницы (A4 в пикселях, но меньше)
                orientation: 'landscape'
            }
        };

        // Генерация PDF
        html2pdf().set(options).from(pdfContent).save().then(() => {
            // Скрываем элемент обратно после генерации PDF
            pdfContent.style.display = "none";
        }).catch((error) => {
            console.error("Ошибка при генерации PDF:", error);
            // Скрываем элемент даже в случае ошибки
            pdfContent.style.display = "none";
        });

    }, 200); // Небольшая задержка, чтобы убедиться, что все ресурсы загружены
}

// Функция для удаления красной рамки при заполнении поля
function removeRedOutlineOnInput() {
    const requiredFields = document.querySelectorAll('.required');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (field.value.trim() !== '') {
                field.style.outline = ''; // Убираем красную рамку, если поле заполнено
            }
        });
    });
}


// Проверяет соблюдение правил по лимитам на значение модификатора характеристики

function checkLimit (char, char_bon) {
    if (calculateAbilityBonus(char + char_bon) > max_value) {
        char = 2*max_value-char_bon+10
        return calculateAbilityBonus(char+char_bon)
    } else if (calculateAbilityBonus(char + char_bon) < min_value) {
        char = 2*min_value-char_bon+10
        return calculateAbilityBonus(char+char_bon)
    } else {
         return calculateAbilityBonus(char + char_bon)
    }
}


//Отображает посчитанные значения модификаторов
function displayAbilities () {
    document.getElementById("cha").innerText = `${checkLimit(cha,cha_bon)}`;
    document.getElementById("con").innerText = `${checkLimit(con,con_bon)}`;
    document.getElementById("dex").innerText = `${checkLimit(dex,dex_bon)}`;
    document.getElementById("int").innerText = `${checkLimit(int,int_bon)}`;
    document.getElementById("str").innerText = `${checkLimit(str,str_bon)}`;
    document.getElementById("wis").innerText = `${checkLimit(wis,wis_bon)}`;
    document.getElementById("limit").textContent = `${limit}`

}

//Считает значение модификатора
function calculateAbilityBonus (value) {
    return (Math.floor((value-10)/2))
}

// Обновляет значения спасбросков
function updateSavingThrows() {
    document.getElementById(`str-saving-throw`).textContent = `Спасбросок ${document.getElementById("str").innerText}`
    document.getElementById(`dex-saving-throw`).textContent = `Спасбросок ${document.getElementById("dex").innerText}`
    document.getElementById(`con-saving-throw`).textContent = `Спасбросок ${document.getElementById("con").innerText}`
    document.getElementById(`int-saving-throw`).textContent = `Спасбросок ${document.getElementById("int").innerText}`
    document.getElementById(`cha-saving-throw`).textContent = `Спасбросок ${document.getElementById("cha").innerText}`
    document.getElementById(`wis-saving-throw`).textContent = `Спасбросок ${document.getElementById("wis").innerText}`

    if (saving_throws == null) {
        // Do nothing

    } else {
        saving_throws.forEach((throwItem) => {
            const abilityValue = document.getElementById(throwItem.index);
            const savingThrowDiv = document.getElementById(`${throwItem.index}-saving-throw`);
            console.log(savingThrowDiv)
            console.log(abilityValue)
            
            if (abilityValue && savingThrowDiv) {
                const abValue = parseInt(abilityValue.textContent, 10);
                let savingThrowValue = abValue + prof_bon;

                if (savingThrowValue > 0) {
                    savingThrowValue = `+${savingThrowValue}`;
                } else if (savingThrowValue === 0) {
                    savingThrowValue = `0`;
                } 
                // Update the saving throw div with the calculated value
                savingThrowDiv.textContent = `Спасбросок ${savingThrowValue}`;
            }
        });
    }

}



function updateHealth () {
    let con_mod = Number(document.getElementById("con").innerText)
    console.log(con_mod)
    health = hit_die+con_mod+(lvl-1)*(hit_die+con_mod)
    document.getElementById("hits").innerText=health
}



function updateProficiencies (fix_prof, opt_prof){
    //
}




function updateTraits(traits) {
    const traitsDiv = document.getElementById("traits");
    traitsDiv.innerHTML = ''; // Очищаем содержимое div

    traits.forEach(trait => {
        if (trait.index === "draconic-ancestry") {
            // Создаем заголовок "Наследие драконов"
            const traitTitle = document.createElement("h4");
            traitTitle.textContent = "Наследие драконов";

            // Создаем селектор для выбора типа дракона
            const dragonSelect = document.createElement("select");
            dragonSelect.id = "dragon-select";

            // Заполняем селектор опциями
            for (let key in dragon_list) {
                const option = document.createElement("option");
                option.value = key;
                option.textContent = dragon_list[key].name;
                dragonSelect.appendChild(option);
            }

            // Добавляем заголовок и селектор в div
            traitsDiv.appendChild(traitTitle);
            traitsDiv.appendChild(dragonSelect);

            // Добавляем блок для отображения текста
            const descriptionP = document.createElement("p");
            traitsDiv.appendChild(descriptionP);

            // Обновление описания в зависимости от выбора
            function updateDragonDescription() {
                const selectedDragon = dragonSelect.value;
                const dragon = dragon_list[selectedDragon];
                
                const prof_bon = 2; // Здесь укажи или вычисли бонус мастерства
                const conBonus = document.getElementById("con").innerText; // Получаем значение Конс

                descriptionP.innerHTML = `
                    <p>Ваш предок - ${dragon.name} дракон</p>
                    <h4>Оружие дыхания</h4>
                    <p>Вы можете действием выдохнуть разрушительную энергию и нанести 2к6 урона ${dragon.element} в виде ${dragon.type}.<br>Соперник должен преуспеть в спасброске ${dragon.saving_throw} со сложностью ${8 + prof_bon + Number(conBonus)}  
                    </p>
                    <h4>Сопротивление урону</h4>
                    <p>Наследие драконов дарует вам сопротивление урону ${dragon.element} </p>`;
            }

            // Вызываем обновление текста при загрузке и изменении выбора
            dragonSelect.addEventListener("change", updateDragonDescription);
            updateDragonDescription(); // Первичное обновление
        } else {
            // Ищем черту в trait_list по полю "index"
            const foundTrait = trait_list.find(t => t.id === trait.index);

            if (foundTrait) {
                const traitTitle = document.createElement("h4");
                traitTitle.textContent = foundTrait.trait_name;

                const traitDescription = document.createElement("p");
                traitDescription.textContent = foundTrait.trait_description;

                traitsDiv.appendChild(traitTitle);
                traitsDiv.appendChild(traitDescription);
            }
        }
    });
}




//Функция, которая сохраняет полученные через API бонусы в соответствующие переменные
function applyBonuses (a_b) {
    if (a_b === null) {
        console.log("No bonuses")
        //do nothing
    } else {
        console.log("Bonuses log:")
        const pairs = a_b.map(item => ({
            index: item.ability_score.index,
            bonus: item.bonus
          }));
        console.log(pairs);
          // Проходим по массиву pairs
        cha_bon = dex_bon = con_bon = str_bon = int_bon = wis_bon = 0;
        pairs.forEach(pair => {
            switch (pair.index) {
            case 'cha':
                cha_bon = pair.bonus;
                console.log(cha)
                break;
            case 'con':
                con_bon = pair.bonus;
                console.log(con)
                break;
            case 'dex':
                dex_bon = pair.bonus;
                console.log(dex)
                break;
            case 'int':
                int_bon = pair.bonus;
                console.log(int)
                break;
            case 'str':
                str_bon = pair.bonus;
                console.log(str)
                break;
            case 'wis':
                wis_bon = pair.bonus;
                console.log(wis)
                break;
            default:
                console.log(`Unknown ability index: ${pair.index}`);
                break;
            }

        });

        
    }

}


//Функция, которая изменяет значения при нажатии кнопок
document.querySelectorAll('.add, .substract').forEach(button => {
    button.addEventListener('click', function() {
        // Find the closest ability container
        const abilityDiv = button.closest('.ability');
        
        // Get the ability value element and its id (e.g., "cha")
        const abilityValueElement = abilityDiv.querySelector('.ab-value');
        const abilityId = abilityValueElement.id;

        // Determine if it's an "add" or "substract" button click
        const isAdd = button.classList.contains('add');
        const changeValue = isAdd ? 2 : -2;

        // Update the ability values based on their ids
        switch (abilityId) {
            case 'cha':
                cha += changeValue;
                break;
            case 'con':
                con += changeValue;
                break;
            case 'dex':
                dex += changeValue;
                break;
            case 'int':
                int += changeValue;
                break;
            case 'str':
                str += changeValue;
                break;
            case 'wis':
                wis += changeValue;
                break;
        }

        // Update the global limit
        limit -= changeValue / 2;

        // Call function to update the interface and check rules
        updateData();  // Update the displayed values
         // Check rules after each click to apply the correct state
    });
});

// Функция, которая проверяет лимиты значений и дизейблит кнопки
function checkRules() {
    // Loop through all "add" buttons
    for (let i = 0; i < addButtons.length; i++) {
        const abilityDiv = addButtons[i].closest('.ability');
        const abilityValueElement = abilityDiv.querySelector('.ab-value');
        const currentValue = +abilityValueElement.innerText;

        if (limit <= 0 || currentValue >= max_value) {
            addButtons[i].disabled = true;
        } else {
            addButtons[i].disabled = false;
        }
    }

    // Loop through all "substract" buttons
    for (let i = 0; i < substractButtons.length; i++) {
        const abilityDiv = substractButtons[i].closest('.ability');
        const abilityValueElement = abilityDiv.querySelector('.ab-value');
        const currentValue = +abilityValueElement.innerText;

        // Disable "substract" button if the value is already at the min (-5)
        if (currentValue <= min_value) {
            substractButtons[i].disabled = true;
        } else {
            substractButtons[i].disabled = false;
        }
    }
}

// Функция, которая запрашивает информацию о выбраной расе через API
raceSelector.addEventListener("change", parseRace);

async function parseRace(event) {
    const promise = await fetch(raceURL+event.target.value);
    const processedResponse = await promise.json();
    ability_bonuses = processedResponse.ability_bonuses;
    starting_proficiencies = processedResponse.starting_proficiencies;
    starting_proficiency_options = processedResponse.starting_proficiency_options;
    traits = processedResponse.traits;
    console.log(traits)
    console.log(starting_proficiencies)
    console.log(starting_proficiency_options)
    applyBonuses (ability_bonuses)
    updateTraits (traits)
    updateData()
  }


  // Функция, которая запрашивает информацию о выбранном классе через API
classSelector.addEventListener("change", parseClass);

async function parseClass(event) {
    saving_throws = null;
    const promise = await fetch(classURL+event.target.value);
    const processedResponse = await promise.json();
    proficiencies = processedResponse.proficiencies;
    proficiency_choices = processedResponse.proficiency_choices;
    starting_equipment = processedResponse.starting_equipment
    starting_equipment_options = processedResponse.starting_equipment_options;
    saving_throws = processedResponse.saving_throws;
    hit_die = processedResponse.hit_die

    console.log(proficiencies)
    console.log(proficiency_choices)
    console.log(starting_equipment)
    console.log(starting_equipment_options)
    console.log(saving_throws)
    console.log(hit_die)
    const savingThrows = document.getElementsByClassName("saving-throw");
    for (let i = 0; i < savingThrows.length; i++) {
        savingThrows[i].textContent = "";
    }
    updateData()
  }

