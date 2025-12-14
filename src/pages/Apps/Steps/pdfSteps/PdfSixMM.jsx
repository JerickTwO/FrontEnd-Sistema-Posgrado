import PdfBase from './PdfBase';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from './styles/PdfSixMMStyles';
import { formatNumberWithZero, getYear, getWrittenDateFromInput, getWrittenDate, formatDateSpanish } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfSixMM = ({ infoStep, incrementFields }) => {
    const anio = getYear();

    const THREE_STEP_INFO = infoStep?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { adviserNames, coAdviserNames } = extractAdvisersInfo(TWO_STEP_INFO);
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(THREE_STEP_INFO);
    const { combinedNamesOnly, title, career } = extractStudentsInfo(FIRST_STEP_INFO);
    const articleNumber = infoStep?.articleNumber || '46';
    const contactEmail = infoStep?.email || '182009@unamba.edu.pe';


    const dayWithAddedOne = new Date(infoStep?.day);
    dayWithAddedOne.setDate(dayWithAddedOne.getDate() + 1);

    const formattedDayWithAddedOne = formatDateSpanish(dayWithAddedOne);
    return (
        <PdfBase showCommemorativeText={false} registrationNumber={infoStep?.reg}>
            <Text style={styles.h1}>
                MEMORANDO MULTIPLE Nº {incrementFields?.memorando_mult}-{anio}-D. UI-FI-UNAMBA.
            </Text>
            <Text>{formattedDayWithAddedOne}</Text>
            <View style={styles.section}>
                <Text style={[styles.bold, styles.textTableHeader]}>
                    SEÑORES:
                </Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{presidentNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text>Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{firstMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Primer Miembro</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{secondMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Segundo Miembro</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{accessoryNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Accesitario</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{adviserNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Asesor</Text>
                        </View>
                    </View>
                    {TWO_STEP_INFO?.coadviser && (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>
                                {coAdviserNames}
                            </Text>
                            <View style={styles.tableCol}>
                                <Text style={styles.bold}>Segundo Asesor</Text>
                            </View>
                        </View>
                    )}
                </View>
                <Text style={[styles.bold, styles.fontSizeTableSubTitle, { marginTop: 8 }]}>
                    MIEMBROS JURADO EVALUADOR Y ASESOR DE TESIS EAP. {career}
                </Text>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={styles.semiTableColHeader} wrap={false}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}>Comunico fecha y hora de sustentación de Tesis de manera Presencial.</Text>
                        </Text>
                    </View>
                </View>

                {/* Referencias */}
                <View style={[styles.semiTableRow, styles.customTable]}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>Fut de fecha {getWrittenDateFromInput(infoStep?.futDate)}</Text>
                            <Text style={styles.bold}>                                         REG. Nº {formatNumberWithZero(infoStep?.reg)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {infoStep?.deanResolution}-DFI-UNAMBA</Text>
                        <Text>RESOLUCIÓN DECANAL Nº {infoStep?.secondDeanResolution}-DFI-UNAMBA</Text>
                        {typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0 && (
                            infoStep.additionalInputs
                                .split(',')
                                .map((input, idx, arr) => (
                                    <Text key={idx}>
                                        {input.trim()}
                                    </Text>
                                ))
                        )}
                    </View>
                </View>
                <View style={[styles.semiTableRow, styles.customTable]}>
                    <Text style={styles.semiTableColHeader}>Fecha: </Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            Tamburco, {getWrittenDate()}
                        </Text>
                    </View>
                </View>
            </View>
            <Text>-------------------------------------------------------------------------</Text>
            <View style={styles.section}>
                <Text style={styles.p}>
                    Previo un cordial saludo, mediante el presente remito Informe de Tesis titulada: <Text style={styles.bold}>“{title}”</Text>, presentado por el Bachiller: <Text style={styles.bold}>{combinedNamesOnly}</Text>.
                </Text>
                <Text style={styles.p}>
                    Una vez recibido el trabajo de investigación o tesis por los jurados evaluadores, se procederá a evaluar en forma y fondo en un plazo de quince días hábiles. Los miembros están obligados a participar en las diferentes etapas de la revisión del informe; su incumplimiento constituye falta sujeta a sanción prevista en el Estatuto de la UNAMBA y normas conexas.
                </Text>
                <Text style={styles.p}>
                    Dentro de los días establecidos en el Art. {articleNumber}, el Jurado evaluador devolverá el trabajo de investigación o tesis con las observaciones realizadas a la interesada al siguiente correo <Link src={`mailto:${contactEmail}`}>{contactEmail}</Link> y a la Dirección de la Unidad de Investigación; en caso de ser aprobado, será el presidente quien eleve el informe final a la Unidad de Investigación para su trámite correspondiente.
                </Text>
                <Text style={[styles.p]}>Sin otro en particular, aprovecho la oportunidad para expresarle las muestras de mi especial consideración y deferencia personal.</Text>
                <Text style={[styles.bold, { textAlign: 'center' }]} >Atentamente,</Text>
            </View>
        </PdfBase >
    );
};

export default PdfSixMM;