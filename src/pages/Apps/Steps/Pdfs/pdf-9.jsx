import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-9';
import { formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfNineOne = ({ infoStep }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const FIRST_STEP_INFO = infoStep?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne;

    const {
        combinedNamesOnly,
        title,
        degree,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    // Campos Editables
    const constanciaNumero = formatNumberWithZero(infoStep?.constancyNumber);
    const tesista = combinedNamesOnly;
    const porcentajeSimilitud = infoStep?.similarityPercent;
    const resolucionReglamento = formatNumberWithZero(infoStep?.resolutionNumber);

    return (
        <PdfBase 
            commemorativeText={false} 
        >
            {/* Título Principal */}
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 14, marginBottom: 10, marginTop: 20 }]}>
                CONSTANCIA DE SIMILITUD
            </Text>

            {/* Número de Constancia centrado */}
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 12, marginBottom: 15 }]}>
                N° {constanciaNumero}-{anio}
            </Text>

            {/* Cuerpo del documento */}
            <View style={styles.section}>
                <Text style={[styles.justify, { lineHeight: 1.5 }]}>
                    La Universidad Nacional Micaela Bastidas de Apurímac, a través de la Unidad de Investigación de la 
                    Facultad de Administración, declara que, la tesis titulada: <Text style={styles.bold}>"{title}"</Text>, 
                    para optar el título de Licenciado en {degree} en Administración, presentado por {' '}
                    <Text style={styles.bold}>{tesista}</Text> ha sido sometido a un mecanismo de evaluación de verificación 
                    de similitud, a través del software TURNITIN, siendo el <Text style={styles.bold}>{porcentajeSimilitud}</Text>{' '}
                    el índice de similitud; el cual es menor al 25% establecido por el reglamento de investigación aprobado 
                    por Resolución N° {resolucionReglamento}-CU-UNAMBA, por lo que cumple con los criterios establecidos por la universidad.
                </Text>
            </View>

            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end', marginTop: 30 }}>
                <Text style={styles.body}>Tamburco, {actualDate}</Text>
            </View>

            {/* Espacio para firma */}
            <View style={{ marginTop: 40, alignItems: 'center' }}>
                <Text style={[styles.bold, { fontSize: 11, marginBottom: 12 }]}>Atentamente,</Text>
            </View>
            
        </PdfBase>
    );
};

export default PdfNineOne;
