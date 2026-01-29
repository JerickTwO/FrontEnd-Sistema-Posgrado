import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-10';
import { formatNumberWithZero, getWrittenDate } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfTen = ({ infoStep }) => {
    const actualDate = getWrittenDate();

    const FIRST_STEP_INFO = infoStep?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne;

    const { firstStudent, secondStudent, title } = extractStudentsInfo(FIRST_STEP_INFO);

    const formatName = (student) => {
        if (!student) return '';
        const { firstNames = '', lastName = '', middleName = '' } = student;
        return `${firstNames} ${lastName} ${middleName}`.trim().toUpperCase();
    };

    const regNumber = formatNumberWithZero(infoStep?.reg);
    const studentNames = [formatName(firstStudent), formatName(secondStudent)].filter(Boolean).join(' - ');
    const thesisTitle = title || '';

    return (
        <PdfBase 
            commemorativeText={false} 
            registrationNumber={regNumber}
        >
            {/* Identificador de registro de investigación */}
            <View style={{ alignSelf: 'flex-start', marginTop: 6, borderWidth: 1, borderColor: '#000', borderRadius: 4, padding: 6 }}>
                <Text style={[styles.bold, { fontSize: 10, alignSelf: 'center' }]}>U.INV.</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>REG. N° {formatNumberWithZero(regNumber)}</Text>
            </View>
            {/* Encabezado de Constancia */}
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 18, marginTop: 10, marginBottom: 12 }]}>
                CONSTANCIA
            </Text>

            {/* Cuerpo del documento */}
            <View style={styles.section}>
                <Text style={[styles.justify, { lineHeight: 1.6 }]}>
                    La Unidad de Investigación de la Facultad de Administración de la Universidad Nacional Micaela Bastidas de Apurímac, hace constar que:
                </Text>
            </View>

            {/* Nombre del bachiller */}
            <View style={{ marginVertical: 10 }}>
                <Text style={[styles.bold, { textAlign: 'center', fontSize: 16 }]}>
                    {studentNames || 'NOMBRE DEL BACHILLER'}
                </Text>
            </View>

            {/* Detalle de entrega */}
            <View style={styles.section}>
                <Text style={[styles.justify, { lineHeight: 1.6 }]}>
                    Ha entregado 02 empastados y un 01 CD, conteniendo la tesis de investigación titulada: <Text style={styles.bold}>"{thesisTitle}"</Text>, presentando los requerimientos.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.justify, { lineHeight: 1.6 }]}>
                    Se expide la presente constancia para los fines que estime conveniente.
                </Text>
            </View>

            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end', marginTop: 30 }}>
                <Text style={styles.body}>Tamburco, {actualDate}</Text>
            </View>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={[styles.bold, { fontSize: 11, marginBottom: 12 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfTen;
