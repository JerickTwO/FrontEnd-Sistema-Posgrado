import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';

const ReservationModal = ({ isOpen, onClose, onSave, reservation, lineOptions }) => {
    const [readyToInit, setReadyToInit] = useState(false);
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    useEffect(() => {
        let isMounted = true;

        if (isOpen && reservation?.id) {
            setReadyToInit(false);
            Promise.resolve()
                .then(() => {
                    if (isMounted) {
                        setReadyToInit(true);
                    }
                })
                .catch((error) => {
                    console.error('Error al cargar el PDF:', error);
                    if (isMounted) {
                        setReadyToInit(true);
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [isOpen, reservation?.id]);

    // Validación reducida a los campos realmente presentes en el formulario
    const validationSchema = Yup.object({
        title: Yup.string().required('El título de tesis es obligatorio'),
        message: Yup.string().required('El título/mensaje es obligatorio'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
        lineOfResearch: Yup.object().nullable(false).required('Seleccione una línea de investigación'),
    });

    const initialValues = {
        studentCode: reservation?.student?.studentCode || 'N/A',
        studentTwoCode: reservation?.studentTwo?.studentCode || '',
        meetRequirements: reservation?.meetsRequirements ? 'yes' : 'no',
        observation: reservation?.observations || '',
        title: reservation?.title || '',
        message: reservation?.message || reservation?.mensaje || '',
        lineOfResearch: lineOptions.find((option) => option.value === reservation?.lineOfResearch?.id) || null,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const payload = { ...values, title: values.title, message: values.message };
        await onSave(reservation.id, payload);
        setSubmitting(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3">{reservation ? 'Editar Registro' : 'Crear Registro'}</div>
                            <div className="p-5">
                                {readyToInit && (
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                        enableReinitialize
                                    >
                                        {({ setFieldValue, values, submitCount, errors, isSubmitting }) => (
                                            <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative">
                                                <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentCode">Primer Estudiante</label>
                                                    <Field
                                                        name="studentCode"
                                                        type="text"
                                                        id="studentCode"
                                                        readOnly
                                                        placeholder="Ingrese el código del estudiante"
                                                        maxLength={6}
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                                </div>
                                                {reservation?.studentTwo && (
                                                    <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                        <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                        <Field
                                                            name="studentTwoCode"
                                                            type="text"
                                                            id="studentTwoCode"
                                                            placeholder="Ingrese el código del segundo estudiante"
                                                            maxLength={6}
                                                            readOnly
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                    </div>
                                                )}
                                                <div className={submitCount && errors.title ? 'has-error' : ''}>
                                                    <label htmlFor="title">Título de tesis</label>
                                                    <Field
                                                        name="title"
                                                        type="text"
                                                        id="title"
                                                        placeholder="Ingrese el título de la tesis"
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="title" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className={submitCount && errors.message ? 'has-error' : ''}>
                                                    <label htmlFor="message">Mensaje</label>
                                                    <Field
                                                        name="message"
                                                        type="text"
                                                        id="message"
                                                        placeholder="Ingrese el mensaje"
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="message" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="lineOfResearch">Línea de Investigación</label>
                                                    <Select
                                                        id="lineOfResearch"
                                                        styles={styles}
                                                        options={lineOptions}
                                                        value={values.lineOfResearch}
                                                        onChange={(option) => setFieldValue('lineOfResearch', option)}
                                                        placeholder="Seleccione una línea..."
                                                    />
                                                </div>

                                                {!reservation?.meetsRequirements ? (
                                                    <div>
                                                        <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                        <div className="flex gap-4">
                                                            <label htmlFor="meetYes">
                                                                <Field
                                                                    id="meetYes"
                                                                    type="radio"
                                                                    name="meetRequirements"
                                                                    value="yes"
                                                                    className="form-radio"
                                                                    onChange={() => {
                                                                        setFieldValue('meetRequirements', 'yes');
                                                                        setFieldValue('observation', '');
                                                                    }}
                                                                />
                                                                Sí
                                                            </label>
                                                            <label htmlFor="meetNo">
                                                                <Field
                                                                    id="meetNo"
                                                                    type="radio"
                                                                    name="meetRequirements"
                                                                    value="no"
                                                                    className="form-radio"
                                                                    onChange={() => setFieldValue('meetRequirements', 'no')}
                                                                />
                                                                No
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                                    </div>
                                                ) : (
                                                    <div className="hidden">
                                                        <Field type="hidden" name="meetRequirements" value="yes" />
                                                    </div>
                                                )}

                                                <div className="col-span-2">
                                                    <label htmlFor="observation">Observaciones</label>
                                                    <Field
                                                        name="observation"
                                                        as="textarea"
                                                        id="observation"
                                                        placeholder="Ingrese observaciones"
                                                        className="form-input"
                                                        disabled={values.meetRequirements === 'yes'}
                                                        style={{
                                                            cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                            opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                        }}
                                                    />
                                                    <ErrorMessage name="observation" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="flex justify-end items-center mt-8 col-span-2">
                                                    <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                        disabled={isSubmitting}
                                                    >
                                                        {'Actualizar'}
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                )}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ReservationModal;
