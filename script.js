
let allData = []
let limit = 6
let loadAllData = async (searchText, limit) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    let response = await fetch(url)
    let data = await response.json()
    allData = data.data;
    displayData(allData, limit)
}
document.getElementById('sort-name').addEventListener('click', function(){
    allData.sort((a,b) => {
        if(a.phone_name > b.phone_name){
            return -1
        } else if( a.phone_name < b.phone_name){
            return 1;
        } else{
            return 0
        }
    })

    displayData(allData)
})

let displayData = (searchText , limit) => {
    
    let cardContainer = document.getElementById('card-container')
    cardContainer.textContent = '';

    if(searchText.length === 0){
        document.getElementById('no-phone').classList.remove('hidden')
    } else{
        document.getElementById('no-phone').classList.add('hidden')
    }

    let showButton = document.getElementById('show-all-btn')
    if(limit && searchText.length > 6){
        searchText = searchText.slice(0,6)
        showButton.classList.remove('hidden');
        document.getElementById('sort-phones').classList.remove('hidden')
    } else{
        showButton.classList.add('hidden')
    }

    searchText.forEach(singleElement => {
        let { brand, phone_name, slug, image } = singleElement;

        let card = document.createElement('div')
        card.classList.add('card', 'w-96', 'glass', 'col', 'w-fit')
        card.innerHTML = `
            <figure>
            <img class = "w-full p-4 rounded-3xl" src="${image}" alt="..."/>
            </figure>
            <div class="card-body">
                <h2 class="card-title text-bold text-white">${phone_name}</h2>
                <p>This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                <div class="card-actions justify-center">
                <label for="my-modal-3" class="btn bg-green-400 hover:bg-green-600 text-black" onclick = "loadDataDetail('${slug}')">Details</label>
                </div>
            </div>
    `
    
        cardContainer.appendChild(card)
    });
    document.getElementById('loading').classList.add('hidden');

}

let dateArr = [];

let loadDataDetail = async(id)=>{
    let url = `https://openapi.programming-hero.com/api/phone/${id}`
    let response = await fetch(url)
    let data = await response.json()
    dateArr = data.data
    displayDataDetail(dateArr)
}

// document.getElementById('sort-date').addEventListener('click', function(){
//     // dateArr.sort((a, b)=> b? b.releaseDate - a? a.releaseDate)
//     dateArr.sort((a,b) =>{
//         // let sortedA = a.releaseDate? a.releaseDate : ''
//         // let sortedB = b.releaseDate? b.releaseDate : ''
//         return new Date(b.releaseDate) - new Date(a)
//     })
//     displayDataDetail(dateArr)
// })


let displayDataDetail = (details)=>{
    let {name, releaseDate, mainFeatures, others, sensors} = details;
    let index = 1;
    let otherInfo = document.createElement('div')
    if(others){
        for(let other in others){
            let p = document.createElement('p')
            p.innerHTML = `
            <p>${index++}. ${other} : ${others[other]}</p>
            `
            otherInfo.appendChild(p)
        }
    } else{
        otherInfo.innerText = `No other information found`;
    }

    let modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
              <h3 class="text-lg font-bold">${name}</h3>
              <p>Relase Date : ${releaseDate? releaseDate : 'No relase date found'}</p>
              <p>Storage : ${mainFeatures.storage? mainFeatures.storage : 'No storage found'}</p>
              <p>Sensors : ${sensors? sensors : 'No sensors found'}</p>
              <h3 class = "text-center text-bold mt-2">Other Information :</h3>
              <p>${otherInfo.innerHTML}</p>
    `
}

document.getElementById('search-btn').addEventListener('click', function () {
    let searchValue = document.getElementById('search-value').value;
    loadAllData(searchValue, limit)
    document.getElementById('loading').classList.remove('hidden');
})
document.getElementById('search-value').addEventListener('keypress', function (event) {
    let searchValue = document.getElementById('search-value').value;
    if(event.key === 'Enter'){
        loadAllData(searchValue, limit)
        document.getElementById('loading').classList.remove('hidden');
    }
})
document.getElementById('show-all-btn').addEventListener('click', function(e){
    let searchValue = document.getElementById('search-value').value;
    loadAllData(searchValue)
})

