import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import Logo from './images/BANNER2025.png';
import styles from './styles/styleBase';
import { formatNumberWithZero } from '../utils/Dates';
import WatermarkLogo from './images/marcaAgua.png';
const ConstancyVoucher = ({
    showCommemorativeText,
    commemorativeText,
    children,
    registrationNumber
}) => (
    <Document>
        <Page wrap size="A4">
            <View wrap={false}>
                <View style={styles.header}>
                    <View style={styles.headerSection}>
                        <Image style={styles.banner} src={Logo} />
                    </View>
                    {/* Mostrar texto conmemorativo si está habilitado */}
                </View>
                <View wrap={false} style={styles.container}>
                    <View>
                        {showCommemorativeText && (
                            <Text style={styles.headerSection}>{commemorativeText}</Text>
                        )}
                        <View wrap={false}>
                            {children}
                        </View>
                        <View style={styles.watermarkContainer}>
                            <Image src={WatermarkLogo} style={styles.watermarkImage} />
                        </View>

                    </View>
                    <View style={styles.footerText}>
                        <Text>C. c.</Text>
                        <Text>Archivo</Text>
                        <Text>REG. N° {formatNumberWithZero(registrationNumber)}</Text>
                        <View style={styles.hr} />
                        <View style={styles.footerInfo}>
                            <Text>Av. Inca Garcilaso de la Vega S/N Tamburco, Abancay | (083) 636 050 | www.unamba.edu.pe</Text>
                        </View>
                    </View>
                </View>

            </View>
        </Page>
    </Document>
);

// Definir valores por defecto para las props
ConstancyVoucher.defaultProps = {
    showCommemorativeText: true,
    commemorativeText:
        '“AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS DE JUNÍN Y AYACUCHO”',
};


export default ConstancyVoucher;
