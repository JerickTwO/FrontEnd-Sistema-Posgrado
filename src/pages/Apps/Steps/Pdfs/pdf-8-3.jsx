import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-8';
import { formatDateSpanish, getWrittenDate } from '../utils/Dates';
import { extractAdvisersInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfEightThree = ({ infoStep }) => {
    const FIVE_STEP_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive;
    const THREE_STEP_INFO = FIVE_STEP_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const {
        combinedNamesOnly,
        title,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    const { adviserNames, coAdviserNames } = extractAdvisersInfo(FIVE_STEP_INFO);

    // Campos del tercer documento
    const aulaSustentacion = infoStep?.location3;
    const fechaSustentacion = formatDateSpanish(infoStep?.day3);
    const horaSustentacion = infoStep?.hour3;
    return (
        <PdfBase
            showCommemorativeText={false}
            showFooter={false}
            showHeader={false}
        >
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 14, marginBottom: 5}]}>
                ANEXO 3
            </Text>
            <Text style={[styles.bold, { textAlign: 'center', fontSize: 16, marginBottom: 15}]}>
                INDIVIDUAL DE SUSTENTACIÓN
            </Text>
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.6, marginBottom: 10 }]}>
                    En las instalaciones del {aulaSustentacion} de la Universidad Nacional Micaela Bastidas de Apurímac, siendo horas las {horaSustentacion} del día {fechaSustentacion}, fue realizada la evaluación 
                    Individual de la sustentación de:
                </Text>
            </View>
            <View style={{ marginLeft: 5, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 5, gap: 25}}>
                    <Text style={{ fontSize: 11 }}>Trabajo de Investigación ( )</Text>
                    <Text style={{ fontSize: 11 }}>Tesis ( X )</Text>
                    <Text style={{ fontSize: 11 }}>Tesis en formato de Artículo Científico ( )</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={[ { fontSize: 11, marginBottom: 5 }]}>
                    Titulado: <Text style={{ fontFamily: 'Times-Roman', ...styles.bold }}>"{title}"</Text>
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 5 }]}>
                    Presentado por <Text style={styles.bold}>{combinedNamesOnly}</Text>
                </Text>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 5 }]}>
                    Con asesoría de:
                </Text>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Asesor Responsable: <Text style={styles.bold}>{adviserNames}</Text>
                </Text>
                {coAdviserNames && !coAdviserNames.includes('UNDEFINED') && (
                    <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                        Segundo Asesor: <Text style={styles.bold}>{coAdviserNames}</Text>
                    </Text>
                )}
            </View>
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
            <View style={styles.section}>
                <Text style={[styles.bold, { fontSize: 11, marginBottom: 10 }]}>
                    Otorgándole la siguiente calificación:
                </Text>
            </View>
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
                        {row.bold ? (
                            <Text style={[
                                { width: '100%', padding: 5, fontSize: 10, fontFamily: 'Times-Bold' }
                            ]}>
                                {row.title}
                            </Text>
                        ) : (
                            <>
                                <Text style={[
                                    { width: '40%', borderRightWidth: 1, borderColor: '#000', padding: 5, fontSize: 10 }
                                ]}>
                                    {row.title}
                                </Text>
                                <View style={{ width: '60%', flexDirection: 'row' }}>
                                    <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5 }}></Text>
                                    <Text style={{ width: '33%', borderRightWidth: 1, borderColor: '#000', padding: 5 }}></Text>
                                    <Text style={{ width: '34%', padding: 5 }}></Text>
                                </View>
                            </>
                        )}
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 30, marginBottom: 10, alignItems: 'center' }}>
                <View style={{ borderTopWidth: 1, borderColor: '#000', width: '40%', marginBottom: 5 }}></View>
                <Text style={{ fontSize: 10, fontFamily: 'Times-Roman' }}>
                    Firma del Presidente del Jurado
                </Text>
            </View>
        </PdfBase>
    );
};

export default PdfEightThree;
