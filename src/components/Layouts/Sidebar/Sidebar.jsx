import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';
import { toggleSidebar } from '../../../store/themeConfigSlice';
import IconCaretDown from '../../Icon/IconCaretDown';
import IconMenuDocumentation from '../../Icon/Menu/IconMenuDocumentation';
import IconMenuUsers from '../../Icon/Menu/IconMenuUsers';
import AnimateHeight from 'react-animate-height';
import Swal from 'sweetalert2';
import IconMinus from '../../Icon/IconMinus';
import StepMenuList from './StepMenuList';
import { adminSteps, extraSteps, studentSteps } from '../Sidebar/SideBarSteps';
import IconMenuDashboard from '../../Icon/Menu/IconMenuDashboard';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state) => state.themeConfig);
    const semidark = useSelector((state) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const [user, setUser] = useState(null);

    const isAdmin = user && user.rol && user.rol.name === 'ROLE_ADMIN';
    const isEstudiante = user && user.rol && user.rol.name === 'ROLE_ESTUDIANTE';

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se encontraron los datos del usuario. Inicia sesión nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                            <span className="text-[16px] ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">Sistema PostGrados</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <div>
                                {isAdmin && (
                                    <>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                                <div className="flex items-center">
                                                    <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dashboard</span>
                                                </div>

                                                <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 [&_.active]:!text-primary [&_.active]:!font-bold [&_.active]:!justify-start">
                                                    <li>
                                                        <NavLink to="/progreso">Progreso</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/">Información Institucional</NavLink>
                                                    </li>

                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                            <IconMinus className="w-4 h-5 flex-none hidden" />
                                            <span>Registro</span>
                                        </h2>

                                        <li className="nav-item">
                                            <ul>
                                                <li className="nav-item">
                                                    <NavLink to="/apps/estudiantes" className="group">
                                                        <div className="flex items-center">
                                                            <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Estudiantes</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink to="/apps/docentes" className="group">
                                                        <div className="flex items-center">
                                                            <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Docentes</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                            <IconMinus className="w-4 h-5 flex-none hidden" />
                                            <span>Pasos</span>
                                        </h2>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'steps' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('steps')}>
                                                <div className="flex items-center">
                                                    <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Proceso</span>
                                                </div>

                                                <div className={currentMenu !== 'steps' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'steps' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 [&_.active]:!text-primary [&_.active]:!font-bold [&_.active]:!justify-start">
                                                    <StepMenuList steps={adminSteps} />
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                            <IconMinus className="w-4 h-5 flex-none hidden" />
                                            <span>Pasos Extra</span>
                                        </h2>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'extra-steps' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('extra-steps')}>
                                                <div className="flex items-center">
                                                    <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Proceso</span>
                                                </div>

                                                <div className={currentMenu !== 'extra-steps' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'extra-steps' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 [&_.active]:!text-primary [&_.active]:!font-bold [&_.active]:!bg-transparent [&_.active]:!border-none [&_.active]:!p-0 [&_.active]:!m-0">
                                                    <StepMenuList steps={extraSteps} />
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </>
                                )}
                            </div>
                            {isEstudiante && (
                                <>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dashboard</span>
                                            </div>

                                            <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500 [&_.active]:!text-primary [&_.active]:!font-bold [&_.active]:!justify-start">

                                                <li>
                                                    <NavLink to="/progreso-estudiante">Progreso</NavLink>
                                                </li>

                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                        <IconMinus className="w-4 h-5 flex-none hidden" />
                                        <span>Pasos</span>
                                    </h2>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'steps' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('stepsStudents')}>
                                            <div className="flex items-center">
                                                <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Proceso</span>
                                            </div>

                                            <div className={currentMenu !== 'stepsStudents' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'stepsStudents' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500 [&_.active]:!text-primary [&_.active]:!font-bold [&_.active]:!justify-start">
                                                <StepMenuList steps={studentSteps} />
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </>
                            )}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
