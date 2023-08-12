const gameNameInput = document.getElementById("game-name");
const suggestionsDiv = document.getElementById("suggestions");

gameNameInput.addEventListener("input", function() {
  const inputText = gameNameInput.value.toLowerCase();

  fetch("bd.json")
    .then(response => response.json())
    .then(data => {
      const matchingSuggestions = data
        .map(item => item["Название новеллы"])
        .filter(name => name.toLowerCase().includes(inputText));

      displaySuggestions(matchingSuggestions);
    })
    .catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
});

function displaySuggestions(suggestions) {
  suggestionsDiv.innerHTML = "";
  suggestionsDiv.style.display = suggestions.length > 0 ? "block" : "none";

  suggestions.forEach(suggestion => {
    const suggestionDiv = document.createElement("div");
    suggestionDiv.className = "suggestion";
    suggestionDiv.textContent = suggestion;
    suggestionDiv.addEventListener("click", () => {
      gameNameInput.value = suggestion;
      suggestionsDiv.style.display = "none";
    });
    suggestionsDiv.appendChild(suggestionDiv);
  });
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  suggestionsDiv.style.display = "none";
  
  const gameName = gameNameInput.value.toLowerCase();

  fetch("bd.json")
    .then(response => response.json())
    .then(data => {
      const matchingGames = data.filter(item => item["Название новеллы"].toLowerCase().includes(gameName));
      
      if (matchingGames.length > 0) {
        displayMatchingGames(matchingGames);
      } else {
        document.getElementById("result").style.display = "none";
        alert("Игры не найдены");
      }
    })
    .catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
});

function displayMatchingGames(matchingGames) {
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = "";

  matchingGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.className = "game";

    for (const key in game) {
      if (game.hasOwnProperty(key)) {
        const value = game[key];
        const keyValueElement = document.createElement("p");
        keyValueElement.textContent = `${key}: ${value}`;
        gameDiv.appendChild(keyValueElement);
      }
    }

    resultDiv.appendChild(gameDiv);
  });
}
