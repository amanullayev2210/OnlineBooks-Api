// HTML form element
const Elform = document.getElementById("form");
const ElFormInp = document.getElementById("js-inp");
const ElFormbtn = document.getElementById("js-formbtn");
const ElSelect = document.getElementById("js-select");


// HTML other Elements
const Elbody = document.getElementById("body")
const Elinner = document.getElementById("js-inner");
const Eltemp = document.getElementById("js-template").content;
const Elbtn = document.getElementById("js-btn");
const ElmodeImg = document.getElementById("js-modeImg");
const ElmodeText = document.getElementById("js-mode_text")

let data = [...books];
let mode_data = localStorage.getItem("data") === "true";

// SearchFn
function Search() {
    Elform.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let searchValue = ElFormInp.value.toLowerCase().trim();
    
        if (searchValue === "") {
            data = [...books]}     
        else {
            data = books.filter(item => {
                return item.title.toLowerCase().includes(searchValue) ||
                   item.author.toLowerCase().includes(searchValue) ||
                   item.year.toString().includes(searchValue) ||
                   item.pages.toString().includes(searchValue) ||
                   item.language.toLowerCase().includes(searchValue);
        });
    }

    RenderList(data, Elinner);
})};
Search()

// sortBooksFn

ElSelect.addEventListener("change", () => {
    let selectedValue = ElSelect.value;
    sortBooks(selectedValue);
});

function sortBooks(order) {
    if (order === "a-z") {
        books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "z-a") {
        books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === "new-old") {
        books.sort((a, b) => b.year - a.year);
    } else if (order === "old-new") {
        books.sort((a, b) => a.year - b.year);
    } else if (order === "lot-less") {
        books.sort((a, b) => b.pages - a.pages); 
    } else if (order === "less-lot") {
        books.sort((a, b) => a.pages - b.pages); 
    }

    RenderList(books, Elinner); 
}


// RenderListFn
function RenderList(books, node) {
    node.innerHTML = ""
    const docFrg = document.createDocumentFragment();
    books.forEach(piece => {
        const clone = Eltemp.cloneNode(true);
        clone.querySelector("#js-img").src = piece.imageLink;
        clone.querySelector("#js-tittle").textContent = piece.title;
        clone.querySelector("#js-author").textContent = piece.author;
        clone.querySelector("#js-item-year").textContent = piece.year;
        clone.querySelector("#js-item-pages").textContent = piece.pages;
        clone.querySelector("#js-item-language").textContent = piece.language;
        clone.querySelector("#js-info").href = piece.link;
        docFrg.appendChild(clone);
        });
    node.appendChild(docFrg);
}

RenderList(books, Elinner)


// Dark mode
if (mode_data) {
    Elbody.classList.add("active");
    ElmodeImg.src = "./assets/icons/moon_dark.svg";
    ElmodeText.textContent = "Light mode";
} else {
    Elbody.classList.remove("active");
    ElmodeImg.src = "./assets/icons/moon_light.svg";
    ElmodeText.textContent = "Dark mode";
}

Elbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    mode_data = !mode_data; 

    if (mode_data) {
        Elbody.classList.add("active");
        ElmodeImg.src = "./assets/icons/moon_dark.svg";
        ElmodeText.textContent = "Light mode";
    } else {
        Elbody.classList.remove("active");
        ElmodeImg.src = "./assets/icons/moon_light.svg";
        ElmodeText.textContent = "Dark mode";
    }

    localStorage.setItem("data", mode_data); 
});

