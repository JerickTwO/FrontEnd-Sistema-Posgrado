import PdfBase from './pdfBase';
import { Text, View, Link } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import TeacherService from '../../../../api/teacherService.jsx';
import styles from './styles/style-5.jsx';
import { formatNumberWithZero, getWrittenDate, getYear } from '../utils/Dates.jsx';

const PdfFiveOne = ({ infoStep, incrementFields }) => {
    const anio = getYear();
    const actualDate = getWrittenDate();

    const defaultNombrados = [
        'Dr. DANIEL AMILCAR PINTO PAGAZA',
        'Dr. JOSÉ ABDON SOTOMAYOR CHAHUAYLLA',
        'Dr. MAURICIO RAÚL ESCALANTE CÁRDENAS',
        'Dr. PERCY LEFITO PAZ',
        'Dra. ROSITA LETICIA VALER MONTESINOS',
        'Dra. SILVIA SOLEDAD LÓPEZ IBÁÑEZ',
        'Dr. JULIANA DE LEÓN',
        'Dra. MARÍA PAREJA PAREJA',
        'Mgt. YAMILET ADEHIM BARRIONUEVO INCA ROCA',
        'Mgt. GREGORIO GAUNA CHINO',
        'Mgt. MÁXIMO SOTO PAREJA',
        'Mgt. JOSUÉ HUAMANI CAYLLAHUA',
        'Mgt. JOSÉ CARLOS VILCA NAVÁEZ',
        'Mgt. ELIO NOLASCO CARBAJAL',
        'Dr. LUIS PORRAS DURAND',
        'Mgt. ALFREDO HUAMÁN',
        'Mgt. DAVID BARRIAL ACOSTA',
        'Mgt. WILBER OSORIO TORRES',
        'Mgt. HERMENGILDO CHACCARÁ HUACHACA',
        'Mgt. ERIKA LOA NAVARRO',
        'Mg. EDGAR MEZA MESCCO',
    ];
    const [nombrados, setNombrados] = useState(infoStep?.nombrados || defaultNombrados);

    useEffect(() => {
        const fetchNombrados = async () => {
            try {
                const teachers = await TeacherService.getTeachers();
                const activos = (teachers || []).filter(t => t.nombrado === true);
                const pref = grado => grado ? `${grado}.` : '';
                const nombres = activos.map(t => `${pref(t.degree)} ${t.firstNames} ${t.lastName} ${t.middleName}`.trim());
                if (nombres.length > 0) setNombrados(nombres);
            } catch (e) {
                console.error('Error fetching teachers for nombrados:', e);}
        };
        fetchNombrados();
    }, []);
    
    const asunto = 'COMUNICO PROGRAMACIÓN DE SORTEO DE JURADOS DE TESIS, DE MANERA PRESENCIAL Y/O VIRTUAL';
    const fechaSorteo = infoStep?.fechaSorteo || '';
    const horaSorteo = infoStep?.horaSorteo || '';
    const lugarPresencial = infoStep?.lugarPresencial || '';
    const url = infoStep?.url || '';
    const linkHref = url ? (url.startsWith('http') ? url : `https://${url}`) : '';

    return (
        <PdfBase commemorativeText={false} registrationNumber={incrementFields?.regNumber}>
            <Text style={styles.h1}>CARTA MÚLTIPLE N°{formatNumberWithZero(infoStep.cartNumber)}-{anio}</Text>
            <View style={styles.section}>
                <Text style={styles.tamburco}>Tamburco, {actualDate}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.bold}>Señores:</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '50%', marginRight: '6px' }}>
                        {nombrados.slice(0, Math.ceil(nombrados.length / 2)).map((nombre, idx) => (
                            <Text key={idx} style={styles.justify}>{nombre}</Text>
                        ))}
                    </View>
                    <View style={{ width: '50%' }}>
                        {nombrados.slice(Math.ceil(nombrados.length / 2)).map((nombre, idx) => (
                            <Text key={idx + Math.ceil(nombrados.length / 2)} style={styles.justify}>{nombre}</Text>
                        ))}
                    </View>
                </View>
            </View>
            <View style={[styles.section, { flexDirection: 'row', alignItems: 'flex-start' }]}>
                <View style={{ width: '8%', minWidth: 80 }}>
                    <Text style={styles.bold}>ASUNTO</Text>
                </View>
                <View style={{ width: '92%' }}>
                    <Text style={styles.bold}>: {asunto}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.justify}>
                    Previo cordial saludo, comunico programación de fecha y hora de sorteo de jurados para la revisión y aprobación de informe final de tesis.
                    {'\n'}La misma que está prevista para el día <Text style={styles.bold}>{fechaSorteo}</Text>, a horas <Text style={styles.bold}>{horaSorteo}</Text>, de manera presencial en el <Text style={styles.bold}>{lugarPresencial}</Text>
                    {url && (
                        <Text>
                            , y virtual Ingresar al siguiente link:
                            {'\n'}
                            {'\n'}
                        </Text>
                    )}
                    {url && (
                        <Text style={styles.bold}>  
                            <Link src={linkHref} target="_blank"> {url}</Link>
                        </Text>
                    )}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.justify}>Sin otro particular, es propicia la ocasión para expresarles mis saludos cordiales.</Text>
            </View>
            <Text style={[styles.bold, { textAlign: 'center' }, { fontSize: '12px' }]}>Atentamente,</Text>
        </PdfBase>
    );
};

export default PdfFiveOne;
