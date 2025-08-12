const DEFAULT_ICON = '📅'
const titleId = 0
const dateId = 1
const placeId = 2
const mapsId = 3
const iconId = 4
const descriptionId = 5

function formatDateFr(isoDateStr) {
  const date = new Date(isoDateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Replace with your actual Spreadsheet ID
const spreadsheetId = '1a2jL5hG_QCFqq_t2ex855JSznfC7qFAkkTbSujJuDnY';

// Replace with your API Key
const apiKey = 'AIzaSyBa2tUoN6-TgFe3JxtMenfOlaZJ_lLaJss';

// Construct the URL for Google Sheets API v4
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Events?key=${apiKey}`;


async function fetchGoogleSheetData() {
    try {
        // Fetch data from Google Sheets API
        const response = await fetch(url);
        const data = await response.json();
        
        // Extract rows from the data
        const rows = data.values;
        rows.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        // Get the table body element

        const container = document.getElementById('events-table');
        // Loop through the rows (starting from row 1 to skip headers)
        for (let i = 1; i < rows.length; i++) {
            
const placeHTML = rows[i][mapsId]
  ? `<a href="${rows[i][mapsId]}" target="_blank" rel="noopener noreferrer">${rows[i][placeId]}</a>`
  : rows[i][placeId];

            const eventHTML = `
                <div class="event">
                    <h2>${rows[i][iconId]} ${rows[i][titleId]}</h2>
                    <p><strong>Date :</strong> ${formatDateFr(rows[i][dateId])}</p>
                    <p><strong>Lieu :</strong> ${placeHTML}</p>
                </div>
                `;

                container.insertAdjacentHTML('beforeend', eventHTML);
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
    }
}

// Call the function to fetch and display data
document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);