const searchForm = document.querySelector('form')
const result = document.querySelector('.container')
let searchQuery = ''
const APP_ID = '36fb7e89';
const APP_KEY = 'fe01dde0a1776d098d3642339c85ba6a';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value
    fetchAPI();
})

async function fetchAPI() {
    const exampleReq = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=10`;
    const response = await fetch(exampleReq)
    const data = await response.json();
    generateHtml(data.hits)
    console.log(data)


}

function generateHtml(results) {
    let generatedHtml = ''
    results.map(result => {
        generatedHtml +=
            `
        <div class="card" style="width: 18rem;
        border-color:black;">
        <img class="card-img-top" src="${result.recipe.image}" alt="Image not available">
        <div class="card-body">
          <h5 class="card-title">${result.recipe.label}</h5>
          <p class="card-text"><span class='dark'>Cuisine</span>: ${result.recipe.cuisineType }</p>
          <p class="card-text"><span class='dark'>Meal Type</span> : ${result.recipe.mealType}</p>
          <p class="card-text "><span class='dark'>Calories</span>: ${result.recipe.calories.toFixed(2)}</p>
          <a href="${result.recipe.url}"target='_blank' class="btn btn-primary">View Recipe</a>
        </div>
        
      </div>
      `

    })
    result.innerHTML = generatedHtml;
}
