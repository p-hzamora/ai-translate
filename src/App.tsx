import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useStore } from './hooks/useStore';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants.d';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon, CheckIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect, useState } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';


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

	const [isClipboardCopied, setIsClipboardCopied] = useState(false);

	const debouncedFromText = useDebounce(fromText, 350);

	useEffect(() => {
		if (debouncedFromText === '') return

		translate({ fromLanguage, toLanguage, text: debouncedFromText })
			.then(result => {
				if (result == null) return
				if (typeof result === 'string') return setResult(result)

				const content = result.content[0]

				const res = content.type === "text"
					? content.text
					: content.name
				setResult(res)
			})
			.catch(() => { setResult('Error') })
	}, [debouncedFromText, toLanguage, fromLanguage])

	function handleClipboard(): void {
		navigator.clipboard.writeText(result)
			.then(() => {
				setIsClipboardCopied(true);

				setTimeout(() => {
					setIsClipboardCopied(prev => !prev);
				}, 1000)
			})
			.catch(() => { })
	}

	function handleSpeaker(): void {
		const utterance = new SpeechSynthesisUtterance(result);
		utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
		utterance.rate = 1
		speechSynthesis.speak(utterance);
	}

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
							onChange={setFromText} />
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
						<div style={{ position: "relative" }}>
							<TextArea
								loading={loading}
								type={SectionType.To}
								value={result}
								onChange={setResult}
							/>
							<div style={{ position: "absolute", left: 0, bottom: 0, display: 'flex' }}>
								<Button variant="link"
									onClick={handleClipboard}>
									{isClipboardCopied ? <CheckIcon /> : <ClipboardIcon />}
								</Button>
								<Button
									variant='link'
									onClick={handleSpeaker}
								>
									<SpeakerIcon />
								</Button>
							</div>

						</div>
					</Stack>
				</Col>
			</Row>
		</div>
	);
}

export default App;
