import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconMail from '../../components/Icon/IconMail';
import titleReservationsService from '../../api/titleReservationsService';

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        idUser: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        rol: {
            id: 2,
            name: '',
        },
    });

    useEffect(() => {
        dispatch(setPageTitle('Perfil'));
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
    }, [dispatch]);


    const getFullStepList = () => {
        const steps = [];

        for (let i = 1; i <= totalSteps; i++) {
            const reservation = titleReservations[i - 1]; // Acceder secuencialmente

            steps.push({
                stepNumber: i,
                progress: reservation
                    ? (reservation.meetsRequirements ? 75 : 30)
                    : 0,
                lastUpdated: reservation ? reservation.updatedAt : null,
            });
        }

        return steps;
    };

    return (
        <div className="pt-5">
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Perfil</h5>
                </div>
                <div className="mb-5">
                    <div className="flex flex-col justify-center items-center">
                        <img src="/assets/images/user-profile.jpeg" alt="Perfil" className="w-24 h-24 rounded-full object-cover mb-5" />
                        <p className="font-semibold text-primary text-xl">
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                    <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                        <li className="flex items-center gap-2">
                            <IconCoffee className="shrink-0" />
                            {user.username}
                        </li>
                        <li>
                            <button className="flex items-center gap-2">
                                <IconMail className="w-5 h-5 shrink-0" />
                                <span className="text-primary truncate">{user.email}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
