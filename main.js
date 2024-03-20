let navbar = document.querySelector(".navbar")


window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

let numOpere = document.querySelector("#numOpere")
let numUtenti = document.querySelector("#numUtenti")
let numVendite = document.querySelector("#numVendite")


function createInterval(elementId, finalNumber, frequency){
    let counter = 0

    let intervallo = setInterval(() => {
        if(counter < finalNumber){
            counter++
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}

createInterval(numOpere, 100, 60)
createInterval(numUtenti, 1000, 5)
createInterval(numVendite, 200, 25)