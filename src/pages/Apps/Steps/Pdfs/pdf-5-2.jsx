import PdfBase from './pdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/style-5.jsx';
import { getYear } from '../utils/Dates.jsx';
import { extractStudentsInfo } from '../utils/StringUtils.jsx';

const PdfFiveTwo = ({ infoStep }) => {
    const THREE_STEP_INFO = infoStep?.reportReviewStepFour?.juryAppointmentStepThree;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;

    const anio = getYear();
    const actaCode = `${infoStep?.cartNumber}-${anio}`;
    const horaInicio = infoStep?.horaInicio;
    const horaFin = infoStep?.horaFin;
    const fechaActa = infoStep?.fechaActa;
    const cartaMultiple = infoStep?.cartaMultiple;
    const cartaFecha = infoStep?.cartaFecha;

    const { combinedNamesOnly, title } = extractStudentsInfo(FIRST_STEP_INFO);

    const formatTeacher = (t) => {
        if (!t) return null;
        const first = t.firstNames || t.nombres || '';
        const last = t.lastName || t.apellidos || '';
        return `${first} ${last}`.trim();
    };

    const dash = '—';
    const presidente = (infoStep?.president && formatTeacher(infoStep.president))
        || infoStep?.presidente || dash;
    const primerMiembro = (infoStep?.firstMember && formatTeacher(infoStep.firstMember))
        || infoStep?.primerMiembro || dash;
    const segundoMiembro = (infoStep?.secondMember && formatTeacher(infoStep.secondMember))
        || infoStep?.segundoMiembro || dash;
    const accesitario = (infoStep?.accessory && formatTeacher(infoStep.accessory))
        || infoStep?.accesitario || dash;
    const asesor = (infoStep?.adviser && formatTeacher(infoStep.adviser))
        || infoStep?.asesor || dash;
    const segundoAsesor = (infoStep?.coadviser && formatTeacher(infoStep.coadviser))
        || infoStep?.segundoAsesor || null;

    const table = {
        row: { flexDirection: 'row' },
        cellCondicion: { width: '35%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 11 },
        cellDato: { width: '65%', borderWidth: 1, borderColor: '#000', padding: 4, fontSize: 11 },
        headerCell: { fontFamily: 'Times-Bold' },
        tableWrap: { marginTop: 6, marginBottom: 10 }
    };

    return (
        <PdfBase commemorativeText={false} registrationNumber={infoStep?.regNumber}>
            <Text style={styles.h1}>ACTA DE SORTEO DE JURADOS – {actaCode}</Text>

            <View style={styles.section}>
                <Text style={styles.justify}>
                    En la Oficina de la Unidad de Investigación, siendo las {horaInicio} del día {fechaActa}, bajo la convocatoria del Director de la Unidad de Investigación, a través de la {cartaMultiple}, de fecha {cartaFecha}, se realiza el sorteo de jurados, de la tesis titulada: {title}, presentado por {combinedNamesOnly}.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>
                    Acto seguido, el Director encargado de la Unidad de Investigación, en cumplimiento de sus funciones, tomando en consideración el artículo 46° del Reglamento de Investigación 2024 de la Universidad Nacional Micaela Bastidas de Apurímac, y demás resoluciones pertinentes, se procede con el sorteo de jurados evaluadores y, en estricto orden de precedencia, queda conformado de la siguiente manera:
                </Text>
            </View>

            <View style={table.tableWrap}>
                <View style={table.row}>
                    <Text style={[table.cellCondicion, table.headerCell]}>Condición</Text>
                    <Text style={[table.cellDato, table.headerCell]}>Datos Personales</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Presidente</Text>
                    <Text style={table.cellDato}>{presidente}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>1er miembro</Text>
                    <Text style={table.cellDato}>{primerMiembro}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>2do miembro</Text>
                    <Text style={table.cellDato}>{segundoMiembro}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Accesitario</Text>
                    <Text style={table.cellDato}>{accesitario}</Text>
                </View>
                <View style={table.row}>
                    <Text style={table.cellCondicion}>Asesor</Text>
                    <Text style={table.cellDato}>{asesor}</Text>
                </View>
                {segundoAsesor && (
                    <View style={table.row}>
                        <Text style={table.cellCondicion}>Segundo Asesor</Text>
                        <Text style={table.cellDato}>{segundoAsesor}</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>Se da por concluido el acto académico del sorteo de jurados, siendo las {horaFin} del mismo día.</Text>
            </View>

            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente</Text>
        </PdfBase>
    );
};

export default PdfFiveTwo;
