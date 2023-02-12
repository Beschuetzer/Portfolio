import { CSSProperties, RefObject } from "react";

//#region Types and Interfaces
export type ArrowButtonDirection = "left" | "right";
export type BridgePageNavLinkColors = {
	normal: () => string;
	hover: () => string;
}
export type CSharpSection = {
	name: string;
	pageName: string;
	children: any[];
	hasCarousel?: boolean;
	styles?: CSSProperties;
}
export type Exclusive<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>
> =
  | (T & { [k in Exclude<keyof U, keyof T>]?: never })
  | (U & { [k in Exclude<keyof T, keyof U>]?: never })

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

