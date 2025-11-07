import { useState } from "react";
import useIncrementRegNumber from "../utils/IncrementRegNumber";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DownloadDocs = ({ infoStepTable, PdfDocument, fileName, fields = {},institutionalInfo }) => {
    const { incrementFields, loading } = useIncrementRegNumber();
    const [incrementedFields, setIncrementedFields] = useState(null);

    const handleGenerateReg = async () => {
        if (!incrementedFields) {
            const response = await incrementFields(fields);
            setIncrementedFields(response);
        }
    };

    if (loading || !incrementedFields) {
        return (
            <button
                onClick={handleGenerateReg}
                disabled={loading}
                className="btn btn-sm btn-outline-primary"
            >
                {loading ? 'Generando registro…' : 'Obtener comprobante'}
            </button>
        );
    }

    return (
        <>
            <button
                onClick={handleGenerateReg}
                disabled={loading}
                className="btn btn-sm btn-outline-primary"
            >
                {loading ? 'Generando registro…' : 'Obtener comprobante'}
            </button>
            <PDFDownloadLink
                document={<PdfDocument infoStep={infoStepTable} incrementFields={incrementedFields} institutionalInfo={institutionalInfo}/>}
                fileName={fileName}
            >
                {({ loading }) =>
                    loading
                        ? 'Generando PDF…'
                        : <button className="btn btn-sm btn-outline-primary">
                            Descargar comprobante
                        </button>
                }
            </PDFDownloadLink>
        </>
    );
};

export default DownloadDocs;
