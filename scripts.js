const init = () => {
  const searchForm = document.getElementById("search");

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Tunity/0.1 (henrye@gmail.com)",
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputText = document.getElementById("artist-input").value;
    document.getElementById("results-artist").hidden = false;

    if (inputText.length > 2) {
      fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:"${inputText}"`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.artists.length === 0) {
            const results = document.getElementById("results-heading");
            results.innerText = "Sorry, nothing found.";
          } else {
            for (const artist of data.artists) {
              console.log(artist);
              const artistArray = createArray(artist);
              const artistEntry = createLi(artistArray);
              artistArray.length = 0;

              artistEntry.addEventListener("click", () => {});
            }
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
  const ul = document.getElementById("artist-names");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function createArray(artist) {
  const artistArray = [];

  if (artist.name) {
    artistArray.push(`Name: ${artist.name}`);
  } else {
    artistArray.push("Name: N/A");
  }
  if (artist.area) {
    artistArray.push(`Country: ${artist.area.name}`);
  } else {
    artistArray.push("Country: N/A");
  }
  if (artist.gender) {
    artistArray.push(`Gender: ${artist.gender}`);
  } else {
    artistArray.push("Gender: N/A");
  }

  if (artist.tags) {
    artistArray.push(`Tagged as: ${artist.tags[0].name}`);
  } else {
    artistArray.push("No tags found");
  }

  return artistArray;
}

function createLi(artistArray) {
  const artistList = document.getElementById("artist-names");
  const li = document.createElement("li");
  const br = document.createElement("br");
  const artistInfo = artistArray.join(" || ");
  li.className = "artist-entry";
  li.innerText = artistInfo;
  artistList.append(li, br);

  return li;
}

function artistEventListener(artist) {}

document.addEventListener("DOMContentLoaded", init);
