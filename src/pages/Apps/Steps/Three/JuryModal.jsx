import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
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
        additionalInputs: Yup.array()
            .of(Yup.string().required('Este campo es obligatorio'))
            .min(1, 'Al menos un campo es obligatorio'),
    });

    const initialValues = React.useMemo(
        () => ({
            studentCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observations: juryAppointment?.observations || '',
            meetRequirements: juryAppointment?.meetRequirements ? 'yes' : 'no',
            hour: juryAppointment?.hour || '',
            futDate: juryAppointment?.futDate || '',
            numberFolio: juryAppointment?.numberFolio || '',
            numberDeanResolution: juryAppointment?.numberDeanResolution || '',
            secondNumberDeanResolution: juryAppointment?.secondNumberDeanResolution || '',
            deanResolution: juryAppointment?.deanResolution || '',
            secondDeanResolution: juryAppointment?.secondDeanResolution || '',
            actDate: juryAppointment?.actDate || '',
            secondActDate: juryAppointment?.secondActDate || '',
            actTime: juryAppointment?.actTime || '',
            articleNumber: juryAppointment?.articleNumber || '',
            secondArticleNumber: juryAppointment?.secondArticleNumber || '',
            refDateMCart: juryAppointment?.refDateMCart || '',
            reg: juryAppointment?.reg || '',
            additionalInputs: juryAppointment?.additionalInputs?.split(', ') || [''],
            textattached: juryAppointment?.textattached?.split(', ') || [''],
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
                                        let fut = ''
                                        if (values.futDate) {
                                            const d = new Date(values.futDate)
                                            d.setDate(d.getDate() + 1)
                                            fut = d.toISOString().slice(0, 10)
                                        }
                                        const formatDate = (dateStr) => {
                                            if (!dateStr) return '';
                                            const d = new Date(dateStr);
                                            d.setDate(d.getDate());
                                            return d.toISOString().slice(0, 10);
                                        };

                                        const transformedValues = {
                                            meetRequirements: values.meetRequirements === 'yes' ? true : false,
                                            observations: values.observations || '',
                                            hour: values.hour,
                                            futDate: fut,
                                            numberFolio: values.numberFolio,
                                            numberDeanResolution: values.numberDeanResolution,
                                            secondNumberDeanResolution: values.secondNumberDeanResolution,
                                            deanResolution: values.deanResolution,
                                            secondDeanResolution: values.secondDeanResolution,
                                            actDate: formatDate(values.actDate),
                                            secondActDate: formatDate(values.secondActDate),
                                            actTime: values.actTime,
                                            articleNumber: values.articleNumber,
                                            secondArticleNumber: values.secondArticleNumber,
                                            refDateMCart: formatDate(values.refDateMCart),
                                            reg: values.reg || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                            textattached: values.textattached.join(', '),
                                        };
                                        onSave(transformedValues, juryAppointment?.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values  }) => {
                                        return (

                                            <Form className="grid gap-6 grid-cols-2 w-[100%]">
                                                <div className="col-span-1">
                                                    <label htmlFor="deanResolution">Numero de Carta</label>
                                                    <Field name="deanResolution" type="text" id="deanResolution" placeholder="000" className="form-input" />
                                                    <ErrorMessage name="deanResolution" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="reg">Número de Registro</label>
                                                    <Field name="reg" type="number" id="reg" placeholder="000" className="form-input" />
                                                    <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="articleNumber">Número de Artículo</label>
                                                    <Field name="articleNumber" type="text" id="articleNumber" placeholder="Ingrese el Número de Aríiculo" className="form-input" />
                                                    <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
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
