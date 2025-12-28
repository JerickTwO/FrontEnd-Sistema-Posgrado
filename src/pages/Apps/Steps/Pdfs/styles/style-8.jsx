import { StyleSheet } from '@react-pdf/renderer';

// Style Sheet
const styles = StyleSheet.create({
    pageStyle: {
        height: '100vh',
    },
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        fontFamily: 'Times-Roman',
        justifyContent: 'space-between',
        padding: '0px 60px',
        height: '78%',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    textHeader: {
        fontSize: 18,
        paddingHorizontal: 70,
        textAlign: 'center',
        marginBottom: 5,
    },
    logo: {
        marginBottom: 15,
    },
    headerSection: {
        fontSize: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 40,
        textDecoration: 'underline',
        textAlign: 'center',
        marginTop: 19,
    },
    underline: {
        borderTop: '1px dashed #000',
        paddingHorizontal: 180,
        paddingBottom: 15,
    },
    textMain: {
        fontSize: 14,
        marginTop: 10,
    },
    body: {
        textAlign: 'justify',
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 1.1,
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
        marginTop: 10,
    },
    watermarkContainer: {
        position: 'absolute',
        bottom: 10,
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