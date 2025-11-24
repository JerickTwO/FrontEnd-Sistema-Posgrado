import { useState } from "react";
import useIncrementRegNumber from "../utils/IncrementRegNumber";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const DownloadDocs = ({ infoStepTable, PdfDocument, fileName, fields = {},institutionalInfo }) => {
    const { incrementFields, loading } = useIncrementRegNumber();
    const [incrementedFields, setIncrementedFields] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

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
            <button
                onClick={() => setShowPreview(true)}
                className="btn btn-sm btn-outline-info"
            >
                Ver Preview
            </button>
            <PDFDownloadLink
                document={<PdfDocument infoStep={infoStepTable} incrementFields={incrementedFields} institutionalInfo={institutionalInfo}/>}
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

            <Transition appear show={showPreview} as={Fragment}>
                <Dialog as="div" open={showPreview} onClose={() => setShowPreview(false)} className="relative z-[51]">
                    <div className="fixed inset-0 bg-[black]/60" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] dark:bg-[#121c2c] px-5 py-3">
                                    <h5 className="text-lg font-medium">Vista Previa del PDF</h5>
                                    <button type="button" onClick={() => setShowPreview(false)} className="text-white-dark hover:text-dark">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-5" style={{ height: '80vh' }}>
                                    <PDFViewer width="100%" height="100%" showToolbar={true}>
                                        <PdfDocument infoStep={infoStepTable} incrementFields={incrementedFields} institutionalInfo={institutionalInfo}/>
                                    </PDFViewer>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default DownloadDocs;
