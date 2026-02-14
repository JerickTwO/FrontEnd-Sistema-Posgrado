import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';

const ApprovalModal = ({ isOpen, onClose, onSave, project }) => {
    const hasPDFs = () => {
        return project?.pdfDocument || project?.docDocument;
    };

    const validationSchema = Yup.object({
        studentCode: Yup.string().required('El primer estudiante es obligatorio'),
        studentTwoCode: Yup.string().test(
            'required-if-student-two',
            'El segundo estudiante es obligatorio',
            function (value) {
                const { studentTwoFirstNames } = this.parent;
                if (!studentTwoFirstNames) return true;
                return !!value;
            }
        ),
        reg: Yup.string().required('El número de constancia es obligatorio'),
        secondArticleNumber: Yup.number()
            .typeError('Debe ser un número')
            .required('El porcentaje de similitud es obligatorio')
            .min(0, 'El porcentaje no puede ser negativo')
            .max(24, 'El porcentaje no puede ser mayor a 24'),
        meetRequirements: Yup.string().required('Selecciona una opción'),
        observation: Yup.string().when('meetRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const initialValues = React.useMemo(
        () => ({
            titleReservationStepOne: project?.titleReservationStepOne?.id || '',
            studentCode: project?.titleReservationStepOne?.student?.studentCode || 'N/A',
            studentTwoCode: project?.titleReservationStepOne?.studentTwo?.studentCode || '',
            studentFirstNames: project?.titleReservationStepOne?.student?.firstNames || 'N/A',
            studentTwoFirstNames: project?.titleReservationStepOne?.studentTwo?.firstNames || '',
            observation: project?.observations || '',
            engineeringFaculty: project?.engineeringFaculty
                ? {
                    value: project.engineeringFaculty.id,
                    label: `${project.engineeringFaculty.firstNames} ${project.engineeringFaculty.lastName}`,
                }
                : null,
            meetRequirements: project?.meetRequirements ? 'yes' : 'no',
            secondArticleNumber: project?.secondArticleNumber || '',
            reg: project?.reg || '',
        }),
        [project]
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
                                {project ? 'Editar Registro' : 'Crear Registro'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    enableReinitialize
                                    onSubmit={(values) => {
                                        const transformedValues = {
                                            titleReservationStepOne: { id: values.titleReservationStepOne },
                                            engineeringFaculty: values.engineeringFaculty
                                                ? { id: values.engineeringFaculty.value }
                                                : null,
                                            observations: values.observation || '',
                                            meetRequirements: values.meetRequirements === 'yes',
                                            secondArticleNumber: values.secondArticleNumber || '',
                                            reg: values.reg || '',
                                        };
                                        onSave(transformedValues, project.id);
                                    }}
                                >
                                    {({ errors, submitCount, setFieldValue, values }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {/* Primer Estudiante (readonly) */}
                                            <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                <label htmlFor="studentCode">Primer Estudiante</label>
                                                <Field
                                                    name="studentCode"
                                                    type="text"
                                                    id="studentCode"
                                                    readOnly
                                                    className="form-input"
                                                />
                                                <ErrorMessage
                                                    name="studentCode"
                                                    component="div"
                                                    className="text-danger mt-1"
                                                />
                                            </div>

                                            {/* Segundo Estudiante (conditional) */}
                                            {project?.titleReservationStepOne?.studentTwo && (
                                                <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                    <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                    <Field
                                                        name="studentTwoCode"
                                                        type="text"
                                                        id="studentTwoCode"
                                                        readOnly
                                                        className="form-input"
                                                    />
                                                    <ErrorMessage
                                                        name="studentTwoCode"
                                                        component="div"
                                                        className="text-danger mt-1"
                                                    />
                                                </div>
                                            )}
                                            <div className="col-span-1">
                                                <label htmlFor="reg">Número de Constancia</label>
                                                <Field
                                                    name="reg"
                                                    type="number"
                                                    id="reg"
                                                    placeholder="Ingrese el número de constancia"
                                                    className="form-input"
                                                />
                                                <ErrorMessage
                                                    name="reg"
                                                    component="div"
                                                    className="text-danger mt-1"
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="secondArticleNumber">
                                                    Porcentaje de Similitud
                                                </label>
                                                <Field
                                                    name="secondArticleNumber"
                                                    type="text"
                                                    id="secondArticleNumber"
                                                    placeholder="Ingrese el porcentaje de similitud"
                                                    className="form-input"
                                                    title="Solo se permiten números y máximo 2 decimales. Valor máximo: 24"

                                                />
                                                <ErrorMessage
                                                    name="secondArticleNumber"
                                                    component="div"
                                                    className="text-danger mt-1"
                                                />
                                            </div>
                                            {
                                                !project?.meetRequirements && (<div>
                                                    <label htmlFor="meetRequirements">Cumple Requisitos</label>
                                                    <div className="flex gap-4">
                                                        <label>
                                                            <Field
                                                                type="radio"
                                                                name="meetRequirements"
                                                                value="yes"
                                                                className="form-radio"
                                                                disabled={!hasPDFs()}
                                                                onChange={() => {
                                                                    setFieldValue('meetRequirements', 'yes');
                                                                    setFieldValue('observation', '');
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
                                                            />
                                                            No
                                                        </label>
                                                    </div>
                                                    {!hasPDFs() && (
                                                        <p className="text-warning text-sm mt-2">
                                                            ⚠️ Debe subir y revisar los PDFs primero para marcar como "Sí cumple requisitos"
                                                        </p>
                                                    )}
                                                    <ErrorMessage name="meetRequirements" component="div" className="text-danger mt-1" />
                                                </div>)
                                            }

                                            {/* Observaciones */}
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
                                                <ErrorMessage
                                                    name="observation"
                                                    component="div"
                                                    className="text-danger mt-1"
                                                />
                                            </div>

                                            {/* Botones */}
                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={onClose}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                >
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

export default ApprovalModal;
