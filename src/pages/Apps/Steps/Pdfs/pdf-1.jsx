import PdfBase from './pdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { getWrittenDateYearWrite, getYear } from '../utils/Dates';
import { buildFormattedStudentLine, extractStudentsInfo } from '../utils/StringUtils';

const Pdfone = ({ infoStep, incrementFields, institutionalInfo }) => {
    const anio = getYear();
    const {
        title,
        career,
    } = extractStudentsInfo(infoStep);
    const combinedNames = buildFormattedStudentLine(infoStep);
    
    const commemorativeText = institutionalInfo?.commemorativeText || '';

    return (
        <pdfBase registrationNumber={infoStep?.reg || institutionalInfo?.regNumber} showCommemorativeText={true} commemorativeText={commemorativeText}>
            <Text style={styles.h1}>
                CONSTANCIA Nº {incrementFields?.constacia}-{anio}-D. UIFI-UNAMBA
            </Text>

            <Text style={[styles.p, { textAlign: 'justify' }]}>
                EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC
            </Text>
            <Text style={styles.p}>
                HACE CONSTAR:
            </Text>


            <Text style={styles.p}>
                Que, {combinedNames}, de la Escuela Académico Profesional de{' '}
                {career} de la Facultad de Ingeniería, presentó el Proyecto de Tesis: “{title}” ,
                para ser evaluado mediante FILTRO DE SIMILITUD de acuerdo al Art.{infoStep?.articleNumber} del Reglamento de investigación vigente.

            </Text>


            <Text style={styles.p}>
                El análisis fue realizado mediante el software Turnitin bajo los siguientes parámetros:
            </Text>

            <View style={styles.ul}>
                <Text style={styles.ulLi}>• Excluir citas</Text>
                <Text style={styles.ulLi}>• Excluir bibliografía</Text>
                <Text style={styles.ulLi}>• Excluir fuentes 15 palabras</Text>
            </View>
            <Text style={styles.p}>El cual obtuvo un {infoStep?.projectSimilarity}% DE SIMILITUD tal como se puede evidenciar en el reporte adjunto.</Text>

            <Text style={styles.p}>Se expide la presente, a solicitud del interesado, a los  {getWrittenDateYearWrite()}, para los fines que estime conveniente.</Text>
            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]} >Atentamente,</Text>

        </pdfBase>
    );
};

export default Pdfone;
