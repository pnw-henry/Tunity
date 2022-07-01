const init = () => {
  const searchForm = document.getElementById("search");
  const submitButton = document.getElementById("submit");
  const artistList = document.getElementById("artist-list");

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Tunity/0.1 (henrye@gmail.com)",
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputText = document.getElementById("artist-input").value;
    document.getElementById("results").hidden = false;

    if (inputText.length > 2) {
      fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:${inputText}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.artists.length === 0) {
            const results = document.getElementById("results-heading");
            results.innerText = "Sorry, nothing found.";
          }
          for (const entry of data.artists) {
            console.log(entry);
            const li = document.createElement("li");
            li.className = "match";
            li.innerText = entry.name;
            artistList.appendChild(li);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Sorry, search must be at least three characters!");
    }
  });
};

function removeAll() {
  const ul = document.getElementById("artist-list");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", init);
