const init = () => {
  const searchForm = document.getElementById("search");
  const submitButton = document.getElementById("submit");

  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Tunity/0.1 (henrye@gmail.com)",
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = document.getElementById("artist-input").value;
    console.log(inputText);
    if (inputText.length > 2) {
      fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:${inputText}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
