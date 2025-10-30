import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfFourCMStyles';
import { formatNumberWithZero, getYear, getWrittenDateFromInput, getWrittenDate } from '../utils/Dates';
import { extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfFourCM = ({ infoStep, institutionalInfo, incrementFields }) => {
    const anio = getYear();

    const THREE_STEP_INFO = infoStep?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(THREE_STEP_INFO);
    const { combinedNamesOnly, career, title } = extractStudentsInfo(FIRST_STEP_INFO);

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

                    {/* Row 4 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{accessoryNames}</Text>
                        <View style={styles.tableCol}>
                            <Text>Accesitario</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}> Remito Informe de Tesis {combinedNamesOnly} para su revisión.</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>SOLICITUD de fecha {getWrittenDateFromInput(infoStep?.documentDate)}</Text>
                            <Text style={styles.bold}>                                 REG. Nº {formatNumberWithZero(infoStep?.reg || institutionalInfo?.regNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {infoStep?.deanResolution}-DFI-UNAMBA</Text>
                        {typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0 && (
                            infoStep.additionalInputs
                                .split(',')
                                .map((input, idx) => (
                                    <Text key={idx}>
                                        {input.trim()}
                                    </Text>
                                ))
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente comunico a ustedes que, en cumplimiento del Art {infoStep.articleNumber} del Reglamento de
                    Investigación vigente, se remite los documentos y las Resoluciones de la referencia
                    y un ejemplar de la tesis titulada:
                </Text>
                <Text style={[styles.bold, { marginVertical: 10 }]}>
                    "{title}".
                </Text>
                <Text>
                    <Text>En ese sentido, remito dicho expediente para </Text>
                    <Text>ÚNICA revisión conforme indica el</Text>
                    <Text style={styles.bold}> Art {infoStep?.secondArticleNumber} del Reglamento de Investigación </Text>

                    <Text>
                        <Text>"el jurado evaluador se reunirá, antes de la sustentación, en un solo acto y único, fijándose fecha, hora y lugar de sustentación; esta será dentro de los diez días calendarios a la fecha de la reunión, los procedimientos administrativos, durante y después serán iguales que para la tesis convencional" </Text>
                    </Text>

                </Text>

            </View>

            {/* Cierre */}
            <View style={styles.section}>
                <Text style={{ marginTop: 12 }}>
                    Sin otro particular, aprovecho la oportunidad para expresarles las muestras de mi especial
                    consideración y deferencia personal.
                </Text>
                <Text style={[styles.sectionSign, { marginTop: 20, marginBottom: 75 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfFourCM;
