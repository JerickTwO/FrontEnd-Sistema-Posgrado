import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        fontSize: 12,
        marginVertical: 32,
        marginTop: 2,
        fontFamily: 'Times-Bold'
    },
    p: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'justify',
    },
    // Table Styles
    table: {
        display: 'table',
        width: 'auto',
        alignItems: 'stretch',
        textAlign: 'left',
        fontSize: 12,
        marginVertical: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '75%',
        padding: 1,
        fontFamily: 'Times-Bold',
    },

    tableCol: {
        width: '25%',
        padding: 1
    },
    // End Table Styles
    // Section Styles
    section: {
        fontSize: 12,
        textAlign: 'justify',
    },
    sectionFinal:
    {
        marginBottom: 220,
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    // End Section Styles

})
export default styles; 