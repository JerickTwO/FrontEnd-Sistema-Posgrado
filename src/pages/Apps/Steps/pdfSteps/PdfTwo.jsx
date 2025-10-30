import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { getWrittenDateFromInput, getWrittenDate, getYear, formatNumberWithZero } from '../utils/Dates';
import { extractAdvisersInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfTwo = ({ infoStep, institutionalInfo, incrementFields }) => {
    const deanName = institutionalInfo?.deanName;
    const anio = getYear();
    const FIRST_STEP_INFO = infoStep?.titleReservationStepOne;
    const { combinedNames, title, career } = extractStudentsInfo(FIRST_STEP_INFO);
    const { adviserNames, coAdviserNames } = extractAdvisersInfo(infoStep);
    const actualData = getWrittenDate();
    return (
        <PdfBase commemorativeText={false} registrationNumber={infoStep?.reg || incrementFields.regNumber}>
            <Text style={styles?.h1}>
                INFORME Nº {formatNumberWithZero(incrementFields.informe)}-{anio}-D. UIFI-UNAMBA
            </Text>
            <View style={styles?.table}>
                {/* Row 1 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>A</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text> {deanName}
                        </Text>
                        <Text>Decano de la Facultad de Ingeniería – UNAMBA</Text>
                    </View>
                </View>

                {/* Row 2 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>ASUNTO</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text>
                            <Text style={styles?.bold}>Remito expediente para aprobación de Proyecto de Tesis.</Text>
                        </Text>
                    </View>
                </View>

                {/* Row 3 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>REF.</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text> SOLICITUD de
                            <Text> {getWrittenDateFromInput(infoStep?.referenceDate)}</Text>
                            <Text style={styles?.bold}> Reg. N° {formatNumberWithZero(infoStep?.reg)}</Text>
                        </Text>
                        <Text>Anexo 4 (Docente Asesor)</Text>
                    </View>
                </View>

                {/* Row 4 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>FECHA</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text>
                            <Text>Abancay, {actualData}</Text>
                        </Text>
                    </View>
                </View>
                <Text>-------------------------------------------------------------------------------------------------------------</Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    Por intermedio del presente, me dirijo a usted, para informarle que, <Text style={styles?.bold}>{combinedNames}</Text>, Bachiller de la
                    <Text style={styles?.bold}> E.A.P. de {career}</Text> de la Facultad de Ingeniería, ha presentado el proyecto de tesis titulado: <Text style={styles?.bold}>{title}</Text>; cuyo
                    asesor es el <Text style={styles?.bold}>{adviserNames}</Text>{' '}
                    {infoStep.coadviser && (
                        <>
                            <Text> y Segundo Asesor </Text>
                            <Text style={[styles?.bold, styles?.blueText]}>{coAdviserNames}</Text>
                        </>
                    )}
                    , en cumplimiento con los requisitos exigidos para la
                    <Text style={styles?.bold}> aprobación del proyecto de tesis</Text> según reglamento de investigación UNAMBA (Artículos
                    <Text style={styles?.bold}> {infoStep?.articleNumber}</Text>), adjunto los antecedentes que detallo a continuación:
                </Text>
            </View>

            {/* Resto del contenido permanece igual */}
            <View style={styles?.ul}>
                <Text style={styles?.ulLi}>1. Solicitud de aprobación de proyecto de tesis</Text>
                <Text style={styles?.ulLi}>2. Anexo 4 (Informe de asesoría según reglamento de investigación)</Text>
                <Text style={styles?.ulLi}>3. Constancia de filtro de similitud y reporte de Software COMPILATIO magister</Text>
                <Text style={styles?.ulLi}>4. Ejemplar de proyecto de tesis en físico.</Text>
                <Text style={styles?.ulLi}>5. Constancias de haber aprobado Metodología de investigación.</Text>
                <Text style={styles?.ulLi}>6. Pagos de S/.20.00 por concepto de revisión y aprobación de proyecto de tesis</Text>
                <Text style={styles?.ulLi}>7. CTI Vitae de CONCYTEC de Asesor.</Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    En concordancia a los artículos {infoStep?.secondArticleNumber} del Reglamento de Investigación UNAMBA vigente, la Dirección de la Unidad de Investigación de la Facultad de
                    Ingeniería <Text style={styles?.underline}>cumple con elevar el presente informe para la formalización y aprobación del presente proyecto de tesis mediante acto resolutivo.</Text>{' '}
                    Indicando que el interesado a partir de la aprobación del proyecto, tiene un plazo máximo de un año para la ejecución del proyecto de tesis, pudiendo ampliarse por seis meses,
                    previa justificación del Asesor.
                </Text>
            </View>
            <View style={styles?.section}>
                <Text>Es todo cuanto tengo que informarle para su conocimiento y fines pertinentes.</Text>
            </View>
            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente,</Text>
        </PdfBase>
    );
};

export default PdfTwo;
