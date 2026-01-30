import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';

const PastingModal = ({ isOpen, onClose, onSave, pasting }) => {
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
        location: Yup.string().required('La ubicación es obligatoria'),
        articleNumber: Yup.string().required('El número de artículo es obligatorio'),
        cartNumber: Yup.string().required('El número de carta es obligatorio'),
        memorandumNumber: Yup.string().required('El número de memorando es obligatorio'),
        day: Yup.string().required('El día es obligatorio'),
        day2: Yup.string().required('El segundo día es obligatorio'),
        hour: Yup.string().required('La hora es obligatoria'),
        horaFin: Yup.string().required('La hora de fin es obligatoria'),
        hour2: Yup.string().required('La segunda hora es obligatoria'),
        location2: Yup.string().required('La segunda ubicación es obligatoria'),
        day3: Yup.string().required('El tercer día es obligatorio'),
        hour3: Yup.string().required('La tercera hora es obligatoria'),
        location3: Yup.string().required('La tercera ubicación es obligatoria'),
        day4: Yup.string().required('El cuarto día es obligatorio'),
        hour5: Yup.string().required('La quinta hora es obligatoria'),
        hour4: Yup.string().required('La cuarta hora es obligatoria'),
        location4: Yup.string().required('La cuarta ubicación es obligatoria'),
        // additionalInputs: Yup.array().of(Yup.string().required('Este campo es obligatorio')).min(1, 'Al menos un campo es obligatorio'),
        observations: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

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
            articleNumber: pasting?.articleNumber || '',
            reg: from12To24(pasting?.reg),
            additionalInputs: pasting?.additionalInputs?.split(', ') || [''],
            cartNumber: pasting?.cartNumber || '',
            memorandumNumber: pasting?.memorandumNumber || '',
            day: pasting?.day || '',
            day2: pasting?.day2 || '',
            hour: from12To24(pasting?.hour),
            horaFin: from12To24(pasting?.horaFin),
            hour2: from12To24(pasting?.hour2),
            location2: pasting?.location2 || '',
            day3: pasting?.day3 || '',
            hour3: from12To24(pasting?.hour3),
            location3: pasting?.location3 || '',
            day4: pasting?.day4 || '',
            hour5: from12To24(pasting?.hour5),
            hour4: from12To24(pasting?.hour4),
            location4: pasting?.location4 || '',
        }),
        [pasting]
    );
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-[800px] text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {pasting ? 'Editar Registro' : 'Crear Registro'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            location: values.location,
                                            observations: values.observations,
                                            articleNumber: values.articleNumber,
                                            reg: to12WithSuffix(values.reg) || '',
                                            additionalInputs: values.additionalInputs.join(', '),
                                            cartNumber: values.cartNumber,
                                            memorandumNumber: values.memorandumNumber,
                                            day: values.day,
                                            day2: values.day2,
                                            hour: to12WithSuffix(values.hour),
                                            horaFin: to12WithSuffix(values.horaFin),
                                            hour2: to12WithSuffix(values.hour2),
                                            day4: values.day4,
                                            hour5: to12WithSuffix(values.hour5),
                                            hour4: to12WithSuffix(values.hour4),
                                            location4: values.location4,
                                            location2: values.location2,
                                            day3: values.day3,
                                            hour3: to12WithSuffix(values.hour3),
                                            location3: values.location3,
                                        };
                                        if (values.meetRequirements === 'yes' && pasting?.meetRequirements !== true) {
                                            transformedValues.meetRequirements = true;
                                        }
                                        onSave(transformedValues, pasting.id);
                                    }}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, errors, submitCount }) => {
                                        const locationOptions = [
                                            { value: 'Aula Magna de la UNAMBA', label: 'Aula Magna de la UNAMBA' },
                                            { value: 'Escuela Profesional de Ingeniería Informática y sistema', label: 'Escuela Profesional de Ingeniería Informática y sistema' },
                                            { value: 'Facultad de educación y ciencias sociales', label: 'Facultad de educación y ciencias sociales' },
                                            { value: 'Facultad de administración', label: 'Facultad de administración' },
                                        ];

                                        return (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                            <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Primer Documento - Carta</div>
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
                                                <label htmlFor="cartNumber">Número de Carta</label>
                                                <Field name="cartNumber" type="text" id="cartNumber" className="form-input" />
                                                <ErrorMessage name="cartNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location">Ubicación</label>
                                                <Select
                                                    id="location"
                                                    styles={styles}
                                                    options={locationOptions}
                                                    value={locationOptions.find((o) => o.value === values.location) || null}
                                                    onChange={(option) => setFieldValue('location', option.value)}
                                                    placeholder="Seleccione una ubicación..."
                                                />
                                                <ErrorMessage name="location" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="day">Día</label>
                                                <Field name="day" type="date" id="day" className="form-input" />
                                                <ErrorMessage name="day" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="hour">Hora Inicio</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="hour" type="time" id="hour" className="form-input" />
                                                </div>
                                                <ErrorMessage name="hour" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="horaFin">Hora Fin</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="horaFin" type="time" id="horaFin" className="form-input" />
                                                </div>
                                                <ErrorMessage name="horaFin" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Segundo Documento - Memorando Multiple</div>
                                            <div className="col-span-1">
                                                <label htmlFor="memorandumNumber">Número de Memorando</label>
                                                <Field name="memorandumNumber" type="text" id="memorandumNumber" className="form-input" />
                                                <ErrorMessage name="memorandumNumber" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="day2">Día</label>
                                                <Field name="day2" type="date" id="day2" className="form-input" />
                                                <ErrorMessage name="day2" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="hour2">Hora</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="hour2" type="time" id="hour2" className="form-input" />                                                </div>
                                                <ErrorMessage name="hour2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="location2">Ubicación</label>
                                                <Select
                                                    id="location2"
                                                    styles={styles}
                                                    options={locationOptions}
                                                    value={locationOptions.find((o) => o.value === values.location2) || null}
                                                    onChange={(option) => setFieldValue('location2', option.value)}
                                                    placeholder="Seleccione una ubicación..."
                                                />
                                                <ErrorMessage name="location2" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="articleNumber">Número de Artículo </label>
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

                                            <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Tercer Documento - Individual de Sustentación</div>
                                            
                                            <div className="col-span-1">
                                                <label htmlFor="day3">Día</label>
                                                <Field name="day3" type="date" id="day3" className="form-input" />
                                                <ErrorMessage name="day3" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="hour3">Hora</label>
                                                <div className="flex items-center gap-2">
                                                    <Field name="hour3" type="time" id="hour3" className="form-input" />
                                                </div>
                                                <ErrorMessage name="hour3" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-1">
                                                <label htmlFor="location3">Ubicación</label>
                                                <Select
                                                    id="location3"
                                                    styles={styles}
                                                    options={locationOptions}
                                                    value={locationOptions.find((o) => o.value === values.location3) || null}
                                                    onChange={(option) => setFieldValue('location3', option.value)}
                                                    placeholder="Seleccione una ubicación..."
                                                />
                                                <ErrorMessage name="location3" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">Cuarto Documento - Acta de Sustentación</div>

                                            <div>
                                                <label htmlFor="day4">Día 4</label>
                                                <Field name="day4" type="date" id="day4" className="form-input" />
                                                <ErrorMessage name="day4" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div>
                                                <label htmlFor="hour5">Hora 5</label>
                                                <Field name="hour5" type="time" id="hour5" placeholder="Ejemplo: 09:00" className="form-input" />
                                                <ErrorMessage name="hour5" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div>
                                                <label htmlFor="hour4">Hora 4</label>
                                                <Field name="hour4" type="time" id="hour4" placeholder="Ejemplo: 09:00" className="form-input" />
                                                <ErrorMessage name="hour4" component="div" className="text-danger mt-1" />
                                            </div>

                                            <div>
                                                <label htmlFor="location4">Ubicación 4</label>
                                                <Select
                                                    name="location4"
                                                    styles={styles}
                                                    options={locationOptions}
                                                    value={locationOptions.find((o) => o.value === values.location4) || null}
                                                    onChange={(option) => setFieldValue('location4', option.value)}
                                                    placeholder="Seleccione una ubicación..."
                                                />
                                                <ErrorMessage name="location4" component="div" className="text-danger mt-1" />
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
                                            <div className="col-span-4">
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
                                            <div className="flex justify-end items-center mt-8 col-span-4">
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

export default PastingModal;
