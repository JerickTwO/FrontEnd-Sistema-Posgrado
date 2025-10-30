import PdfBaseStyles from './styles/PdfBaseStyles';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import styles from './styles/PdfThreeCStyles';
import Logo from './BANNER2025.png';
import WatermarkLogo from './marcaAgua.png';
import { formatNumberWithZero, getWrittenDateFromInput, getYear, getWrittenDate } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfThreeC = ({ infoStep, institutionalInfo, incrementFields }) => {
    const anio = getYear();
    const THREE_STEP_INFO = infoStep;

    const TWO_STEP_INFO = infoStep?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;
    const coadviser = TWO_STEP_INFO?.coadviser || {};

    const { adviserNames, coAdviserNames } = extractAdvisersInfo(TWO_STEP_INFO);
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(THREE_STEP_INFO);
    const { title, career } = extractStudentsInfo(FIRST_STEP_INFO);

    const firstStudent = FIRST_STEP_INFO?.student;
    const secondStudent = FIRST_STEP_INFO?.studentTwo;

    const firstStudentNames = `${firstStudent?.firstNames} ${firstStudent?.lastName} ${firstStudent?.middleName || ''}`;
    const secondStudentNames = `${secondStudent?.firstNames} ${secondStudent?.lastName} ${secondStudent?.middleName || ''}`;

    const fut = getWrittenDateFromInput(infoStep?.futDate);

    const commemorativeText = institutionalInfo?.commemorativeText;
    return (
        <Document>
            <Page size="A4">
                <View>
                    <View style={PdfBaseStyles.header}>
                        <View style={PdfBaseStyles.headerSection}>
                            <Image style={PdfBaseStyles.banner} src={Logo} />
                        </View>
                    </View>
                    <View style={PdfBaseStyles.container}>
                        <View>
                            <Text style={PdfBaseStyles.headerSection}>{commemorativeText}</Text>
                            <View style={{ textAlign: 'justify' }}>
                                <Text style={styles.textHeader}>Tamburco, {getWrittenDate()}</Text>

                                {/* Fecha y número de carta */}
                                <Text style={styles.h1}>
                                    CARTA Nº {incrementFields.carta}-{anio}-DUI-FI-UNAMBA.
                                </Text>
                                {/* Dirigido a */}
                                <Text style={{ fontSize: 12 }}>Señor:</Text>
                                <Text style={{ fontSize: 11 }}>{institutionalInfo?.deanName}</Text>
                                <Text style={[styles.bold, { fontSize: 12 }]}>Decano de la Facultad de Ingeniería – UNAMBA</Text>
                                <Text>
                                    <Text style={[styles.underline, { fontSize: 9 }]}>CIUDAD</Text>.-.
                                </Text>
                                <View style={styles.semiTable}>
                                    {/* Row 1 */}
                                    <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                                        <Text style={[styles.semiTableColHeader, styles.bold]} wrap={false}>
                                            ASUNTO:
                                        </Text>
                                        <View style={styles.semiTableCol}>
                                            <Text>
                                                <Text style={styles.bold}>
                                                    {' '}
                                                    Remito Informe de Tesis del Bach.
                                                    {secondStudent ? `${firstStudentNames} y Bach. ${secondStudentNames}` : firstStudentNames}, para su PRIMERA revisión.
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                    {/* Referencias */}

                                    <View style={styles.semiTableRow}>
                                        <Text style={[styles.semiTableColHeader, styles.bold]}>Ref.:</Text>
                                        <View style={styles.semiTableCol}>
                                            <Text>
                                                <Text>FUT de fecha {fut}</Text>
                                                <Text style={styles.bold}> REG. Nº {formatNumberWithZero(infoStep?.reg || institutionalInfo?.regNumber)}</Text>
                                            </Text>
                                            {typeof infoStep?.additionalInputs === 'string' &&
                                                infoStep.additionalInputs.length > 0 &&
                                                infoStep.additionalInputs.split(',').map((input, idx) => <Text key={idx}>{input.trim()}</Text>)}
                                        </View>
                                    </View>
                                </View>
                                {/* Cuerpo del texto */}
                                <View style={styles.section}>
                                    <Text style={styles.text}>De mi mayor consideración: </Text>
                                    <Text style={{ marginTop: 10, lineHeight: 1.2 }}>
                                        Es grato dirigirme a su despacho, para saludarlo cordialmente, y a la vez solicitar la resolución de aprobación de designación de jurados a favor del Bach.
                                        <Text style={styles.bold}> {firstStudentNames}</Text> quien presentó la tesis titulada:
                                        <Text style={styles.bold}>{title},</Text> y en reunión llevada a cabo el día {getWrittenDateFromInput(infoStep?.secondNumberDeanResolution)}{' '}
                                        con la Comisión de Investigación de la <Text style={styles.bold}>EAP. {career}</Text>, se realizó el respectivo sorteo para la{' '}
                                        <Text style={styles.bold}>Designación de Jurados </Text>
                                        quedando conformado por los docentes que detallo a continuación:
                                    </Text>
                                    <View style={styles.section}>
                                        <View style={[styles.table, styles.bold, { marginVertical: 10 }]}>
                                            {/* Presidente */}
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableColHeader}>{presidentNames}</Text>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.bold}>PRESIDENTE</Text>
                                                </View>
                                            </View>

                                            {/* Primer Miembro */}
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableColHeader}>{firstMemberNames}</Text>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.bold}>PRIMER MIEMBRO</Text>
                                                </View>
                                            </View>

                                            {/* Segundo Miembro */}
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableColHeader}>{secondMemberNames}</Text>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.bold}>SEGUNDO MIEMBRO</Text>
                                                </View>
                                            </View>

                                            {/* Accesitario */}
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableColHeader}>{accessoryNames}</Text>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.bold}>ACCESITARIO</Text>
                                                </View>
                                            </View>

                                            {/* Asesor */}
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableColHeader}>{adviserNames}</Text>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.bold}>ASESOR</Text>
                                                </View>
                                            </View>
                                            {coadviser && (
                                                <View style={styles.tableRow}>
                                                    <Text style={styles.tableColHeader}>{coAdviserNames}</Text>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.bold}>SEGUNDO ASESOR</Text>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <Text> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
                                    <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente,</Text>
                                </View>
                            </View>
                            <View style={PdfBaseStyles.watermarkContainer}>
                                <Image src={WatermarkLogo} style={PdfBaseStyles.watermarkImage} />
                            </View>
                        </View>
                        <View style={PdfBaseStyles.footerText}>
                            <Text>C. c.</Text>
                            <Text>Archivo</Text>
                            <Text>REG. N° {formatNumberWithZero(infoStep?.reg || incrementFields.regNumber)}</Text>
                            {typeof infoStep?.textattached === 'string' &&
                                infoStep.textattached.length > 0 &&
                                infoStep.textattached.split(',').map((input, idx) => <Text key={idx}>{input.trim()}</Text>)}
                            <View style={PdfBaseStyles.hr} />
                            <View style={PdfBaseStyles.footerInfo}>
                                <Text>Av. Inca Garcilaso de la Vega S/N Tamburco, Abancay | (083) 636 050 | www.unamba.edu.pe</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfThreeC;
