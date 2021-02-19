
/* Accepts an array of data, gets a random image from the data */
function chooseRandomGifphy(res) {
    //get the length of the response array
    const arrLength = res.data.length;
    if (arrLength !== undefined || arrLength !== 0) {
        //choose a random number from length of array
        const randNum = Math.floor(Math.random() * arrLength);
        //get the gif url
        const gif = res.data[randNum].images.fixed_width.url;
        appendGif(gif);
    } 
}

/* Accepts an img url, creates an img and div and appends of the dom */
function appendGif(gif) {
    const img = `<img src="${gif}">`;
    gifContainer.append(`<div class="col-3">${img}</div>`);
}

const form = $('#form');
const searchField = $('#search');
const gifContainer = $('#gif-container');
const removeBtn = $('.btn-outline-danger');


/* Submits a API call when the search form is submitted */
form.on('submit', async function(e) {
    const apiKey = '4xw4uuNod4GjdC4KYXDt3UKHBCFiutvv';
    const url = 'https://api.giphy.com/v1/gifs/search';

    //prevent form submit default
    e.preventDefault();

    //grab the current search field value & reset the form field
    let searchTerm = searchField.val();
    searchField.val('');

    try {
        //get data from the API
        const response = await axios.get(url, {params: {api_key: apiKey, q: searchTerm}});
        chooseRandomGifphy(response.data);
    } catch (e) {
        alert(`There was an issue searching for ${searchTerm}. Try again.`);
    }
});

/* Removes all gifs from the DOM */
removeBtn.on('click', function() {
    gifContainer.empty();
});

