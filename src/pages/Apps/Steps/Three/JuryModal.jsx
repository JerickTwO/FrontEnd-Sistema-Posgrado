import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldArray } from 'formik';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';
import IconLoader from '../../../../components/Icon/IconLoader';
import IconX from '../../../../components/Icon/IconX';

const JuryModal = ({ isOpen, onClose, onSave, juryAppointment, adviserOptions, isLoading }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);
    const initialValues = React.useMemo(
        () => ({
            studentCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: juryAppointment?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observations: juryAppointment?.observations || '',
            meetRequirements: juryAppointment?.meetRequirements ? 'yes' : 'no',
            president: juryAppointment?.president
                ? {
                    value: juryAppointment.president.id,
                    label: `${juryAppointment.president.firstNames} ${juryAppointment.president.lastName}`,
                }
                : null,
            firstMember: juryAppointment?.firstMember
                ? {
                    value: juryAppointment.firstMember.id,
                    label: `${juryAppointment.firstMember.firstNames} ${juryAppointment.firstMember.lastName}`,
                }
                : null,
            secondMember: juryAppointment?.secondMember
                ? {
                    value: juryAppointment.secondMember.id,
                    label: `${juryAppointment.secondMember.firstNames} ${juryAppointment.secondMember.lastName}`,
                }
                : null,
            accessory: juryAppointment?.accessory
                ? {
                    value: juryAppointment.accessory.id,
                    label: `${juryAppointment.accessory.firstNames} ${juryAppointment.accessory.lastName}`,
                }
                : null,
            adviser: juryAppointment?.projectApprovalStepTwo?.adviser
                ? {
                    value: juryAppointment?.projectApprovalStepTwo?.adviser.id,
                    label: `${juryAppointment?.projectApprovalStepTwo?.adviser.firstNames} ${juryAppointment?.projectApprovalStepTwo?.adviser.lastName}`,
                }
                : null,
            coadviser: juryAppointment?.projectApprovalStepTwo?.coadviser
                ? {
                    value: juryAppointment?.projectApprovalStepTwo?.coadviser.id,
                    label: `${juryAppointment?.projectApprovalStepTwo?.coadviser.firstNames} ${juryAppointment?.projectApprovalStepTwo?.coadviser.lastName}`,
                }
                : null,
            hour: juryAppointment?.hour || '',
            futDate: juryAppointment?.futDate || '',
            numberFolio: juryAppointment?.numberFolio || '',
            registrationNumber: juryAppointment?.registrationNumber || '',
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

    const filterOptions = (selectedValues, currentFieldValue) => {
        const selectedIds = selectedValues.filter((val) => val && val.value !== currentFieldValue?.value).map((val) => val.value);

        return adviserOptions
            .filter((adviser) => !selectedIds.includes(adviser.id))
            .map((adviser) => ({
                value: adviser.id,
                label: `${adviser.firstNames} ${adviser.lastName}`,
            }));
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51] ">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-[70rem] text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-2xl font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Crear Jurados</div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
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
                                            president: values.president ? { id: values.president.value } : null,
                                            firstMember: values.firstMember ? { id: values.firstMember.value } : null,
                                            secondMember: values.secondMember ? { id: values.secondMember.value } : null,
                                            accessory: values.accessory ? { id: values.accessory.value } : null,
                                            meetRequirements: values.meetRequirements === 'yes' ? true : false,
                                            observations: values.observations || '',
                                            hour: values.hour,
                                            futDate: fut,
                                            numberFolio: values.numberFolio,
                                            registrationNumber: values.registrationNumber,
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
                                    {({ setFieldValue, values }) => {
                                        const selectedValues = [values.president, values.firstMember, values.secondMember, values.accessory, values.adviser, values.coadviser];

                                        return (

                                            <Form className="grid gap-6 grid-cols-4 w-[100%]">
                                                <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                    Información de Actas
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="actDate">Primera Fecha de Acta</label>
                                                    <Field name="actDate" type="date" id="actDate" placeholder="Ingrese la Fecha de Acta" className="form-input" />
                                                    <ErrorMessage name="actDate" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="actTime">Primera Hora de Acta</label>
                                                    <Field name="actTime" type="time" id="actTime" placeholder="Ingrese la Hora de Acta" className="form-input" />
                                                    <ErrorMessage name="actTime" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="secondActDate">Segunda fecha de Acta</label>
                                                    <Field name="secondActDate" type="date" id="secondActDate" placeholder="Ingrese la Segunda Fecha de Acta" className="form-input" />
                                                    <ErrorMessage name="secondActDate" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="deanResolution">Primera Resolución Decanal</label>
                                                    <Field name="deanResolution" type="text" id="deanResolution" placeholder="000-2025" className="form-input" />
                                                    <ErrorMessage name="deanResolution" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="secondDeanResolution">Segunda Resolución Decanal</label>
                                                    <Field name="secondDeanResolution" type="text" id="secondDeanResolution" placeholder="000-2025" className="form-input" />
                                                    <ErrorMessage name="secondDeanResolution" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="hour">Segunda Hora de Acta</label>
                                                    <Field name="hour" type="time" id="hour" placeholder="Ingrese la hora" className="form-input" />
                                                    <ErrorMessage name="hour" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="numberFolio">Número de Folio</label>
                                                    <Field name="numberFolio" type="text" id="numberFolio" placeholder="Ingrese el número de folio" className="form-input" />
                                                    <ErrorMessage name="numberFolio" component="div" className="text-danger mt-1" />
                                                </div>
                                                {/* TERCER RESOLUCION */}
                                                <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">

                                                    Información de Carta
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="futDate">Fecha FUT</label>
                                                    <Field name="futDate" type="date" id="futDate" className="form-input" />
                                                    <ErrorMessage name="futDate" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="registrationNumber">Número de Registro</label>
                                                    <Field name="registrationNumber" type="number" id="registrationNumber" placeholder="Ingrese el número de registro" className="form-input" />
                                                    <ErrorMessage name="registrationNumber" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="numberDeanResolution">Fecha de Acta de Jurados</label>
                                                    <Field name="numberDeanResolution" type="date" id="numberDeanResolution" placeholder="Ingrese el número de resolución decanal" className="form-input" />
                                                    <ErrorMessage name="numberDeanResolution" component="div" className="text-danger mt-1" />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="secondNumberDeanResolution">Segunda Fecha de Acta de Jurados</label>
                                                    <Field name="secondNumberDeanResolution" type="date" id="secondNumberDeanResolution" placeholder="Ingrese el segundo número de resolución decanal" className="form-input" />
                                                    <ErrorMessage name="secondNumberDeanResolution" component="div" className="text-danger mt-1" />
                                                </div>
                                                <FieldArray name="additionalInputs">
                                                    {({ push, remove }) => (
                                                        values.additionalInputs.map((_, index) => (
                                                            <div key={index} className="col-span-1">
                                                                <label htmlFor="additionalInputs">Resolución {index + 1}</label>
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
                                                <FieldArray name="textattached">
                                                    {({ push, remove }) => (
                                                        values.textattached.map((_, index) => (
                                                            <div key={index} className="col-span-1">
                                                                <label htmlFor="textAtached">Texto Adjuntado {index + 1}</label>
                                                                <div className="flex gap-2">

                                                                    <Field
                                                                        name={`textattached.${index}`}
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

                                                                    {index === values.textattached.length - 1 && values.textattached.length < 5 && (
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
                                                <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                    Información de Carta Multiple
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="articleNumber">Número de Artículo</label>
                                                    <Field name="articleNumber" type="text" id="articleNumber" placeholder="Ingrese el Número de Aríiculo" className="form-input" />
                                                    <ErrorMessage name="articleNumber" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="secondArticleNumber">Segundo Número de Artículo</label>
                                                    <Field name="secondArticleNumber" type="text" id="secondArticleNumber" placeholder="Ingrese el Número de Aríiculo" className="form-input" />
                                                    <ErrorMessage name="secondArticleNumber" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="refDateMCart">Fecha de Referencia</label>
                                                    <Field
                                                        name="refDateMCart"
                                                        type="date"
                                                        id="refDateMCart"
                                                        placeholder="Ingrese la fecha de Referencia"
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage name="refDateMCart" component="div" className="text-danger mt-1" />
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
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="observations">Observaciones</label>
                                                    <Field name="observations" as="textarea" id="observations" placeholder="Ingrese observaciones" className="form-input" disabled={values.meetRequirements === 'yes'}
                                                        style={{
                                                            cursor: values.meetRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                            opacity: values.meetRequirements === 'yes' ? 0.5 : 1,
                                                        }} />
                                                    <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
                                                </div>
                                                <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">

                                                    Jurados
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="president">Seleccionar Presidente</label>
                                                    <Select
                                                        id="president"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.president)}
                                                        value={values.president}
                                                        onChange={(option) => setFieldValue('president', option)}
                                                        placeholder="Seleccione un presidente..."
                                                        isClearable
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="firstMember">Seleccionar Primer Miembro</label>
                                                    <Select
                                                        id="firstMember"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.firstMember)}
                                                        value={values.firstMember}
                                                        onChange={(option) => setFieldValue('firstMember', option)}
                                                        placeholder="Seleccione un primer miembro..."
                                                        isClearable
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="secondMember">Seleccionar Segundo Miembro</label>
                                                    <Select
                                                        id="secondMember"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.secondMember)}
                                                        value={values.secondMember}
                                                        onChange={(option) => setFieldValue('secondMember', option)}
                                                        placeholder="Seleccione un segundo miembro..."
                                                        isClearable
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <label htmlFor="accessory">Seleccionar Accesitario</label>
                                                    <Select
                                                        id="accessory"
                                                        styles={styles}
                                                        options={filterOptions(selectedValues, values.accessory)}
                                                        value={values.accessory}
                                                        onChange={(option) => setFieldValue('accessory', option)}
                                                        placeholder="Seleccione un accesitario..."
                                                        isClearable
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="adviser">Asesor</label>
                                                    <Select id="adviser" styles={styles} value={values.adviser} isDisabled placeholder="Asesor seleccionado" />
                                                </div>

                                                <div className="col-span-1">
                                                    <label htmlFor="coadviser">Segundo Asesor</label>
                                                    <Select id="coadviser" styles={styles} value={values.coadviser} isDisabled placeholder="Segundo Asesor seleccionado" />
                                                </div>

                                                <div className="flex justify-end items-center mt-8 col-span-4">
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
