import PdfBase from './pdfBase.jsx';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/style-5.jsx';
import { formatNumberWithZero, getWrittenDate, getWrittenDateFromInput, getYear } from '../utils/Dates.jsx';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo } from '../utils/StringUtils.jsx';

const PdfFiveThree = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const FIVE_STEP_INFO = infoStep;
    const THREE_STEP_INFO = FIVE_STEP_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const { combinedNamesOnly, title, career } = extractStudentsInfo(FIRST_STEP_INFO);

    const deanName = institutionalInfo?.deanName;
    const commemorativeText = institutionalInfo?.commemorativeText;
    const cartaNumero = formatNumberWithZero(FIVE_STEP_INFO?.segundoCartNumber);
    const regNumber = formatNumberWithZero(FIVE_STEP_INFO?.regNumber);
    const fechaSorteo = getWrittenDateFromInput(FIVE_STEP_INFO?.segundaFechaCarta);
    const { adviserNames } = extractAdvisersInfo(FIVE_STEP_INFO);
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(FIVE_STEP_INFO);

    const table = {
        row: { flexDirection: 'row' },
        cellCondicion: { width: '35%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 10 },
        cellDato: { width: '65%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 10 },
        headerCell: { fontFamily: 'Times-Bold' },
        tableWrap: { marginTop: 10, marginBottom: 10 },
    };

    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText}>
            {/* Fecha alineada a la derecha */}
            <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
                <Text style={styles.tamburco}>Tamburco, {actualDate}</Text>
            </View>

            {/* Número de Carta */}
            <Text style={[styles.bold, { marginBottom: 15, fontSize: 11, textDecoration: 'underline' }]}>
                CARTA N° {cartaNumero}-{anio}-D-UI-FA-UNAMBA
            </Text>

            {/* Bloque del Destinatario */}
            <View style={styles.section}>
                <Text style={[styles.body, { fontSize: 10, marginBottom: 2 }]}>Señor:</Text>
                <Text style={[styles.body, { fontSize: 10, marginBottom: 2 }]}>{deanName}</Text>
                <Text style={[styles.bold, { fontSize: 10, marginBottom: 2 }]}>DECANO DE LA FACULTAD DE {career.toUpperCase()}</Text>
                <Text style={[styles.bold, { fontSize: 10, marginBottom: 10 }]}>UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURIMAC</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.bold, { fontSize: 10, marginBottom: 15 }]}>Presente.–</Text>
            </View>

            {/* Bloque de Asunto y Ref */}
            <View style={[styles.section, { marginBottom: 15, marginLeft: 80 }]}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={[styles.body, { fontSize: 10, width: 45 }]}>Asunto</Text>
                    <Text style={[styles.body, { fontSize: 10, flex: 1 }]}>:Solicito aprobar la conformación de jurados evaluadores para la revisión y sustentación de tesis.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.body, { fontSize: 10, width: 45 }]}>Ref.</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.body, { fontSize: 10 }]}>:Solicitud S/Nº</Text>
                        <Text style={[styles.body, { fontSize: 10 }]}>Reg Nº {regNumber}</Text>
                    </View>
                </View>
            </View>

            {/* Separador */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 10 }} />

            {/* Cuerpo de la carta */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.5 }]}>
                    Es grato dirigirme a usted para saludarlo cordialmente y por medio del presente, en mérito al documento de la referencia, se realizó el sorteo de jurados, en cumplimiento al Art.{' '}
                    {FIVE_STEP_INFO.segundoNumeroArticulo} del Reglamento de Investigación, por lo que, solicito emitir la resolución correspondiente de la tesis titulada: <Text style={styles.bold}>"{title}"</Text>, presentado por <Text style={styles.bold}>{combinedNamesOnly}</Text> sorteo que se
                    realizó el día {fechaSorteo}, quedando conformado de la siguiente manera:
                </Text>
            </View>

            {/* Tabla de jurados */}
            <View style={table.tableWrap}>
                <View style={table.row}>
                    <Text style={[table.cellCondicion, table.headerCell]}>Condición</Text>
                    <Text style={[table.cellDato, table.headerCell]}>Datos Personales</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Presidente</Text>
                    <Text style={table.cellDato}>{presidentNames}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>1er miembro</Text>
                    <Text style={table.cellDato}>{firstMemberNames}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>2do miembro</Text>
                    <Text style={table.cellDato}>{secondMemberNames}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Accesitario</Text>
                    <Text style={table.cellDato}>{accessoryNames}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Asesor</Text>
                    <Text style={table.cellDato}>{adviserNames}</Text>
                </View>
            </View>

            {/* Cierre */}
            <View style={styles.section}>
                <Text style={[styles.justify, { fontSize: 11, lineHeight: 1.5, marginBottom: 20 }]}>
                    Sin otro en particular, es propicia la oportunidad para expresarle las muestras de mi especial consideración y estima personal.
                </Text>
            </View>

            <Text style={[styles.bold, { textAlign: 'center', fontSize: 12 }]}>Atentamente;</Text>
        </PdfBase>
    );
};

export default PdfFiveThree;
