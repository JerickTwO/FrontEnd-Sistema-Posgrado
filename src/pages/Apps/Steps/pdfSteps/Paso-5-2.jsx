import styles from './styles/PdfFive';
import Logo from './BANNER2025.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { getYear, getWrittenDate, formatNumberWithZero } from '../utils/Dates';
import WatermarkLogo from './marcaAgua.png';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfFiveCN = ({ infoStep, incrementFields }) => {
    const anio = getYear();
    const actualData = getWrittenDate();

    const FIRST_STEP_INFO = infoStep?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne;
    const {
        title,
        career,
        combinedNamesOnly
    } = extractStudentsInfo(FIRST_STEP_INFO);

    return (
        <Document>
            <Page size="A4" style={styles.pageStyle}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={Logo} />
                    <Text style={[styles.title, styles.bold]}>CONSTANCIA DE ORIGINALIDAD</Text>
                    <Text style={[styles.textHeader, styles.bold]}>Nº {incrementFields?.constacia}-{anio}</Text>
                </View>
                <View style={styles.page}>

                    <View style={styles.watermarkContainer}>
                        <Image src={WatermarkLogo} style={styles.watermarkImage} />
                    </View>
                    <View style={styles.flexCol}>

                        <Text style={styles.body}>

                            La Universidad Nacional Micaela Bastidas de Apurímac,
                            a través de la Unidad de Investigación de la Facultad
                            de Ingeniería declara que, la Tesis intitulada
                            <Text style={styles.bold}> “{title}”</Text>,
                            presentado por <Text style={styles.bold}>{combinedNamesOnly}</Text>, para
                            optar el Título de <Text style={styles.bold}> {career}; </Text>
                            ha sido sometido a un mecanismo de evaluación y
                            verificación de similitud, a través del Software
                            COMPILATIO Magister, siendo el índice de similitud
                            ACEPTABLE de ({infoStep?.projectSimilarity}%) por lo que, cumple con los criterios
                            de originalidad establecidos por la Universidad.

                        </Text>

                        <Text style={{ alignSelf: 'flex-end' }} >Abancay, {actualData}</Text>

                    </View>

                    <View style={styles.footerText}>
                        <Text>C. c.</Text>
                        <Text>Archivo</Text>
                        <Text>REG. N° {formatNumberWithZero(infoStep?.reg)}</Text>
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

export default PdfFiveCN;