import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';

const ReservationModal = ({ isOpen, onClose, onSave, reservation, lineOptions, allTitleReservations }) => {
    const [readyToInit, setReadyToInit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
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

    // Configuración de Fuse.js para búsqueda difusa
    const fuse = new Fuse(allTitleReservations || [], {
        keys: ['title'],
        threshold: 0.3, // Sensibilidad de la búsqueda (0 = exacto, 1 = muy flexible)
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 3,
    });

    // Función de búsqueda difusa
    const handleTitleSearch = (value) => {
        setSearchTerm(value);
        if (value.length >= 3) {
            const results = fuse.search(value);
            setSearchResults(results);
            setShowSuggestions(true);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    };

    // Validación personalizada para títulos similares
    const checkTitleSimilarity = (value) => {
        if (!value || value.length < 3) return true;
        
        const results = fuse.search(value);
        // Filtrar el título actual si estamos editando
        const similarTitles = results.filter(result => {
            const isSameReservation = reservation?.id && result.item.id === reservation.id;
            return !isSameReservation && result.score < 0.3; // Score bajo = muy similar
        });
        
        return similarTitles.length === 0;
    };

    // Validación corregida para versiones modernas de Yup
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('El título de tesis es obligatorio')
            .test('title-similarity', 'Ya existe un título muy similar a este. Por favor, verifique los títulos sugeridos.', function(value) {
                return checkTitleSimilarity(value);
            }),
        message: Yup.string().required('El título/mensaje es obligatorio'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string().when(['meetRequirements'], {
            is: (val) => val === 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
        lineOfResearch: Yup.object().nullable(false).required('Seleccione una línea de investigación'),
        branch: Yup.string().oneOf(['ABANCAY', 'TAMBOBAMBA']).required('Seleccione una sede'),
    });

    const initialValues = {
        studentCode: reservation?.student?.studentCode || 'N/A',
        studentTwoCode: reservation?.studentTwo?.studentCode || '',
        meetRequirements: reservation?.meetsRequirements ? 'yes' : 'no',
        observation: reservation?.observations || '',
        title: reservation?.title || '',
        message: reservation?.message || reservation?.mensaje || '',
        lineOfResearch: lineOptions.find((option) => option.value === reservation?.lineOfResearch?.id) || null,
        branch: reservation?.branch || '',
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
                                        {({ setFieldValue, values, submitCount, errors, isSubmitting }) => {
                                            const branchOptions = [
                                                { value: 'ABANCAY', label: 'ABANCAY' },
                                                { value: 'TAMBOBAMBA', label: 'TAMBOBAMBA' },
                                            ];

                                            return (
                                                <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative">
                                                    <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                        <label htmlFor="studentCode">Primer Estudiante</label>
                                                        <Field
                                                            name="studentCode"
                                                            type="text"
                                                            id="studentCode"
                                                            readOnly
                                                            placeholder="Ingrese el código del estudiante"
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
                                                                readOnly
                                                                placeholder="Ingrese el código del segundo estudiante"
                                                                className="form-input"
                                                            />
                                                            <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                        </div>
                                                    )}
                                                    <div className={`col-span-2 relative ${submitCount && errors.title ? 'has-error' : ''}`}>
                                                        <label htmlFor="title">Título de tesis</label>
                                                        <Field name="title">
                                                            {({ field, form }) => (
                                                                <div className="relative">
                                                                    <input
                                                                        {...field}
                                                                        type="text"
                                                                        id="title"
                                                                        placeholder="Ingrese el título de la tesis (mínimo 3 caracteres para buscar)"
                                                                        className="form-input"
                                                                        onChange={(e) => {
                                                                            form.setFieldValue('title', e.target.value);
                                                                            handleTitleSearch(e.target.value);
                                                                        }}
                                                                        onFocus={() => {
                                                                            if (searchTerm.length >= 3) setShowSuggestions(true);
                                                                        }}
                                                                    />
                                                                    {showSuggestions && searchResults.length > 0 && (
                                                                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 border-b border-gray-300 dark:border-gray-600">
                                                                                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">⚠️ Títulos similares encontrados:</p>
                                                                            </div>
                                                                            {searchResults.slice(0, 5).map((result, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 last:border-b-0 cursor-pointer"
                                                                                    onClick={() => {
                                                                                        setShowSuggestions(false);
                                                                                    }}
                                                                                >
                                                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.item.title}</p>
                                                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                                        Estudiante: {result.item.student?.firstNames} {result.item.student?.lastName}
                                                                                    </p>
                                                                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                                                        Similaridad: {Math.round((1 - result.score) * 100)}%
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                            <div className="p-2 text-center">
                                                                                <button
                                                                                    type="button"
                                                                                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                                                                    onClick={() => setShowSuggestions(false)}
                                                                                >
                                                                                    Cerrar
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Field>
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

                                                    <div className={submitCount && errors.branch ? 'has-error col-span-1' : 'col-span-1'}>
                                                        <label htmlFor="branch">Sede</label>
                                                        <Select
                                                            id="branch"
                                                            styles={styles}
                                                            options={branchOptions}
                                                            value={branchOptions.find((o) => o.value === values.branch) || null}
                                                            onChange={(option) => setFieldValue('branch', option.value)}
                                                            placeholder="Seleccione una sede..."
                                                        />
                                                        <ErrorMessage name="branch" component="div" className="text-danger mt-1" />
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
                                            );
                                        }}
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