const init = () => {
  const searchForm = document.getElementById("search");
  const artistResults = document.getElementById("results-artist");
  const albumResults = document.getElementById("results-album");

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Tunity/0.1 (henrye@gmail.com)",
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    removeAll();

    const inputText = document.getElementById("artist-input").value;
    artistResults.hidden = false;
    albumResults.hidden = true;

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
              const artistArray = createArtistArray(artist);
              const artistEntry = createArtistLi(artistArray);
              artistArray.length = 0;

              artistEntry.addEventListener("click", () => {
                const artistID = artist.id;

                fetch(
                  `http://musicbrainz.org/ws/2/release-group?artist=${artistID}&type=album&limit=50`,
                  {
                    method: "GET",
                    headers: headers,
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);

                    artistResults.hidden = true;
                    albumResults.hidden = false;
                    const albumHeading = document.getElementById("albums");
                    albumHeading.innerText = `Album releases from ${artist.name}`;

                    for (const album of data["release-groups"]) {
                      const albumArray = createAlbumArray(album);
                      createAlbumLi(albumArray);
                      albumArray.length = 0;
                    }
                  });
              });
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
  const ulArray = document.querySelectorAll("ul");
  for (const ul of ulArray) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}

function createArtistArray(artist) {
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

function createArtistLi(artistArray) {
  const artistList = document.getElementById("artist-names");
  const li = document.createElement("li");
  const br = document.createElement("br");
  const artistInfo = artistArray.join(" || ");

  li.className = "display-item";
  li.innerText = artistInfo;
  artistList.append(li, br);

  return li;
}

function createAlbumArray(album) {
  const albumArray = [];

  if (album.title) {
    albumArray.push(`Title: ${album.title}`);
  }

  if (album["first-release-date"]) {
    albumArray.push(`Date ${album["first-release-date"]}`);
  } else {
    albumArray.push("Date: N/A");
  }

  if (album["primary-type"]) {
    albumArray.push(`Type: ${album["primary-type"]}`);
  } else {
    albumArray.push("Type: N/A");
  }

  return albumArray;
}

function createAlbumLi(albumArray) {
  const albumInfo = albumArray.join(" || ");
  const albumList = document.getElementById("album-names");
  const li = document.createElement("li");
  const br = document.createElement("br");

  li.className = "display-item";
  li.innerText = albumInfo;
  albumList.append(li, br);
}

document.addEventListener("DOMContentLoaded", init);
