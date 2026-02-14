import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldArray } from 'formik';
import * as Yup from 'yup';
import IconLoader from '../../../../components/Icon/IconLoader';
import IconX from '../../../../components/Icon/IconX';

const JuryModal = ({ isOpen, onClose, onSave, juryAppointment, isLoading }) => {
    const validationSchema = Yup.object({
        deanResolution: Yup.string().required('El número de carta es obligatorio'),
        reg: Yup.string().required('El número de registro es obligatorio'),
        articleNumber: Yup.string().required('El número de artículo es obligatorio'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
    });

    const initialValues = React.useMemo(
        () => ({
            studentCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observations: juryAppointment?.observations || '',
            meetRequirements: juryAppointment?.meetRequirements ? 'yes' : 'no',
            deanResolution: juryAppointment?.deanResolution || '',
            additionalInputs: juryAppointment?.additionalInputs?.split(', ') || [''],
            reg: juryAppointment?.reg || '',
        }),
        [juryAppointment]
    );

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51] ">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-[40rem] text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-2xl font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{juryAppointment ? 'Editar Registro' : 'Crear Registro'}</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            meetRequirements: values.meetRequirements === 'yes' ? true : false,
                                            observations: values.observations || '',
                                            deanResolution: values.deanResolution,
                                            reg: values.reg || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                        };
                                        onSave(transformedValues, juryAppointment?.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values }) => {
                                        return (

                                            <Form className="grid gap-6 grid-cols-2 w-[100%]">
                                                <div className="col-span-1">
                                                    <label htmlFor="deanResolution">Numero de Carta</label>
                                                    <Field name="deanResolution" type="text" id="deanResolution" placeholder="000" className="form-input" />
                                                    <ErrorMessage name="deanResolution" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="">Número de Registro</label>
                                                    <Field name="reg" type="number" id="reg" placeholder="000" className="form-input" />
                                                    <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                                </div>
                                                {!juryAppointment.meetRequirements && (<div className="col-span-1">
                                                    <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                    <div className="flex gap-4">
                                                        <label>
                                                            <Field type="radio" name="meetRequirements" value="yes" className="form-radio" onChange={() => {
                                                                setFieldValue('meetRequirements', 'yes');
                                                                setFieldValue('observations', '');
                                                            }} />
                                                            Sí
                                                        </label>
                                                        <label>
                                                            <Field type="radio" name="meetRequirements" value="no" className="form-radio" onChange={() => {
                                                                setFieldValue('meetRequirements', 'no');
                                                            }} />
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                                )}

                                                {values.meetRequirements === 'no' && (
                                                    <div className="col-span-2">
                                                        <label htmlFor="observations">Observaciones</label>
                                                        <Field
                                                            as="textarea"
                                                            name="observations"
                                                            id="observations"
                                                            rows="4"
                                                            placeholder="Ingrese las observaciones"
                                                            className="form-textarea"
                                                        />
                                                        <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                                    </div>
                                                )}

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
                                                <div className="flex justify-end items-center mt-8 col-span-2">
                                                    <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                        Cancelar
                                                    </button>
                                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoading}>
                                                        {isLoading ? (
                                                            <span className="flex items-center">
                                                                Guardando
                                                                <IconLoader className="animate-[spin_2s_linear_infinite] inline-block ml-2" />
                                                            </span>
                                                        ) : (
                                                            'Guardar'
                                                        )}
                                                    </button>
                                                </div>

                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default JuryModal;
