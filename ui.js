// =================== HANDLE THEME TOGGLE =================== //
const moonBtn = document.getElementById("moon-icon");
const sunBtn = document.getElementById("sun-icon");
const bgImage = document.getElementById("image");

moonBtn.addEventListener("click", () => {
    document.body.classList.add("dark");
    bgImage.setAttribute("src", "./images/bg-desktop-dark.jpg");
    localStorage.setItem("theme","dark");
})
sunBtn.addEventListener("click", () => {
    document.body.classList.remove("dark");
    bgImage.setAttribute("src", "./images/bg-desktop-light.jpg");
    localStorage.setItem("theme", "light");
})

if(localStorage.getItem("theme")) {

    document.body.classList.remove("dark");
    bgImage.setAttribute("src", "./images/bg-desktop-light.jpg");

    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        bgImage.setAttribute("src", "./images/bg-desktop-dark.jpg");
    }

}

// ================== HANGLE ACTIVE FILTER =================== //
const allFilters = document.querySelectorAll(".todo-filters button");

allFilters.forEach(filter => {
    filter.addEventListener("click",()=>{
        allFilters.forEach(fil => fil.classList.remove("active"));
        filter.classList.add("active")
    })
})