import PdfBase from './pdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/style-5.jsx';
import { getWrittenDateFromInput, getYear } from '../utils/Dates.jsx';
import { extractAdvisersInfo, extractJurysInfo, extractStudentsInfo, getBachillersLabel } from '../utils/StringUtils.jsx';

const PdfFiveTwo = ({ infoStep }) => {
    const FIVE_STEP_INFO = infoStep;
    const THREE_STEP_INFO = FIVE_STEP_INFO?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const anio = getYear();
    const actaCode = `${infoStep?.numeroActa}-${anio}`;
    const horaInicio = infoStep?.horaActaSorteo;
    const fechaActa = getWrittenDateFromInput(infoStep?.fechaActaSorteo);
    const cartaMultiple = infoStep.cartNumber;
    const segundoCartaMultiple = infoStep.segundoCartNumber;
    const cartaFecha = getWrittenDateFromInput(infoStep?.fechaSorteoJurados);
    const segundaCartaFecha = getWrittenDateFromInput(infoStep?.segundaFechaCarta);
    const articleNumber = infoStep?.numeroArticulo;
    // const segundoArticleNumber = infoStep?.segundoNumeroArticulo;
    const numeroResolucion = infoStep?.numeroResolucion;
    const segundoNumeroResolucion = infoStep?.segundoNumeroResolucion;
    const horaSorteo = infoStep?.horaSorteoJurados;

    const { studentsNames, title } = extractStudentsInfo(FIRST_STEP_INFO);
    const { adviserNames, coAdviserNames } = extractAdvisersInfo(FIVE_STEP_INFO);
    const { presidentNames, firstMemberNames, secondMemberNames, accessoryNames } = extractJurysInfo(FIVE_STEP_INFO);

    const table = {
        row: { flexDirection: 'row' },
        cellCondicion: { width: '35%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 11 },
        cellDato: { width: '65%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 11 },
        headerCell: { fontFamily: 'Times-Bold' },
        tableWrap: { marginTop: 6, marginBottom: 10 },
    };

    return (
        <PdfBase commemorativeText={false} registrationNumber={infoStep?.regNumber}>
            <Text style={styles.h1}>ACTA DE SORTEO DE JURADOS – {actaCode}</Text>

            <View style={styles.section}>
                <Text style={styles.justify}>
                    En la Oficina de la Unidad de Investigación, siendo las {horaInicio} del día {fechaActa}, bajo la convocatoria del Director de la Unidad de Investigación, a través de la CARTA
                    MULTIPLE Nº {cartaMultiple}-D-UI-FA-UNAMBA, de fecha {cartaFecha} y CARTA MULTIPLE Nº {segundoCartaMultiple}-D-UI-FA-UNAMBA, de fecha {segundaCartaFecha}, se realiza el sorteo de
                    jurados, de la tesis titulada: "{title}", presentado por {getBachillersLabel(FIRST_STEP_INFO?.student, FIRST_STEP_INFO?.studentTwo)}:
                </Text>
                <Text style={[styles.bold, { fontSize: 12, marginTop: 6 }]}>{studentsNames || ''}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>
                    Acto seguido, el Director encargado de la Unidad de Investigación, en cumplimiento de sus funciones, tomando en consideración el artículo {articleNumber}° 
                    {/* y artículo{' '}{segundoArticleNumber}°  */}
                    del Reglamento de Investigación 2024 de la Universidad Nacional Micaela Bastidas de Apurímac, aprobado con Resolución Nº {numeroResolucion}-CU-UNAMBA, y la
                    Resolución Decanal Nº {segundoNumeroResolucion}-D-FA-UNAMBA, se procede con el sorteo de jurados evaluadores y; en estricto orden de precedencia, queda conformado de la siguiente
                    manera:
                </Text>
            </View>

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
                {coAdviserNames && (
                    <View style={table.row}>
                        <Text style={table.cellCondicion}>Segundo Asesor</Text>
                        <Text style={table.cellDato}>{coAdviserNames}</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>Se da por concluido el acto académico del sorteo de jurados, siendo las {horaSorteo} del mismo día.</Text>
            </View>

            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente</Text>
        </PdfBase>
    );
};

export default PdfFiveTwo;
