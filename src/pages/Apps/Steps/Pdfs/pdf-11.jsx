import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-11';
import { getWrittenDate, getYear } from '../utils/Dates';

const PdfEleven = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    // Placeholder para datos del paso 11
    // Se completará posteriormente según los requisitos

    return (
        <PdfBase 
            commemorativeText={true} 
            registrationNumber={''}
        >
            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end', marginBottom: 2 }}>
                <Text style={styles.tamburco}>Tamburco, {actualDate}</Text>
            </View>

            {/* Título del documento */}
            <Text style={[styles.bold, { marginBottom: 5, fontSize: 12, textDecoration: 'underline' }]}>
                PASO FINAL - PASO 11
            </Text>

            {/* Contenido placeholder */}
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Documento en construcción. Este espacio será completado con la información correspondiente al paso final del proceso.
                </Text>
            </View>

            {/* Firma */}
            <View style={{ marginTop: 20 }}>
                <Text style={[styles.bold, { textAlign: 'center', fontSize: 12 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfEleven;
