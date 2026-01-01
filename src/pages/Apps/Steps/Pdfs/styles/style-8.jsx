import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    pageStyle: {
        height: '100vh',
    },
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        fontFamily: 'Times-Roman',
        padding: '40px 60px', // Aumentamos padding superior para el banner del PdfBase
        height: '100%',
    },
    section: {
        fontSize: 12,
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    // Estilo para el texto curvo/itálico de arriba (si no lo maneja PdfBase)
    headerSection: {
        fontSize: 9,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    // Fecha alineada a la derecha
    tamburco: {
        fontSize: 11,
        textAlign: 'right',
        marginBottom: 10,
    },
    // El número de carta (CARTA N° 001-...)
    letterId: {
        fontSize: 11,
        fontFamily: 'Times-Bold',
        marginBottom: 15,
        textDecoration: 'underline',
    },
    // Texto general de la carta
    body: {
        fontSize: 11,
        lineHeight: 1.5, // Espaciado interlineal para mejor lectura
    },
    justify: {
        fontSize: 11,
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    // Estilos para el destinatario
    recipient: {
        fontSize: 11,
        marginBottom: 2,
    },
    // Ajuste de marcas de agua y decoraciones
    watermarkContainer: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        opacity: 0.1,
        zIndex: -1,
    },
    watermarkImage: {
        width: 350,
        height: 350,
    },
    // Footer - Texto muy pequeño como en la imagen
    footerText: {
        fontSize: 8,
        fontFamily: 'Times-Roman',
    },
    hr: {
        borderBottom: '1pt solid #e5e7eb', // Un gris suave es más elegante que rojo puro
        marginVertical: 5,
    },
    footerInfo: {
        textAlign: 'center',
        fontSize: 9,
        color: '#4b5563',
    },
});

export default styles;