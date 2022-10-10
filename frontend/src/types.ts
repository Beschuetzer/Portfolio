export enum MaxCharCount {
	song = 'song',
}
export type MaxCharCounts = {
	[key in MaxCharCount]: () => number;
}
export const MAX_CHAR_COUNTS: MaxCharCounts = {
	[MaxCharCount.song]: () => {
		const windowWidth = window.innerWidth;
		switch (true) {
			case (windowWidth < 410):
				return 27;
			case (windowWidth < 600):
				return 80;
			default: 
				return 1000;
		}
	},
}