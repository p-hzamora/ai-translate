import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';


interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string

}

type ResizeProperty = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
const commonStyle = { border: 0, height: 'auto', minHeight: '200px', resize: 'none' as ResizeProperty }


const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return "Introducir texto"
    if (loading === true) return "Cargando..."
    return "Traduccion"
}
export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.From
        ? commonStyle
        : { ...commonStyle, backgroundColor: '#f5f5f5' }


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as="textarea"
            autoFocus={type === SectionType.From}
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}