function selectedUf(){
    const states = document.querySelector("form select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(function(value){
            return value.json().then(
                function(data){
                    for(state of data)
                    states.innerHTML += `<option value=${state.id}>${state.nome}</option>`
                }
            )
        })
}
 
function selectedCity(event){
    const state = event.target.value
    const city = document.querySelector("form select[name=city]")
    const inputState = document.querySelector("form input[name=state]")

    const index = event.target.selectedIndex
    inputState.value = event.target.options[index].text
    city.innerHTML = '<option value="">Selecionar</option>'
    city.disabled = true   

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
        .then(function(event){
            return event.json().then(
                function(cities){
                    city.innerHTML = '<option value="">Selecionar</option>'
                    for(cit of cities)
                        city.innerHTML += `<option value=${cit.nome}>${cit.nome}</option>`
                        city.disabled = false
                    }
            )
        })
    
}

document.querySelector("form select[name=uf]")
.addEventListener("change", selectedCity)

selectedUf();


//Itens de coleta

const itensColect = document.querySelectorAll("#itens-grid li")
const itensImput = document.querySelector("input[name=itens]")

for(item of itensColect){
    item.addEventListener("click", handleSelectedItem)
}

let selectedItens = []

function handleSelectedItem(event){
    const itemLI = event.target
    const itemID = itemLI.dataset.id
    itemLI.classList.toggle("selected")

    const selected = selectedItens.findIndex((item) => {
        return item == itemID
    })

    if(selected >= 0){
        const filterItens = selectedItens.filter((item) => {
            return item != itemID
        })  

        selectedItens = filterItens
    }else{
        
        selectedItens.push(itemID)   
    }
    console.log(selectedItens)
    itensImput.value = selectedItens
} 

function test() {
    alert("Ponto de coleta cadastrado com sucesso!");
}