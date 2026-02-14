import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';

const NotificationModal = ({ isOpen, onClose, onSave, notification }) => {
    const validationSchema = Yup.object({
        meetRequirements: Yup.string().required('Selecciona una opción'),
        secondDeanResolution: Yup.string().email('Ingrese un correo electrónico válido').required('El correo es obligatorio'),
        reg: Yup.string().required('El registro es obligatorio'),
        memorandoMult: Yup.string().required('El memorando es obligatorio'),
        // additionalInputs: Yup.array().of(Yup.string().required('Este campo es obligatorio')).min(1, 'Al menos un campo es obligatorio'),
        observations: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const initialValues = React.useMemo(
        () => ({
            studentCode: notification?.student?.studentCode || 'N/A',
            studentTwoCode: notification?.studentTwo?.studentCode || '',
            studentFirstName: notification?.student?.firstNames || 'N/A',
            studentLastName: notification?.student?.lastName || '',
            studentTwoFirstName: notification?.studentTwo?.firstNames || 'N/A',
            studentTwoLastName: notification?.studentTwo?.lastName || '',
            meetRequirements: notification?.meetRequirements ? 'yes' : 'no',
            observations: notification?.observations || '',
            secondDeanResolution: notification?.secondDeanResolution || '',
            reg: notification?.reg || '',
            memorandoMult: notification?.memorandoMult || '',
            additionalInputs: notification?.additionalInputs?.split(', ') || [''],
        }),
        [notification]
    );

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
                                {notification ? 'Editar Registro' : 'Crear Registro'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            observations: values.observations,
                                            secondDeanResolution: values.secondDeanResolution,
                                            reg: values.reg || '',
                                            memorandoMult: values.memorandoMult || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                        };
                                        if (values.meetRequirements === 'yes' && notification?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, notification?.id);
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

                                            {notification?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="col-span-1">
                                                <label htmlFor="memorandoMult">Memorando Múltiple</label>
                                                <Field
                                                    name="memorandoMult"
                                                    type="text"
                                                    id="memorandoMult"
                                                    placeholder="Ingrese el número de memorando"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="memorandoMult" component="div" className="text-danger mt-1" />
                                            </div>
                                               <FieldArray name="additionalInputs">
                                                {({ push, remove }) => (
                                                    values.additionalInputs.map((_, index) => (
                                                        <div key={index} className="col-span-1">
                                                            <label htmlFor="secondDeanResolution">Resolución {index + 3}</label>
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

                                                                {index === values.additionalInputs.length - 1 && values.additionalInputs.length < 3 && (
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
                                                <label htmlFor="secondDeanResolution">Correo</label>
                                                <Field
                                                    name="secondDeanResolution"
                                                    id="secondDeanResolution"
                                                    placeholder="info@gmail.com"
                                                    className="form-input"
                                                />
                                                <ErrorMessage name="secondDeanResolution" component="div" className="text-danger mt-1" />
                                            </div>
                                            {!notification.meetRequirements &&
                                                <div>
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
                                                    <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                                </div>
                                            }
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

export default NotificationModal;
