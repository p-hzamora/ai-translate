import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { SUPPORTED_LANGUAGES } from '../constants.d';
import { SectionType, type FromLanguage, type Language } from '../types.d';

type Props =
	| { type: SectionType.From; value: FromLanguage; onChange: (language: FromLanguage) => void; }
	| { type: SectionType.To; value: Language; onChange: (language: Language) => void };

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as Language);
	};
	return (
		<Form.Select
			aria-label="Selecciona el idioma"
			onChange={handleChange}
			value={value}
		>
			{type === SectionType.From && <option value="auto">Detecta idioma</option>}
			{Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
				<option key={key} value={key}>
					{literal}
				</option>
			))}
		</Form.Select>
	);
};
