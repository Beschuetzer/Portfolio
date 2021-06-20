export interface Quote {
	author: string;
	authorSlug: string;
	content: string;
	dateAdded: string;
	dateModified: string;
	length: number;
	tags: string[];
	_id: string;
}

const TAGS = [
  "business", //0
  "education", //1
  "faith", //2
  "famous-quotes", //3
  "friendship", //4
  "future", //5
  "happiness", //6
  "history", //7
  "inspirational", //8
  "life", //9
  "literature", //10
  "love", //11
  "nature", //12
  "politics", //13
  "proverb", //14
  "religion", //15
  "science", //16
  "success", //17
  "technology", //18
  "wisdom", //19
]

const QUOTE_API_URL = 'http://api.quotable.io';
const ENDPOINT = 'random';
const TAGS_TO_USE = `${TAGS[8]}|${TAGS[18]}|${TAGS[1]}`;
// const TAGS_TO_USE = `${TAGS[9]}`;
let haveSentQuoteAlready = false;

export async function getRandomQuote() {
  try {
    if (haveSentQuoteAlready) return;
    const stream = await fetch(`${QUOTE_API_URL}/${ENDPOINT}?tags=${TAGS_TO_USE}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const response = await stream.json();
    haveSentQuoteAlready = true;
    return response;
  }
  catch (err) {
    console.log('getRandomQuote------------------------------------------------');
    console.log('err =', err);
    return "";
  }
}