import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-8';
import { formatDateSpanish, getWrittenDate } from '../utils/Dates';
import { extractAdvisersInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfEightThree = ({ infoStep, institutionalInfo }) => {
    const actualDate = getWrittenDate();

    const FIVE_STEP_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive;
    const THREE_STEP_INFO = FIVE_STEP_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const {
        combinedNames,
        title,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    const { adviserNames, coadviserNames } = extractAdvisersInfo(FIVE_STEP_INFO);

    // Campos del tercer documento
    const aulaSustentacion = infoStep?.location3;
    const fechaSustentacion = formatDateSpanish(infoStep?.day3);
    const horaSustentacion = infoStep?.hour3;
    const commemorativeText = institutionalInfo?.commemorativeText;

    return (
        <PdfBase
            showCommemorativeText={false}
            showFooter={false}
            showHeader={false}
            // commemorativeText={commemorativeText}
        >

            {/* Título Principal */}
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 14, marginBottom: 5}]}>
                ANEXO 3
            </Text>
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 16, marginBottom: 15}]}>
                INDIVIDUAL DE SUSTENTACIÓN
            </Text>

            {/* Cuerpo del documento */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.6, marginBottom: 10 }]}>
                    En las instalaciones del {aulaSustentacion} de la Facultad de Administración y Ciencias Sociales de la Universidad Nacional Micaela Bastidas de Apurímac, siendo horas las {horaSustentacion} del día {fechaSustentacion}, se realizó la sustentación de:
                </Text>
            </View>

            {/* Tipo de trabajo */}
            <View style={{ marginLeft: 40, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 11, width: 180 }}>Trabajo de Investigación ( )</Text>
                    <Text style={{ fontSize: 11 }}>Tesis ( X )</Text>
                </View>
                <Text style={{ fontSize: 11 }}>Tesis en formato de Artículo Científico ( )</Text>
            </View>

            {/* Título de la tesis */}
            <View style={styles.section}>
                <Text style={[styles.bold, { fontSize: 11, marginBottom: 5 }]}>
                    Titulado: <Text style={{ fontFamily: 'Times-Roman' }}>"{title}"</Text>
                </Text>
            </View>

            {/* Información del bachiller */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 5 }]}>
                    Presentado por {combinedNames}
                </Text>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 5 }]}>
                    Con asesoría de:
                </Text>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Asesor Responsable: <Text style={styles.bold}>{adviserNames}</Text>
                </Text>
                {coadviserNames && (
                    <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                        Segundo Asesor: <Text style={styles.bold}>{coadviserNames}</Text>
                    </Text>
                )}
            </View>

            {/* Grado a optar */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Perteneciente a la Escuela Profesional de Administración
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Para optar: <Text style={styles.bold}>TÍTULO PROFESIONAL DE LICENCIADO EN ADMINISTRACIÓN</Text>
                </Text>
            </View>

            {/* Calificación */}
            <View style={styles.section}>
                <Text style={[styles.bold, { fontSize: 11, marginBottom: 10 }]}>
                    Otorgándole la siguiente calificación:
                </Text>
            </View>

            {/* Tabla de evaluación */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000' }}>
                    <Text style={{ width: '40%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 10, fontFamily: 'Times-Bold' }}>
                        Ítems
                    </Text>
                    <Text style={{ width: '60%', padding: 5, fontSize: 10, fontFamily: 'Times-Bold', textAlign: 'center' }}>
                        Escala
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderTopWidth: 0, borderColor: '#000' }}>
                    <Text style={{ width: '40%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 10 }}></Text>
                    <View style={{ width: '60%', flexDirection: 'row' }}>
                        <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 9, textAlign: 'center', fontFamily: 'Times-Bold' }}>
                            Deficiente{'\n'}0
                        </Text>
                        <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 9, textAlign: 'center', fontFamily: 'Times-Bold' }}>
                            Regular{'\n'}1
                        </Text>
                        <Text style={{ width: '34%', padding: 5, fontSize: 9, textAlign: 'center', fontFamily: 'Times-Bold' }}>
                            Correcto{'\n'}2
                        </Text>
                    </View>
                </View>

                {/* Filas de la tabla */}
                {[
                    { title: 'Revisión del informe', bold: true },
                    { title: 'a)  Calidad de la redacción' },
                    { title: 'b)  Claridad de los objetivos' },
                    { title: 'c)  Presentación de materiales y métodos' },
                    { title: 'd)  Presentación de los resultados' },
                    { title: 'e)  Pertinencia de la discusión y consistencia de las conclusiones' },
                    { title: 'Calificación de la sustentación', bold: true },
                    { title: 'a)  Calidad de la exposición' },
                    { title: 'b)  Solvencia al responder las preguntas del jurado' },
                    { title: 'c)  Capacidad de autocrítica' },
                    { title: 'd)  Importancia de los resultados' },
                    { title: 'e)  Presencia Personal' },
                    { title: 'Puntaje Total', bold: true },
                ].map((row, index) => (
                    <View key={index} style={{ flexDirection: 'row', borderWidth: 1, borderTopWidth: 0, borderColor: '#000' }}>
                        <Text style={[
                            { width: '40%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 10 },
                            row.bold && { fontFamily: 'Times-Bold' }
                        ]}>
                            {row.title}
                        </Text>
                        <View style={{ width: '60%', flexDirection: 'row' }}>
                            <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5 }}></Text>
                            <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5 }}></Text>
                            <Text style={{ width: '34%', padding: 5 }}></Text>
                        </View>
                    </View>
                ))}
            </View>
        </PdfBase>
    );
};

export default PdfEightThree;
