// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}
 
// init Materialize
M.AutoInit();

document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Tabs.init(document.querySelectorAll('.tabs'));

    const btnBands = document.getElementById("load-bands");
    const bandsList = document.getElementById("band-list");

    // Datos mock (simulan la respuesta de MusicBrainz)
    const mockData = {
        artists: [
            { name: "Queen", disambiguation: "British rock band" },
            { name: "Queen + Adam Lambert", disambiguation: "Live project" },
            { name: "Queen Latifah", disambiguation: "Rapper/singer" },
            { name: "Queenadreena", disambiguation: "Alternative rock band" },
            { name: "Queenadreena Tribute", disambiguation: "Tribute band" },
        ]
    };

    btnBands.addEventListener("click", () => {
        bandsList.innerHTML = "<li class='collection-item'>Loading...</li>";

        setTimeout(() => { // simula la latencia de la API
            bandsList.innerHTML = "";
            mockData.artists.forEach(artist => {
                const li = document.createElement("li");
                li.classList.add("collection-item");
                li.innerHTML = `<strong>${artist.name}</strong> (${artist.disambiguation || 'Unknown'})`;
                bandsList.appendChild(li);
            });
        }, 500);
    });
});