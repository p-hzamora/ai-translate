import { Key } from 'react';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from './constants.d';

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
	fromLanguage: FromLanguage;
	toLanguage: Language;
	fromText: string;
	result: string;
	loading: boolean;
}


export enum SectionType {
	From='from',
	To = "to",
}