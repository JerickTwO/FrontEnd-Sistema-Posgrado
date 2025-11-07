import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeCMStyles';
import { formatNumberWithZero, getYear, getWrittenDate } from '../utils/Dates';
import { extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfThreeCM = ({ infoStep, institutionalInfo, incrementFields }) => {
    console.log("infoStep in PdfThreeCM:", infoStep);
    console.log("institutionalInfo in PdfThreeCM:", institutionalInfo);
    const anio = getYear();
    const THREE_STEP_INFO = infoStep;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const {
        combinedNames,
        title,
        career,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    const { presidentNames, firstMemberNames, secondMemberNames } = extractJurysInfo(THREE_STEP_INFO);
    const commemorativeText = institutionalInfo?.commemorativeText || '';

    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={infoStep?.reg || institutionalInfo?.regNumber}>
            <Text style={styles.textHeader}>
                Tamburco, {getWrittenDate()}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA MULTIPLE Nº {incrementFields?.cart_multiple}-{anio}-D. UI-FI-UNAMBA.
            </Text>

            {/* Dirigido a */}
            <View style={styles.section}>
                <Text style={[styles.bold, styles.textTableHeader]}>
                    SEÑORES: Jurados Evaluadores de Tesis de la EAP. {career}
                </Text>
                <View style={styles.table}>
                    {/* Row 1 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{presidentNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text>Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{firstMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Primer Miembro</Text>
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{secondMemberNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Segundo Miembro</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={styles.semiTableColHeader} >ASUNTO:</Text>
                    <View style={[styles.semiTableCol, { textAlign: 'justify' }]}>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={[styles.bold, { textAlign: 'justify' }]} wrap={false}> {combinedNames} </Text>
                        </Text>
                    </View>
                </View>

                {/* Referencias */}
                <View style={[styles.semiTableRow, styles.customTable]}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>SOLICITUD de fecha {infoStep?.refDateMCart}</Text>
                            <Text style={styles.bold}>                          REG. Nº {formatNumberWithZero(infoStep?.reg || institutionalInfo?.regNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {infoStep?.deanResolution}-DFI-UNAMBA</Text>
                        <Text>RESOLUCIÓN DECANAL Nº {infoStep?.secondDeanResolution}-DFI-UNAMBA</Text>
                    </View>
                </View>
            </View>

            {/* Cuerpo del texto */}
            <View style={styles.section}>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente comunico a ustedes que, en cumplimiento del Art {infoStep.articleNumber} del Reglamento de Investigación vigente, se remite los documentos y las Resoluciones de la referencia y un ejemplar de la tesis titulada:
                </Text>
                <Text style={styles.bold}>
                    "{title}".
                </Text>
                <Text style={{ margin: '10px 0' }}>
                    <Text>
                        En ese sentido, remito dicho expediente para su
                    </Text>
                    <Text style={styles.bold}> PRIMERA </Text>
                    <Text>
                        revisión conforme indica el
                    </Text>
                    <Text style={styles.bold}> Art {infoStep.secondArticleNumber} del Reglamento de Investigación. </Text>
                    <Text style={styles.underline}>“Una vez recibido los trabajos de investigación o tesis, por los jurados evaluadores, se procederá a evaluar en forma y fondo en un plazo máximo de 15 días hábiles. Los miembros del jurado están obligados a participar en las diferentes etapas de la revisión del informe”; su incumplimiento constituye falta sujeta a sanción prevista en el estatuto de la UNAMBA y normas conexas. </Text>
                </Text>
                <Text>Sin otro en particular, aprovecho la oportunidad para expresarle las muestras de mi especial consideración y deferencia personal.</Text>
                <Text style={[styles.bold, { marginTop: '10px' }, { textAlign: 'center' }, { fontSize: '12px' }]} >Atentamente,</Text>

            </View>
        </PdfBase>
    );
};

export default PdfThreeCM;