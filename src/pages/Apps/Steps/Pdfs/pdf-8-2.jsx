import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-8';
import { formatDateSpanish, formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfEightOne = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const FIRST_STEP_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne;

    const THESIS_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive;

    const {
        combinedNames,
        title,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    // Función para formatear docente
    const formatTeacher = (t) => {
        if (!t) return null;
        const first = t.firstNames || t.nombres || '';
        const last = t.lastName || t.apellidos || '';
        return `${first} ${last}`.trim();
    };
;
    // Jurados y asesor
    const dash = '—';
    const presidente = (THESIS_INFO?.president && formatTeacher(THESIS_INFO.president))
        || THESIS_INFO?.presidente || dash;
    const primerMiembro = (THESIS_INFO?.firstMember && formatTeacher(THESIS_INFO.firstMember))
        || THESIS_INFO?.primerMiembro || dash;
    const segundoMiembro = (THESIS_INFO?.secondMember && formatTeacher(THESIS_INFO.secondMember))
        || THESIS_INFO?.segundoMiembro || dash;
    const accesitario = (THESIS_INFO?.accessory && formatTeacher(THESIS_INFO.accessory))
        || THESIS_INFO?.accesitario || dash;
    const asesor = (THESIS_INFO?.adviser && formatTeacher(THESIS_INFO.adviser))
        || THESIS_INFO?.asesor || dash;
    const segundoAsesor = (THESIS_INFO?.coadviser && formatTeacher(THESIS_INFO.coadviser))
        || THESIS_INFO?.segundoAsesor || null;

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
    const commemorativeText = institutionalInfo?.commemorativeText ;
    return (
        <PdfBase 
            showCommemorativeText={true} 
            commemorativeText={commemorativeText} 
            registrationNumber={regNumber}
        >
            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end'}}>
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
                        <Text style={{ fontSize: 9, width: 200 }}>{presidente}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Presidente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{primerMiembro}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Primer miembro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{segundoMiembro}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Segundo miembro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{accesitario}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Accesitario</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 9, width: 200 }}>{asesor}</Text>
                        <Text style={[styles.bold, { fontSize: 9 }]}>: Asesor</Text>
                    </View>
                    {segundoAsesor && (
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={{ fontSize: 9, width: 200 }}>{segundoAsesor}</Text>
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
                        <Text style={{ fontSize: 10 }}>Ref.              :</Text>
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