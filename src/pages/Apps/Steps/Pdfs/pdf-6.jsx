import PdfBase from './pdfBase';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from './styles/style-6';
import { formatNumberWithZero, getYear, getWrittenDate } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfSixMM = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();

    const FIVE_STEP_INFO = infoStep?.constancyThesisStepFive;
    const THREE_STEP_INFO = FIVE_STEP_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { adviserNames, coAdviserNames } = extractAdvisersInfo(FIVE_STEP_INFO);
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(FIVE_STEP_INFO);
    const { combinedNamesOnly, title } = extractStudentsInfo(FIRST_STEP_INFO);
    const articleNumber = infoStep?.articleNumber;
    const contactEmail = infoStep?.secondDeanResolution;
    const commemorativeText = institutionalInfo?.commemorativeText ;
    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={infoStep?.reg}>
            
            <Text style={{ textAlign: 'right', fontSize: 12, }}>
                Abancay, {getWrittenDate()}
            </Text>
            <Text style={styles.h1}>
                MEMORANDO MULTIPLE Nº {infoStep?.memorandoMult}-{anio}-D. UI-FI-UNAMBA.
            </Text>
            <View style={styles.section}>
                <Text style={[styles.bold, styles.textTableHeader]}>
                    SEÑORES:
                </Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{presidentNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                : <Text style={styles.bold} >Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{firstMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                : <Text style={styles.bold} >Primer Miembro</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{secondMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                : <Text style={styles.bold} >Segundo Miembro</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{accessoryNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                : <Text style={styles.bold} >Accesitario</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{adviserNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                : <Text style={styles.bold} >Asesor</Text>
                            </Text>
                        </View>
                    </View>
                    {FIVE_STEP_INFO?.coadviser && (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>
                                {coAdviserNames}
                            </Text>
                            <View style={styles.tableCol}>
                                <Text>
                                    : <Text style={styles.bold} >Segundo Asesor</Text>
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={styles.semiTableColHeader} wrap={false}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}>Revisión y aprobación de informe de tesis.</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}
                <View style={[styles.semiTableRow, styles.customTable]}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        {typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0 ? (
                            (() => {
                                const inputs = infoStep.additionalInputs.split(',');
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        <Text>{inputs[0].trim()}</Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={styles.bold}>REG. Nº {formatNumberWithZero(infoStep?.reg)}</Text>
                                    </View>
                                );
                            })()
                        ) : null}
                        {typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0 &&
                            infoStep.additionalInputs.split(',').slice(1).map((input, idx) => (
                                <Text key={idx}>
                                    {input.trim()}
                                </Text>
                            ))}
                    </View>
                </View>
               
            </View>
            <Text>******************************************************</Text>
            <View style={[styles.section, styles.gap]}>
                <Text style={styles.p}>
                    Previo un cordial saludo, mediante el presente remito Informe de Tesis titulada: <Text style={styles.bold}>“{title}”</Text>, presentado por: <Text style={styles.bold}>{combinedNamesOnly}</Text>.
                </Text>

                <Text style={styles.p}>
                    Una vez recibido el trabajo de investigación o tesis por los jurados evaluadores, se procederá a evaluar en forma y fondo en un plazo de quince días hábiles. Los miembros están obligados a participar en las diferentes etapas de la revisión del informe; su incumplimiento constituye falta sujeta a sanción prevista en el Estatuto de la UNAMBA y normas conexas.
                </Text>
                <Text style={styles.p}>
                    Dentro de los días establecidos en el Art. {articleNumber}, el Jurado evaluador devolverá el trabajo de investigación o tesis con las observaciones realizadas a la interesada al siguiente correo <Link src={`mailto:${contactEmail}`}>{contactEmail}</Link> y a la Dirección de la Unidad de Investigación; en caso de ser aprobado, será el presidente quien eleve el informe final a la Unidad de Investigación para su trámite correspondiente.
                </Text>
                <Text style={[styles.bold, { textAlign: 'center' }]} >Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfSixMM;