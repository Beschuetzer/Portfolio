export const QUOTE_API_URL = "https://api.quotable.io";

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

export enum QuoteTags {
  business = "business", //0
  education = "education", //1
  faith = "faith", //2
  famous = "famous-quotes", //3
  friendship = "friendship", //4
  future = "future", //5
  happiness = "happiness", //6
  history = "history", //7
  inspirational = "inspirational", //8
  life = "life", //9
  literature = "literature", //10
  love = "love", //11
  nature = "nature", //12
  politics = "politics", //13
  proverb = "proverb", //14
  religion = "religion", //15
  science = "science", //16
  success = "success", //17
  technology = "technology", //18
  wisdom = "wisdom", //19
}

const ENDPOINT = 'random';
export enum QuoteableAuthors {
  abrahamLincoln = 'abraham-lincoln',
  albertEinstein = 'albert-einstein',
  anatoleFrance = 'anatole-france',
  ericHoffer = 'eric-hoffer',
}

function getQuotableString(arr: any[]) {
  return arr.join('|');
}

export async function getRandomQuote({ authors = [], tags = [] }: { authors?: string[]; tags?: QuoteTags[]; } = {}) {
  try {
    const url = `${QUOTE_API_URL}/${ENDPOINT}?tags=${getQuotableString(tags)}&author=${getQuotableString(authors)}`;
    console.log(url);
    
    const stream = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const response = await stream.json();
    return response as Quote;
  }
  catch (err) {
    return {
      author: "Abraham Lincoln",
      authorSlug: "abraham-lincoln",
      content: "It's supposed I am not bound to win, but I am bound to be true. I am not bound to succeed, but I am bound to live by the light that I have. I must stand with anybody that stands right, and stand with him while he is right, and part with him when he goes wrong.",
      dateAdded: "2019-10-12",
      dateModified: "2022-01-07",
      length: 260,
    } as Quote;
  }
}