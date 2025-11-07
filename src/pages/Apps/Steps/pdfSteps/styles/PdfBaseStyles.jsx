import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontSize: 10,
        height: '98vh',
        width:'100vw',
    },
    container: {
        margin: '0 auto',
        backgroundColor: 'white',
        fontFamily: 'Times-Roman',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 80px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },

    headerSection: {
        fontSize: 10,
        margin: '0 auto',
        padding: '0 10px',
        marginBottom: 10,
    },
    banner: {
        width: '95vw',
        height: 'auto',
    },
    footerText: {
        fontSize: 8,
        fontFamily: 'Times-Bold'
    },
    headerText: {
        fontSize: 7,
        fontStyle: 'italic',
    },
    hr: {
        marginTop: 10,
        marginBottom: 2,
        borderBottom: '0.5pt solid red',
    },
    footerInfo: {
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 5,
    },
    watermarkContainer: {
        position: 'absolute',
        top: 150,        // ajusta según la altura deseada
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    watermarkImage: {
        width: 300,         // ajusta tamaño según necesidad
        height: 300,
        objectFit: 'contain',
    },
});

export default styles;
