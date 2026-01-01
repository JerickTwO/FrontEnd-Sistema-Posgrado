import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    pageStyle: {
        height: '100vh',
    },
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        fontFamily: 'Times-Roman',
        padding: '40px 60px',
        height: '100%',
    },
    section: {
        fontSize: 12,
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    headerSection: {
        fontSize: 9,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    tamburco: {
        fontSize: 11,
        textAlign: 'right',
        marginBottom: 10,
    },
    letterId: {
        fontSize: 11,
        fontFamily: 'Times-Bold',
        marginBottom: 15,
        textDecoration: 'underline',
    },
    body: {
        fontSize: 11,
        lineHeight: 1.5,
    },
    justify: {
        fontSize: 11,
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    recipient: {
        fontSize: 11,
        marginBottom: 2,
    },
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
    footerText: {
        fontSize: 8,
        fontFamily: 'Times-Roman',
    },
    hr: {
        borderBottom: '1pt solid #e5e7eb',
        marginVertical: 5,
    },
    footerInfo: {
        textAlign: 'center',
        fontSize: 9,
        color: '#4b5563',
    },
});

export default styles;
