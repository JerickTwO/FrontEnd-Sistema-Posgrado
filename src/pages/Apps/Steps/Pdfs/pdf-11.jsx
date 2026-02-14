import { Text, View } from '@react-pdf/renderer';
import PdfBase from './pdfBase';
import styles from './styles/style-11';
import { formatDateSpanish, formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';

const PdfEleven = ({ infoStep, institutionalInfo }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const stepTen = infoStep?.titleDeliveryStepTen || {};
    const stepNine = stepTen?.resolutionStepNine || {};
    const FIRST_STEP_INFO =
        stepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo
            ?.titleReservationStepOne;

    const { combinedNamesOnly, title } = extractStudentsInfo(FIRST_STEP_INFO || {});
    const tituloTesis = title || 'TÍTULO DE LA TESIS';

    const cartaNumero = formatNumberWithZero(infoStep?.cartNumber || infoStep?.id);
    const regNumber = infoStep?.reg;
    const deanName = institutionalInfo?.deanName;
    const commemorativeText = institutionalInfo?.commemorativeText;
    const additionalInputsList =
        typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0
            ? infoStep.additionalInputs
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
            : null;
    const lugarSustentacion = infoStep?.school || stepNine?.location;
    const fechaSustentacion = formatDateSpanish(infoStep?.day);
    const horaSustentacion = infoStep?.hour || stepNine?.hour || '__:__';
    const articleNumber = institutionalInfo?.paso11NumeroArticulo || 'S/N';

    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={regNumber}>
            <View style={{ alignItems: 'flex-end', marginBottom: 2 }}>
                <Text style={styles.tamburco}>Tamburco, {actualDate}</Text>
            </View>

            <Text style={[styles.bold, { marginBottom: 5, fontSize: 12, textDecoration: 'underline' }]}>
                CARTA N° {cartaNumero}-{anio}-D-UI-FA-UNAMBA
            </Text>

            <View style={styles.section}>
                <Text style={styles.body}>Señor:</Text>
                <Text style={[ { fontSize: 10 }]}>{deanName}</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>DECANO DE LA FACULTAD DE ADMINISTRACIÓN</Text>
                <Text style={[styles.bold, { fontSize: 10 }]}>UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC</Text>
                <Text style={[styles.bold, { marginTop: 10, fontSize: 10, textDecoration: 'underline' }]}>Presente.-</Text>
            </View>

            {/* Asunto */}
            <View style={[styles.section, { marginTop: 8 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.body}>Asunto</Text>
                    <Text style={styles.body}> : Solicito emitir resolución de aprobación de sustentación de tesis de {combinedNamesOnly}</Text>
                </View>
            </View>

            {/* Referencia */}
            <View style={styles.section}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.body}>Ref.     : Solicitud S/N°</Text>
                        {additionalInputsList && additionalInputsList.map((input, idx) => (
                            <Text key={idx} style={[styles.body, { marginTop: 2, marginLeft: 70 }]}>
                                {input}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.body}>Reg. N° {regNumber}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.body}>De mi mayor consideración:</Text>
            </View>

            {/* Cuerpo de la carta */}
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Es grato dirigirme a usted para saludarlo cordialmente y a la vez solicitar la aprobación mediante acta resolutivo la sustentación de Tesis titulada:{' '}
                    <Text style={styles.bold}>“{tituloTesis}”</Text>, de <Text style={styles.bold}>{combinedNamesOnly}</Text>, llevado a cabo de forma presencial el día{' '}
                    <Text>{fechaSustentacion}</Text>, a horas <Text>{horaSustentacion}</Text>, en las instalaciones del{' '}
                    <Text>{lugarSustentacion} - UNAMBA</Text>.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.justify}>En cumplimiento al Artículo {articleNumber} del Reglamento de Investigación de la Facultad de Administración, adjunto:</Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 6 }}>
                <Text style={styles.body}>- Informe final del Presidente de Jurado Evaluador</Text>
                <Text style={styles.body}>- Informe de sustentación de tesis del presidente de Jurado Evaluador</Text>
                <Text style={styles.body}>- Acta de Sustentación (Anexo 4)</Text>
                <Text style={styles.body}>- Dictamen Individual de Jurados</Text>
                <Text style={styles.body}>- Copia simple de memorando de fecha y hora de sustentación de tesis</Text>
                <Text style={styles.body}>- Constancia de entrega de empastado y CD</Text>
                <Text style={styles.body}>- Resolución de aprobación de proyecto de tesis</Text>
                <Text style={styles.body}>- Resolución de designación de jurados</Text>
            </View>

            <View style={[styles.section, { marginTop: 12 }]}>
                <Text style={styles.justify}>Sin otro en particular, es propicia la oportunidad para expresarle las muestras de mi especial consideración y estima personal.</Text>
            </View>

            {/* Firma */}
            <View style={{ marginTop: 20 }}>
                <Text style={[styles.bold, { textAlign: 'center', fontSize: 12 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfEleven;
