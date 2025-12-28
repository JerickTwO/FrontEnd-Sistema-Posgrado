import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { formatNumberWithZero, getYear,getWrittenDate  } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfFourCM = ({ infoStep }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const THREE_STEP_INFO = infoStep?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { combinedNamesOnly, career, title } = extractStudentsInfo(FIRST_STEP_INFO);

    return (
        <PdfBase commemorativeText={false} >
            <View >
                <Text style={styles?.h1}>
                    CONSTANCIA DE SIMILITUD
                </Text>
                <Text style={styles?.h2}>
                    Nº{formatNumberWithZero(infoStep.deanResolution)}-{anio}-D-UIFA-UNAMBA
                </Text>
                <View style={styles?.section}>
                    <Text style={styles?.justify}>
                        EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE
                        ADMINISTRACIÓN DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE
                        APURÍMAC
                    </Text>
                    <Text style={[styles?.justify, { marginTop: '10px' }]}>
                        HACE CONSTAR:
                    </Text>
                </View>
                <View style={styles?.section}>
                    <Text style={styles?.justify}>
                        Que, el bachiller <Text style={[styles?.bold, styles?.justify]}>{combinedNamesOnly}</Text> estudiante de la
                        Escuela Academica Profesional de <Text style={styles?.bold}> {career}</Text>, ha presentado el informe de tesis titulada: <Text style={styles?.bold}>{title}</Text>.
                        Para ser evaluado mediante filtro de similitud de acuerdo al Art. <Text style={styles?.bold}>{infoStep?.articleNumber}</Text> del Reglamento de Investigación vigente,
                        el cual obtuvo un porcentaje del <Text style={styles?.bold}>{infoStep?.secondArticleNumber}%</Text> de similitud, según el reporte proporcionado por el software Turnitin.
                    </Text>
                </View>
                <View style={styles?.section}>
                    <Text style={styles?.justify}>Se expide la presente, a solicitud del interesado, para los fines que estime conveniente.</Text>
                    <Text style={[{ textAlign: 'right' }, { marginTop: '12px' }]} >Tamburco, {actualDate}</Text>
                </View>
                <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfFourCM;
