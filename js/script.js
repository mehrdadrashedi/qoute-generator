const quoteContainer = document.getElementById('quote-container');
const categoryContainer = document.querySelector(".category-container");
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

import { CategoryItem } from "./category.js";
window.customElements.define('category-item' , CategoryItem);

// select category
const categoryItems = document.querySelectorAll("category-item");

let category = null;

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.style.display = "none";
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.style.display = "block";
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    try {
        const response = await fetch(apiUrl , {
            headers : {"X-Api-Key" : "0l2P0/6Q/zLPMYIBbWeJAg==bFnfSWoEJwl9Ne35"}
        });

        const data = await response.json();

        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data[0].author;
        }
        // Reduce font size for long quotes
        if (data[0].quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[0].quote;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        // getQuote();
        console.log(error);
    }
}


// Event Listeners
categoryItems.forEach(item =>{
    item.addEventListener("click" , (event)=>{
        category = event.target.innerText;
        categoryContainer.style.display = "none";
        quoteContainer.style.display = "block";
        getQuote();
    })
})

newQuoteBtn.addEventListener('click', getQuote);

// On Load
complete()
quoteContainer.style.display = "none";
