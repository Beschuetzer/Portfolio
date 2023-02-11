import { CSSProperties, RefObject } from "react";

//#region Types and Interfaces
export type ArrowButtonDirection = "left" | "right";
export type CSharpSection = {
	name: string;
	pageName: string;
	children: any[];
	hasCarousel?: boolean;
	styles?: CSSProperties;
}
export type Match = { url: string };
export type MaxCharCounts = {
	[key in MaxCharCount]: () => number;
}
export type NavRef = RefObject<HTMLElement>;
export type Reference = {
	current: HTMLElement;
}
//#endregion

//#region Enums
export enum MaxCharCount {
	song = 'song',
}
//#endregion

