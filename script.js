function goToLogin() {
    showScreen("loginScreen");
}

function goToRegister() {
    showScreen("registerScreen");
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

function openScreen(id) {
    showScreen(id);
}

// REGISTRO
document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();

    const user = {
        nombre: regName.value,
        apellido: regLastName.value,
        cedula: regCedula.value,
        telefono: regTelefono.value,
        email: regEmail.value,
        barrio: regBarrio.value,
        universidad: regUniversidad.value,
        password: regPassword.value
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registro exitoso");
    goToLogin();
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No estás registrado");
        return;
    }

    if (
        (loginUser.value === user.cedula ||
            loginUser.value === user.email ||
            loginUser.value === user.telefono) &&
        loginPass.value === user.password
    ) {
        alert("Bienvenido");
        showScreen("homeScreen");
        initMap();
    } else {
        alert("Credenciales incorrectas");
    }
});

// MAPA CARTAGENA
let mapLoaded = false;

function initMap() {
    if (mapLoaded) return;
    mapLoaded = true;

    const map = L.map("map").setView([10.3910, -75.4794], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map);

    L.marker([10.3910, -75.4794])
        .addTo(map)
        .bindPopup("Cartagena")
        .openPopup();
}