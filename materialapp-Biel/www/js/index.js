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
        bandsList.innerHTML = "<p>Cargando noticias...</p>";

        fetch("https://api.spaceflightnewsapi.net/v4/articles/")
            .then(res => res.json())
            .then(data => {
                bandsList.innerHTML = "";
                const row = document.createElement("div");
                row.classList.add("row");

                data.results.forEach(article => {
                    const col = document.createElement("div");
                    col.className = "col s12 m6 l4";

                    const card = document.createElement("div");
                    card.className = "card hoverable";

                    const cardImage = document.createElement("div");
                    cardImage.className = "card-image";
                    cardImage.innerHTML = `<img src="${article.image_url || 'images/placeholder.jpg'}">`;

                    const cardContent = document.createElement("div");
                    cardContent.className = "card-content";
                    cardContent.innerHTML = `
                        <span class="card-title">${article.title}</span>
                        <p>${new Date(article.published_at).toLocaleDateString()} - ${article.news_site}</p>
                    `;

                    card.appendChild(cardImage);
                    card.appendChild(cardContent);
                    col.appendChild(card);
                    row.appendChild(col);
                });

                bandsList.appendChild(row);
            })
            .catch(err => {
                bandsList.innerHTML = `<p class="red-text">Error cargando noticias: ${err}</p>`;
            });
    });
});