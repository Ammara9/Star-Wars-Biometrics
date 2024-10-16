// Define the getApi function to fetch character data
function getApi() {
  const characterName = document.getElementById('character-name').value.trim();

  if (!characterName) {
    document.getElementById('output').value = 'Please enter a character name.';
    return;
  }

  const baseUri = 'https://www.swapi.tech/api/people/?search=';
  const fullUri = `${baseUri}${encodeURIComponent(characterName)}`;

  fetch(fullUri)
    .then(res => res.json())
    .then(data => {
      console.log(data); // Check the structure of the response
      if (data.results && data.results.length > 0) {
        // Filter to find the exact match by name
        const exactMatch = data.results.find(result => result.name.toLowerCase() === characterName.toLowerCase());

        if (exactMatch) {
          // Fetch details of the exact match
          return fetch(exactMatch.url);
        } else {
          throw new Error('Exact character not found.');
        }
      } else {
        throw new Error('Character not found.');
      }
    })
    .then(res => res.json())
    .then(detailData => {
      if (detailData.result && detailData.result.properties) {
        const { height, mass, gender, hair_color } = detailData.result.properties;

        const outputString = `Height: ${height}, Mass: ${mass}, Gender: ${gender}, Hair Color: ${hair_color}`;
        document.getElementById('output').value = outputString;
      } else {
        document.getElementById('output').value = 'Character details not found.';
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('output').value = err.message || 'Error fetching data. Please try again later.';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit-btn').addEventListener('click', getApi);
});
