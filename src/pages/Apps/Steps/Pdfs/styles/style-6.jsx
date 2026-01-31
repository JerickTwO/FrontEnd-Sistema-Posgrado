import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    h1: {
        fontSize: 12,
        marginVertical: 4,
        textDecoration: 'underline',
        fontFamily: 'Times-Bold'
    },
    h2: {
        fontSize: 14,
        fontFamily: 'Times-Bold'
    },
    textHeader: {
        textAlign: 'right',
        marginTop: 12,
        fontSize: 12,
    },
    institutionalYearHeader: {
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10,
    },
    textTableHeader: {
        fontSize: 12,
    },
    fontSizeTableSubTitle: {
        fontSize: 11,
    },
    marginSignature: {
        marginBottom: 90,
    },
    // Section Styles
    underline: {
        textDecoration: 'underline',
    },
    section: {
        fontSize: 12,
        textAlign: 'justify',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    noBold: {
        fontFamily: 'Times-Roman',
    },
    firm: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50,
        width: 130,
    },
    // End Section Styles
    // Table Styles
    table: {
        display: 'table',
        width: 'auto',
        alignItems: 'stretch',
        fontSize: 12,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '45%',
        padding: 1,
    },

    tableCol: {
        width: '55%',
        padding: 1
    },
    // End Table Styles

    // SemiTable Styles
    semiTable: {
        display: 'table',
        width: 'auto',
        alignItems: 'stretch',
        fontSize: 12,
    },
    semiTableRow: {
        flexDirection: 'row',
    },
    semiTableColHeader: {
        width: '15%',
        padding: 1,
    },

    semiTableCol: {
        width: '85%',
        padding: 1
    },
    // End semiTable Styles


    p: {
        fontSize: 12,
        textAlign: 'justify',
    },
    gap: {
        gap: 12,        
    },
    ul: {
        marginVertical: 5,
        paddingLeft: 20,
    },
    ulLi: {
        fontSize: 12,
        marginBottom: 5,
    },
    espaciadito: {
        marginBottom: 2,
    }
})
export default styles; 