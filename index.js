let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = "8577c22a-20db-4a3a-a9ef-d2c5d13e5091";
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('#audio');
let load = document.querySelector('.loading');

searchBtn.addEventListener('click', function (e){
    e.preventDefault();
    
    // clear the previous data 
    audioBox.innerText = '';
    defBox.innerText = '';
    notFound.innerText = '';

    // Get input data
    let word = input.value;
    if(word === ''){
        alert('Word is required');
        return;
    }
    // Call Api get data
    getData(word);

})

async function getData(word) {

    load.style.display = 'block';
    const res = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await  res.json();

    // if empty result  --> if we write gibberish the the length of array in respoonse will be 0 and we cre checking that here
    if(!data.length){
        load.style.display = 'none';
        notFound.innerText = 'No result Found';
        return;
    }

    // if result is suggestion 
    if(typeof data[0] === 'string'){
        load.style.display = 'none';
        let heading = document.createElement('h3')
        heading.innerText = 'Did you mean ?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }

    // if result is found 
    load.style.display = 'none';
    let definition = data[0].shortdef[0];
    defBox.innerText = definition;

    //Sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        // https://media.merriam-webster.com/
        let subfolder = soundName.charAt(0);
        let soundUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subfolder}/${soundName}.mp3`

        audioBox.setAttribute("src", `${soundUrl}`);
        audioBox.setAttribute("controls", "controls");
        audioBox.setAttribute("autoplay", "autoplay")
    }

}

// function renderSound(soundName){
//     // https://media.merriam-webster.com/
//     let subfolder = soundName.charAt(0);
//     let soundUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subfolder}/${soundName}.mp3`

//     var aud = document.createElement('AUDIO');
//     aud.src = soundUrl;
//     aud.controls = true;
//     document.body.appendchild(aud);
// }