import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-9';
import { formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfNineOne = ({ infoStep, incrementFields, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const FIRST_STEP_INFO = infoStep?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne;

    const {
        combinedNames,
        title,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    // Campos Editables
    const resolutionNumero = formatNumberWithZero(infoStep?.resolutionNumber);
    const destinatario = institutionalInfo?.deanName;
    const cargo = 'DECANO DE LA FACULTAD DE ADMINISTRACIÓN';
    const ubicacion = infoStep?.location;
    const fechaSustentacion = infoStep?.day;
    const horaSustentacion = infoStep?.hour;

    return (
        <PdfBase 
            commemorativeText={true} 
            registrationNumber={incrementFields?.regNumber || infoStep?.reg}
        >
            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end', marginBottom: 2 }}>
                <Text style={styles.tamburco}>Tamburco, {actualDate}</Text>
            </View>

            {/* Número de Resolución */}
            <Text style={[styles.bold, { marginBottom: 5, fontSize: 12, textDecoration: 'underline' }]}>
                RESOLUCIÓN N° {resolutionNumero}-{anio}-D-UI-FA-UNAMBA
            </Text>

            {/* Bloque del Destinatario */}
            <View style={styles.section}>
                <Text style={styles.body}>Señor:</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>{destinatario}</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>{cargo}</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC</Text>
                <Text style={[styles.bold, { marginTop: 10, fontSize: 10 }]}>Presente.-</Text>
            </View>

            <View style={[styles.section, { flexDirection: 'row', marginTop: 10, fontSize: 12 }]}>
                <Text>Asunto             </Text>
                <Text>              :RESOLUCIÓN DE APROBACIÓN DE TESIS</Text>
            </View>
            <Text>******************************************************</Text>
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Es sumamente grato dirigirme a usted, en atención a los documentos de referencia, mediante su autoridad, 
                    se comunica la aprobación de la tesis presentada para su sustentación, según detalle siguiente:
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>
                    <Text style={styles.bold}>Tesis Titulada:</Text> "{title}", presentado por <Text style={styles.bold}>{combinedNames}</Text>, según el siguiente detalle:
                </Text>
            </View>

            <View style={[styles.section, { marginBottom: 5 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60 }}>Ubicación</Text>
                    <Text>: {ubicacion}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60 }}>Día</Text>
                    <Text>: {fechaSustentacion}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60 }}>Hora</Text>
                    <Text>: {horaSustentacion}</Text>
                </View>
            </View>

            {/* Despedida */}
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Sin otro en particular, aprovecho la ocasión para renovarle las muestras de mi especial consideración.
                </Text>
            </View>

            {/* Firma */}
            <View style={{ marginTop: 20 }}>
                <Text style={[styles.bold, { textAlign: 'center', fontSize: 12 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfNineOne;
