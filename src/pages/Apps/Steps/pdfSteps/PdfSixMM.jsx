import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
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

    const dayWithAddedOne = new Date(infoStep?.day);
    dayWithAddedOne.setDate(dayWithAddedOne.getDate() + 1);

    const formattedDayWithAddedOne = formatDateSpanish(dayWithAddedOne);
    return (
        <PdfBase showCommemorativeText={false} registrationNumber={infoStep?.reg || institutionalInfo?.regNumber}>
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
                            <Text style={styles.bold}>                                         REG. Nº {formatNumberWithZero(infoStep?.reg || institutionalInfo?.regNumber)}</Text>
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
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente me dirijo a Ustedes, con la finalidad de poner en su conocimiento que, en mérito al Artículo {infoStep?.articleNumber} del Reglamento de Investigación, se ha programado la fecha y hora de sustentación de Tesis
                    "{title}", presentado por {combinedNamesOnly}
                </Text>

                <View style={styles.semiTable}>
                    {/* Row 1 */}
                    <View style={{ marginTop: "5px" }}>
                        <Text style={[styles.semiTableCol, styles.bold]} >DÍA: <Text style={styles.noBold}>{formattedDayWithAddedOne}</Text></Text>
                    </View>
                    <View style={{ marginTop: "5px" }}>
                        <Text style={[styles.semiTableCol, styles.bold]} >HORA: <Text style={styles.noBold}>{infoStep.hour} horas</Text></Text>
                    </View>

                    <View style={{ marginVertical: "5px" }}>
                        <Text style={[styles.semiTableCol, styles.bold]} >LUGAR: <Text style={styles.noBold}>Auditorio de la EAP. {career} ({infoStep?.location})</Text></Text>
                    </View>


                </View>
                <Text style={styles.p}>
                    Para tal efecto, adjunto al presente los antecedentes que detallo a continuación:
                </Text>

                <View style={styles.ul}>
                    <Text style={styles.ulLi}>• Solicitud del interesado</Text>
                    <Text style={styles.ulLi}>• Resolución de aprobación de proyecto de tesis</Text>
                    <Text style={styles.ulLi}>•	Resolución de designación de jurados</Text>
                    <Text style={styles.ulLi}>• Informe final de Tesis en físico</Text>
                </View>
                <Text style={[styles.p]}>Sin otro en particular, aprovecho la oportunidad para expresarle las muestras de mi especial consideración y deferencia personal.</Text>
                <Text style={[styles.bold, { textAlign: 'center' }]} >Atentamente,</Text>
            </View>
        </PdfBase >
    );
};

export default PdfSixMM;