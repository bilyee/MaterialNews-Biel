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

    btnBands.addEventListener("click", () => {
        bandsList.innerHTML = "<li class='collection-item'>Loading...</li>";

        // Llamada a la API oficial SpaceFlight News
        fetch("https://api.spaceflightnewsapi.net/v4/articles/")
            .then(response => response.json())
            .then(data => {
                bandsList.innerHTML = "";

                // La API devuelve results[]
                data.results.forEach(article => {
                    const li = document.createElement("li");
                    li.classList.add("collection-item");

                    li.innerHTML = `
                        <strong>${article.title}</strong><br>
                        <em>${article.news_site}</em><br>
                        <small>${new Date(article.published_at).toLocaleDateString()}</small><br><br>
                    `;

                    bandsList.appendChild(li);
                });
            })
            .catch(err => {
                bandsList.innerHTML = `
                    <li class='collection-item red-text'>
                        Error loading data: ${err}
                    </li>`;
            });
    });
});