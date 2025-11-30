import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { extractStudentsInfo } from '../utils/StringUtils';
import { getWrittenDate, formatNumberWithZero } from '../utils/Dates';

const PdfThree = ({ infoStep, institutionalInfo }) => {

    const THREE_STEP_INFO = infoStep;
    const TWO_STEP_INFO = THREE_STEP_INFO?.projectApprovalStepTwo;
    const FIRST_STEP_INFO = TWO_STEP_INFO?.titleReservationStepOne;
    const regNumber = infoStep?.reg;
    const actualDate = getWrittenDate();

    const { combinedNamesOnly, title, career } = extractStudentsInfo(FIRST_STEP_INFO);
    const deanName = institutionalInfo?.deanName;
    const cartNumber = `${formatNumberWithZero(infoStep?.deanResolution)}-${actualDate}`;
    const articleNumber = infoStep?.secondDeanResolution;

    return (
        <PdfBase commemorativeText={false} registrationNumber={infoStep?.reg}>
            <View style={styles.section}>
                <Text style={styles.right}>Tamburco, {actualDate}</Text>
            </View>
            <Text style={styles.h1}>CARTA N° {cartNumber}-D-UI-FA-UNAMBA</Text>
            <View style={styles.section}>
                <Text style={styles.down}>Señor:</Text>
                <Text>{deanName}</Text>
                <Text style={styles.bold}>DECANO DE LA FACULTAD DE {(career).toUpperCase()}</Text>
                <Text style={styles.bold}>UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURIMAC</Text>
            </View>
            <View style={styles.section}>
                <Text style={[styles.bold, styles.underline]}>Presente.-</Text>
            </View>
            <View style={styles.section}>
                <Text><Text>Asunto</Text>                      :Formalizar aprobación del Proyecto de tesis.</Text>
                <Text><Text>Ref.</Text>                           :Solicitud S/N</Text>
                <Text><Text style={styles.right}>Reg. N°</Text> {regNumber}</Text>
            </View>
            <View style={styles.section}>
                <Text style={{ marginVertical: '10px' }}>De mi mayor consideración;</Text>
                <Text style={styles.justify}>
                    Es sumamente grato dirigirme a su autoridad, para saludarlo cordialmente y al mismo tiempo remito
                    a su despacho el expediente del proyecto de tesis titulado: <Text style={styles.bold}>“{title}”</Text>
                    , presentado por <Text style={styles.bold}>{combinedNamesOnly}</Text> con la finalidad
                    de que sea formalizado mediante acto resolutivo según el Artículo <Text style={styles.bold}>{articleNumber}
                    </Text> del Reglamento de Investigación; para lo cual, se adjunta lo siguiente:
                </Text>
            </View>
            <View style={styles.ul}>
                <Text style={styles.ulLi}>1. Copia simple de bachiller</Text>
                <Text style={styles.ulLi}>2. Constancia de filtro de similitud menor a 25%</Text>
                <Text style={styles.ulLi}>3. Informe de asesoría Anexo 1 del Asesor</Text>
                <Text style={styles.ulLi}>4. CTI vitae del Asesor</Text>
                <Text style={styles.ulLi}>5. Validación de Instrumentos (06)</Text>
                <Text style={styles.ulLi}>6. Recibo de pago</Text>
                <Text style={styles.ulLi}>7. Proyecto de tesis 01 CD.</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.justify}>Sin otro en particular, aprovecho la ocasión para renovarle las muestras de mi especial consideración.</Text>
            </View>
            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente;</Text>
        </PdfBase>
    );
};

export default PdfThree;
