const quoteSpace = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteGenerate = document.getElementById('generate-quote');


async function getQuote(){
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        if(data.quoteAuthor === ""){
            quoteAuthor.innerText = "Unknown";
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 120){
            quotespace.classList.add('long-quote');
        }else{
            quoteSpace.classList.add('short-quote');
        }
        quoteSpace.innerText = data.quoteText;
    }catch(error){
        getQuote();
        console.log("it an error", error);
    }
}

function tweetQuote(){
    const quote = quoteSpace.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}
let twitterBtn = document.getElementById("twitter-btn");
console.log("twitterBtn" + twitterBtn);
//Event Listenter

quoteGenerate.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//onload
getQuote();