import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';
import ThesisService from '../../../../api/constancyThesisService';
import Swal from 'sweetalert2';

const ThesisModal = ({ isOpen, onClose, onSave, thesis }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkPDFExists = async () => {
            if (!thesis?.id) {
                console.error('El ID de la tesis es indefinido.');
                setPdfAvailable(false);
                return;
            }
            try {
                setIsLoading(true);
                const exists = await ThesisService.viewPdfDocument(thesis.id);
                setPdfAvailable(Boolean(exists));
            } catch (error) {
                console.error('Error al verificar la existencia del PDF:', error);
                setPdfAvailable(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) {
            checkPDFExists();
        } else {
            setPdfAvailable(null);
        }
    }, [isOpen, thesis]);

    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        meetsRequirements: Yup.string().required('Selecciona una opción'),
        observations: Yup.string(),
    });

    const initialValues = React.useMemo(
        () => ({
            studentCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode || 'N/A',
            studentTwoCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo?.studentCode || '',
            meetsRequirements: thesis?.meetsRequirements ? 'yes' : 'no',
            observations: thesis?.observations || '',
            title: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.title || '',
            lineOfResearch: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch
                ? { value: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.id, label: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.name }
                : null,
            projectSimilarity: thesis?.projectSimilarity || '',
            reg: thesis?.reg || '',
        }),
        [thesis]
    );

    const handleSubmit = async (values, { setSubmitting }) => {
        const normalizedValues = {
            ...values,
            meetsRequirements: values.meetsRequirements === 'yes' ? true : false,

        };
        if (thesis?.meetsRequirements === true) {
            delete normalizedValues.meetsRequirements;
        }

        await onSave(thesis.id, normalizedValues);
        setSubmitting(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {thesis ? 'Editar Constancia' : 'Crear Constancia'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, submitCount, errors, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field
                                                    name="studentCode"
                                                    type="text"
                                                    id="studentCode"
                                                    readOnly
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field
                                                        name="studentTwoCode"
                                                        type="text"
                                                        id="studentTwoCode"
                                                        readOnly
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            {
                                                !thesis.meetsRequirements && (
                                                    <div className="col-span-1">
                                                        <label htmlFor="meetsRequirements">Cumple Requisitos</label>
                                                        <div className="flex gap-4">
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    name="meetsRequirements"
                                                                    value="yes"
                                                                    className="form-radio"
                                                                    onChange={() => {
                                                                        setFieldValue('meetsRequirements', 'yes');
                                                                        setFieldValue('observations', '');
                                                                    }}
                                                                />
                                                                Sí
                                                            </label>
                                                            <label>
                                                                <Field
                                                                    type="radio"
                                                                    name="meetsRequirements"
                                                                    value="no"
                                                                    className="form-radio"
                                                                    onChange={() => {
                                                                        setFieldValue('meetsRequirements', 'no');
                                                                    }}
                                                                />
                                                                No
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="meetsRequirements" component="div" className="text-danger mt-1" />
                                                    </div>
                                                )
                                            }

                                            <div className="col-span-2">
                                                <label htmlFor="projectSimilarity">Porcentaje de Similitud</label>
                                                <Field
                                                    name="projectSimilarity"
                                                    id="projectSimilarity"
                                                    type="text"
                                                    placeholder="Ingrese porcentaje de similitud"
                                                    onInput={(e) => {
                                                        let value = e.target.value;

                                                        value = value.replace(/\D/g, '');
                                                        if (value) {
                                                            const numericValue = parseInt(value, 10);
                                                            if (numericValue > 25) {
                                                                value = '25';
                                                            } else {
                                                                value = numericValue.toString();
                                                            }
                                                        }

                                                        e.target.value = value;
                                                        setFieldValue('projectSimilarity', value);
                                                    }}

                                                    className="form-input"
                                                />
                                                <ErrorMessage name="projectSimilarity" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="reg">Reg</label>
                                                <Field
                                                    name="reg"
                                                    type="number"
                                                    id="reg"
                                                    placeholder="Ingrese el reg"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="observations">Observaciones</label>
                                                <Field
                                                    name="observations"
                                                    as="textarea"
                                                    id="observations"
                                                    placeholder="Ingrese observaciones"
                                                    className="form-input"
                                                    disabled={values.meetsRequirements === 'yes'}
                                                    style={{
                                                        cursor: values.meetsRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                        opacity: values.meetsRequirements === 'yes' ? 0.5 : 1,
                                                    }}
                                                />
                                                <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                    disabled={!pdfAvailable || isSubmitting || isLoading}
                                                >
                                                    {isLoading
                                                        ? 'Verificando PDF...'
                                                        : !pdfAvailable
                                                            ? 'No disponible'
                                                            : 'Guardar'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
export default ThesisModal;
