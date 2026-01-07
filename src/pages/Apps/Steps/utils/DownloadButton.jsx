import { PDFDownloadLink } from "@react-pdf/renderer";

const DownloadDocs = ({ infoStepTable, PdfDocument, fileName, institutionalInfo }) => {
    return (
        <PDFDownloadLink
            document={<PdfDocument infoStep={infoStepTable} institutionalInfo={institutionalInfo}/>}
            fileName={fileName}
        >
            {({ loading }) =>
                loading
                    ? 'Generando PDF…'
                    : <button className="btn btn-sm btn-outline-primary">
                        Descargar
                    </button>
            }
        </PDFDownloadLink>
    );
};

export default DownloadDocs;
