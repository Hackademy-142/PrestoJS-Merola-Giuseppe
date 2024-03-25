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

let isIntersect = false;

const intersectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && isIntersect == false){
            createInterval(numOpere, 100, 60)
            createInterval(numUtenti, 1000, 5)
            createInterval(numVendite, 200, 25)
            isIntersect = true;
            setTimeout(()=>{
                isIntersect = false;
            }, 100000);
        }
    })
})

intersectionObserver.observe(numOpere)
intersectionObserver.observe(numUtenti)
intersectionObserver.observe(numVendite)







const opereArtisti = [
    {
        nome: "Riflessi Urbani",
        prezzo: 500,
        immagine: "https://picsum.photos/200"
    },
    {
        nome: "Espressione Cromatica",
        prezzo: 350,
        immagine: "https://picsum.photos/201"
    },
    {
        nome: "Vibrazioni Metropolitane",
        prezzo: 200,
        immagine: "https://picsum.photos/202"
    },
    {
        nome: "Sogni su Cemento",
        prezzo: 600,
        immagine: "https://picsum.photos/203"
    },
    {
        nome: "Libertà Graffiti",
        prezzo: 450,
        immagine: "https://picsum.photos/204"
    }
];

let cardsWrapper = document.querySelector("#cardsWrapper")

opereArtisti.forEach((annuncio,i)=>{
    if(i >= opereArtisti.length -3){
        let col = document.createElement("div");
        col.classList.add("col-11", "col-lg-3", "my-3","my-md-0")
        col.innerHTML = `
        <div data-aos="flip-right" class="card position-relative h-100 sfondo_card">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-2">
        NEW
        </span>
        <div class="overflow-hidden">
        <img src="${annuncio.immagine}" class="img-card card-img-top" alt="...">
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
        <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="card-title title text-white mb-0">${annuncio.nome}</h5>
        <i class="bi bi-heart fs-4 text-white "></i>
        </div>
        <div>
        <p class="card-text text-white">Prezzo: ${annuncio.prezzo} €</p>
        <a href="#" class="bottone_custom btn">Aggiungi a carrello</a>
        </div>
        </div>
        </div>
        </div>`
        cardsWrapper.appendChild(col)
    }
})