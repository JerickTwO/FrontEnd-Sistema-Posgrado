import PdfBase from './pdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/Style-7';
import { getWrittenDate, getYear, formatNumberWithZero } from '../utils/Dates';
import { extractStudentsInfo } from '../utils/StringUtils';
import { useEffect, useState } from 'react';
import InfoService from '../../../../api/InfoService';

const PdfThreeC = ({ infoStep, institutionalInfo, incrementFields }) => {
    const [memorandoMultiple, setMemorandoMultiple] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await InfoService.getInstitutionalInfo();
                setMemorandoMultiple(data);
            } catch (error) {
            }
        };
        fetchInfo();
    }, []);

    const FIRST_STEP_INFO = infoStep?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne;

    const anio = getYear();
    const futDate = infoStep?.futDate;
    const deanName = institutionalInfo?.deanName || info?.deanName;
    const {
        combinedNamesOnly,
        title,
        career,
    } = extractStudentsInfo(FIRST_STEP_INFO);

    return (
        <PdfBase registrationNumber={infoStep?.registrationNumber || institutionalInfo?.regNumber}>

            <Text style={styles.textHeader}>
                Tamburco, {getWrittenDate()}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA Nº {formatNumberWithZero(infoStep?.carta || incrementFields?.carta)}-{anio}-DUI-FI-UNAMBA.
            </Text>
            {/* Dirigido a */}
            <Text style={{ fontSize: 12 }}>Señor:</Text>
            <Text style={{ fontSize: 11 }}>{deanName}</Text>
            <Text style={[styles.bold, { fontSize: 12 }]}>Decano de la Facultad de Ingeniería – UNAMBA</Text>
            <Text><Text style={[styles.underline, { fontSize: 9 }]}>CIUDAD</Text>.-.</Text>
            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}> Remito las observaciones levantadas y solicito emisión de Resolución de sustentación de tesis aprobado en Consejo de Facultad de {combinedNamesOnly}, de la EAP. {career}</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>:CARTA Nº {infoStep?.cartNumber}-CFI-UNAMBA</Text>
                        <Text>
                            <Text>FUT de fecha {futDate}</Text>
                            <Text style={styles.bold}>                                       REG. Nº {formatNumberWithZero(infoStep?.registrationNumber || institutionalInfo?.regNumber)}</Text>
                        </Text>
                        <Text>Informe Nº {formatNumberWithZero(infoStep?.reportNumber)}-{anio}-JAEMP-EAPIA-UNAMBA</Text>
                        <Text>Acta de sustentación de tesis fe datado</Text>
                        <Text>MEMORANDO MULT. Nº {memorandoMultiple}-{anio}-D. UIFI-UNAMBA.</Text>
                        {typeof infoStep?.additionalInputs === 'string' && infoStep.additionalInputs.length > 0 && (
                            infoStep.additionalInputs
                                .split(',')
                                .map((input, idx) => (
                                    <Text key={idx}>
                                        {input.trim()}
                                    </Text>
                                ))
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>
                    De mi mayor consideración:                    </Text>
                <Text>
                    Es grato dirigirme a su despacho, para saludarlo cordialmente, y a la vez
                    solicitar la resolución de ratificación de sustentación de tesis en merito
                    al Art.{infoStep?.articleNumber} y  Art.{infoStep?.secondArticleNumber} del Reglamento de Investigación a favor de
                    <Text style={styles.bold}>{combinedNamesOnly}, </Text>de la
                    <Text style={styles.bold}>E.A.P. {career},</Text>que sustento la tesis
                    <Text style={styles.bold}>{title} </Text>
                    según el Art.{infoStep?.thirdArticleNumber} (aprobado muy bueno) según informe del presidente y acta
                    de sustentación de tesis.

                </Text>
                <Text style={{ marginTop: 14 }}> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
                <Text style={[styles.bold, { marginTop: '10px' }, { textAlign: 'center' }, { fontSize: '12px' }]} >Atentamente,</Text>
            </View>

        </PdfBase>
    );
};

export default PdfThreeC;
