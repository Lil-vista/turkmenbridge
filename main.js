const LANGS = ["tk", "en", "ru", "zh"];

const TRANSLATIONS = {
    "tk": {
        "labelSearch": "Ýük nomeri boýunça gözleg:",
        "btnSearch": "Gözle",
        "resultTitle": "Ýük maglumatlary",
        "noResult": "Ýük tapylmady.",
        "infoTitle": "Saýtyň mümkinçilikleri",
        "info1": "Ýükleriň nira bardygyny gözläň.",
        "info2": "Türkmen, Iňlis, Rus, Hytaý dillerinde elýeterli.",
        "info3": "Telefon hem-de kompýuter üçin amatly.",
        "status": {
            "accepted": "Kabul edildi",
            "sent": "Ugradyldy",
            "onway": "Ýolda",
            "arrived": "Bardy"
        },
        "kg": "Kg",
        "type": "Görnüşi",
        "sender": "Iberiji",
        "destination": "Barjak ýurdy",
        "photo": "Ýük suraty",
        "fee": "Ýol puly (manat)",
        "history": "Status taryhy"
    },
    "en": {
        "labelSearch": "Search by tracking number:",
        "btnSearch": "Search",
        "resultTitle": "Cargo Information",
        "noResult": "Cargo not found.",
        "infoTitle": "Site features",
        "info1": "Check where your cargos are.",
        "info2": "Available in Turkmen, English, Russian, Chinese.",
        "info3": "Works on phone and computer.",
        "status": {
            "accepted": "Accepted",
            "sent": "Sent",
            "onway": "In transit",
            "arrived": "Arrived"
        },
        "kg": "Kg",
        "type": "Type",
        "sender": "Sender",
        "destination": "Destination",
        "photo": "Cargo photo",
        "fee": "Fee (manat)",
        "history": "Status history"
    },
    "ru": {
        "labelSearch": "Поиск по номеру груза:",
        "btnSearch": "Искать",
        "resultTitle": "Информация о грузе",
        "noResult": "Груз не найден.",
        "infoTitle": "Возможности сайта",
        "info1": "Узнайте, где ваш груз.",
        "info2": "Доступно на туркменском, английском, русском, китайском.",
        "info3": "Удобно для телефона и компьютера.",
        "status": {
            "accepted": "Принято",
            "sent": "Отправлено",
            "onway": "В пути",
            "arrived": "Доставлено"
        },
        "kg": "Кг",
        "type": "Тип",
        "sender": "Отправитель",
        "destination": "Пункт назначения",
        "photo": "Фото груза",
        "fee": "Стоимость (манат)",
        "history": "История статусов"
    },
    "zh": {
        "labelSearch": "按运单号查询：",
        "btnSearch": "查询",
        "resultTitle": "货物信息",
        "noResult": "未找到货物。",
        "infoTitle": "网站功能",
        "info1": "查询您的货物到哪里了。",
        "info2": "支持土库曼语、英语、俄语和中文。",
        "info3": "适用于手机和电脑。",
        "status": {
            "accepted": "已接收",
            "sent": "已发出",
            "onway": "运输中",
            "arrived": "已送达"
        },
        "kg": "公斤",
        "type": "类型",
        "sender": "发货地",
        "destination": "目的地",
        "photo": "货物照片",
        "fee": "运费（马纳特）",
        "history": "状态历史"
    }
};

let currentLang = "tk";
let cargoData = [];

function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    // Switch button active style
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === getLangName(lang));
    });
    // Update texts
    const el = id => document.getElementById(id);
    if (el("label-search")) el("label-search").textContent = TRANSLATIONS[lang].labelSearch;
    if (el("btn-search")) el("btn-search").textContent = TRANSLATIONS[lang].btnSearch;
    if (el("result-title")) el("result-title").textContent = TRANSLATIONS[lang].resultTitle;
    if (el("info-title")) el("info-title").textContent = TRANSLATIONS[lang].infoTitle;
    if (el("info-point-1")) el("info-point-1").textContent = TRANSLATIONS[lang].info1;
    if (el("info-point-2")) el("info-point-2").textContent = TRANSLATIONS[lang].info2;
    if (el("info-point-3")) el("info-point-3").textContent = TRANSLATIONS[lang].info3;
    if (el("track-id")) el("track-id").placeholder = TRANSLATIONS[lang].labelSearch;
    // About, services, contact
    if (el("about-title")) el("about-title").textContent = langSwitchAboutTitle(lang);
    if (el("about-text")) el("about-text").textContent = langSwitchAboutText(lang);
    if (el("about-points")) setAboutPoints(lang);
    if (el("services-title")) el("services-title").textContent = langSwitchServicesTitle(lang);
    if (el("services-list")) setServicesList(lang);
    if (el("contact-title")) el("contact-title").textContent = langSwitchContactTitle(lang);
    if (el("contact-phone")) el("contact-phone").textContent = langSwitchContactPhone(lang);
    if (el("contact-email")) el("contact-email").textContent = langSwitchContactEmail(lang);
    if (el("contact-address")) el("contact-address").textContent = langSwitchContactAddress(lang);
    // If result is shown, update it
    if (el("result-section") && !el("result-section").classList.contains("hidden")) {
        showCargoInfo(lastSearchedId);
    }
}

function getLangName(lang) {
    switch(lang) {
        case "tk": return "Türkmen";
        case "en": return "English";
        case "ru": return "Русский";
        case "zh": return "中文";
        default: return "";
    }
}

// About section translations
function langSwitchAboutTitle(lang) {
    switch(lang) {
        case "tk": return "Cargomyz barada";
        case "en": return "About our company";
        case "ru": return "О нашей компании";
        case "zh": return "关于我们";
    }
}
function langSwitchAboutText(lang) {
    switch(lang) {
        case "tk": return "TurkmenBridge — häzirki zaman ýük daşama, gaplama, we müşderi hyzmatlaryny hödürleýän kompaniýadyr. Müşderilerimiz üçin ygtybarly, çalt we amatly hyzmat bermek biziň baş maksadymyz. Ýükleriňizi dünýäniň islendik ýerine howpsuz we gözegçilikde eltip bereris!";
        case "en": return "TurkmenBridge is a modern cargo transport, packaging, and customer service company. Our main goal is to provide reliable, fast, and convenient service for our customers. We deliver your cargo to any destination in the world safely and with full control!";
        case "ru": return "TurkmenBridge — современная компания по перевозке грузов, упаковке и обслуживанию клиентов. Наша главная цель — предоставлять надежные, быстрые и удобные услуги. Мы доставим ваш груз в любую точку мира безопасно и под контролем!";
        case "zh": return "TurkmenBridge 是一家现代化的货物运输、包装和客户服务公司。我们的主要目标是为客户提供可靠、快速、便捷的服务。我们将您的货物安全地运送到世界任何地方，全程可控！";
    }
}
function setAboutPoints(lang) {
    const el = document.getElementById("about-points");
    if (!el) return;
    let points = [];
    switch(lang) {
        case "tk":
            points = [
                "Ýükleriňizi doly ygtybarly gaplaýarys we gorag enjamy bilen üpjün edýäris.",
                "Her bir ýüküň ýagdaýyny onlaýn yzarlap bilersiňiz.",
                "Müşderilerimiz üçin köp dilli hyzmat."
            ]; break;
        case "en":
            points = [
                "We securely package your cargo and provide protection equipment.",
                "Track the status of each cargo online.",
                "Multilingual service for our customers."
            ]; break;
        case "ru":
            points = [
                "Мы надежно упаковываем ваши грузы и обеспечиваем средствами защиты.",
                "Вы можете отслеживать статус каждого груза онлайн.",
                "Многоязычный сервис для наших клиентов."
            ]; break;
        case "zh":
            points = [
                "我们为您的货物提供安全包装和防护设备。",
                "每一票货物都可在线追踪状态。",
                "为客户提供多语言服务。"
            ]; break;
    }
    el.innerHTML = points.map(pt => `<li>${pt}</li>`).join("");
}

// Services section translations
function langSwitchServicesTitle(lang) {
    switch(lang) {
        case "tk": return "Hyzmatlarymyz";
        case "en": return "Our Services";
        case "ru": return "Наши услуги";
        case "zh": return "我们的服务";
    }
}
function setServicesList(lang) {
    const el = document.getElementById("services-list");
    if (!el) return;
    let points = [];
    switch(lang) {
        case "tk":
            points = [
                "Ýük kabul etmek we gaplamak",
                "Ýükleri halkara we içerki ugurlara daşamak",
                "Ýüküň ýagdaýyny onlaýn yzarlamak",
                "Ýük üçin gorag (suratlandyrmak we ýörite gaplama)"
            ]; break;
        case "en":
            points = [
                "Cargo acceptance and packaging",
                "Transporting cargo internationally and domestically",
                "Online cargo tracking",
                "Cargo protection (photographing and special packaging)"
            ]; break;
        case "ru":
            points = [
                "Прием и упаковка грузов",
                "Доставка грузов по международным и внутренним направлениям",
                "Онлайн отслеживание грузов",
                "Защита груза (фотографирование и специальная упаковка)"
            ]; break;
        case "zh":
            points = [
                "货物接收与包装",
                "国际与国内货物运输",
                "在线货物跟踪",
                "货物防护（拍照及特殊包装）"
            ]; break;
    }
    el.innerHTML = points.map(pt => `<li>${pt}</li>`).join("");
}

// Contact section translations
function langSwitchContactTitle(lang) {
    switch(lang) {
        case "tk": return "Kontakt maglumatlary";
        case "en": return "Contact Information";
        case "ru": return "Контактная информация";
        case "zh": return "联系方式";
    }
}
function langSwitchContactPhone(lang) {
    switch(lang) {
        case "tk": return "Telefon: +993 XX XX-XX-XX";
        case "en": return "Phone: +993 XX XX-XX-XX";
        case "ru": return "Телефон: +993 XX XX-XX-XX";
        case "zh": return "电话：+993 XX XX-XX-XX";
    }
}
function langSwitchContactEmail(lang) {
    switch(lang) {
        case "tk": return "Email: info@turkmenbridge.com";
        case "en": return "Email: info@turkmenbridge.com";
        case "ru": return "Эл. почта: info@turkmenbridge.com";
        case "zh": return "邮箱：info@turkmenbridge.com";
    }
}
function langSwitchContactAddress(lang) {
    switch(lang) {
        case "tk": return "Salgysy: Aşgabat şäheri, Türkmenistan";
        case "en": return "Address: Ashgabat, Turkmenistan";
        case "ru": return "Адрес: г. Ашхабад, Туркменистан";
        case "zh": return "地址：土库曼斯坦，阿什哈巴德";
    }
}

let lastSearchedId = "";

function showCargoInfo(trackId) {
    const resultSection = document.getElementById("result-section");
    const cargoInfoDiv = document.getElementById("cargo-info");
    const cargo = cargoData.find(c => c.id.toLowerCase() === trackId.toLowerCase());
    if (!cargo) {
        cargoInfoDiv.innerHTML = `<p>${TRANSLATIONS[currentLang].noResult}</p>`;
        resultSection.classList.remove("hidden");
        return;
    }
    // Status wording
    const statusStr = TRANSLATIONS[currentLang].status[cargo.status] || cargo.status;
    // Type wording
    const typeStr = cargo.type && cargo.type[currentLang] ? cargo.type[currentLang] : "";
    // History
    const historyHtml = cargo.status_history ? `<ul>${cargo.status_history.map(h => `<li>${TRANSLATIONS[currentLang].status[h.status] || h.status} - ${h.datetime}</li>`).join("")}</ul>` : "";
    cargoInfoDiv.innerHTML = `
        <p><strong>ID:</strong> ${cargo.id}</p>
        <p><strong>${TRANSLATIONS[currentLang].status[cargo.status] ? TRANSLATIONS[currentLang].resultTitle : ""}:</strong> ${statusStr}</p>
        <p><strong>${TRANSLATIONS[currentLang].sender}:</strong> ${cargo.sender}</p>
        <p><strong>${TRANSLATIONS[currentLang].destination}:</strong> ${cargo.destination}</p>
        <p><strong>${TRANSLATIONS[currentLang].kg}:</strong> ${cargo.kg}</p>
        <p><strong>${TRANSLATIONS[currentLang].type}:</strong> ${typeStr}</p>
        <p><strong>${TRANSLATIONS[currentLang].fee}:</strong> ${cargo.fee}</p>
        <p><strong>${TRANSLATIONS[currentLang].photo}:</strong><br> <img src="${cargo.photo}" style="max-width:180px; border:1px solid #ccc; border-radius:5px;"></p>
        <p><strong>${TRANSLATIONS[currentLang].history}:</strong> ${historyHtml}</p>
        <p><strong>${(currentLang === "tk") ? "Soňky täzelik" : (currentLang === "en") ? "Last update" : (currentLang === "ru") ? "Последнее обновление" : "最后更新"}:</strong> ${cargo.last_update}</p>
    `;
    resultSection.classList.remove("hidden");
}

window.onload = function() {
    if (document.getElementById("btn-search")) {
        fetch("data.json")
            .then(res => res.json())
            .then(data => {
                cargoData = data;
            });
        setLang(currentLang);
        document.getElementById("btn-search").onclick = function() {
            const trackId = document.getElementById("track-id").value.trim();
            if (!trackId) return;
            lastSearchedId = trackId;
            showCargoInfo(trackId);
        };
        document.getElementById("track-id").addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                document.getElementById("btn-search").click();
            }
        });
    } else {
        setLang(currentLang); // For index.html only
    }
};