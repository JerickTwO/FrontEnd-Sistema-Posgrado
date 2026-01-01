import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import IconX from '../../../../components/Icon/IconX';

const PastingModal = ({ isOpen, onClose, onSave, pasting }) => {
    const initialValues = React.useMemo(
        () => ({
            studentCode:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.studentCode || 'N/A',
            studentTwoCode:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.studentCode || '',
            studentFirstName:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.firstNames || 'N/A',
            studentLastName:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.lastName || '',
            studentTwoFirstName:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.firstNames || 'N/A',
            studentTwoLastName:
                pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.lastName || '',
            meetRequirements: pasting?.meetRequirements ? 'yes' : 'no',
            location: pasting?.location || '',
            observations: pasting?.observations || '',
            deanResolution: pasting?.deanResolution || '',
            registrationNumber: pasting?.registrationNumber || '',
            articleNumber: pasting?.articleNumber || '',
            reg: pasting?.reg || '',
            additionalInputs: pasting?.additionalInputs?.split(', ') || [''],
            day: pasting?.day || '',
            hour: pasting?.hour || '',
            hour2: pasting?.hour2 || '',
            location2: pasting?.location2 || '',
            articleNumber2: pasting?.articleNumber2 || '',
        }),
        [pasting]
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
                                {pasting ? 'Editar Registro' : 'Crear Registro'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            location: values.location,
                                            observations: values.observations,
                                            deanResolution: values.deanResolution,
                                            registrationNumber: values.registrationNumber,
                                            articleNumber: values.articleNumber,
                                            reg: values.reg || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                            day: values.day,
                                            hour: values.hour,
                                            hour2: values.hour2,
                                            location2: values.location2,
                                            articleNumber2: values.articleNumber2,
                                        };
                                        if (values.meetRequirements === 'yes' && pasting?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, pasting.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="col-span-2 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Primer Documento</div>
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {pasting?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber">Número de Carta</label>
                                                <Field name="articleNumber" type="text" id="articleNumber" className="form-input" />
                                                <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location">Ubicación</label>
                                                <Field name="location" type="text" id="location" className="form-input" />
                                                <ErrorMessage name="location" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="deanResolution">Día</label>
                                                <Field name="deanResolution" type="date" id="deanResolution" className="form-input" />
                                                <ErrorMessage name="deanResolution" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="reg">Hora</label>
                                                <Field name="reg" type="time" id="reg" className="form-input" />
                                                <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                            </div>
                                            <FieldArray name="additionalInputs">
                                                {({ push, remove }) => (
                                                    values.additionalInputs.map((_, index) => (
                                                        <div key={index} className="col-span-1">
                                                            <label htmlFor="additionalInputs">Ref {index + 1}</label>
                                                            <div className="flex gap-2">
                                                                <Field
                                                                    name={`additionalInputs.${index}`}
                                                                    type="text"
                                                                    placeholder={`Campo ${index + 1}`}
                                                                    className="form-input"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    ×
                                                                </button>
                                                                {index === values.additionalInputs.length - 1 && values.additionalInputs.length < 5 && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={() => push('')}
                                                                    >
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </FieldArray>
                                            <div className="col-span-2 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Segundo Documento</div>
                                            <div className="col-span-1">
                                                <label htmlFor="day">Día</label>
                                                <Field name="day" type="date" id="day" className="form-input" />
                                                <ErrorMessage name="day" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="hour">Hora</label>
                                                <Field name="hour" type="time" id="hour" className="form-input" />
                                                <ErrorMessage name="hour" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="hour2">Hora 2</label>
                                                <Field name="hour2" type="time" id="hour2" className="form-input" />
                                                <ErrorMessage name="hour2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location2">Ubicación 2</label>
                                                <Field name="location2" type="text" id="location2" className="form-input" />
                                                <ErrorMessage name="location2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber2">Número de Artículo 2</label>
                                                <Field name="articleNumber2" type="text" id="articleNumber2" className="form-input" />
                                                <ErrorMessage name="articleNumber2" component="div" className="text-danger mt-1" />
                                            </div>
                                            {!pasting.meetRequirements && (
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

export default PastingModal;
