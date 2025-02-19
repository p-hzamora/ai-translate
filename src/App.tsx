import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useStore } from './hooks/useStore';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants.d';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';

function App() {
	const {
		fromLanguage,
		toLanguage,
		fromText,
		result,
		loading,
		setFromText,
		setResult,
		interchangeLanguages,
		setFromLanguage,
		setToLanguage,
	} = useStore();

	useEffect(() => {
		if (fromText === '') return

		translate({ fromLanguage, toLanguage, text: fromText })
			.then(result => {
				if (result == null) return
				if (typeof result === 'string') return setResult(result)

				const content = result.content[0]

				const res = content.type === "text"
				? content.text
				: content.name
				setResult(res )
			})
			.catch(() => { setResult('Error') })
	}, [fromText, toLanguage, fromLanguage])
	return (
		<div className="App">
			<h1>Google Translate</h1>
			<Row>
				<Col>
					<Stack gap={2}>
						<LanguageSelector
							type={SectionType.From}
							value={fromLanguage}
							onChange={setFromLanguage}
						/>
						<TextArea
							loading={loading}
							type={SectionType.From}
							value={fromText}
							onChange={setFromText}>
						</TextArea>
					</Stack>
				</Col>

				<Col xs='auto'>
					<Button
						variant="link"
						disabled={fromLanguage === AUTO_LANGUAGE}
						onClick={interchangeLanguages}
					>
						<ArrowsIcon />
					</Button>
				</Col>

				<Col>
					<Stack gap={2}>
						<LanguageSelector
							type={SectionType.To}
							value={toLanguage}
							onChange={setToLanguage}
						/>
						<TextArea
							loading={loading}
							type={SectionType.To}
							value={result}
							onChange={setResult}
						>
						</TextArea>
					</Stack>
				</Col>
			</Row>
		</div>
	);
}

export default App;
