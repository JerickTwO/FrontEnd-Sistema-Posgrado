import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';

const FinalStepModal = ({ isOpen, onClose, onSave, finalStep }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);
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

    const validationSchema = Yup.object({
        meetRequirements: Yup.string().required('Selecciona una opción'),
        cartNumber: Yup.string().required('El número de carta es obligatorio'),
        reg: Yup.string().required('El registro es obligatorio'),
        day: Yup.string().required('El día es obligatorio'),
        hour: Yup.string().required('La hora es obligatoria'),
        school: Yup.string().required('La escuela es obligatoria'),
        articleNumber: Yup.string().required('El número de artículo es obligatorio'),
        additionalInputs: Yup.array().of(Yup.string().required('Este campo es obligatorio')).min(1, 'Al menos un campo es obligatorio'),
        observations: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const initialValues = React.useMemo(
        () => ({
            studentCode:
                finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.student?.studentCode || 'N/A',
            studentTwoCode:
                finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                    ?.studentTwo?.studentCode || '',
            meetRequirements: finalStep?.meetRequirements ? 'yes' : 'no',
            observations: finalStep?.observations || '',
            cartNumber: finalStep?.cartNumber || '',
            additionalInputs: finalStep?.additionalInputs?.split(', ') || [''],
            reg: finalStep?.reg || '',
            day: finalStep?.day || '',
            hour: from12To24(finalStep?.hour),
            school: finalStep?.school || '',
            articleNumber: finalStep?.articleNumber || '',
            sustainingReport: finalStep?.sustainingReport || false,
            observationsResolved: finalStep?.observationsResolved || false,
        }),
        [finalStep]
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
                                {finalStep ? 'Editar Emisión de Tesis' : 'Crear Emisión de Tesis'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            observations: values.observations,
                                            cartNumber: values.cartNumber,
                                            additionalInputs: values.additionalInputs.join(', '),
                                            reg: values.reg,
                                            day: values.day,
                                            hour: to12WithSuffix(values.hour),
                                            school: values.school,
                                            articleNumber: values.articleNumber,
                                            sustainingReport: values.sustainingReport,
                                            observationsResolved: values.observationsResolved,
                                        };
                                        if (values.meetRequirements === 'yes' && finalStep?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, finalStep?.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount }) => {
                                        const schoolOptions = [
                                            { value: 'Aula Magna de la UNAMBA', label: 'Aula Magna de la UNAMBA' },
                                            { value: 'Escuela Profesional de Ingeniería Informática y sistema', label: 'Escuela Profesional de Ingeniería Informática y sistema' },
                                            { value: 'Facultad de educación y ciencias sociales', label: 'Facultad de educación y ciencias sociales' },
                                            { value: 'Facultad de administración', label: 'Facultad de administración' },
                                        ];

                                        return (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field name="studentCode" type="text" id="studentCode" readOnly className="form-input" />
                                                <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                            </div>

                                            {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field name="studentTwoCode" type="text" id="studentTwoCode" readOnly className="form-input" />
                                                    <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}

                                            <div className="col-span-1">
                                                <label htmlFor="cartNumber">Número de Carta</label>
                                                <Field name="cartNumber" type="number" id="cartNumber" className="form-input" />
                                                <ErrorMessage name="cartNumber" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="reg">Reg. N°</label>
                                                <Field name="reg" type="number" id="reg" className="form-input" />
                                                <ErrorMessage name="reg" component="div" className="text-danger mt-1" />
                                            </div>

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
                                                <label htmlFor="school">Escuela</label>
                                                <Select
                                                    id="school"
                                                    styles={styles}
                                                    options={schoolOptions}
                                                    value={schoolOptions.find((o) => o.value === values.school) || null}
                                                    onChange={(option) => setFieldValue('school', option.value)}
                                                    placeholder="Seleccione una escuela..."
                                                />
                                                <ErrorMessage name="school" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber">Número de Artículo</label>
                                                <Field name="articleNumber" type="text" id="articleNumber" className="form-input" />
                                                <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1 flex items-center gap-2 mt-6">
                                                <Field name="sustainingReport" type="checkbox" id="sustainingReport" className="form-checkbox" />
                                                <label htmlFor="sustainingReport" className="mb-0 cursor-pointer">Informe de Sustanciación</label>
                                            </div>

                                            <div className="col-span-1 flex items-center gap-2 mt-6">
                                                <Field name="observationsResolved" type="checkbox" id="observationsResolved" className="form-checkbox" />
                                                <label htmlFor="observationsResolved" className="mb-0 cursor-pointer">Observaciones Levantadas</label>
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

                                            {!finalStep?.meetRequirements && (
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

export default FinalStepModal;
