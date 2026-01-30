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

    const from12To24 = (value) => {
        if (!value) return '';
        const lower = value.trim().toLowerCase();
        const match = lower.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
        if (!match) return value;
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
        meetsRequirements: Yup.string().required('Selecciona una opción'),
        includeAdditionalDocs: Yup.boolean(),
        cartNumber: Yup.string().required('El número de carta es obligatorio'),
        regNumber: Yup.string().required('El número de registro es obligatorio'),
        url: Yup.string().required('La URL es obligatoria'),
        fechaSorteo: Yup.string().required('La fecha de sorteo es obligatoria'),
        horaSorteo: Yup.string().required('La hora de sorteo es obligatoria'),
        lugarPresencial: Yup.string().required('El lugar presencial es obligatorio'),
        // Campos condicionales - Segundo Documento
        numeroActa: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El número de acta es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        horaActaSorteo: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('La hora de acta de sorteo es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
        fechaActaSorteo: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('La fecha de acta de sorteo es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
        fechaSorteoJurados: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('La fecha de sorteo de jurados es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
        numeroArticulo: Yup.number().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El número de artículo es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        numeroResolucion: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El número de resolución es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        segundoNumeroResolucion: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El segundo número de resolución es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        horaSorteoJurados: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('La hora de sorteo de jurados es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
        // Campos condicionales - Tercer Documento
        segundoCartNumber: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El segundo número de carta es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        segundaFechaCarta: Yup.string().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('La segunda fecha de carta es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
        segundoNumeroArticulo: Yup.number().when('includeAdditionalDocs', {
            is: true,
            then: (schema) => schema.required('El segundo número de artículo es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
        president: Yup.object().nullable().required('El presidente es obligatorio'),
        firstMember: Yup.object().nullable().required('El primer miembro es obligatorio'),
        secondMember: Yup.object().nullable().required('El segundo miembro es obligatorio'),
        accessory: Yup.object().nullable().required('El accesitario es obligatorio'),
        adviser: Yup.object().nullable().required('El asesor es obligatorio'),
        coadviser: Yup.object().nullable(),
        observations: Yup.string().when('meetsRequirements', {
            is: 'no',
            then: (schema) => schema.required('Las observaciones son obligatorias cuando no cumple requisitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const mapTeacherToOption = (t) => t ? ({ value: t.id, label: `${t.firstNames} ${t.lastName}` }) : null;

    const initialValues = React.useMemo(
        () => ({
            studentCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode || 'N/A',
            studentTwoCode: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo?.studentCode || '',
            meetsRequirements: thesis?.meetsRequirements === true ? 'yes' : 'no',
            includeAdditionalDocs: thesis?.includeAdditionalDocs || false,
            title: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.title || '',
            lineOfResearch: thesis?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch
                ? { value: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.id, label: thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.lineOfResearch.name }
                : null,
            projectSimilarity: thesis?.projectSimilarity || '',
            cartNumber: thesis?.cartNumber || '',
            segundoCartNumber: thesis?.segundoCartNumber || '',
            regNumber: thesis?.regNumber || '',
            url: thesis?.url || '',
            fechaSorteo: thesis?.fechaSorteo || '',
            horaSorteo: from12To24(thesis?.horaSorteo),
            lugarPresencial: thesis?.lugarPresencial || '',
            numeroActa: thesis?.numeroActa || '',
            horaActaSorteo: from12To24(thesis?.horaActaSorteo),
            fechaActaSorteo: thesis?.fechaActaSorteo || '',
            fechaSorteoJurados: thesis?.fechaSorteoJurados || '',
            segundaFechaCarta: thesis?.segundaFechaCarta || '',
            numeroArticulo: thesis?.numeroArticulo || '',
            segundoNumeroArticulo: thesis?.segundoNumeroArticulo || '',
            numeroResolucion: thesis?.numeroResolucion || '',
            segundoNumeroResolucion: thesis?.segundoNumeroResolucion || '',
            horaSorteoJurados: from12To24(thesis?.horaSorteoJurados),
            president: mapTeacherToOption(thesis?.president) || null,
            firstMember: mapTeacherToOption(thesis?.firstMember) || null,
            secondMember: mapTeacherToOption(thesis?.secondMember) || null,
            accessory: mapTeacherToOption(thesis?.accessory) || null,
            adviser: mapTeacherToOption(thesis?.adviser) || null,
            coadviser: mapTeacherToOption(thesis?.coadviser) || null,
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
    }, [isOpen]);

    const filterOptions = (selectedValues, currentFieldValue) => {
        const selectedIds = selectedValues.filter((val) => val && val.value !== currentFieldValue?.value).map((val) => val.value);
        return jurorOptions.filter((opt) => !selectedIds.includes(opt.value));
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        const normalizedValues = {
            ...values,
            meetsRequirements: values.meetsRequirements === 'yes',
            includeAdditionalDocs: values.includeAdditionalDocs,
            cartNumber: values.cartNumber,
            segundoCartNumber: values.segundoCartNumber,
            regNumber: values.regNumber,
            url: values.url,
            fechaSorteo: values.fechaSorteo,
            horaSorteo: to12WithSuffix(values.horaSorteo),
            lugarPresencial: values.lugarPresencial,
            numeroActa: values.numeroActa,
            horaActaSorteo: to12WithSuffix(values.horaActaSorteo),
            fechaActaSorteo: values.fechaActaSorteo,
            fechaSorteoJurados: values.fechaSorteoJurados,
            segundaFechaCarta: values.segundaFechaCarta,
            numeroArticulo: values.numeroArticulo,
            segundoNumeroArticulo: values.segundoNumeroArticulo,
            numeroResolucion: values.numeroResolucion,
            segundoNumeroResolucion: values.segundoNumeroResolucion,
            horaSorteoJurados: to12WithSuffix(values.horaSorteoJurados),
            president: values.president ? { id: values.president.value } : null,
            firstMember: values.firstMember ? { id: values.firstMember.value } : null,
            secondMember: values.secondMember ? { id: values.secondMember.value } : null,
            accessory: values.accessory ? { id: values.accessory.value } : null,
            adviser: values.adviser ? { id: values.adviser.value } : null,
            coadviser: values.coadviser ? { id: values.coadviser.value } : null,

        };
        await onSave(thesis.id, normalizedValues);
        setSubmitting(false);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full  text-black dark:text-white-dark max-w-[800px]">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {thesis ? 'Editar Presentación' : 'Crear Presentación'}
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
                                            <Form className="grid grid-cols-2 gap-4 sm:grid-cols-3 ">
                                                     
                                                    <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                        Primer Documento - Carta Multiple
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
                                                        <label htmlFor="segundoCartNumber">Fecha de Sorteo de Jurados</label>
                                                        <Field
                                                            name="fechaSorteo"
                                                            type="date"
                                                            id="fechaSorteo"
                                                            placeholder="Ingrese la fecha"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="fechaSorteo" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="horaSorteo">Hora de Sorteo</label>
                                                        <Field
                                                            name="horaSorteo"
                                                            type="time"
                                                            id="horaSorteo"
                                                            placeholder="Ingrese la hora"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="horaSorteo" component="div" className="text-danger mt-1" />
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
                                                        <label htmlFor="lugarPresencial">Lugar Presencial</label>
                                                        <Field
                                                            name="lugarPresencial"
                                                            type="text"
                                                            id="lugarPresencial"
                                                            placeholder="Ingrese el lugar "
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="lugarPresencial" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-4 flex items-center gap-3 py-3 border-b border-gray-300 dark:border-gray-700">
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <Field
                                                                type="checkbox"
                                                                name="includeAdditionalDocs"
                                                                className="form-checkbox"
                                                                onChange={(e) => {
                                                                    setFieldValue('includeAdditionalDocs', e.target.checked);
                                                                    // Limpiar campos cuando se desmarca
                                                                    if (!e.target.checked) {
                                                                        setFieldValue('numeroActa', '');
                                                                        setFieldValue('horaActaSorteo', '');
                                                                        setFieldValue('fechaActaSorteo', '');
                                                                        setFieldValue('fechaSorteoJurados', '');
                                                                        setFieldValue('numeroArticulo', '');
                                                                        setFieldValue('numeroResolucion', '');
                                                                        setFieldValue('segundoNumeroResolucion', '');
                                                                        setFieldValue('horaSorteoJurados', '');
                                                                        setFieldValue('segundoCartNumber', '');
                                                                        setFieldValue('segundaFechaCarta', '');
                                                                        setFieldValue('segundoNumeroArticulo', '');
                                                                    }
                                                                }}
                                                            />
                                                            <span className="ml-2 text-sm font-medium">
                                                                Incluir documentos adicionales (Acta de Sorteo y Carta)
                                                            </span>
                                                        </label>
                                                    </div>
                                                   
                                                    {values.includeAdditionalDocs && (
                                                        <>
                                                            <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                                Segundo Documento - Acta de Sorteo de Jurados
                                                            </div>
                                                    
                                                    <div className="col-span-1">
                                                        <label htmlFor="numeroActa">Número de Acta</label>
                                                        <Field
                                                            name="numeroActa"
                                                            type="text"
                                                            id="numeroActa"
                                                            placeholder="Ingrese el número de acta"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="numeroActa" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="fechaActaSorteo">Fecha de Acta de Sorteo</label>
                                                        <Field
                                                            name="fechaActaSorteo"
                                                            type="date"
                                                            id="fechaActaSorteo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="fechaActaSorteo" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="horaActaSorteo">Hora de Acta de Sorteo</label>
                                                        <Field
                                                            name="horaActaSorteo"
                                                            type="time"
                                                            id="horaActaSorteo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="horaActaSorteo" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="fechaSorteoJurados">Fecha de Sorteo de Jurados</label>
                                                        <Field
                                                            name="fechaSorteoJurados"
                                                            type="date"
                                                            id="fechaSorteoJurados"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="fechaSorteoJurados" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="horaSorteoJurados">Hora de Sorteo de Jurados</label>
                                                        <Field
                                                            name="horaSorteoJurados"
                                                            type="time"
                                                            id="horaSorteoJurados"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="horaSorteoJurados" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="numeroArticulo">Número de Artículo</label>
                                                        <Field
                                                            name="numeroArticulo"
                                                            type="number"
                                                            id="numeroArticulo"
                                                            placeholder="Ingrese el número de artículo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="numeroArticulo" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="numeroResolucion">Número de Resolución</label>
                                                        <Field
                                                            name="numeroResolucion"
                                                            type="text"
                                                            id="numeroResolucion"
                                                            placeholder="Ingrese el número de resolución"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="numeroResolucion" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="segundoNumeroResolucion">Segundo Número de Resolución Decanal</label>
                                                        <Field
                                                            name="segundoNumeroResolucion"
                                                            type="text"
                                                            id="segundoNumeroResolucion"
                                                            placeholder="Ingrese el segundo número"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="segundoNumeroResolucion" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                        Tercer Documento - Carta
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="segundoCartNumber">Número de Carta</label>
                                                        <Field
                                                            name="segundoCartNumber"
                                                            type="text"
                                                            id="segundoCartNumber"
                                                            placeholder="Ingrese el segundo número de carta"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="segundoCartNumber" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="segundaFechaCarta">Fecha de Carta</label>
                                                        <Field
                                                            name="segundaFechaCarta"
                                                            type="date"
                                                            id="segundaFechaCarta"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="segundaFechaCarta" component="div" className="text-danger mt-1" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="segundoNumeroArticulo">Número de Artículo</label>
                                                        <Field
                                                            name="segundoNumeroArticulo"
                                                            type="number"
                                                            id="segundoNumeroArticulo"
                                                            placeholder="Ingrese el segundo número de artículo"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="segundoNumeroArticulo" component="div" className="text-danger mt-1" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="regNumber">Reg</label>
                                                        <Field
                                                            name="regNumber"
                                                            type="text"
                                                            id="regNumber"
                                                            placeholder="Ingrese el número de registro"
                                                            className="form-input"
                                                        />
                                                        <ErrorMessage name="regNumber" component="div" className="text-danger mt-1" />
                                                    </div>
                                                        </>
                                                    )}
                                                    <div className="col-span-4 text-lg font-semibold  border-b border-gray-300 dark:border-gray-700">
                                                        Jurados
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="president"> Presidente</label>
                                                        <Select
                                                            id="president"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.president)}
                                                            value={values.president}
                                                            onChange={(option) => setFieldValue('president', option)}
                                                            placeholder="Seleccione un docente..."
                                                            isClearable
                                                        />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <label htmlFor="firstMember"> Primer Miembro</label>
                                                        <Select
                                                            id="firstMember"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.firstMember)}
                                                            value={values.firstMember}
                                                            onChange={(option) => setFieldValue('firstMember', option)}
                                                            placeholder="Seleccione un docente..."
                                                            isClearable
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="secondMember"> Segundo Miembro</label>
                                                        <Select
                                                            id="secondMember"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.secondMember)}
                                                            value={values.secondMember}
                                                            onChange={(option) => setFieldValue('secondMember', option)}
                                                            placeholder="Seleccione un docente..."
                                                            isClearable
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="accessory"> Accesitario</label>
                                                        <Select
                                                            id="accessory"
                                                            styles={styles}
                                                            options={filterOptions(selectedValues, values.accessory)}
                                                            value={values.accessory}
                                                            onChange={(option) => setFieldValue('accessory', option)}
                                                            placeholder="Seleccione un docente..."
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
                                                            placeholder="Seleccione un docente..."
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
                                                            placeholder="Seleccione un docente..."
                                                            isClearable
                                                        />
                                                    </div>

                                                    {
                                                        !thesis?.meetsRequirements && (
                                                            <div className="col-span-2">
                                                                <label htmlFor="meetsRequirements">Cumple Requisitos</label>
                                                                <div className="flex gap-4">
                                                                    <label className="flex items-center cursor-pointer">
                                                                        <Field
                                                                            type="radio"
                                                                            name="meetsRequirements"
                                                                            value="yes"
                                                                            className="form-radio"
                                                                            onChange={(e) => {
                                                                                setFieldValue('meetsRequirements', 'yes');
                                                                                setFieldValue('observations', '');
                                                                            }}
                                                                        />
                                                                        <span className="ml-2">Sí</span>
                                                                    </label>
                                                                    <label className="flex items-center cursor-pointer">
                                                                        <Field
                                                                            type="radio"
                                                                            name="meetsRequirements"
                                                                            value="no"
                                                                            className="form-radio"
                                                                            onChange={(e) => {
                                                                                setFieldValue('meetsRequirements', 'no');
                                                                            }}
                                                                        />
                                                                        <span className="ml-2">No</span>
                                                                    </label>
                                                                </div>
                                                                <ErrorMessage name="meetsRequirements" component="div" className="text-danger mt-1" />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-span-4">
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
                                                    <div className="flex justify-end items-center mt-8 col-span-4">
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
