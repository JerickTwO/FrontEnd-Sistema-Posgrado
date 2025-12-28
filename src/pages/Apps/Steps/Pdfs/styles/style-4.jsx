import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
    },
    down: {
        marginBottom: 10,
    },
    h2: {
        textAlign: 'center',
        fontFamily: 'Times-Bold',
        fontSize: 13,
        marginVertical: 16,
        textDecoration: 'underline',
    },
    p: {
        fontSize: 14,
        marginBottom: 10,
    },
    ul: {
        marginVertical: 10,
        paddingLeft: 20,
    },
    ulLi: {
        fontSize: 14,
        marginBottom: 5,
    },
    section: {
        marginBottom: 10,
        fontSize: 14,
    },
    justify: {
        textAlign: 'justify',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    underline: {
        textDecoration: 'underline',
    },
    right: {
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        width: 60,
        fontSize: 14,
    },
    content: {
        flex: 1,
        fontSize: 14,
    },
});
export default styles;
