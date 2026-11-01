const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector("span");
const languageSelect = document.querySelector("#language-select");
let fontScale = 16;

const translations = {
    en: {
        title: "Adriano Santos | Software Engineering",
        "nav.story": "Story", "nav.focus": "Focus", "nav.contact": "Contact",
        "hero.eyebrow": "Software engineering / lifelong learner",
        "hero.title": "Building systems<br><em>with intent.</em>",
        "hero.intro": "I’m Adriano Santos, a developer and IT student interested in the full landscape of software engineering: from reliable backends and thoughtful interfaces to the ideas that make technology useful.",
        "hero.button": "Explore my focus <span aria-hidden=\"true\">↓</span>", "hero.contact": "Say hello <span aria-hidden=\"true\">↗</span>",
        "system.status": "system.status", "system.message": "curious + shipping",
        "story.eyebrow": "01 / the beginning", "story.title": "Curiosity became a craft.",
        "story.first": "My connection with software engineering started around 2004, when MMORPGs made me curious about what happened behind the screen. I began creating local servers so friends and I could play together. That early mix of experimentation, problem-solving, and community still shapes how I learn and build.",
        "story.second": "Since 2019, I’ve been studying IT-related subjects at Brazilian universities, steadily expanding that curiosity into a broader practice: understanding systems, asking better questions, and making useful things work well.",
        "focus.eyebrow": "02 / areas of interest", "focus.title": "The whole<br>engineering picture.",
        "focus.design.title": "Software design", "focus.design.text": "Architecture, APIs, clean code, and the decisions that keep systems understandable.",
        "focus.web.title": "Web experiences", "focus.web.text": "Accessible interfaces that feel clear, responsive, and considered on every device.",
        "focus.systems.title": "Systems & data", "focus.systems.text": "Backend thinking, persistence, infrastructure, and the invisible work behind reliable products.",
        "focus.learning.title": "Continuous learning", "focus.learning.text": "Exploring tools and ideas across IT while turning each lesson into something practical.",
        "contact.eyebrow": "03 / open channel", "contact.title": "Let’s make the<br><em>next thing</em> useful.", "contact.email": "mail@mail.com <span aria-hidden=\"true\">↗</span>"
    },
    "pt-BR": {
        title: "Adriano Santos | Engenharia de Software",
        "nav.story": "História", "nav.focus": "Interesses", "nav.contact": "Contato",
        "hero.eyebrow": "Engenharia de software / aprendizado contínuo",
        "hero.title": "Construindo sistemas<br><em>com propósito.</em>",
        "hero.intro": "Sou Adriano Santos, desenvolvedor e estudante de tecnologia interessado em todo o universo da engenharia de software: de backends confiáveis e interfaces cuidadosas às ideias que tornam a tecnologia útil.",
        "hero.button": "Conheça meus interesses <span aria-hidden=\"true\">↓</span>", "hero.contact": "Entre em contato <span aria-hidden=\"true\">↗</span>",
        "system.status": "status.do.sistema", "system.message": "curioso + construindo",
        "story.eyebrow": "01 / o começo", "story.title": "A curiosidade virou prática.",
        "story.first": "Minha conexão com a engenharia de software começou por volta de 2004, quando os MMORPGs despertaram minha curiosidade sobre o que acontecia por trás da tela. Comecei a criar servidores locais para jogar com meus amigos. Essa mistura inicial de experimentação, resolução de problemas e comunidade ainda orienta a forma como aprendo e construo.",
        "story.second": "Desde 2019, estudo temas relacionados à tecnologia da informação em universidades brasileiras, transformando essa curiosidade em uma prática cada vez mais ampla: entender sistemas, fazer perguntas melhores e criar coisas úteis que funcionem bem.",
        "focus.eyebrow": "02 / áreas de interesse", "focus.title": "Toda a visão da<br>engenharia.",
        "focus.design.title": "Design de software", "focus.design.text": "Arquitetura, APIs, código limpo e decisões que mantêm os sistemas compreensíveis.",
        "focus.web.title": "Experiências web", "focus.web.text": "Interfaces acessíveis, claras, responsivas e cuidadosas em qualquer dispositivo.",
        "focus.systems.title": "Sistemas e dados", "focus.systems.text": "Back-end, persistência, infraestrutura e o trabalho invisível por trás de produtos confiáveis.",
        "focus.learning.title": "Aprendizado contínuo", "focus.learning.text": "Explorar ferramentas e ideias de TI, transformando cada aprendizado em algo prático.",
        "contact.eyebrow": "03 / canal aberto", "contact.title": "Vamos tornar a<br><em>próxima ideia</em> útil.", "contact.email": "mail@mail.com <span aria-hidden=\"true\">↗</span>"
    },
    he: {
        title: "אדריאנו סנטוס | הנדסת תוכנה",
        "nav.story": "הסיפור", "nav.focus": "תחומי עניין", "nav.contact": "יצירת קשר",
        "hero.eyebrow": "הנדסת תוכנה / למידה לאורך החיים",
        "hero.title": "בונה מערכות<br><em>עם כוונה.</em>",
        "hero.intro": "אני אדריאנו סנטוס, מפתח וסטודנט לטכנולוגיית מידע המתעניין בעולם הרחב של הנדסת תוכנה: ממערכות backend אמינות וממשקים מחושבים ועד לרעיונות שהופכים טכנולוגיה לשימושית.",
        "hero.button": "לתחומי העניין שלי <span aria-hidden=\"true\">↓</span>", "hero.contact": "יצירת קשר <span aria-hidden=\"true\">↗</span>",
        "system.status": "מצב.מערכת", "system.message": "סקרן + בונה",
        "story.eyebrow": "01 / ההתחלה", "story.title": "הסקרנות הפכה למלאכה.",
        "story.first": "הקשר שלי להנדסת תוכנה התחיל בסביבות שנת 2004, כאשר משחקי MMORPG עוררו את סקרנותי לגבי מה שקורה מאחורי המסך. התחלתי ליצור שרתים מקומיים כדי לשחק עם חברים. השילוב הזה של ניסוי, פתרון בעיות וקהילה עדיין מעצב את הדרך שבה אני לומד ובונה.",
        "story.second": "מאז 2019 אני לומד נושאים הקשורים לטכנולוגיית מידע באוניברסיטאות בברזיל, ומרחיב בהדרגה את הסקרנות הזו לעשייה רחבה יותר: להבין מערכות, לשאול שאלות טובות יותר ולבנות דברים שימושיים שעובדים היטב.",
        "focus.eyebrow": "02 / תחומי עניין", "focus.title": "התמונה המלאה של<br>הנדסת תוכנה.",
        "focus.design.title": "תכנון תוכנה", "focus.design.text": "ארכיטקטורה, ממשקי API, קוד נקי והחלטות ששומרות על מערכות מובנות.",
        "focus.web.title": "חוויות Web", "focus.web.text": "ממשקים נגישים, ברורים, רספונסיביים ומוקפדים בכל מכשיר.",
        "focus.systems.title": "מערכות ונתונים", "focus.systems.text": "חשיבה על backend, אחסון, תשתיות והעבודה הבלתי נראית שמאחורי מוצרים אמינים.",
        "focus.learning.title": "למידה מתמשכת", "focus.learning.text": "חקר כלים ורעיונות מעולם ה-IT והפיכת כל שיעור למשהו מעשי.",
        "contact.eyebrow": "03 / ערוץ פתוח", "contact.title": "בואו נהפוך את<br><em>הדבר הבא</em> לשימושי.", "contact.email": "mail@mail.com <span aria-hidden=\"true\">↗</span>"
    }
};

function setLanguage(language) {
    const languageData = translations[language] || translations.en;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.title = languageData.title;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.innerHTML = languageData[element.dataset.i18n];
    });
    languageSelect.value = language;
    localStorage.setItem("language", language);
}

function getBrowserLanguage() {
    const browserLanguage = (navigator.language || "en").toLowerCase();

    if (browserLanguage.startsWith("pt")) {
        return "pt-BR";
    }

    if (browserLanguage.startsWith("he") || browserLanguage.startsWith("iw")) {
        return "he";
    }

    return "en";
}

function updateThemeLabel() {
    const isDark = body.classList.contains("dark");
    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    updateThemeLabel();
});

document.querySelector("#font-increase").addEventListener("click", () => {
    fontScale = Math.min(fontScale + 1, 21);
    root.style.setProperty("--body-size", `${fontScale}px`);
});

document.querySelector("#font-decrease").addEventListener("click", () => {
    fontScale = Math.max(fontScale - 1, 14);
    root.style.setProperty("--body-size", `${fontScale}px`);
});

languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
});

if (localStorage.getItem("theme") === "light") {
    body.classList.remove("dark");
}

updateThemeLabel();
setLanguage(localStorage.getItem("language") || getBrowserLanguage());

