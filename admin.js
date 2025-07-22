// Simple admin functions for demonstration (no real backend)
let adminCargoData = [];
function loadCargoData() {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            adminCargoData = data;
        });
}
function saveCargoData(newCargo) {
    // Local only: replace or add
    const idx = adminCargoData.findIndex(c => c.id.toLowerCase() === newCargo.id.toLowerCase());
    if (idx >= 0) {
        adminCargoData[idx] = newCargo;
    } else {
        adminCargoData.push(newCargo);
    }
    // Show message (no backend, just simulation)
    document.getElementById("admin-message").innerHTML = "<span style='color:green;'>Ýük maglumatlary üstünlikli girizildi/üýtgedildi! (Demo görnüşinde diňe bu sahypada saklanýar)</span>";
}
window.onload = function() {
    loadCargoData();
    document.getElementById("cargo-form").onsubmit = function(e) {
        e.preventDefault();
        const newCargo = {
            id: document.getElementById("admin-id").value.trim(),
            sender: document.getElementById("admin-sender").value.trim(),
            destination: document.getElementById("admin-destination").value.trim(),
            kg: Number(document.getElementById("admin-kg").value),
            type: {
                tk: document.getElementById("admin-type").value.trim(),
                en: document.getElementById("admin-type").value.trim(),
                ru: document.getElementById("admin-type").value.trim(),
                zh: document.getElementById("admin-type").value.trim()
            },
            status: document.getElementById("admin-status").value,
            status_history: [
                {status: document.getElementById("admin-status").value, datetime: new Date().toISOString().slice(0,16).replace("T", " ")}
            ],
            photo: document.getElementById("admin-photo").value.trim(),
            fee: Number(document.getElementById("admin-fee").value),
            last_update: new Date().toISOString().slice(0,16).replace("T", " ")
        };
        saveCargoData(newCargo);
        this.reset();
    }
};