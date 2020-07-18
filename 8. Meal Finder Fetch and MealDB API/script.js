const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1';
const SEARCH_TERM = '/search.php?s=';
const LOOKUP_MEAL_ID = '/lookup.php?i=';
const RANDOM_MEAL = '/random.php';

// Search meal and fetch from API
async function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    const res = await fetch(`${ENDPOINT}${SEARCH_TERM}${term}`);
    const data = await res.json();

    resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;

    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
    } else {
      // used data-* if you want to add custom attribute on html5
      mealsEl.innerHTML = data.meals.map(meal => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      `).join(''); /* convert to string */

      resultHeading.appendChild(mealsEl);
    }
    // clear search text
    search.value = "";
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
async function getMealById(mealID) {
  const res = await fetch(`${ENDPOINT}${LOOKUP_MEAL_ID}${mealID}`);
  const data = await res.json();
  addMealToDOM(data.meals[0]);
}

// Fetch random meal from API
async function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const res = await fetch(`${ENDPOINT}${RANDOM_MEAL}`);
  const data = await res.json();

  addMealToDOM(data.meals[0]);
}

// Add meal to DOM
function addMealToDOM(meal) {
  console.log(meal);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    // retrieval of property from object using the actual property name as indexer
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ``}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ``}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  resultHeading.appendChild(single_mealEl);
}


// Event listeners

// used 'submit' event because button type is submit
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  // check for 'path' if it exists, because it is browser dependent
  const e_path = e.path || (e.composedPath && e.composedPath());

  // go through all child elements
  const mealInfo = e_path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    // this is where we retrieve the value of the custom html5 attribute
    getMealById(mealInfo.getAttribute('data-mealID'));
  }

});