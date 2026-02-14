import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../store/themeConfigSlice";
import InfoService from "../api/institucionalInfoService";
import IconCalendar from "../components/Icon/IconCalendar";
import IconUser from "../components/Icon/IconUser";
import Swal from "sweetalert2";

const InstitucionalInfo = () => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchInfo = useCallback(async () => {
        try {
            setLoading(true);
            const response = await InfoService.getInfo();

            if (!response || Object.keys(response).length === 0) {
                // No hay datos aún
                setInfo({
                    id: null,
                    deanName: '',
                    commemorativeText: '',
                    directorAdministracion: '',
                    secretariaAdministracion: '',
                    paso2NumeroArticulo: '',
                    paso3NumeroArticulo: '',
                    paso4NumeroArticulo: '',
                    paso52NumeroArticulo: '',
                    paso52NumeroResolucion: '',
                    paso52SegundoNumeroResolucion: '',
                    paso53NumeroArticulo: '',
                    paso6NumeroArticulo: '',
                    paso82NumeroArticulo: '',
                    paso9NumeroResolucion: '',
                    paso11NumeroArticulo: '',
                });
            } else {
                setInfo(response);
            }
        } catch (err) {
            console.error("Error al cargar la información institucional:", err);
            setError("Error inesperado al cargar la información institucional.");
        } finally {
            setLoading(false);
        }
    }, []);


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Actualizar la información
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                deanName: info.deanName?.trim() || '',
                commemorativeText: info.commemorativeText?.trim() || '',
                directorAdministracion: info.directorAdministracion?.trim() || '',
                secretariaAdministracion: info.secretariaAdministracion?.trim() || '',
                paso2NumeroArticulo: info.paso2NumeroArticulo ? parseInt(info.paso2NumeroArticulo) : null,
                paso3NumeroArticulo: info.paso3NumeroArticulo ? parseInt(info.paso3NumeroArticulo) : null,
                paso4NumeroArticulo: info.paso4NumeroArticulo ? parseInt(info.paso4NumeroArticulo) : null,
                paso52NumeroArticulo: info.paso52NumeroArticulo ? parseInt(info.paso52NumeroArticulo) : null,
                paso52NumeroResolucion: info.paso52NumeroResolucion ? parseInt(info.paso52NumeroResolucion) : null,
                paso52SegundoNumeroResolucion: info.paso52SegundoNumeroResolucion ? parseInt(info.paso52SegundoNumeroResolucion) : null,
                paso53NumeroArticulo: info.paso53NumeroArticulo ? parseInt(info.paso53NumeroArticulo) : null,
                paso6NumeroArticulo: info.paso6NumeroArticulo ? parseInt(info.paso6NumeroArticulo) : null,
                paso82NumeroArticulo: info.paso82NumeroArticulo ? parseInt(info.paso82NumeroArticulo) : null,
                paso9NumeroResolucion: info.paso9NumeroResolucion ? parseInt(info.paso9NumeroResolucion) : null,
                paso11NumeroArticulo: info.paso11NumeroArticulo ? parseInt(info.paso11NumeroArticulo) : null,
            };

            const updatedInfo = info.id
                ? await InfoService.updateInfo({ id: info.id, ...payload })
                : await InfoService.createInfo(payload);

            setInfo(updatedInfo);

            Swal.fire({
                icon: "success",
                title: info.id ? "¡Actualización exitosa!" : "¡Información guardada!",
                text: "La información institucional se " + (info.id ? "actualizó" : "registró") + " correctamente.",
                confirmButtonText: "Aceptar",
            });
        } catch (error) {
            console.error("Error al guardar la información:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "No se pudo guardar la información institucional.",
                confirmButtonText: "Intentar nuevamente",
            });
        }
    };


    useEffect(() => {
        dispatch(setPageTitle("Información de la Institución"));
        fetchInfo();
    }, [dispatch, fetchInfo]);

    if (loading) return <p>Cargando...</p>;
    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3 rounded-xl">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Información Institucional
                        </h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* INFORMACIÓN BÁSICA */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4">Información Básica</h6>
                            
                            <div className="mb-5">
                                <label htmlFor="deanName">
                                    Nombre del Decano de la Facultad de Administración
                                </label>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconUser />
                                    </div>
                                    <input
                                        type="text"
                                        name="deanName"
                                        value={info.deanName || ''}
                                        onChange={handleChange}
                                        placeholder="Nombre del Decano"
                                        className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="commemorativeText">
                                    Nombre del Año Académico
                                </label>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconCalendar />
                                    </div>
                                    <input
                                        type="text"
                                        name="commemorativeText"
                                        value={info.commemorativeText || ''}
                                        onChange={handleChange}
                                        placeholder="Texto Conmemorativo"
                                        className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="directorAdministracion">
                                    Director de la UI de la facultad de Administración
                                </label>
                                <input
                                    type="text"
                                    name="directorAdministracion"
                                    value={info.directorAdministracion || ''}
                                    onChange={handleChange}
                                    placeholder="Director de administración"
                                    className="form-input"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="secretariaAdministracion">
                                    Secretaría de la UI de Administración
                                </label>
                                <input
                                    type="text"
                                    name="secretariaAdministracion"
                                    value={info.secretariaAdministracion || ''}
                                    onChange={handleChange}
                                    placeholder="Secretaría de la UI de Administración"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 2 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 2: Filtro de Similitud</h6>
                            <div className="mb-5">
                                <label htmlFor="paso2NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso2NumeroArticulo"
                                    value={info.paso2NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 3 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 3: Revisión y Aprobación de Proyecto</h6>
                            <div className="mb-5">
                                <label htmlFor="paso3NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso3NumeroArticulo"
                                    value={info.paso3NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 4 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 4: Filtro de Similitud II</h6>
                            <div className="mb-5">
                                <label htmlFor="paso4NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso4NumeroArticulo"
                                    value={info.paso4NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 5 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 5: Presentación de Informe</h6>
                            
                            <h6 className="md:col-span-2 font-semibold text-sm mb-3 text-gray-600">PDF 5-2</h6>
                            <div className="mb-5">
                                <label htmlFor="paso52NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso52NumeroArticulo"
                                    value={info.paso52NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="paso52NumeroResolucion">Número de Resolución</label>
                                <input
                                    type="number"
                                    name="paso52NumeroResolucion"
                                    value={info.paso52NumeroResolucion || ''}
                                    onChange={handleChange}
                                    placeholder="Número de resolución"
                                    className="form-input"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="paso52SegundoNumeroResolucion">Segundo Número de Resolución</label>
                                <input
                                    type="number"
                                    name="paso52SegundoNumeroResolucion"
                                    value={info.paso52SegundoNumeroResolucion || ''}
                                    onChange={handleChange}
                                    placeholder="Segundo número de resolución"
                                    className="form-input"
                                />
                            </div>

                            <h6 className="md:col-span-2 font-semibold text-sm mb-3 text-gray-600">PDF 5-3</h6>
                            <div className="mb-5">
                                <label htmlFor="paso53NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso53NumeroArticulo"
                                    value={info.paso53NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 6 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 6: Revisión de Informe</h6>
                            <div className="mb-5">
                                <label htmlFor="paso6NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso6NumeroArticulo"
                                    value={info.paso6NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>
                            {/* PASO 8 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 8: Solicitud de Tesis</h6>
                            <h6 className="md:col-span-2 font-semibold text-sm mb-3 text-gray-600">PDF 8-2</h6>
                            <div className="mb-5">
                                <label htmlFor="paso82NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso82NumeroArticulo"
                                    value={info.paso82NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 9 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 9: Filtro de Similitud III</h6>
                            <div className="mb-5">
                                <label htmlFor="paso9NumeroResolucion">Número de Resolución</label>
                                <input
                                    type="number"
                                    name="paso9NumeroResolucion"
                                    value={info.paso9NumeroResolucion || ''}
                                    onChange={handleChange}
                                    placeholder="Número de resolución"
                                    className="form-input"
                                />
                            </div>

                            {/* PASO 11 */}
                            <h6 className="md:col-span-2 font-semibold text-base mb-4 mt-6">Paso 11: Entrega de Título</h6>
                            <div className="mb-5">
                                <label htmlFor="paso11NumeroArticulo">Número de Artículo</label>
                                <input
                                    type="number"
                                    name="paso11NumeroArticulo"
                                    value={info.paso11NumeroArticulo || ''}
                                    onChange={handleChange}
                                    placeholder="Número de artículo"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Botón de Actualizar */}
                        <button
                            type="submit"
                            className="btn btn-primary py-[6px] px-[10px] mt-6"
                        >
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InstitucionalInfo;
