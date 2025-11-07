import styles from './styles/PdfEightCNStyles';
import Logo from './BANNER2025.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { getYear, formatNumberWithZero, getWrittenDateEmpresa } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';
import WatermarkLogo from './marcaAgua.png';

const PdfEightCN = ({ infoStep, institutionalInfo, incrementFields }) => {
    const currentYear = getYear();
    const commemorativeText = institutionalInfo?.commemorativeText || '';

    const FIRST_STEP_INFO = infoStep?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne;

    const {
        combinedNames,
        title,  
        dni,
        code,
        career,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    const deanResolution = formatNumberWithZero(infoStep?.deanResolution || '');
    const articleNumber = infoStep?.articleNumber || 'N/A';

    return (
        <Document>
            <Page size="A4" style={styles.pageStyle}> 
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={Logo} />
                    <Text style={styles.headerSection}>“{commemorativeText}”</Text>
                    <Text style={[styles.title, styles.bold]}>
                        CONSTANCIA Nº {formatNumberWithZero(incrementFields?.constacia)}-{currentYear}-D. UIFI-UNAMBA
                    </Text>
                </View>
                <View style={styles.page}>
                    {/* Main Content */}
                    <View>
                        <View style={styles.watermarkContainer}>
                            <Image src={WatermarkLogo} style={styles.watermarkImage} />
                        </View>
                        <Text style={[styles.textMain, { marginBottom: 15 }]}>
                            EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL
                            MICAELA BASTIDAS DE APURÍMAC.
                        </Text>
                        <Text style={[styles.textMain, { marginBottom: 5 }]}>HACE CONSTAR:</Text>
                        <Text style={styles.body}>
                            Que, <Text style={styles.bold}>{combinedNames}</Text>{' '}
                            <Text style={styles.bold}>{dni}</Text>, y con Código N°{' '}
                            <Text style={styles.bold}>{code}</Text>, Bachiller de la Escuela Académico Profesional de{' '}
                            <Text style={styles.bold}>{career}</Text>, de la Facultad de Ingeniería de la{' '}
                            <Text style={styles.bold}>Universidad Nacional Micaela Bastidas de Apurímac</Text>,{' '}
                            <Text style={styles.bold}>
                                HA CUMPLIDO CON LA PRESENTACIÓN DE 02 EMPASTADO del informe final de tesis titulado:
                            </Text>{' '}
                            <Text style={styles.bold}>
                                “{title}”
                            </Text>, debidamente refrendados con firma original de los jurados evaluadores, en mérito a la{' '}
                            <Text style={styles.bold}>
                                RESOLUCIÓN N° {deanResolution}-{currentYear}-CFI-UNAMBA
                            </Text>, que aprueba el{' '}
                            <Text style={styles.bold}>Acta de Sustentación de tesis</Text> antes mencionada.
                        </Text>
                        <Text style={styles.body}>
                            Se expide la presente constancia a solicitud del interesado, a los{' '}
                            <Text style={styles.bold}>{getWrittenDateEmpresa()}</Text>, en
                            cumplimiento del Artículo N°{' '}
                            <Text style={styles.bold}>{articleNumber} inciso (n) del Reglamento de Grados y Títulos de la UNAMBA</Text>{' '}
                            y para los fines que estime conveniente.
                        </Text>
                        <Text style={[styles.bold, { textAlign: 'center' }]} >Atentamente,</Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerText}>
                        <Text>C. c.</Text>
                        <Text>Archivo</Text>
                        <Text>REG. N° {formatNumberWithZero(infoStep?.reg || institutionalInfo?.regNumber)}</Text>
                        <View style={styles.hr} />
                        <View style={styles.footerInfo}>
                            <Text>Av. Inca Garcilaso de la Vega S/N Tamburco, Abancay | (083) 636 050 | www.unamba.edu.pe</Text>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

export default PdfEightCN;
