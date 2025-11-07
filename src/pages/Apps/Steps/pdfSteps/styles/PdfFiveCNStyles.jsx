import { StyleSheet } from '@react-pdf/renderer';

// Style Sheet
const styles = StyleSheet.create({
    pageStyle: {
        height: '100vh',
        width: '100vw',
    },
    page: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        fontFamily: 'Times-Roman',
        padding: '0 60px',
        height: '81%',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    header: {
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    logo: {
        width: '95vw',
        height: 'auto',

    },
    title: {
        fontSize: 18,
        paddingTop: 25,
        textAlign: 'center',
    },
    body: {
        textAlign: 'justify',
        fontSize: 16,
        lineHeight: 1.5,
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    footerBody: {
        fontSize: 16,
        textAlign: 'right',
    },
    headerText: {
        fontSize: 7,
        fontStyle: 'italic',
    },
    footerText: {
        fontSize: 8,
        fontFamily: 'Times-Bold'
    },
    hr: {
        borderBottom: '0.5pt solid red',
    },
    footerInfo: {
        textAlign: 'right',
        fontSize: 10,
    },
    watermarkContainer: {
        position: 'absolute',
        bottom: 300,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    watermarkImage: {
        width: 300,
        height: 300,
        objectFit: 'contain',
    },
});
export default styles;