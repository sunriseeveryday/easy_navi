document.addEventListener("DOMContentLoaded", () => {
    showEntrance();
});

function showEntrance() {
    var entrance = document.querySelector(".entrance");
    entrance.style.display = "flex";
}

function check(isEnter) {
    var entrance = document.querySelector(".entrance");
    var content = document.querySelector(".content");

    if (isEnter) {
        entrance.style.display = "none";
        content.style.display = "flex";

        fetch("/get-box-meta")
            .then(response => response.json())
            .then(data => addBoxes(data))
            .catch(error => console.error("Error fetching box meta:", error));
    } else {
        alert("Shit! Why? Are you male?");
        entrance.style.display = "none";
    }
}

function addBoxes(boxMeta) {
    var container = document.querySelector(".container");

    boxMeta.forEach((bMeta) => {
        var boxElement = document.createElement("div");
        boxElement.classList.add("box");

        var linkElement = document.createElement("a");
        linkElement.classList.add("img");
        linkElement.href = bMeta.url;
        linkElement.target = "_blank";

        var imgElement = document.createElement("img");
        imgElement.src = bMeta.src;
        linkElement.appendChild(imgElement);

        var nameElement = document.createElement("div");
        nameElement.classList.add("name");
        nameElement.textContent = bMeta.name;

        boxElement.appendChild(linkElement);
        boxElement.appendChild(nameElement);

        container.appendChild(boxElement);
    });
}