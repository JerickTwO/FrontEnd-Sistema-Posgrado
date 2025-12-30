import PdfBase from './pdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/style-5.jsx';
import { getYear } from '../utils/Dates.jsx';

const PdfFiveTwo = ({ infoStep }) => {
    const anio = getYear();
    const actaCode = `${infoStep?.cartNumber}-${anio}`;
    const horaInicio = infoStep?.horaInicio || '10:00 am';
    const horaFin = infoStep?.horaFin || '10:15 am';
    const fechaActa = infoStep?.fechaActa || 'viernes 08 de agosto de 2025';
    const cartaMultiple = infoStep?.cartaMultiple || 'CARTA MÚLTIPLE Nº 023-2025-D-UI-FA-UNAMBA';
    const cartaFecha = infoStep?.cartaFecha || '07 de agosto de 2025';
    const tituloTesis = infoStep?.tituloTesis || '“Marketing en redes sociales y su relación con la experiencia del cliente en empresas formales del sector pastelerías de la ciudad de Abancay, 2025”';
    const presentados = infoStep?.presentados || 'SHABELY SALDIVAR ORTIZ, ESTEFANY INDIRA BRICEÑO SALAS';

    const formatTeacher = (t) => {
        if (!t) return null;
        const first = t.firstNames || t.nombres || '';
        const last = t.lastName || t.apellidos || '';
        return `${first} ${last}`.trim();
    };

    const stepThree = infoStep?.reportReviewStepFour?.juryAppointmentStepThree;

    const dash = '—';
    const presidente = (stepThree?.president && formatTeacher(stepThree.president))
        || infoStep?.presidente || dash;
    const primerMiembro = (stepThree?.firstMember && formatTeacher(stepThree.firstMember))
        || infoStep?.primerMiembro || dash;
    const segundoMiembro = (stepThree?.secondMember && formatTeacher(stepThree.secondMember))
        || infoStep?.segundoMiembro || dash;
    const accesitario = (stepThree?.accessory && formatTeacher(stepThree.accessory))
        || infoStep?.accesitario || dash;
    const asesor = (stepThree?.projectApprovalStepTwo?.adviser && formatTeacher(stepThree.projectApprovalStepTwo.adviser))
        || infoStep?.asesor || dash;
    const segundoAsesor = (stepThree?.projectApprovalStepTwo?.coadviser && formatTeacher(stepThree.projectApprovalStepTwo.coadviser))
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
                    En la Oficina de la Unidad de Investigación, siendo las {horaInicio} del día {fechaActa}, bajo la convocatoria del Director de la Unidad de Investigación, a través de la {cartaMultiple}, de fecha {cartaFecha}, se realiza el sorteo de jurados, de la tesis titulada: {tituloTesis}, presentado por las Bachilleres: {presentados}.
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
