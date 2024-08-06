// script.js
document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('animeSearch').value;
    searchAnime(query);
});

function searchAnime(query) {
    const graphqlQuery = `
        query ($search: String) {
            Media(search: $search, type: ANIME) {
                title {
                    romaji
                    english
                }
                description
                coverImage {
                    large
                }
            }
        }
    `;

    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: { search: query },
        }),
    })
    .then(response => response.json())
    .then(data => displayResults(data.data.Media))
    .catch(error => console.error('Error:', error));
}

function displayResults(anime) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>${anime.title.romaji} (${anime.title.english})</h2>
        <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
        <p>${anime.description}</p>
    `;
}
