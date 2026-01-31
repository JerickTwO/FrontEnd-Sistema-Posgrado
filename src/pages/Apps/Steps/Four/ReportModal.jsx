import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';

const ReportModal = ({ isOpen, onClose, onSave, report, adviserOptions }) => {

    const validationSchema = Yup.object({
        studentCode: Yup.string().required('El primer estudiante es obligatorio'),
        studentTwoCode: Yup.string().test(
            'required-if-student-two',
            'El segundo estudiante es obligatorio',
            function (value) {
                const { studentTwoFirstNames } = this.parent;
                if (!studentTwoFirstNames) return true;
                return !!value;
            }
        ),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        deanResolution: Yup.string().required('El número de constancia es obligatorio'),
        articleNumber: Yup.string().required('El número de artículo es obligatorio'),
        secondArticleNumber: Yup.string()
            .required('El porcentaje de similitud es obligatorio')
            .matches(/^\d+(\.\d{1,2})?$/, 'Solo se permiten números y máximo 2 decimales')
            .test('max-value', 'El porcentaje no puede ser mayor a 24', function(value) {
                if (!value) return true;
                const numValue = parseFloat(value);
                return numValue <= 24;
            }),
        observations: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const initialValues = React.useMemo(
        () => ({
            titleReservationStepOne: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.id || '',
            studentCode: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observations: report?.observations || '',
            meetRequirements: report?.meetRequirements ? 'yes' : 'no',
            documentDate: report?.documentDate || '',
            articleNumber: report?.articleNumber || '',
            secondArticleNumber: report?.secondArticleNumber || '',
            deanResolution: report?.deanResolution || '',
            additionalInputs: report?.additionalInputs?.split(', ') || [''],
        }),
        [report, adviserOptions]
    );
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{report ? 'Editar Registro' : 'Crear Registro'}</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            documentDate: values.documentDate,
                                            articleNumber: values.articleNumber,
                                            secondArticleNumber: values.secondArticleNumber,
                                            deanResolution: values.deanResolution,
                                            observations: values.observations,
                                            additionalInputs: values.additionalInputs.join(', '),
                                        };
                                        if (values.meetRequirements === 'yes' && report?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, report.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount, isSubmitting }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2" >
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode" > Primer Estudiante </label>
                                                < Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {
                                                report?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.studentTwo && (
                                                    <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                        <label htmlFor="studentTwoCode" > Segundo Estudiante </label>
                                                        < Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                        <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                    </div>
                                                )
                                            }
                                            {
                                                !report.meetRequirements && (
                                                    <div>
                                                        <label htmlFor="meetRequirements" > Cumple Requisitos </label>
                                                        < div className="flex gap-4" >
                                                            <label>
                                                                <Field type="radio" name="meetRequirements" value="yes" className="form-radio" onChange={() => {
                                                                    setFieldValue('meetRequirements', 'yes');
                                                                    setFieldValue('observations', '');
                                                                }} />
                                                                Sí
                                                            </label>
                                                            < label >
                                                                <Field type="radio" name="meetRequirements" value="no" className="form-radio" onChange={() => {
                                                                    setFieldValue('meetRequirements', 'no');
                                                                }} />
                                                                No
                                                            </label>
                                                        </div>
                                                        < ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                                    </div>

                                                )
                                            }
                                            <div className={`col-span-1 ${submitCount && errors.deanResolution ? 'has-error' : ''}`}>
                                                <label htmlFor="deanResolution">Número de Constancia </label>
                                                <Field name="deanResolution" id="deanResolution" placeholder="000" className="form-input" />
                                                <ErrorMessage name="deanResolution" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={`col-span-1 ${submitCount && errors.articleNumber ? 'has-error' : ''}`}>
                                                <label htmlFor="articleNumber"> Número de Artículo </label>
                                                <Field name="articleNumber" id="articleNumber" placeholder="Ingrese el número de Artículo" className="form-input" />
                                                <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={`col-span-1 ${submitCount && errors.secondArticleNumber ? 'has-error' : ''}`}>
                                                <label htmlFor="secondArticleNumber">Porcentaje de Similitud  </label>
                                                <Field 
                                                    name="secondArticleNumber" 
                                                    id="secondArticleNumber" 
                                                    placeholder="Ingrese el porcentaje de similitud" 
                                                    className="form-input"
                                                    pattern="^\d+(\.\d{1,2})?$"
                                                    title="Solo se permiten números y máximo 2 decimales. Valor máximo: 24"
                                                    onChange={(e) => {
                                                        let value = e.target.value;
                                                        // Solo permitir números y un punto
                                                        value = value.replace(/[^0-9.]/g, '');
                                                        // Evitar múltiples puntos
                                                        const parts = value.split('.');
                                                        if (parts.length > 2) {
                                                            value = parts[0] + '.' + parts[1];
                                                        }
                                                        // Limitar a máximo 2 decimales
                                                        if (parts[1] && parts[1].length > 2) {
                                                            value = parts[0] + '.' + parts[1].slice(0, 2);
                                                        }
                                                        // Validar que no sea mayor a 24
                                                        if (value && !isNaN(value)) {
                                                            const numValue = parseFloat(value);
                                                            if (numValue > 24) {
                                                                value = '24';
                                                            }
                                                        }
                                                        setFieldValue('secondArticleNumber', value);
                                                    }}
                                                />
                                                <ErrorMessage name="secondArticleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className={`col-span-1 ${submitCount && errors.observations ? 'has-error' : ''}`}>
                                                <label htmlFor="observations" > Observaciones </label>
                                                <Field
                                                    name="observations"
                                                    id="observations"
                                                    placeholder="Ingrese observaciones"
                                                    className="form-input"
                                                    disabled={values.meetRequirements === 'yes'}
                                                    style={{
                                                        cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                        opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                    }}
                                                />
                                                <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                            </div>

                                            < div className="flex justify-end items-center mt-8 col-span-2" >
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose} >
                                                    Cancelar
                                                </button>
                                                < button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" >
                                                    Guardar
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
};

export default ReportModal;
