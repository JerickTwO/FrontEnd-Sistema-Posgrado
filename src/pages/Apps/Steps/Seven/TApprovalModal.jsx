import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import IconX from '../../../../components/Icon/IconX';

const TApprovalModal = ({ isOpen, onClose, onSave, tapproval }) => {
    const initialValues = React.useMemo(
        () => ({
            studentCode:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode ||
                'N/A',
            studentTwoCode:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode ||
                '',
            studentFirstName:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ||
                'N/A',
            studentLastName:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName || '',
            studentTwoFirstName:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ||
                'N/A',
            studentTwoLastName:
                tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ||
                '',
            meetRequirements: tapproval?.meetRequirements ? 'yes' : 'no',
            observations: tapproval?.observations || '',
            registrationNumber: tapproval?.registrationNumber || '',
            reportNumber: tapproval?.reportNumber || '',
            multipleMemorandumNumber: tapproval?.multipleMemorandumNumber || '',
            articleNumber: tapproval?.articleNumber || '',
            secondArticleNumber: tapproval?.secondArticleNumber || '',
            thirdArticleNumber: tapproval?.thirdArticleNumber || '',
            futDate: tapproval?.futDate || '',
            cartNumber: tapproval?.cartNumber || '',
            carta: tapproval?.carta || '',
            reg: tapproval?.reg || '',
            additionalInputs: tapproval?.additionalInputs?.split(', ') || [''],
        }),
        [tapproval]
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
                                {tapproval ? 'Editar Registro' : 'Crear Registro'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            observations: values.observations,
                                            reportNumber: values.reportNumber,
                                            multipleMemorandumNumber: values.multipleMemorandumNumber,
                                            articleNumber: values.articleNumber,
                                            secondArticleNumber: values.secondArticleNumber,
                                            thirdArticleNumber: values.thirdArticleNumber,
                                            futDate: values.futDate,
                                            cartNumber: values.cartNumber,
                                            carta: values.carta || '',
                                            reg: values.reg || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                        };
                                        if (values.meetRequirements === 'yes' && tapproval?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, tapproval.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {tapproval?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}

                                            {/* Campo de Número de Informe */}
                                            <div className="col-span-1 ">
                                                <label htmlFor="reportNumber">Número de Informe</label>
                                                <Field
                                                    name="reportNumber"
                                                    type="number"
                                                    id="reportNumber"
                                                    placeholder="Ingrese número de informe"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="reportNumber" component="div" className="text-danger mt-1" />
                                            </div>

                                            {/* Campo de Número de artículo Múltiple */}
                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber">Primer Número de artículo</label>
                                                <Field
                                                    name="articleNumber"
                                                    type="text"
                                                    id="articleNumber"
                                                    placeholder="Ingrese número de artículo"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="secondArticleNumber">Segundo Número de artículo</label>
                                                <Field
                                                    name="secondArticleNumber"
                                                    type="text"
                                                    id="secondArticleNumber"
                                                    placeholder="Ingrese número de artículo"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="thirdArticleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="thirdArticleNumber">Tercer Número de artículo</label>
                                                <Field
                                                    name="thirdArticleNumber"
                                                    type="text"
                                                    id="thirdArticleNumber"
                                                    placeholder="Ingrese número de artículo"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="thirdArticleNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="futDate">Fecha de Fut</label>
                                                <Field
                                                    name="futDate"
                                                    type="text"
                                                    id="futDate"
                                                    placeholder="Ingrese fecha de Fut"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="futDate" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="cartNumber">Número de Carta</label>
                                                <Field
                                                    name="cartNumber"
                                                    type="text"
                                                    id="cartNumber"
                                                    placeholder="021-2025"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="cartNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="multipleMemorandumNumber">Número de memorandum</label>
                                                <Field
                                                    name="multipleMemorandumNumber"
                                                    type="text"
                                                    id="multipleMemorandumNumber"
                                                    placeholder="021-2025"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="multipleMemorandumNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
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
                                            <div className="col-span-1">
                                                <label htmlFor="carta">Carta</label>
                                                <Field
                                                    name="carta"
                                                    type="number"
                                                    id="carta"
                                                    placeholder="Ingrese el número de carta"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="carta" component="div" className="text-danger mt-1" />
                                            </div>
                                            {!tapproval.meetRequirements &&
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
                                                                    setFieldValue('observations', ''); // Borra las observaciones
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
                                            }

                                            <FieldArray name="additionalInputs">
                                                {({ push, remove }) => (
                                                    values.additionalInputs.map((_, index) => (
                                                        <div key={index} className="col-span-1">
                                                            <label htmlFor="secondDeanResolution">Memorando {index + 2}</label>
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

                                                                {index === values.additionalInputs.length - 1 && values.additionalInputs.length < 2 && (
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
                                            {/* Campo de Observaciones */}
                                            <div className="col-span-2">
                                                <label htmlFor="observations">Observaciones</label>
                                                <Field
                                                    name="observations"
                                                    as="textarea"
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

export default TApprovalModal;
