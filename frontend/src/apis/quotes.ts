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

export const QUOTE_API_URL = 'http://api.quotable.io';
let haveSentQuoteAlready = false;

export async function getRandomQuote() {
  try {
    if (haveSentQuoteAlready) return;
    const stream = await fetch(`${QUOTE_API_URL}/random`, {
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