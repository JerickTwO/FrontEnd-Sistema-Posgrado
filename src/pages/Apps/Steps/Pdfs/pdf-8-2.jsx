import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-8';
import { formatDateSpanish, formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfEightOne = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const THESIS_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive;
    const THREE_STEP_INFO = THESIS_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const {
        combinedNames,
        title,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    const { presidentNames,
        firstMemberNames,
        secondMemberNames,
        accessoryNames
    } = extractJurysInfo(THREE_STEP_INFO);

    const { adviserNames, coadviserNames } = extractAdvisersInfo(TWO_STEP_INFO);
    
    // Campos Editables
    const memorandoNumero = formatNumberWithZero(infoStep?.memorandumNumber);
    const aulaSustentacion = infoStep?.location2;
    const fechaSustentacion = formatDateSpanish(infoStep?.day2);
    const horaSustentacion = infoStep?.hour2;
    const articleNumber = infoStep?.articleNumber;
    const regNumber = infoStep?.reg;
    const additionalInputsList =
        typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0
            ? infoStep.additionalInputs
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            : null;
    const commemorativeText = institutionalInfo?.commemorativeText;
    return (
        <PdfBase
            showCommemorativeText={true}
            commemorativeText={commemorativeText}
            registrationNumber={regNumber}
        >
            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.tamburco}>Abancay, {actualDate}</Text>
            </View>

            {/* Número de Memorando */}
            <Text style={[styles.bold, { marginBottom: 10, fontSize: 11, textDecoration: 'underline' }]}>
                MEMORANDO MÚLTIPLE Nº {memorandoNumero}-{anio}-D-UI-FA-UNAMBA
            </Text>

            {/* Bloque del Destinatario */}
            <View style={styles.section}>
                <Text style={[styles.bold, { fontSize: 10, marginBottom: 5 }]}>Señores</Text>
                <Text style={[styles.bold, { fontSize: 10, marginBottom: 5 }]}>MIEMBROS DE JURADO Y ASESOR</Text>
                <View style={{ marginLeft: 20 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{presidentNames}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Presidente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{firstMemberNames}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Primer miembro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{secondMemberNames}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Segundo miembro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{accessoryNames}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Accesitario</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{adviserNames}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Asesor</Text>
                    </View>
                    {coadviserNames && (
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={{ fontSize: 9, width: 200 }}>{coadviserNames}</Text>
                            <Text style={[styles.bold, { fontSize: 9 }]}>: Segundo asesor</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Asunto */}
            <View style={[styles.section, { marginTop: 10 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 10 }}>Asunto           :</Text>
                    <Text style={{ fontSize: 10, marginLeft: 5 }}>Programación de fecha y hora de Sustentación de Tesis</Text>
                </View>
            </View>

            {/* Referencia */}
            <View style={styles.section}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 10 }}>Ref.                :</Text>
                        <Text style={{ fontSize: 10, marginLeft: 5 }}> Solicitud S/N°</Text>
                        <View style={{ fontSize: 10, marginLeft: 5 }}>
                            {additionalInputsList ? (
                                additionalInputsList.map((input, idx) => (
                                    <Text key={idx} style={{ fontSize: 10 }}>
                                        {idx === 0 ? `${input}` : ` ${input}`}
                                    </Text>
                                ))
                            ) : (
                                <Text style={{ fontSize: 10 }}>Solicitud S/N°</Text>
                            )}
                        </View>
                    </View>
                    <Text style={{ fontSize: 10 }}>Reg. N° {regNumber}</Text>
                </View>
            </View>

            {/* Línea de separación */}
            <Text style={{ marginTop: -5, marginBottom: 10 }}>______________________________________________________</Text>
            {/* Cuerpo del documento */}
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Por el presente me dirijo a Ustedes, con la finalidad de poner en su conocimiento que en mérito al Artículo({articleNumber}°) del Reglamento de Investigación,
                    se programa fecha y hora de sustentación <Text style={styles.bold}>PRESENCIAL</Text> de la Tesis Titulada:
                    <Text style={styles.bold}>"{title}"</Text>, presentado por <Text style={styles.bold}>{combinedNames}</Text>, según el siguiente detalle:
                </Text>
            </View>

            {/* Detalle de fecha, hora y lugar */}
            <View style={[styles.section, { marginTop: 10, marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <Text style={{ width: 50, fontSize: 10 }}>Día</Text>
                    <Text style={{ fontSize: 10 }}>: {fechaSustentacion}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <Text style={{ width: 50, fontSize: 10 }}>Hora</Text>
                    <Text style={{ fontSize: 10 }}>: {horaSustentacion}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 50, fontSize: 10 }}>Lugar</Text>
                    <Text style={{ fontSize: 10 }}>: {aulaSustentacion}</Text>
                </View>
            </View>

            {/* Firma */}
            <View style={{ marginTop: 30 }}>
                <Text style={[styles.bold, { textAlign: 'center', fontSize: 11 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfEightOne;