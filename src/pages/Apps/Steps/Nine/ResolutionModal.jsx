import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import IconX from '../../../../components/Icon/IconX';

const ResolutionModal = ({ isOpen, onClose, onSave, resolution }) => {
    const from12To24 = (value) => {
        if (!value) return '';
        const lower = value.trim().toLowerCase();
        const match = lower.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
        if (!match) return value; // assume already HH:mm
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3];
        if (period === 'pm' && hours !== 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    const to12WithSuffix = (value) => {
        if (!value) return '';
        const match = value.match(/^(\d{1,2}):(\d{2})$/);
        if (!match) return value;
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const suffix = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minutes} ${suffix}`;
    };

    const initialValues = React.useMemo(
        () => ({
            studentCode:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.studentCode || 'N/A',
            studentTwoCode:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.studentCode || '',
            studentFirstName:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.firstNames || 'N/A',
            studentLastName:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.lastName || '',
            studentTwoFirstName:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.firstNames || 'N/A',
            studentTwoLastName:
                resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.lastName || '',
            meetRequirements: resolution?.meetRequirements ? 'yes' : 'no',
            location: resolution?.location || '',
            observations: resolution?.observations || '',
            resolutionNumber: resolution?.resolutionNumber || '',
            fileNumber: resolution?.fileNumber || '',
            articleNumber: resolution?.articleNumber || '',
            reg: from12To24(resolution?.reg),
            additionalInputs: resolution?.additionalInputs?.split(', ') || [''],
            day: resolution?.day || '',
            day2: resolution?.day2 || '',
            hour: from12To24(resolution?.hour),
            hour2: from12To24(resolution?.hour2),
            location2: resolution?.location2 || '',
        }),
        [resolution]
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
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {resolution ? 'EditarFiltro de similitud III' : 'CrearFiltro de similitud III'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            location: values.location,
                                            observations: values.observations,
                                            resolutionNumber: values.resolutionNumber,
                                            fileNumber: values.fileNumber,
                                            articleNumber: values.articleNumber,
                                            reg: to12WithSuffix(values.reg) || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                            day: values.day,
                                            day2: values.day2,
                                            hour: to12WithSuffix(values.hour),
                                            hour2: to12WithSuffix(values.hour2),
                                            location2: values.location2,
                                        };
                                        if (values.meetRequirements === 'yes' && resolution?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, resolution.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="col-span-2 text-lg font-semibold border-b border-gray-300 dark:border-gray-700">Primer Documento</div>
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="col-span-1">
                                                <label htmlFor="resolutionNumber">Número deFiltro de similitud III</label>
                                                <Field name="resolutionNumber" type="text" id="resolutionNumber" className="form-input" />
                                                <ErrorMessage name="resolutionNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location">Ubicación</label>
                                                <Field name="location" type="text" id="location" className="form-input" />
                                                <ErrorMessage name="location" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="day">Día</label>
                                                <Field name="day" type="date" id="day" className="form-input" />
                                                <ErrorMessage name="day" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="hour">Hora</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="hour" type="time" id="hour" className="form-input" />
                                                </div>
                                                <ErrorMessage name="hour" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-2 text-lg font-semibold border-b border-gray-300 dark:border-gray-700">Segundo Documento</div>
                                            <div className="col-span-1">
                                                <label htmlFor="fileNumber">Número de Expediente</label>
                                                <Field name="fileNumber" type="text" id="fileNumber" className="form-input" />
                                                <ErrorMessage name="fileNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="day2">Día</label>
                                                <Field name="day2" type="date" id="day2" className="form-input" />
                                                <ErrorMessage name="day2" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="hour2">Hora</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="hour2" type="time" id="hour2" className="form-input" />
                                                </div>
                                                <ErrorMessage name="hour2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location2">Ubicación</label>
                                                <Field name="location2" type="text" id="location2" className="form-input" />
                                                <ErrorMessage name="location2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber">Número de Artículo</label>
                                                <Field name="articleNumber" type="text" id="articleNumber" className="form-input" />
                                                <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="reg">Reg</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="reg" type="text" id="reg" className="form-input" />
                                                </div>
                                                <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                            </div>
                                            <FieldArray name="additionalInputs">
                                                {({ push, remove }) =>
                                                    values.additionalInputs.map((_, index) => (
                                                        <div key={index} className="col-span-1">
                                                            <label htmlFor="additionalInputs">Ref {index + 1}</label>
                                                            <div className="flex gap-2">
                                                                <Field name={`additionalInputs.${index}`} type="text" placeholder={`Campo ${index + 1}`} className="form-input" />
                                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>
                                                                    ×
                                                                </button>
                                                                {index === values.additionalInputs.length - 1 && values.additionalInputs.length < 5 && (
                                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push('')}>
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </FieldArray>

                                            {!resolution.meetRequirements && (
                                                <div>
                                                    <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                    <div className="flex gap-4">
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                name="meetRequirements"
                                                                value="yes"
                                                                className="form-radio"
                                                                onChange={() => {
                                                                    setFieldValue('meetRequirements', 'yes');
                                                                    setFieldValue('observations', '');
                                                                }}
                                                            />
                                                            Sí
                                                        </label>
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                name="meetRequirements"
                                                                value="no"
                                                                className="form-radio"
                                                                onChange={() => {
                                                                    setFieldValue('meetRequirements', 'no');
                                                                }}
                                                            />
                                                            No
                                                        </label>
                                                    </div>
                                                    <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="col-span-2">
                                                <label htmlFor="observations">Observaciones</label>
                                                <Field
                                                    name="observations"
                                                    as="textarea"
                                                    id="observations"
                                                    placeholder="Ingrese observaciones"
                                                    className="form-input"
                                                    disable={values.meetRequirements === 'yes'}
                                                    style={{
                                                        cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                        opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                    }}
                                                />
                                                <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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

export default ResolutionModal;
