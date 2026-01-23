import Select from 'react-select';
import useDarkMode from '../utils/darkMode';
import { ErrorMessage } from 'formik';
import '../../styles/toggleSwitch.css';
import { HandleMode } from '../../styles/selectStyles';
import React from 'react';


const SelectCareer = ({ setFieldValue, filterStudentsByCareer, errors, submitCount, onChange }) => {
    const isDarkMode = useDarkMode();
    const styles = HandleMode(isDarkMode);
    const adminCareer = { value: 1, label: 'Administración' };

    React.useEffect(() => {
        setFieldValue('career', adminCareer);
        filterStudentsByCareer(1);
        if (onChange) onChange(adminCareer);
    }, []);

    return (
        <div>
            <label htmlFor="career" className="block mb-1">
                Carrera
            </label>
            <Select
                name="career"
                options={[adminCareer]}
                value={adminCareer}
                styles={styles}
                isDisabled={true}
                placeholder="Administración"
                className={submitCount && errors.career ? 'error' : ''}
            />
            <ErrorMessage name="career" component="div" className="text-danger mt-1" />
        </div>
    );
};

export default SelectCareer;