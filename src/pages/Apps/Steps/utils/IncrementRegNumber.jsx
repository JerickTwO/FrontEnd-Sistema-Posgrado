// import { useState } from "react";
// import InfoService from "../../../../api/InfoService";
// import Swal from "sweetalert2";

// const useIncrementRegNumber = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const incrementFields = async (fields) => {
//         try {
//             setLoading(true);
//             setError(null);

//             const response = await InfoService.incrementFields(fields);
//             if (response) {

//                 Object.keys(fields).forEach((field) => {
//                     if (response && response[field] !== undefined) {
//                         Swal.fire({
//                             icon: "success",
//                             title: "¡Incremento exitoso!",
//                             text: `${field} ahora es: ${response[field]}`,
//                             confirmButtonText: "Aceptar",
//                         });
//                     }
//                 });
//                 return response;
//             }
//         } catch (error) {
//             console.error("Error al incrementar los campos:", error);
//             setError("Error al incrementar los campos.");
//             Swal.fire({
//                 icon: "error",
//                 title: "Error al incrementar",
//                 text: "No se pudo incrementar los campos.",
//                 confirmButtonText: "Intentar nuevamente",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { incrementFields, loading, error };
// };

// export default useIncrementRegNumber;
