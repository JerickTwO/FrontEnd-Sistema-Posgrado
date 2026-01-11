import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-8';
import { formatDateSpanish, } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfEightFour = ({ infoStep, institutionalInfo }) => {

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


    // Campos del cuarto documento
    const aulaSustentacion = infoStep?.location4;
    const fechaSustentacion = formatDateSpanish(infoStep?.day4);
    const segundaHora = infoStep?.hour5;
    const horaSustentacion = infoStep?.hour4;
    const commemorativeText = institutionalInfo?.commemorativeText;

    return (
        <PdfBase
            showCommemorativeText={true}
            showFooter={false}
            showHeader={false}
            commemorativeText={commemorativeText}
        >
            {/* Encabezado centrado */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={[styles.bold, { fontSize: 12, marginBottom: 5 }]}>Anexo 04</Text>
                <Text style={[styles.bold, { fontSize: 14 }]}>ACTA DE SUSTENTACIÓN</Text>
            </View>

            {/* Párrafo de introducción */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.6, marginBottom: 15 }]}>
                    En las instalaciones del {aulaSustentacion} de la Escuela Profesional de Ingeniería Informática y Sistemas de la Universidad Nacional Micaela Bastidas de Apurímac, siendo horas las {horaSustentacion} de la mañana del día {fechaSustentacion}, se reúnen los miembros del jurado evaluador:
                </Text>
            </View>

            {/* Lista de jurado */}
            <View style={{ marginLeft: 30, marginBottom: 15 }}>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    -    Presidente                : {presidentNames}
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    -    Primer miembro        : {firstMemberNames}
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    -    Segundo miembro     : {secondMemberNames}
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    -    Accesitario               : {accessoryNames}
                </Text>
            </View>

            {/* Párrafo de evaluación */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.6, marginBottom: 10 }]}>
                    Para evaluar la sustentación de:
                </Text>
            </View>

            {/* Tipo de trabajo */}
            <View style={{ marginLeft: 30, marginBottom: 10 }}>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    Trabajo de investigación ( )    Tesis ( X )    Tesis en Formato de Artículo científico ( )
                </Text>
            </View>

            {/* Título de la tesis */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Titulado:<Text style={styles.bold}> "{title}"</Text>
                </Text>
            </View>

            {/* Presentado por */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Presentado por {combinedNames}
                </Text>
            </View>

            {/* Con asesoría de */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 3 }]}>
                    Con asesoría de:
                </Text>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 5 }]}>
                    Asesor Responsable: <Text style={styles.bold}>{adviserNames}</Text>
                </Text>
                {coadviserNames && (
                    <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                        Coasesor: <Text style={styles.bold}>{coadviserNames}</Text>
                    </Text>
                )}
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Perteneciente a la Escuela Profesional de Administración
                </Text>
            </View>

            {/* Para optar */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 15 }]}>
                    Para optar        : <Text style={styles.bold}>TÍTULO PROFESIONAL DE LICENCIADO EN ADMINISTRACIÓN DE EMPRESAS</Text>
                </Text>
            </View>

            {/* Concluida la sustentación */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Concluida la sustentación el jurado evaluador, en cumplimiento al Art. 69º del reglamento de Investigación dictamina:
                </Text>
            </View>

            {/* Opciones de resultado */}
            <View style={{ marginLeft: 30, marginBottom: 15 }}>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    APROBAR (      )                                           DESAPROBAR (      )
                </Text>
            </View>

            {/* Calificación */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 10 }]}>
                    Otorgando la siguiente calificación:
                </Text>
            </View>

            {/* Lista de calificaciones */}
            <View style={{ marginLeft: 30, marginBottom: 15 }}>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    i.    Desaprobado.                                              ........................        [      ]
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    ii.   Aprobado bueno.                                        ........................        [      ]
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    iii.  Aprobado muy bueno.                               ........................        [      ]
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 3 }}>
                    iv.  Aprobado excelente con distinción.         ........................        [      ]
                </Text>
            </View>

            {/* Cierre del acta */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, marginBottom: 30 }]}>
                    Siendo {segundaHora} horas del mismo día y fecha, se concluye con el acto de sustentación.
                </Text>
            </View>

            {/* Firmas */}
            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50 }}>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, borderTopWidth: 1, borderColor: '#000', paddingTop: 3, width: '100%', textAlign: 'center' }}>
                            Firma y sello del Presidente
                        </Text>
                    </View>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, borderTopWidth: 1, borderColor: '#000', paddingTop: 3, width: '100%', textAlign: 'center' }}>
                            Firma y sello 1er miembro
                        </Text>
                    </View>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, borderTopWidth: 1, borderColor: '#000', paddingTop: 3, width: '100%', textAlign: 'center' }}>
                            Firma y sello 2do miembro
                        </Text>
                    </View>
                </View>
            </View>

            {/* Observaciones */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 10 }}>
                    Observaciones:_________________________________________________________________________
                </Text>
            </View>
        </PdfBase>
    );
};

export default PdfEightFour;
