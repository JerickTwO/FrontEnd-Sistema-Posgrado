import React, { useState } from 'react';
import Pagination from '../Pagination';
import { formatDate } from '../utils/Dates';

const JuryRecompositionTable = ({ recompositions, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(recompositions.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecompositions = recompositions.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Observación</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentRecompositions.length > 0 ? (
                            currentRecompositions.map((recomposition) => (
                                <tr key={recomposition.id}>
                                    <td>
                                        {recomposition?.projectApprovalStepTwo.titleReservationStepOne.student?.studentCode || 'N/A'}
                                        {recomposition?.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {recomposition?.projectApprovalStepTwo.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {recomposition?.projectApprovalStepTwo.titleReservationStepOne.student?.firstNames ?? ''} {recomposition?.projectApprovalStepTwo.titleReservationStepOne.student?.lastName ?? ''}
                                        {recomposition?.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <p>
                                                {recomposition?.projectApprovalStepTwo.titleReservationStepOne.studentTwo?.firstNames ?? ''} {recomposition?.projectApprovalStepTwo.titleReservationStepOne.studentTwo?.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>
                                    <td>{recomposition?.projectApprovalStepTwo.titleReservationStepOne.student.career.name}</td>
                                    <td>{recomposition?.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{recomposition?.observation || 'N/A'}</td>
                                    <td>{formatDate(recomposition?.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button
                                            onClick={() => onEdit(recomposition)}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => onEdit(recomposition)}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 text-center">
                                    No hay recomposiciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default JuryRecompositionTable;