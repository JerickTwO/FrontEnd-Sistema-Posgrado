import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../../components/Icon/IconX';
import Select from 'react-select';
import teacherService from '../../../../api/teacherService.jsx';
import { HandleMode } from '../../styles/selectStyles';
import { useSelector } from 'react-redux';

const ThesisModal = ({ isOpen, onClose, onSave, thesis }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);

    const validationSchema = Yup.object({
        studentCode: Yup.string().max(6, 'Máximo 6 caracteres').required('Requerido'),
        meetsRequirements: Yup.string().required('Selecciona una opción'),
        observations: Yup.string(),
        refDate: Yup.string(),
        cartNumber: Yup.string(),
        url: Yup.string(),
        fechaSorteo: Yup.string(),
        horaSorteo: Yup.string(),
        lugarPresencial: Yup.string(),
        president: Yup.object().nullable(),
        firstMember: Yup.object().nullable(),
        secondMember: Yup.object().nullable(),
        accessory: Yup.object().nullable(),
        adviser: Yup.object().nullable(),
        coadviser: Yup.object().nullable(),
    });

    const mapTeacherToOption = (t) => t ? ({ value: t.id, label: `${t.firstNames} ${t.lastName}` }) : null;

    const initialValues = React.useMemo(
        () => ({
            studentCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode || 'N/A',
            studentTwoCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo?.studentCode || '',
            meetsRequirements: thesis?.meetsRequirements ? 'yes' : 'no',
            observations: thesis?.observations || '',
            title: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.title || '',
            lineOfResearch: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch
                ? { value: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.id, label: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.name }
                : null,
            projectSimilarity: thesis?.projectSimilarity || '',
            reg: thesis?.reg || '',
            refDate: thesis?.refDate || '',
            cartNumber: thesis?.cartNumber || '',
            url: thesis?.url || '',
            fechaSorteo: thesis?.fechaSorteo || '',
            horaSorteo: thesis?.horaSorteo || '',
            lugarPresencial: thesis?.lugarPresencial || '',
            president: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.president) || null,
            firstMember: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.firstMember) || null,
            secondMember: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.secondMember) || null,
            accessory: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.accessory) || null,
            adviser: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.adviser) || null,
            coadviser: mapTeacherToOption(thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.coadviser) || null,
        }),
        [thesis]
    );
    const [jurorOptions, setJurorOptions] = React.useState([]);
    React.useEffect(() => {
        const loadTeachers = async () => {
            try {
                const careerId = thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.id;
                const list = careerId ? await teacherService.getTeachersByCareer(careerId) : await teacherService.getTeachers();
                const options = (list || []).map((t) => ({ value: t.id, label: `${t.firstNames} ${t.lastName}` }));
                setJurorOptions(options);
            } catch (e) {
                setJurorOptions([]);
            }
        };
        if (isOpen) loadTeachers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const filterOptions = (selectedValues, currentFieldValue) => {
        const selectedIds = selectedValues.filter((val) => val && val.value !== currentFieldValue?.value).map((val) => val.value);
        return jurorOptions.filter((opt) => !selectedIds.includes(opt.value));
    };
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const normalizedValues = {
            ...values,
            meetsRequirements: values.meetsRequirements === 'yes' ? true : false,
            refDate: values.refDate,
            cartNumber: values.cartNumber,
            url: values.url,
            fechaSorteo: values.fechaSorteo,
            horaSorteo: values.horaSorteo,
            lugarPresencial: values.lugarPresencial,
            president: values.president ? { id: values.president.value } : null,
            firstMember: values.firstMember ? { id: values.firstMember.value } : null,
            secondMember: values.secondMember ? { id: values.secondMember.value } : null,
            accessory: values.accessory ? { id: values.accessory.value } : null,
            adviser: values.adviser ? { id: values.adviser.value } : null,
            coadviser: values.coadviser ? { id: values.coadviser.value } : null,

        };
        if (thesis?.meetsRequirements === true) {
            delete normalizedValues.meetsRequirements;
        }

        await onSave(thesis.id, normalizedValues);
        setSubmitting(false);
        resetForm();
    };
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
                                {thesis ? 'Editar Constancia' : 'Crear Constancia'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ setFieldValue, values, submitCount, errors, isSubmitting }) => {
                                        const selectedValues = [values.president, values.firstMember, values.secondMember, values.accessory, values.adviser, values.coadviser];
                                        return (
                                            <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="col-span-2 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                        Primer Documento
                                                    </div>
                                                    <div className={submitCount && errors.studentCode ? 'has-error' : ''}>
                                                        <label htmlFor="studentCode">Primer Estudiante</label>
                                                        <Field
                                                            name="studentCode"
                                                            type="text"
                                                            id="studentCode"
                                                            readOnly
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="studentCode" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                                        <div className={submitCount && errors.studentTwoCode ? 'has-error' : ''}>
                                                            <label htmlFor="studentTwoCode">Segundo Estudiante</label>
                                                            <Field
                                                                name="studentTwoCode"
                                                                type="text"
                                                                id="studentTwoCode"
                                                                readOnly
                                                                className="form-input"
                                                            />
                                                            <ErrorMessage name="studentTwoCode" component="div" className="text-danger mt-1" />
                                                        </div>
                                                    )}
                                                    <div className="col-span-1">
                                                        <label htmlFor="lugarPresencial">Lugar Presencial</label>
                                                        <Field
                                                            name="lugarPresencial"
                                                            type="text"
                                                            id="lugarPresencial"
                                                            placeholder="Ingrese el lugar presencial"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="lugarPresencial" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    {/* <div className="col-span-1">
                                                        <label htmlFor="projectSimilarity">Porcentaje de Similitud</label>
                                                        <Field
                                                            name="projectSimilarity"
                                                            id="projectSimilarity"
                                                            type="text"
                                                            placeholder="Ingrese porcentaje de similitud"
                                                            onInput={(e) => {
                                                                let value = e.target.value;

                                                                value = value.replace(/\D/g, '');
                                                                if (value) {
                                                                    const numericValue = parseInt(value, 10);
                                                                    if (numericValue > 25) {
                                                                        value = '25';
                                                                    } else {
                                                                        value = numericValue.toString();
                                                                    }
                                                                }

                                                                e.target.value = value;
                                                                setFieldValue('projectSimilarity', value);
                                                            }}

                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="projectSimilarity" component="div" className="text-danger mt-1" />
                                                    </div> */}

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
                                                        <label htmlFor="refDate">Fecha de Referencia</label>
                                                        <Field
                                                            name="refDate"
                                                            type="date"
                                                            id="refDate"
                                                            placeholder="Seleccione la fecha de referencia"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="refDate" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="cartNumber">Número de Carta</label>
                                                        <Field
                                                            name="cartNumber"
                                                            type="text"
                                                            id="cartNumber"
                                                            placeholder="Ingrese el número de carta"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="cartNumber" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="url">URL</label>
                                                        <Field
                                                            name="url"
                                                            type="text"
                                                            id="url"
                                                            placeholder="Ingrese la URL"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="url" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="fechaSorteo">Fecha de Sorteo</label>
                                                        <Field
                                                            name="fechaSorteo"
                                                            type="text"
                                                            id="fechaSorteo"
                                                            placeholder="Ingrese la fecha de sorteo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="fechaSorteo" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="horaSorteo">Hora de Sorteo</label>
                                                        <Field
                                                            name="horaSorteo"
                                                            type="text"
                                                            id="horaSorteo"
                                                            placeholder="Ingrese la hora de sorteo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="horaSorteo" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-2 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                        Segundo Documento
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
                                                        <Select
                                                            id="adviser"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.adviser)}
                                                            value={values.adviser}
                                                            onChange={(option) => setFieldValue('adviser', option)}
                                                            placeholder="Seleccione asesor..."
                                                            isClearable
                                                        />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="coadviser">Segundo Asesor</label>
                                                        <Select
                                                            id="coadviser"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.coadviser)}
                                                            value={values.coadviser}
                                                            onChange={(option) => setFieldValue('coadviser', option)}
                                                            placeholder="Seleccione segundo asesor (opcional)..."
                                                            isClearable
                                                        />
                                                    </div>

                                                    {
                                                        !thesis.meetsRequirements && (
                                                            <div className="col-span-1">
                                                                <label htmlFor="meetsRequirements">Cumple Requisitos</label>
                                                                <div className="flex gap-4">
                                                                    <label>
                                                                        <Field
                                                                            type="radio"
                                                                            name="meetsRequirements"
                                                                            value="yes"
                                                                            className="form-radio"
                                                                            onChange={() => {
                                                                                setFieldValue('meetsRequirements', 'yes');
                                                                                setFieldValue('observations', '');
                                                                            }}
                                                                        />
                                                                        Sí
                                                                    </label>
                                                                    <label>
                                                                        <Field
                                                                            type="radio"
                                                                            name="meetsRequirements"
                                                                            value="no"
                                                                            className="form-radio"
                                                                            onChange={() => {
                                                                                setFieldValue('meetsRequirements', 'no');
                                                                            }}
                                                                        />
                                                                        No
                                                                    </label>
                                                                </div>
                                                                <ErrorMessage name="meetsRequirements" component="div" className="text-danger mt-1" />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-span-2">
                                                        <label htmlFor="observations">Observaciones</label>
                                                        <Field
                                                            name="observations"
                                                            as="textarea"
                                                            id="observations"
                                                            placeholder="Ingrese observaciones"
                                                            className="form-input"
                                                            disabled={values.meetsRequirements === 'yes'}
                                                            style={{
                                                                cursor: values.meetsRequirements === 'yes' ? 'not-allowed' : 'auto',
                                                                opacity: values.meetsRequirements === 'yes' ? 0.5 : 1,
                                                            }}
                                                        />
                                                        <ErrorMessage name="observations" component="div" className="text-danger mt-1" />
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
                                                            {isSubmitting
                                                                ? 'Guardando...'
                                                                : 'Guardar'}
                                                        </button>
                                                    </div>
                                                </Form>
                                        );}}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
export default ThesisModal;
