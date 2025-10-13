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

const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRcJduBMhZgmdA_5j229WofOa5Cs8ZERD1z3F0obyEK4WmAqIMljS6Pfy4EEBHecPbMQrxJENeHvcku/pub?output=csv`;


async function fetchGoogleSheetData() {
    try {
        // Fetch data from Google Sheets API
        const response = await fetch(url);
        const data = await response.text();
        
        // Extract rows from the data
        const rows = data.trim().split('\n').map(r => r.split(','));
        rows.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        
        const aujourdHui = new Date();

        const futurs = rows.filter(item => new Date(item[1]) > aujourdHui);

        const container = document.getElementById('events-table');
        for (let i = 0; i < futurs.length; i++) {
            
        const placeHTML = futurs[i][mapsId]
          ? `<a href="${futurs[i][mapsId]}" target="_blank" rel="noopener noreferrer">${futurs[i][placeId]}</a>`
          : futurs[i][placeId];

                    const eventHTML = `
                        <div class="event">
                            <h2>${futurs[i][iconId]} ${futurs[i][titleId]}</h2>
                            <p><strong>Date :</strong> ${formatDateFr(futurs[i][dateId])}</p>
                            <p><strong>Lieu :</strong> ${placeHTML}</p>
                        </div>
                        `;

                        container.insertAdjacentHTML('beforeend', eventHTML);
                }
            } catch (error) {
                console.error('Error fetching Google Sheets data:', error);
            }
        }

document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);