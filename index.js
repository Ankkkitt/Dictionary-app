let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = "8577c22a-20db-4a3a-a9ef-d2c5d13e5091";
let notFound = document.querySelector('.not_found');

searchBtn.addEventListener('click', function (e){
    e.preventDefault();
    
    // Get input data
    let word = input.value;
    if(word === ''){
        alert('Word is required');
        return;
    }
    // Call Api get data
    getData(word);

})

async  function getData(word) {
     console.log(word);
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await  response.json();

    // if empty result
    // if(!data.length){
    //     notFound.innerText = 'No result Found';
    //     return;
    // }
    console.log(data);

}