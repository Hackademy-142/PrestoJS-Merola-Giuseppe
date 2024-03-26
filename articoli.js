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


fetch("./opere.JSON").then((response)=> response.json()).then((data)=>{
    
    
    let opereWrapper = document.querySelector("#opereWrapper")
    
    function createCards(array){
        opereWrapper.innerHTML = ""
        array.forEach( (opere,i)=> {
            let col = document.createElement("div");
            col.classList.add("col-11", "col-lg-4", "my-3", "mx-1")
            col.innerHTML = `
            <div class="card position-relative h-100 sfondo_card">
            <div class="overflow-hidden">
            <img src="https://picsum.photos/20${i}" class="img-card card-img-top" alt="...">
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title title text-white mb-0">${opere.nome}</h5>
            <i class="bi bi-heart fs-4 text-white "></i>
            </div>
            <div>
            <p class="card-text text-white m-0">Categoria: <span class="fs-6">${opere.categoria}</span></p>
            <p class="card-text text-white">Prezzo: ${opere.prezzo} €</p>
            <a href="#" class="bottone_custom btn">Aggiungi a carrello</a>
            </div>
            </div>
            </div>
            </div>  
            `
            opereWrapper.appendChild(col)
            
        });
    }
    createCards(data)
    
    
    // Creazione categorie
    
    let radioWrapper = document.querySelector("#radioWrapper")
    
    function setCategories(){
        let categories = data.map( (el)=> el.categoria)
        let uniqueCategories = [];
        categories.forEach( (category)=> {
            if(uniqueCategories.includes(category) == false){
                uniqueCategories.push(category)
            } 
        })
        
        uniqueCategories.sort().forEach( (categoria)=> {
            let div = document.createElement("div")
            div.classList.add("form-check")
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
            <label class="form-check-label" for="flexRadioDefault1">
            ${categoria}
            </label>
            `
            radioWrapper.appendChild(div)
        })
    }
    setCategories()
    
    
    // Filtro per categoria
    
    let checksInput = document.querySelectorAll(".form-check-input")
    
    
    function filterByCategory(array){
        let radiosBtn = Array.from(checksInput)
        let checked = radiosBtn.find( (el)=>  el.checked)
        if(checked.id == "All"){
            return array
        } else {
            let filtered = array.filter( (el)=> el.categoria == checked.id )
            return filtered
        }
    }
    
    // EVENTO CLICK RADIO BUTTON
    checksInput.forEach((input)=>{
        input.addEventListener("click", ()=>{
            globalFilter()
        })
    })
    
    
    // Prezzo min e max
    
    
    let inputPrice = document.querySelector("#inputPrice")
    let currentValue = document.querySelector("#currentValue")
    
    
    
    function findMaxAndMinPrice(){
        let prices = data.map( (articolo)=> articolo.prezzo )
        let max = Math.max(...prices)
        let min = Math.min(...prices)
        inputPrice.max = max
        inputPrice.min = min
        inputPrice.value = max
        currentValue.innerHTML = max
    }
    findMaxAndMinPrice()
    
    
    
    // Filtro per prezzo
    
    function filterByPrice(array){
        let filtered = array.filter( (el)=> el.prezzo <= inputPrice.value )
        return filtered
    }
    
    inputPrice.addEventListener("input", ()=>{
        currentValue.innerHTML = inputPrice.value
        globalFilter()
    })


    
    
    // Filtro per parola
    
    let inputWord = document.querySelector("#inputWord")
    
    function filterByWord(array){
        let filtered = array.filter( (el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()) )
        return filtered
    }
    
    inputWord.addEventListener("input", ()=>{
        globalFilter()
    })


    function globalFilter() {
        let filteredByCategory = filterByCategory(data)
        let filteredByPrice = filterByPrice(filteredByCategory)
        let filteredByWord = filterByWord(filteredByPrice)
        createCards(filteredByWord)
    }
    
    
    
    
    
    
})


