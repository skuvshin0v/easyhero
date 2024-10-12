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
let traits = null // Готово
let hit_die = 8 // Готово


//Параметры, полученные от класса

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
let prof_bon = 2

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
        trait_description: "Вы совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы"
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
    },

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



const weapons_list = [
    { id: "light1", name: "Боевой посох", base_char: "dex", hit_die: "1d6", description: "При атаке двумя руками: 1d8 вместо 1d6" },
    { id: "light2", name: "Булава", base_char: "str", hit_die: "1d6", description: "" },
    { id: "light3", name: "Дубинка", base_char: "str", hit_die: "1d4", description: "Можно сражаться двумя оружиями" },
    { id: "light4", name: "Кинжал", base_char: "dex", hit_die: "1d4", description: "Можно сражаться двумя оружиями, метательное" },
    { id: "light5", name: "Копьё", base_char: "str", hit_die: "1d6", description: "Метательное, при атаке двумя руками: 1d8 вместо 1d6" },
    { id: "light6", name: "Лёгкий молот", base_char: "str", hit_die: "1d4", description: "Можно сражаться двумя оружиями, метательное" },
    { id: "light7", name: "Метательное копьё", base_char: "dex", hit_die: "1d6", description: "Метательное" },
    { id: "light8", name: "Палица", base_char: "str", hit_die: "1d8", description: "Необходимо держать двумя руками" },
    { id: "light9", name: "Ручной топор", base_char: "str", hit_die: "1d6", description: "Можно сражаться двумя оружиями, метательное" },
    { id: "light10", name: "Серп", base_char: "dex", hit_die: "1d4", description: "Можно сражаться двумя оружиями" },
    { id: "light11", name: "Лёгкий арбалет", base_char: "dex", hit_die: "1d8", description: "Необходимо держать двумя руками" },
    { id: "light12", name: "Дротик", base_char: "dex", hit_die: "1d4", description: "Метательное" },
    { id: "light13", name: "Короткий лук", base_char: "dex", hit_die: "1d6", description: "Необходимо держать двумя руками" },
    { id: "light14", name: "Праща", base_char: "dex", hit_die: "1d4", description: "" },
    { id: "battle1", name: "Алебарда", base_char: "str", hit_die: "1d10", description: "Необходимо держать двумя руками" },
    { id: "battle2", name: "Боевая кирка", base_char: "str", hit_die: "1d8", description: "" },
    { id: "battle3", name: "Боевой молот", base_char: "str", hit_die: "1d8", description: "При атаке двумя руками: 1d10 вместо 1d8" },
    { id: "battle4", name: "Боевой топор", base_char: "str", hit_die: "1d8", description: "При атаке двумя руками: 1d10 вместо 1d8" },
    { id: "battle5", name: "Глефа", base_char: "str", hit_die: "1d10", description: "Необходимо держать двумя руками" },
    { id: "battle6", name: "Двуручный меч", base_char: "str", hit_die: "2d6", description: "Необходимо держать двумя руками" },
    { id: "battle7", name: "Длинное копьё", base_char: "str", hit_die: "1d12", description: "Досягаемость, особое" },
    { id: "battle8", name: "Длинный меч", base_char: "str", hit_die: "1d8", description: "При атаке двумя руками: 1d10 вместо 1d8" },
    { id: "battle9", name: "Кнут", base_char: "dex", hit_die: "1d4", description: "Досягаемость, фехтовальное" },
    { id: "battle10", name: "Короткий меч", base_char: "dex", hit_die: "1d6", description: "Можно сражаться двумя оружиями, фехтовальное" },
    { id: "battle11", name: "Молот", base_char: "str", hit_die: "2d6", description: "Необходимо держать двумя руками, тяжёлое" },
    { id: "battle12", name: "Моргенштерн", base_char: "str", hit_die: "1d8", description: "" },
    { id: "battle13", name: "Пика", base_char: "str", hit_die: "1d10", description: "Необходимо держать двумя руками" },
    { id: "battle14", name: "Рапира", base_char: "str", hit_die: "1d8", description: "Фехтовальное" },
    { id: "battle15", name: "Секира", base_char: "str", hit_die: "1d12", description: "Необходимо держать двумя руками" },
    { id: "battle16", name: "Скимитар", base_char: "str", hit_die: "1d6", description: "Можно сражаться двумя оружиями, фехтовальное" },
    { id: "battle17", name: "Трезубец", base_char: "str", hit_die: "1d6", description: "Метательное, при атаке двумя руками: 1d8 вместо 1d6" },
    { id: "battle18", name: "Цеп", base_char: "dex", hit_die: "1d8", description: "" },
    { id: "battle19", name: "Ручной арбалет", base_char: "dex", hit_die: "1d6", description: "Можно сражаться двумя оружиями" },
    { id: "battle20", name: "Тяжёлый арбалет", base_char: "dex", hit_die: "1d10", description: "Необходимо держать двумя руками" },
    { id: "battle21", name: "Длинный лук", base_char: "dex", hit_die: "1d8", description: "Необходимо держать двумя руками" },
    { id: "shield", name: "Щит", base_char: "str", hit_die: "1d4", description: "При использовании щита во время боя прибавьте +2 к Броне" },

];

const armor_list = [
    { id: "light1", name: "Стёганый доспех", arm_bonus: "dex", arm_value: 11 },
    { id: "light2", name: "Кожаный доспех", arm_bonus: "dex", arm_value: 11 },
    { id: "light3", name: "Проклёпанный кожаный доспех", arm_bonus: "dex", arm_value: 12 },
    { id: "middle1", name: "Шкурный доспех", arm_bonus: "dex", arm_value: 12 },
    { id: "middle2", name: "Кольчужная рубаха", arm_bonus: "dex", arm_value: 13 },
    { id: "middle3", name: "Чешуйчатый доспех", arm_bonus: "dex", arm_value: 14 },
    { id: "middle4", name: "Кираса", arm_bonus: "dex", arm_value: 14 },
    { id: "middle5", name: "Полулаты", arm_bonus: "dex", arm_value: 15 },
    { id: "heavy1", name: "Колечный доспех", arm_bonus: null, arm_value: 14 },
    { id: "heavy2", name: "Кольчуга", arm_bonus: null, arm_value: 16 },
    { id: "heavy3", name: "Наборный доспех", arm_bonus: null, arm_value: 17 },
    { id: "heavy4", name: "Латы", arm_bonus: null, arm_value: 18 },
    { id: "no-armor-barbarian", name: "Без доспехов", arm_bonus: ["dex", "con"], arm_value: 10 },
    { id: "no-armor-monk", name: "Без доспехов", arm_bonus: ["dex", "wis"], arm_value: 10 },
    { id: "no-armor", name: "Без доспехов", arm_bonus: "dex", arm_value: 10 }
];

const specials = [
    {
        id: "rage",
        name: `Ярость (3 раза)`,
        description: "Ярость длится 1 минуту (10 ходов).Вы получаете +2 к урону, а весь урон оружием по вам делится пополам. Вы совершаете с преимуществом атаки и проверки по Силе"
    },
    {
        id: "barb-no-armor",
        name: "Защита без доспехов",
        description: `Если вы не носите доспехов, ваша Броня равна 10 + Ловкость + Выносливость`
    },
    {
        id: "sense-of-danger",
        name: "Чувство опасности",
        description: "Вы совершаете с преимуществом спасброски Ловкости от эффектов, которые вы можете видеть, такие как заклинания и ловушки."
    },
    {
        id: "bard-inspiration",
        name: "Вдохновление барда",
        description: "Своими словами или музыкой вы можете вдохновить одно существо. Оно получает кость бардовского вдохновения — к6. Можете использовать в сутки количество раз равное Харизме."
    },
    {
        id: "bard-master",
        name: "Мастер на все руки",
        description: "Прибавьте +1 к проверкам тех навыков, которыми вы не владеете"
    },
    {
        id: "bard-song",
        name: "Песнь отдыха",
        description: "Вы с помощью успокаивающей музыки или речей можете помочь своим раненым союзникам восстановить 1к6 хитов во время короткого отдыха."
    },
    {
        id: "druid-lang",
        name: "Друидический язык",
        description: "Вы знаете Друидический язык — тайный язык друидов. Вы можете на нём говорить и оставлять тайные послания."
    },
    {
        id: "druid-change",
        name: "Дикий облик",
        description: "Действием вы можете 2 раза в сутки магическим образом принять облик любого зверя, которого вы видели."
    },
    {
        id: "druid-sputnik",
        name: "Дикий спутник",
        description: "Вы получаете способность призывать духа, который принимает форму животного."
    },
    {
        id: "warrior-second-breath",
        name: "Второе дыхание",
        description: "Раз в сутки в свой ход вы можете бонусным действием восстановить 1к10 + 2 хитов"
    },
    {
        id: "warrior-actions",
        name: "Всплекск действий",
        description: "Раз в сутки вы можете совершить одно дополнительное действие помимо обычного и бонусного действий."
    },
    {
        id: "monk-no-armor",
        name: "Защита без доспехов",
        description: `Если вы не носите доспехов, ваша Броня равна 10 + Ловкость + Мудрость`
    },
    {
        id: "duel",
        name: "Дуэлянт",
        description: "Пока вы держите рукопашное оружие в одной руке и не используете другого оружия, вы получаете бонус +2 к броскам урона этим оружием."
    },
    {
        id: "competence",
        name: "Компетентность",
        description: "Прибавьте +2 к проверкам при использовании воровских инструментов"
    },
    {
        id: "stealth-attack",
        name: "Скрытая атака",
        description: "Добавьте +1d6 урона, если атакуете из скрытности, застали цель врасплох или имеете преимущество на атаку"
    },
    {
        id: "bazar",
        name: "Воровской жаргон",
        description: "Вы понимаете тайный язык воров и можете скрывать сообщения в обычных разговорах. Также распознаёте специальные символы, указывающие на опасности, территории воров и укрытия."
    },
    {
        id: "rogue-action",
        name: "Хитрое действие",
        description: "Вы можете в каждом своем ходу боя совершать бонусное действие для Рывка, Отхода или Засады"
    },
    {
        id: "magic-recovery",
        name: "Магическое восстановление",
        description: "После отдыха ты восстанавливаешь все заряды"
    },
    {
        id: "portent",
        name: "Волшебное знамение",
        description: "Сделайте два броска d20 и запишите их результаты. В течение дня вы можете заменить любой бросок на один из этих результатов"
    },
    {
        id: "divine-sense",
        name: "Божественное чувство",
        description: "Вы можете действием обнаружить местоположение Исчадий, Небожителей и Нежити в радиусе 60 футов, если они не находятся под полным укрытием. Также можно почувствовать освящённые или осквернённые места и предметы. Умение можно использовать 1 + Харизма раз в сутки"
    },
    {
        id: "lay-on-hands",
        name: "Наложение рук",
        description: "У вас есть запас исцеляющей силы равный 10 хитов. Действием вы можете восстановить хиты существу, коснувшись его, или потратить 5 хитов для излечения одной болезни или яда. Запас восстанавливается после отдыха"
    },
    {
        id: "divine-smite",
        name: "Божественная кара",
        description: "Когда вы попадаете по существу рукопашной атакой, вы можете потратить 1 заряд заклинаний, чтобы нанести дополнительный урон излучением 2к8. Нежить и Исчадия получают дополнительно +1к8"
    },
    {
        id: "awakened-mind",
        name: "Взор двух умов",
        description: "Вы можете действием коснуться гуманоида и воспринимать окружающий мир его чувствами до конца своего следующего хода. Вы получаете все его особые чувства, но становитесь слепым и глухим к своему окружению на время действия"
    },
    {
        id: "disguise-warlock",
        name: "Маска многих лиц",
        description: "Вы создаёте иллюзию, изменяющую ваш внешний вид. Вы можете выглядеть выше, ниже, толще или худее, но не изменить количество конечностей. Иллюзия не выдерживает физического контакта — те, кто дотронутся, заметят несоответствия"
    },
    {
        id: "holy-channel1",
        name: "Божественный канал: Изгнание Нежити (Раз в сутки)",
        description: "Действием вы используете священный символ и молитву для изгнания Нежити в пределах 30 футов. Нежить должна пройти спасбросок Мудрости, иначе будет изгнана на 1 минуту или до получения урона. Изгнанная Нежить тратит ходы на отступление и не может подойти к вам на 30 футов, а также не может совершать реакции"
    },
    {
        id: "holy-channel2",
        name: "Божественный канал: Направленный удар (Раз в сутки)",
        description: "Когда вы совершаете бросок атаки, вы можете использовать «Божественный канал», чтобы получить бонус +10 к этому броску, гарантируя удар с невероятной точностью."
    },
    {
        id: "war-domain",
        name: "Домен войны",
        description: "Вы получаете владение воинским оружием и тяжёлыми доспехами"
    },
    {
        id: "war-priest",
        name: "Боевой священник",
        description: "Когда вы используете действие Атака, вы можете совершить одну дополнительную атаку оружием бонусным действием. Вы можете использовать эту способность количество раз равное вашей Мудрости"
    },
    {
        id: "favored-enemy",
        name: "Избранный враг",
        description: "Выбирете тип врага (например, драконы или нежить) или две гуманоидные расы. Вы получаете преимущество на проверки Мудрости (Выживание) для отслеживания этих врагов и Интеллекта для вспоминания о них информации. Также изучаете язык вашего избранного врага, если он существует"
    },
    {
        id: "natural-explorer",
        name: "Исследователь природы",
        description: "В дикой местности ваша группа не замедляется, не может заблудиться, и вы можете перемещаться скрытно в нормальном темпе. При выслеживании получаете информацию о количестве, размере и давности следов существ"
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
];

const charms = [
    {
        id: "mage-hand",
        name: "Волшебная рука",
        description: "В пределах 30 футов от вас появляется призрачная рука (копия вашей). Она может передвигать предметы, открывать незаперте двери, наливать жидкости, дотрагиваться до существ,но не может совершать атаки"
    },
    {
        id: "blade-ward",
        name: "Защита от оружия",
        description: "До конца следующего хода вы получаете сопротивление к дробящему, колющему и рубящему урону от оружия."
    },
    {
        id: "minor-illusion",
        name: "Малая иллюзия",
        description: "Вы создаёте иллюзию звука или предмета в пределах 30 футов на 1 минуту. Звук может быть от шепота до крика, а предмет должен помещаться в куб 5 футов. Иллюзия исчезает, если её исследовать или использовать заклинание повторно."
    },
    {
        id: "sword-burst",
        name: "Вспышка мечей",
        description: "Вы создаёте призрачные лезвия, которые вращаются вокруг вас в радиусе 5 футов. Все существа в пределах этого радиуса должны пройти спасбросок Ловкости, иначе получают 1к6 урона силовым полем"
    },
    {
        id: "mind-sliver",
        name: "Расщепление разума",
        description: "Вы посылаете луч психической энергии в существо в пределах 60 футов. Цель должна пройти спасбросок Интеллекта, иначе она получает 1к6 урона психической энергией и вычитает 1к4 из следующего спасброска до конца вашего следующего хода"
    },
    {
        id: "toll-the-dead",
        name: "Погребальный звон",
        description: "Вы указываете на существо в пределах 60 футов, и оно должно пройти спасбросок Мудрости. При провале цель получает 1к8 некротического урона. Если у существа не полные хиты, оно получает 1к12 урона вместо 1к8"
    },
    {
        id: "guidance",
        name: "Указание",
        description: "Вы касаетесь существа, и оно может один раз в течение следующей минуты добавить 1к4 к одной проверке характеристики на свой выбор"
    },
    {
        id: "word-of-radiance",
        name: "Слово сияния",
        description: "Вы произносите священное слово, излучая обжигающее сияние. Все существа по вашему выбору в пределах 5 футов должны пройти спасбросок Телосложения, иначе получат 1к6 урона излучением"
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
];

const spells = [
    {
        id: "magic-missile",
        name: "Волшебная стрела (1 заряд)",
        description: "Вы создаёте три светящихся дротика, которые автоматически поражают выбранные вами цели в пределах дистанции. Каждый дротик наносит 1к4 + 1 урона силовым полем. Все дротики атакуют одновременно, и вы можете направить их в одну или несколько целей"
    },
    {
        id: "disguise",
        name: "Маскировка (1 заряд)",
        description: "Вы создаёте иллюзию, изменяющую ваш внешний вид на 1 час. Вы можете выглядеть выше, ниже, толще или худее, но не изменить количество конечностей. Иллюзия не выдерживает физического контакта — те, кто дотронутся, заметят несоответствия"
    },
    {
        id: "unseen-servant",
        name: "Невидимый слуга (1 заряд)",
        description: "Вы создаёте невидимую силу, которая выполняет простые команды, такие как подношение предметов, уборка или разжигание костра. Слуга действует 1 час, имеет 1 хит и не может атаковать. Вы можете управлять им на расстоянии до 60 футов, давая команды как бонусное действие. Если слуга выходит за пределы этой дистанции или его хиты падают до 0, заклинание заканчивается"
    },
    {
        id: "detect-magic",
        name: "Обнаружение магии (1 заряд)",
        description: "В течение 10 минут вы чувствуете присутствие магии в пределах 30 футов. Вы можете увидеть ауру вокруг магических объектов или существ и определить школу магии"
    },
    {
        id: "absorb-elements",
        name: "Поглощение стихий (1 заряд)",
        description: "Когда вы получаете урон от звука, кислоты, огня, холода или электричества, вы можете поглотить часть энергии, получив сопротивление к этому урону до начала вашего следующего хода. В свою следующую рукопашную атаку вы добавляете 1к6 урона этого же типа, после чего заклинание заканчивается"
    },
    {
        id: "sleep",
        name: "Усыпление (1 заряд)",
        description: "Вы погружаете существ в пределах 20 футов от выбранной точки в магический сон. Бросьте 5к8, чтобы определить общее количество хитов, которые могут быть затронуты. Заклинание действует на существ с наименьшим количеством текущих хитов, пока не исчерпается сумма. Спящие существа просыпаются при получении урона или если их разбудят. Нежить и существа, устойчивые к очарованию, не поддаются заклинанию"
    },
    {
        id: "bless",
        name: "Благословение (1 заряд)",
        description: "Вы благословляете до трёх существ в пределах 30 футов. До окончания заклинания каждое благословлённое существо добавляет к4 к броскам атаки и спасброскам. Длительность — до 1 минуты при концентрации"
    },
    {
        id: "shield-of-faith",
        name: "Щит веры (1 заряд)",
        description: "Вы создаёте мерцающее поле вокруг существа в пределах 60 футов. Оно получает бонус +2 к КД на время действия заклинания, которое длится до 10 минут"
    },
    {
        id: "searing-smite",
        name: "Палящая кара (1 заряд)",
        description: "При следующем попадании рукопашной атакой ваше оружие вспыхивает светом, нанося дополнительно 1к6 огненного урона и поджигая цель. В начале каждого своего хода цель делает спасбросок Телосложения. При провале она получает 1к6 огненного урона. Заклинание заканчивается при успешном спасброске, тушении пламени или воздействии, которое гасит огонь"
    },
    {
        id: "dissonant-whispers",
        name: "Диссонирующий шёпот (1 заряд)",
        description: "Вы напеваете нестройную мелодию, слышимую только выбранным существом в пределах 60 футов. Цель должна пройти спасбросок Мудрости, иначе она получает 3к6 психического урона и немедленно реакцией отступает от вас как можно дальше. При успешном спасброске цель получает половину урона и не двигается. Глухие существа автоматически преуспевают в спасброске"
    },
    {
        id: "armor-of-agathys",
        name: "Доспех Агатиса (1 заряд)",
        description: "Вы окружены магической изморозью, которая даёт вам 5 временных хитов на 1 час. Пока у вас есть эти хиты, любое существо, которое поразит вас рукопашной атакой, получает 5 урона холодом"
    },
    {
        id: "cure-wounds",
        name: "Лечение ран (1 заряд)",
        description:"Вы касаетесь существа, восстанавливая ему хиты в размере 1к8 + ваша Мудрость"
    },
    {
        id: "guiding-bolt",
        name: "Направляющий снаряд (1 заряд)",
        description: "Вы выпускаете вспышку света в существо в пределах 120 футов, совершая по нему дальнобойную атаку заклинанием. При попадании цель получает 4к6 урона излучением, и до конца вашего следующего хода следующий бросок атаки по этой цели совершается с преимуществем благодаря тусклому свету, который остаётся на цели"
    },
    {
        id: "bane",
        name: "Порча (1 заряд)",
        description: "До трёх существ в пределах 30 футов должны пройти спасбросок Харизмы. Если они проваливают его, то в течение 1 минуты (при концентрации) вычитают 1к4 из бросков атаки и спасбросков"
    },
    {
        id: "hunters-mark",
        name: "Метка охотника (1 заряд)",
        description: "Вы выбираете существо, и каждый раз при попадании по нему наносите дополнительно 1к6 урона. Также получаете преимущество на проверки Мудрости (Внимание и Выживание) для его поиска"
    },
    {
        id: "goodberry",
        name: "Чудо-ягоды (1 заряд)",
        description: "Вы создаёте 1к10 ягод, каждая из которых восстанавливает 1 хит и насыщает на весь день. Ягоды теряют силу через 24 часа."
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },

]


const inventory = [
    {
        id: "traveller-pack",
        name: "Набор путешественника",
        description: "Рюкзак, спальник, столовый набор, трутница, 10 факелов, рационы на 10 дней и бурдюк. В набор также входит 50-футовая пеньковая верёвка"
    },
    {
        id: "artist-pack",
        name: "Набор артиста",
        description: "Рюкзак, спальник, 2 костюма, 5 свечек, рационы на 5 дней, бурдюк и набор для грима"
    },
    {
        id: "lute",
        name: "Лютня",
        description: "Музыкальный инструмент. При выступлении с ней, прибавьте 2 к проверке Исполнения"
    },
    {
        id: "burglars-pack",
        name: "Набор взломщика",
        description: "Рюкзак, сумка с 1 000 металлических шариков, 10 футов лески, колокольчик, 5 свечек, ломик, молоток, 10 шлямбуров, закрытый фонарь, 2 фляги масла, рационы на 5 дней, трутница и бурдюк. В набор также входит 50-футовая пеньковая верёвка"
    },
    {
        id: "thief-tools",
        name: "Воровские инструменты",
        description: "Небольшой напильник, набор отмычек, небольшое зеркальце на длинной ручке, ножницы, пара щипчиков"
    },
    {
        id: "scholars-pack",
        name: "Набор ученого",
        description: "Рюкзак, научная книга, бутылочкуа чернил, писчее перо, 10 листов пергамента, небольшая сумочка с песком, небольшой нож."
    },
    {
        id: "spellbook",
        name: "Книга заклинаний",
        description: "Книга, в которой записаны все известные вам заклинания. Вы можете изучать новые заклинания и записывать их в эту книгу."
    },
    {
        id: "component-pouch",
        name: "Мешочек с компонентами",
        description: "Маленький водонепроницаемый кожаный поясной кошель с отделениями для хранения материальных компонентов и других особых предметов, нужных для накладывания заклинаний"
    },
    {
        id: "priests-pack",
        name: "Набор священника",
        description: "Рюкзак одеяло, 10 свечек, трутница, коробка для пожертвований, 2 упаковки благовоний, кадило, облачение, рационы на 2 дня и бурдюк"
    },
    {
        id: "holy-sign",
        name: "Священный символ",
        description: "Символ с вашим божеством в любой форме"
    },
    {
        id: "dungeon-pack",
        name: "Набор исследователя подземелий",
        description: "Рюкзак, ломик, молоток, 10 шлямбуров, 10 факелов, трутница, рационы на 10 дней и бурдюк.В набор также входит 50-футовая пеньковая верёвка"
    },
    {
        id: "druidic-focus",
        name: "Фокусировка друида",
        description: "Заклинательной фокусировкой друида может быть веточка омелы или падуба, жезл или скипетр из тиса или другого особого дерева, посох, выращенный целиком из живого дерева, или тотем, включающий перья, мех, кости и зубы священных животных. "
    },
    {
        id: "",
        name: "",
        description: ""
    },
    {
        id: "",
        name: "",
        description: ""
    },
]


const class_properties = {
    //ready
    barbarian: {
        name: "Варвар",
        specials: ["rage","barb-no-armor","sense-of-danger"],
        weapons: [
            "battle15","battle3","light4","light1", "shield","light2", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14", "battle1", "battle2", "battle4", "battle5", 
            "battle6", "battle7", "battle8", "battle9", "battle10", "battle11", "battle12", "battle13", "battle14", 
             "battle16", "battle17", "battle18", "battle19", "battle20", "battle21"
        ],
        armor: ["no-armor-barbarian","light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5",],
        skills: ["skill-athletics","skill-survival"],
        charms: [],
        spells: [],
        inventory: ["traveller-pack"]
    },
    bard: {
        name: "Бард",
        specials: ["bard-inspiration","bard-master","bard-song"],
        weapons: ["battle14","battle10","battle19","battle8","light4","light1", "light2", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14",],
        armor: ["light2","no-armor","light1", "light3"],
        skills: [],
        charms: [],
        spells: [],
        inventory: ["artist-pack","lute"]
    },
    //ready
    cleric: {
        name: "Жрец",
        specials: ["holy-channel1","holy-channel2","war-priest","war-domain"],
        weapons: ["light1","light10","shield","light4", "light2", "light3", "light5", "light6", "light7", "light8", "light9", 
            "light11", "light12", "light13", "light14","battle1", "battle2", "battle4", "battle5", 
            "battle6", "battle7", "battle8", "battle9", "battle10", "battle11", "battle12", "battle13", "battle14", 
             "battle16", "battle17", "battle18", "battle19", "battle20", "battle21"],
        armor: ["light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5","no-armor","heavy1","heavy2","heavy3","heavy4",],
        skills: ["skill-religion","skill-medicine",],
        charms: ["toll-the-dead","guidance","word-of-radiance"],
        spells: ["cure-wounds","guiding-bolt","bane","detect-magic"],
        inventory: ["priests-pack","holy-sign"]
    },
    druid: {
        name: "Друид",
        specials: ["druid-lang","druid-change","druid-sputnik"],
        weapons: ["light1","battle16","light14","light2","shield","light3","light4","light5","light7","light10",],
        armor: ["light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5","no-armor"],
        skills: [],
        charms: [],
        spells: [],
        inventory: ["traveller-pack","druidic-focus"]
    },
    //ready
    fighter: {
        name: "Воин",
        specials: ["warrior-second-breath","warrior-actions","duel"],
        weapons: ["battle8","battle20","shield","light2", "battle15","battle3","light4","light1", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14", "battle1", "battle2", "battle4", "battle5", 
            "battle6", "battle7",  "battle9", "battle10", "battle11", "battle12", "battle13", "battle14", 
             "battle16", "battle17", "battle18", "battle19", "battle21"],
        armor: ["heavy2","no-armor","light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5",
                "heavy1","heavy3","heavy4",],
        skills: ["skill-athletics","skill-perception"],
        charms: [],
        spells: [],
        inventory: ["traveller-pack"]
    },
    monk: {
        name: "Монах",
        specials: [],
        weapons: ["light1","battle10","light4","light2", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14"],
        armor: ["no-armor-monk"],
        skills: [],
        charms: [],
        spells: [],
        inventory: ["dungeon-pack"]
    },
    //ready
    paladin: {
        name: "Паладин",
        specials: ["divine-sense","divine-smite","lay-on-hands","duel"],
        weapons: ["battle8","battle20","shield","light2", "battle15","battle3","light4","light1", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14", "battle1", "battle2", "battle4", "battle5", 
            "battle6", "battle7",  "battle9", "battle10", "battle11", "battle12", "battle13", "battle14", 
             "battle16", "battle17", "battle18", "battle19", "battle21"],
        armor: ["heavy2","no-armor","light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5",
                "heavy1","heavy3","heavy4",],
        skills: ["skill-religion","skill-medicine"],
        charms: [],
        spells: ["bless","shield-of-faith","searing-smite"],
        inventory: ["priests-pack","holy-sign"]
    },
    //ready
    ranger: {
        name: "Следопыт",
        specials: ["favored-enemy","natural-explorer","duel"],
        weapons: ["battle21", "battle10","light4","shield","battle8","battle20","light2", "battle15","battle3","light1", "light3", "light5", "light6", "light7", "light8", "light9", "light10", 
            "light11", "light12", "light13", "light14", "battle1", "battle2", "battle4", "battle5", 
            "battle6", "battle7",  "battle9", "battle11", "battle12", "battle13", "battle14", 
             "battle16", "battle17", "battle18", "battle19"],
        armor: ["light1", "light2", "light3", 
                "middle1", "middle2", "middle3", "middle4", "middle5","no-armor"],
        skills: ["skill-nature","skill-investigation","skill-stealth"],
        charms: [],
        spells: ["hunters-mark","goodberry"],
        inventory: ["dungeon-pack",]
    },
    //ready
    rogue: {
        name: "Плут",
        specials: ["competence","stealth-attack","bazar","rogue-action"],
        weapons: ["battle20","battle10","battle14","light1","battle8", "light2", "light3", "light4", "light5", "light6", "light7", "light8", "light9", "light10", 
    "light11", "light12", "light13", "light14",],
        armor: ["light2","no-armor","light1","light3",],
        skills: ["skill-stealth","skill-sleight-of-hand","skill-deception","skill-perception"],
        charms: [],
        spells: [],
        inventory: ["burglars-pack","thief-tools"]
    },
    sorcerer: {
        name: "Чародей",
        specials: [],
        weapons: ["light1","light12","light4","light11","light14",],
        armor: ["no-armor"],
        skills: [],
        charms: [],
        spells: [],
        inventory: ["dungeon-pack","component-pouch"]
    },
    //ready 
    warlock: {
        name: "Колдун",
        specials: ["awakened-mind","disguise-warlock"],
        weapons: ["light1", "light2", "light3", "light4", "light5", "light6", "light7", "light8", "light9", "light10", 
    "light11", "light12", "light13", "light14"],
        armor: ["light2","no-armor","light1","light3",],
        skills: ["skill-religion","skill-arcana"],
        charms: ["sword-burst","mind-sliver"],
        spells: ["dissonant-whispers","armor-of-agathys"],
        inventory: ["scholars-pack","component-pouch"]
    },
    //ready    
    wizard: {
        name: "Волшебник",
        specials: ["magic-recovery","portent"],
        weapons: ["light1","light12","light4","light11","light14",],
        armor: ["no-armor"],
        skills: [],
        charms: ["mage-hand","blade-ward","minor-illusion"],
        spells: ["magic-missile","sleep","unseen-servant","absorb-elements","disguise","detect-magic"],
        inventory: ["scholars-pack","spellbook","component-pouch"]
    }
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
    updateArmorSelector(document.getElementById("class").value)
    updatePDF()
}




// let trait_list = [

//                 "dwarven-combat-training",
//                 "tool-proficiency",
//                  "skill-versatility"




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
    document.getElementById("initiative-value").innerText = document.getElementById("dex").innerText;

    document.getElementById("str-saving-throw-page").innerText = document.getElementById("str-saving-throw").innerText;
    document.getElementById("dex-saving-throw-page").innerText = document.getElementById("dex-saving-throw").innerText;
    document.getElementById("con-saving-throw-page").innerText = document.getElementById("con-saving-throw").innerText;
    document.getElementById("int-saving-throw-page").innerText = document.getElementById("int-saving-throw").innerText;
    document.getElementById("wis-saving-throw-page").innerText = document.getElementById("wis-saving-throw").innerText;
    document.getElementById("cha-saving-throw-page").innerText = document.getElementById("cha-saving-throw").innerText;

    // Перенос содержимого div для специальных способностей
    const specialsSource = document.getElementById("specials");
    const specialsPage = document.getElementById("specials-page");
    specialsPage.innerHTML = specialsSource.innerHTML; // Копируем содержимое

    // Перенос содержимого div для черт расы
    const traitsSource = document.getElementById("traits");
    const traitsPage = document.getElementById("traits-page");
    traitsPage.innerHTML = traitsSource.innerHTML; // Копируем содержимое

    // Перенос содержимого div для заклинаний
    const spellsSource = document.getElementById("spells");
    const spellsPage = document.getElementById("spells-page");
    spellsPage.innerHTML = spellsSource.innerHTML; // Копируем содержимое

    // Перенос содержимого div для заговоров
    const charmsSource = document.getElementById("charms");
    const charmsPage = document.getElementById("charms-page");
    charmsPage.innerHTML = charmsSource.innerHTML; // Копируем содержимое

    // Перенос содержимого div для описания оружия
    const weaponsSource = document.getElementById("weapons-descriptions");
    const weaponsPage = document.getElementById("weapons-page");
    weaponsPage.innerHTML = weaponsSource.innerHTML; // Копируем содержимое

    // Перенос содержимого div для инвентаря
    const inventorySource = document.querySelector(".inventory-container");
    const inventoryPage = document.getElementById("inventory-page");
    inventoryPage.innerHTML = inventorySource.innerHTML; // Копируем содержимое

    // Перенос выбранного значения из селектора брони
    const armorSelect = document.querySelector("select.armor-select");
    const armorPage = document.getElementById("armor-page");
    armorPage.innerHTML = ""; // Очищаем контент div перед вставкой

    if (armorSelect) {
        const selectedArmor = armorSelect.options[armorSelect.selectedIndex].text; // Получаем текст выбранной опции
        const armorHeader = document.createElement("h4");
        armorHeader.textContent = selectedArmor;
        armorPage.appendChild(armorHeader); // Добавляем выбранную броню как заголовок
    }

    const storyText = document.getElementById("char-story").value;

    // Находим div, в который нужно вставить текст
    const descriptionDiv = document.getElementById("description-on-page");

    // Вставляем текст в div
    descriptionDiv.innerText = storyText;
    
    updateSkillValues(classSelector.value)


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
        alert("Пожалуйста, выберите расу, класс и придумайте имя персонажа!"); // Предупреждение пользователю
        return; // Прекращаем выполнение функции
    }

    // Если все поля заполнены, продолжаем генерацию PDF
    updatePDF();

    function updateImageWithFallback() {
        const input = document.getElementById('char-img');
        const img = document.getElementById('image-on-page');
    
        // Проверяем, был ли загружен файл
        if (input.files && input.files[0]) {
            const reader = new FileReader();
    
            // После загрузки файла, меняем src изображения
            reader.onload = function(e) {
                img.src = e.target.result; // Устанавливаем src как данные загруженного изображения
            }
    
            // Читаем изображение как Data URL (base64)
            reader.readAsDataURL(input.files[0]);
        } else {
            // Если файл не был загружен, использовать изображение по умолчанию
            img.src = `img/characters/default-character.jpg`; // Путь к изображению по умолчанию
            // на будущее img.src = `img/characters/${document.getElementById("race").options[document.getElementById("race").selectedIndex].text}-${document.getElementById("class").options[document.getElementById("class").selectedIndex].text}.jpg`; 

        }
    }

    updateImageWithFallback()
    const pdfContent = document.getElementById('pdf-content');

    // Временно отображаем элемент для генерации PDF
    pdfContent.style.display = "block";

    // Убедимся, что контент загружен и подготовлен перед генерацией PDF
    setTimeout(() => {
        // Настройка кастомного размера страницы в PDF
        const options = {
            margin: 0,
            filename: `${document.getElementById("char-name-page").innerText}.pdf`,
            image: { type: 'jpeg', quality: 0.9 }, // Уменьшаем качество изображения
            html2canvas: { scale: 1 }, // Уменьшаем масштаб для меньшего разрешения
            jsPDF: {
                unit: 'px',
                format: [1750, 1240],
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
    document.getElementById("limit").textContent = `${limit}`;

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


function updateWeaponChoices(selectedClass) {
    // Получаем контейнеры для выбора оружия и описания
    const weaponsChoiceDiv = document.querySelector('.weapons-choice');
    const weaponsDescriptionsDiv = document.querySelector('.weapons-descriptions');

    // Очищаем контейнеры перед добавлением нового контента

    // Если класс не выбран, ничего не делаем
    if (!selectedClass || !class_properties[selectedClass]) return;
    weaponsChoiceDiv.innerHTML = '';
    weaponsDescriptionsDiv.innerHTML = '';

    // Получаем список оружий для выбранного класса
    const classWeapons = class_properties[selectedClass].weapons;
    if (classWeapons.length < 3) return; // Проверяем, что оружия достаточно

    // Функция для создания опций селектора
    function createWeaponOption(weaponId) {
        const weapon = weapons_list.find(w => w.id === weaponId);
        const option = document.createElement('option');
        option.value = weapon.id;
        option.textContent = weapon.name;
        return option;
    }

    // Создаем селектор для основного оружия (select1)
    const select1 = document.createElement('select');
    select1.classList.add('weapon-select')
    classWeapons.forEach((weaponId, index) => {
        const option = createWeaponOption(weaponId);
        if (index === 0) option.selected = true; // По умолчанию первая опция
        select1.appendChild(option);
    });
    weaponsChoiceDiv.appendChild(document.createTextNode("Основное оружие: "));
    weaponsChoiceDiv.appendChild(select1);

    // Создаем селектор для дополнительного оружия (select2)
    const select2 = document.createElement('select');
    select2.classList.add('weapon-select')
    classWeapons.forEach((weaponId, index) => {
        const option = createWeaponOption(weaponId);
        if (index === 1) option.selected = true; // По умолчанию вторая опция
        select2.appendChild(option);
    });
    weaponsChoiceDiv.appendChild(document.createTextNode("Дополнительное оружие: "));
    weaponsChoiceDiv.appendChild(select2);

    // Создаем селектор для дополнительного оружия (select3)
    const select3 = document.createElement('select');
    select3.classList.add('weapon-select')
    classWeapons.forEach((weaponId, index) => {
        const option = createWeaponOption(weaponId);
        if (index === 2) option.selected = true; // По умолчанию третья опция
        select3.appendChild(option);
    });
    weaponsChoiceDiv.appendChild(select3);

    // Функция для обновления описания оружия
    function updateWeaponDescription() {
        weaponsDescriptionsDiv.innerHTML = ''; // Очищаем описание
        [select1, select2, select3].forEach(select => {
            const selectedWeaponId = select.value;
            const weapon = weapons_list.find(w => w.id === selectedWeaponId);

            if (weapon) {
                // Создаем h4 для названия оружия
                const weaponTitle = document.createElement('h4');
                weaponTitle.textContent = weapon.name;
                weaponsDescriptionsDiv.appendChild(weaponTitle);

                // Рассчитываем бонус к атаке и урон
                let baseCharValue = document.getElementById(weapon.base_char).innerText;
                let attackBonus = prof_bon + Number(baseCharValue);
                if (attackBonus>=0) {
                    attackBonus = `+${attackBonus}`
                }

                if (baseCharValue >=0) {
                    baseCharValue = `+${Number(baseCharValue)}`
                }

                
                let damage = `${weapon.hit_die} ${baseCharValue}`;



                // Создаем div для бонуса атаки и урона
                const attackBonusDiv = document.createElement('div');
                attackBonusDiv.classList.add('attack-bonus');
                attackBonusDiv.textContent = `Атака ${attackBonus}, урон ${damage}`;
                weaponsDescriptionsDiv.appendChild(attackBonusDiv);

                // Если есть описание, добавляем p
                if (weapon.description) {
                    const descriptionP = document.createElement('p');
                    descriptionP.classList.add('weapon-desc');
                    descriptionP.textContent = weapon.description;
                    weaponsDescriptionsDiv.appendChild(descriptionP);
                }
            }
        });
    }

    // Добавляем обработчики для изменения описания при смене выбора
    select1.addEventListener('change', updateWeaponDescription);
    select2.addEventListener('change', updateWeaponDescription);
    select3.addEventListener('change', updateWeaponDescription);
    document.querySelectorAll('.add, .substract').forEach(button => {
        button.addEventListener('click', updateWeaponDescription)})


    // Обновляем описание для начальных значений
    updateWeaponDescription();
}

function updateClassSpecials(selectedClass) {
    // Получаем div, куда будем добавлять специальные способности
    const specialsDiv = document.getElementById('specials');
    
    // Очищаем содержимое div перед добавлением новых данных
    specialsDiv.innerHTML = '';

    // Проверяем, выбран ли класс и существует ли он в class_properties
    if (!selectedClass || !class_properties[selectedClass]) return;

    // Получаем список id специальных умений для выбранного класса
    const classSpecials = class_properties[selectedClass].specials;

    // Перебираем специальные умения, соответствующие выбранному классу
    classSpecials.forEach(specialId => {
        // Находим специальное умение по его id
        const special = specials.find(s => s.id === specialId);

        // Если специальное умение найдено, добавляем его в div
        if (special) {
            // Создаем элемент h4 для названия специального умения
            const specialTitle = document.createElement('h4');
            specialTitle.textContent = special.name;
            specialsDiv.appendChild(specialTitle);

            // Создаем элемент p для описания специального умения
            const specialDescription = document.createElement('p');
            specialDescription.textContent = special.description;
            specialsDiv.appendChild(specialDescription);
        }
    });
}


function updateClassCharms(selectedClass) {
    // Получаем div, куда будем добавлять заговоры
    const charmsDiv = document.getElementById('charms');
    
    // Очищаем содержимое div перед добавлением новых данных
    charmsDiv.innerHTML = '';

    // Проверяем, выбран ли класс и существует ли он в class_properties
    if (!selectedClass || !class_properties[selectedClass]) return;

    // Получаем список id заговоров для выбранного класса
    const classCharms = class_properties[selectedClass].charms;

    // Перебираем заговоры, соответствующие выбранному классу
    classCharms.forEach(charmId => {
        // Находим заговор по его id
        const charm = charms.find(c => c.id === charmId);

        // Если заговор найден, добавляем его в div
        if (charm) {
            // Создаем элемент h4 для названия заговора
            const charmTitle = document.createElement('h4');
            charmTitle.textContent = charm.name;
            charmsDiv.appendChild(charmTitle);

            // Создаем элемент p для описания заговора
            const charmDescription = document.createElement('p');
            charmDescription.textContent = charm.description;
            charmsDiv.appendChild(charmDescription);
        }
    });
}


function updateClassSpells(selectedClass) {
    // Получаем div, куда будем добавлять заклинания
    const spellsDiv = document.getElementById('spells');
    


    // Проверяем, выбран ли класс и существует ли он в class_properties
    if (!selectedClass || !class_properties[selectedClass]) return;

    // Получаем список id заклинаний для выбранного класса
    const classSpells = class_properties[selectedClass].spells;

    if (classSpells.length >0) {
            // Очищаем содержимое div перед добавлением новых данных
        spellsDiv.innerHTML = '';
    } else {
        spellsDiv.innerHTML = 'У выбранного класса нет заклинаний';

    }

    // Перебираем заклинания, соответствующие выбранному классу
    classSpells.forEach(spellId => {
        // Находим заклинание по его id
        const spell = spells.find(s => s.id === spellId);

        // Если заклинание найдено, добавляем его в div
        if (spell) {
            // Создаем элемент h4 для названия заклинания
            const spellTitle = document.createElement('h4');
            spellTitle.textContent = spell.name;
            spellsDiv.appendChild(spellTitle);

            // Создаем элемент p для описания заклинания
            const spellDescription = document.createElement('p');
            spellDescription.textContent = spell.description;
            spellsDiv.appendChild(spellDescription);
        }
    });
}

function updateClassInventory(selectedClass) {
    // Получаем div, куда будем добавлять предметы инвентаря
    const inventoryDiv = document.querySelector('.inventory-container');
    
    // Очищаем содержимое div перед добавлением новых данных
    inventoryDiv.innerHTML = '';

    // Проверяем, выбран ли класс и существует ли он в class_properties
    if (!selectedClass || !class_properties[selectedClass]) return;

    // Получаем список id предметов инвентаря для выбранного класса
    const classInventory = class_properties[selectedClass].inventory;

    // Перебираем предметы инвентаря, соответствующие выбранному классу
    classInventory.forEach(itemId => {
        // Находим предмет по его id
        const item = inventory.find(i => i.id === itemId);

        // Если предмет найден, добавляем его в div
        if (item) {
            // Создаем элемент h4 для названия предмета
            const itemTitle = document.createElement('h4');
            itemTitle.textContent = item.name;
            inventoryDiv.appendChild(itemTitle);

            // Создаем элемент p для описания предмета
            if (item.description) {
                const itemDescription = document.createElement('p');
                itemDescription.textContent = item.description;
                inventoryDiv.appendChild(itemDescription);
            }
        }
    });
}


function updateArmorSelector(selectedClass) {
    // Получаем div, куда будем добавлять селектор брони
    const armorDiv = document.querySelector('.armor-container');

    // Сохраняем текущее выбранное значение брони, если оно есть
    const previousSelectedArmor = document.querySelector('.armor-select')?.value;

    // Очищаем содержимое div перед добавлением новых данных
    armorDiv.innerHTML = '';

    // Проверяем, выбран ли класс и существует ли он в class_properties
    if (!selectedClass || !class_properties[selectedClass]) {
        const zag = document.createElement("p");
        zag.innerText = "Здесь появится доступная выбранному классу броня";
        armorDiv.appendChild(zag);
        return;
    }

    // Получаем список id брони для выбранного класса
    const classArmor = class_properties[selectedClass].armor;

    // Если у класса нет доступной брони, ничего не делаем
    if (classArmor.length === 0) return;

    // Создаем элемент select для выбора брони
    const armorSelect = document.createElement('select');
    armorSelect.classList.add('armor-select');

    let isPreviousArmorAvailable = false; // Флаг, указывающий на то, доступно ли предыдущее значение

    // Заполняем select опциями брони
    classArmor.forEach((armorId, index) => {
        const armorItem = armor_list.find(a => a.id === armorId);
        if (armorItem) {
            const option = document.createElement('option');
            option.value = armorItem.id;
            option.textContent = armorItem.name;

            // Проверяем, если текущее значение совпадает с предыдущим выбором
            if (previousSelectedArmor && previousSelectedArmor === armorItem.id) {
                option.selected = true;
                isPreviousArmorAvailable = true; // Предыдущее значение доступно в списке
            }

            // Если это первая опция и нет предыдущего выбора, выбираем её
            if (index === 0 && !previousSelectedArmor) {
                option.selected = true;
            }

            armorSelect.appendChild(option);
        }
    });

    // Если предыдущий выбор недоступен, выбираем первую опцию по умолчанию
    if (!isPreviousArmorAvailable && armorSelect.options.length > 0) {
        armorSelect.options[0].selected = true;
    }

    // Добавляем select в div
    armorDiv.appendChild(armorSelect);

    // Функция для обновления значения брони
    function updateArmorValue() {
        const selectedArmorId = armorSelect.value;
        const selectedArmor = armor_list.find(a => a.id === selectedArmorId);

        // Если броня не найдена, ничего не делаем
        if (!selectedArmor) {
            console.error("Броня не найдена.");
            return;
        }

        let armorValue = selectedArmor.arm_value;

        // Проверяем наличие arm_bonus (может быть строка или массив)
        if (selectedArmor.arm_bonus) {
            if (Array.isArray(selectedArmor.arm_bonus)) {
                // Если бонус - это массив характеристик (например, "dex" и "con" для варвара)
                selectedArmor.arm_bonus.forEach(bonus => {
                    const bonusElement = document.getElementById(bonus);
                    if (bonusElement) {
                        armorValue += Number(bonusElement.innerText);
                    }
                });
            } else {
                // Если бонус - одна характеристика (например, "dex")
                const bonusElement = document.getElementById(selectedArmor.arm_bonus);
                if (bonusElement) {
                    armorValue += Number(bonusElement.innerText);
                }
            }
        }

        // Обновляем значение брони в элементе с id="armor-value"
        document.getElementById("armor-value").innerText = armorValue;
    }

    // Обновляем значение брони при изменении выбора
    armorSelect.addEventListener('change', updateArmorValue);

    // Устанавливаем начальное значение брони
    updateArmorValue();
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

    updateClassSpecials(event.target.value)
    updateClassCharms(event.target.value)
    updateClassSpells(event.target.value)
    updateClassInventory(event.target.value)
    updateWeaponChoices(event.target.value)

    updateData()
  }


  function updateImage() {
    const input = document.getElementById('char-img');
    const img = document.getElementById('image-on-page');

    // Проверяем, выбрано ли изображение
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        // После загрузки файла, меняем src изображения
        reader.onload = function(e) {
            img.src = e.target.result; // Устанавливаем src как данные загруженного изображения
        }

        // Читаем изображение как Data URL (base64)
        reader.readAsDataURL(input.files[0]);
        document.getElementById("img-label").innerText = "Изображение загружено";
        document.getElementById("img-label").style.background = "#515151";
        console.log("Img saved")
    }
}

function updateSkillValues(selectedClass) {
    // Проверяем, выбран ли класс и существует ли он в свойствах
    if (!selectedClass || !class_properties[selectedClass]) return;

    // Получаем список навыков для выбранного класса
    const classSkills = class_properties[selectedClass].skills;

    // Получаем все элементы навыков по id, которые начинаются со 'skill'
    const skillElements = document.querySelectorAll("[id^='skill']");

    // Перебираем все навыки
    skillElements.forEach(skillElement => {
        // Получаем значение ближайшего div с классом element-value-page
        const elementValueDiv = skillElement.closest('.element-container-page').querySelector('.element-value-page');
        let skillValue = parseInt(elementValueDiv.textContent);

        // Проверяем, если id навыка в списке навыков класса
        const skillId = skillElement.id;
        if (classSkills.includes(skillId)) {
            // Добавляем значение глобальной переменной prof_bon
            skillValue += prof_bon;
        }

        if (skillValue>=0) {
            skillValue=`+${skillValue}`
        }

        // Обновляем текст элемента навыка
        skillElement.textContent = `${skillElement.textContent.split(' ')[0]} ${skillValue}`;
    });
}
