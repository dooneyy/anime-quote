const form = document.querySelector('.form');
const spinner = document.getElementById('spinner');
let searchResponse;


form.addEventListener('submit', submit);

async function fetchQuote(searchResponse) {
    spinner.classList.remove('hidden');
    try{
       const results = await generateQuote(searchResponse);
       displayQuote(results);
    } catch (err) {
        console.log(err)
        warning();
    } finally{
        spinner.classList.add('hidden');
    }
       
}

function warning() {
    document.querySelector('.warning').style.display ='block';
    form.style.display = 'none';
    setTimeout(() => {
        document.querySelector('.warning').style.display ='none';
        form.style.display = 'block';
    }, 2000);
};

async function submit(event) {
    event.preventDefault();
    const input = document.querySelector('.form-control').value;
    const searchResponse = input.trim(); 

    const quoteText = document.querySelector('.search-result');
    quoteText.innerHTML = '';
    fetchQuote(searchResponse)
 }

 async function generateQuote(searchResponse) {
    const endpoint = `https://animechan.vercel.app/api/quotes/character?name=${searchResponse}`;
    const response = await fetch(endpoint);
   
    const json = await response.json();
    return json;
}

 function displayQuote(results) {
    const quoteText = document.querySelector('.search-result');
    results.forEach(result => {
        quoteText.insertAdjacentHTML(
            'beforeend',
                `<div class="card-body border-secondary">
                    <h5 class="text-success">Title: ${result.anime}</h5>
                    <p class="card-title">Character: ${result.character}</p>
                    <p class="card-text">Quote: ${result.quote}</p>
                </div>`
        );
        });
};



