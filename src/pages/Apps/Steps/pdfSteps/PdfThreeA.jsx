import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeAStyles';
import { getWrittenDateFromInput, formatISODateToSimpleDate, getYear, formatNumberWithZero } from '../utils/Dates';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils';

const PdfThreeA = ({ infoStep, incrementFields, institutionalInfo }) => {
    const THREE_STEP_INFO = infoStep;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { combinedNamesOnly, title, career } = extractStudentsInfo(FIRST_STEP_INFO);
    const { adviserNames, coAdviserNames } = extractAdvisersInfo(TWO_STEP_INFO)
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames, } = extractJurysInfo(THREE_STEP_INFO)

    const directorMap = {
        "ingeniería de sistemas": institutionalInfo.directorIngenieriaInformaticaSistemas,
        "administración de empresas": institutionalInfo.directorAdministracionEmpresas,
        "contabilidad": institutionalInfo.directorContabilidad,
        "ingeniería civil": institutionalInfo.directorIngenieriaCivil,
        "arquitectura": institutionalInfo.directorArquitectura,
        "derecho": institutionalInfo.directorDerecho,
        "medicina": institutionalInfo.directorMedicina,
        "enfermería": institutionalInfo.directorEnfermeria,
    };
    const directorName = directorMap[career.toLowerCase()] || "Director no disponible";

    const updatedDate = infoStep?.updatedAt ? formatISODateToSimpleDate(infoStep.updatedAt) : "Fecha no disponible";
    const requestDate = getWrittenDateFromInput(updatedDate);
    const anio = getYear();
    return (
        <PdfBase commemorativeText={false} registrationNumber={infoStep?.reg || institutionalInfo?.regNumber}>
            <Text style={styles.h1}>ACTA DE DESIGNACIÓN DE JURADOS DE TESIS</Text>

            <View style={styles.section}>
                <Text>
                    En fecha {getWrittenDateFromInput(infoStep.actDate)} siendo las {infoStep.actTime} horas, reunidas de manera presencial, el director de la Unidad de Investigación de la Facultad de Ingeniería,
                    <Text style={styles.bold}> {institutionalInfo.deanName}</Text>, y miembros de la Comisión de Investigación de la
                    <Text style={styles.bold}> Escuela Académico Profesional de {career || "Carrera no disponible"}</Text>,
                    conformado por el Mgt. {directorName} y demás miembros de la comisión y en atención a la solicitud s/n presentado por
                    <Text style={styles.bold}> {combinedNamesOnly}</Text>,
                    de fecha {requestDate}, peticionando la designación de jurados para revisión del informe final de tesis denominado
                    <Text style={styles.bold}>: “{title}",</Text> aprobado mediante
                    <Text style={styles.bold}> RESOLUCIÓN DECANAL N° {infoStep?.deanResolution}-{anio}-DFI-UNAMBA</Text>.
                    Se procede a realizar la designación de jurados e incorporación de Asesor de acuerdo al
                    <Text style={styles.bold}> CAPÍTULO VII: DEL INFORME Y LA DESIGNACIÓN DE JURADOS (Art.{infoStep.articleNumber})</Text> del Reglamento de Investigación,
                    aprobado bajo <Text style={styles.bold}>RESOLUCIÓN N° {infoStep?.secondDeanResolution || "Resolución no disponible"}-{anio} – CU-UNAMBA</Text>,
                    quedando el jurado evaluador de la siguiente manera:
                </Text>
            </View>

            <View style={styles.table}>
                {/* Presidente */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {presidentNames}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Presidente</Text>
                    </View>
                </View>

                {/* Primer Miembro */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {firstMemberNames}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Primer Miembro</Text>
                    </View>
                </View>

                {/* Segundo Miembro */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {secondMemberNames}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Segundo Miembro</Text>
                    </View>
                </View>

                {/* Accesitario */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {accessoryNames}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Accesitario</Text>
                    </View>
                </View>

                {/* Asesor */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {adviserNames}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Asesor</Text>
                    </View>
                </View>

                {infoStep?.projectApprovalStepTwo?.coadviser && (
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

            <View style={[styles.section, styles.sectionFinal]}>
                <Text>
                    Siendo las {infoStep?.hour || "Hora no disponible"} horas del mismo día, se culmina la reunión, firmando este documento los participantes en señal de conformidad, el mismo que será adjuntado al libro de actas de la Unidad de Investigación de la Facultad de Ingeniería en
                    <Text style={styles.bold}> folio N° {formatNumberWithZero(incrementFields?.numero_folio)}-{anio}.</Text>

                </Text>
            </View>
        </PdfBase>
    );
};

export default PdfThreeA;
