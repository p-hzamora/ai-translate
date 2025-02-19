import { type FromLanguage, type Language } from './types.d';

// Define action types as const
export const ACTIONS = {
	INTERCHANGE_LANGUAGES: 'INTERCHANGE_LANGUAGES',
	SET_FROM_LANGUAGE: 'SET_FROM_LANGUAGE',
	SET_TO_LANGUAGE: 'SET_TO_LANGUAGE',
	SET_FROM_TEXT: 'SET_FROM_TEXT',
	SET_RESULT: 'SET_RESULT',
	SET_LOADING: 'SET_LOADING',
} as const;

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export type Action =
	| { type: typeof ACTIONS.INTERCHANGE_LANGUAGES; payload?: never }
	| { type: typeof ACTIONS.INTERCHANGE_LANGUAGES; payload?: never }
	| { type: typeof ACTIONS.SET_FROM_LANGUAGE; payload: FromLanguage }
	| { type: typeof ACTIONS.SET_TO_LANGUAGE; payload: Language }
	| { type: typeof ACTIONS.SET_FROM_TEXT; payload: string }
	| { type: typeof ACTIONS.SET_RESULT; payload: string }
	| { type: typeof ACTIONS.SET_LOADING; payload: boolean };
