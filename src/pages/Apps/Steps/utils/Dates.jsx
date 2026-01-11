// Convierte un número a su representación en letras (hasta 999)
// Ejemplo: numberALetters(123) => "ciento veintitrés"
export const numberALetters = (num) => {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', '', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const cientos = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (typeof num !== 'number' || num < 0 || num >= 1000000) {
        return 'Número fuera de rango o inválido';
    }

    if (num === 100) return 'cien';
    if (num < 10) return unidades[num];
    if (num < 20) return especiales[num - 10];
    if (num < 30) return num === 20 ? 'veinte' : `veinti${unidades[num % 10]}`;
    if (num < 100) return `${decenas[Math.floor(num / 10)]} y ${unidades[num % 10]}`.trim();
    if (num < 1000) return `${cientos[Math.floor(num / 100)]} ${numberALetters(num % 100)}`.trim();

    if (num < 1000000) {
        const milParte = Math.floor(num / 1000);
        const restoParte = num % 1000;

        // Si el número es 1000 o mayor, pero menos de 2000, simplemente poner "mil"
        const milTexto = milParte === 1 ? 'mil' : `${unidades[milParte]} mil`;

        const restoTexto = restoParte === 0 ? '' : ` ${numberALetters(restoParte)}`;

        return milTexto + restoTexto;
    }

    return 'Número fuera de rango';
};


// Obtiene la fecha actual en formato "1 de enero de 2025"
// Ejemplo: getWrittenDate() => "5 de enero del 2025"
export const getWrittenDate = () => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return `${day} de ${month} del ${year}`;
};

export const getWrittenDateEmpresa = () => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return `${day} días del ${month} del año ${numberALetters(year)}`;
};

export const getWrittenDateYearWrite = () => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const diaTexto = day === 1 ? 'día' : 'días';

    return `${day} ${diaTexto} del mes de ${month} del año ${numberALetters(year)}`;
};

// Obtiene solo el año actual
// Ejemplo: getYear() => 2025
export const getYear = () => new Date().getFullYear();

// Formatea una fecha en cadena (ej. ISO) al formato dd/mm/yyyy hh:mm
// Ejemplo: formatDate("2025-01-05T16:38:42.000+00:00") => "05/01/2025 16:38"
export const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    try {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    } catch {
        return 'Fecha inválida';
    }
};

// Convierte una fecha en formato ISO al formato "1 de enero de 2025"
// Ejemplo: getWrittenDateFromInput("2025-01-05") => "5 de enero del 2025"
export const getWrittenDateFromInput = (inputDate) => {
    if (!inputDate) return 'Fecha no disponible';
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    try {
        const date = new Date(inputDate);
        // Sumar un día:
        date.setDate(date.getDate() + 1);

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} de ${month} del ${year}`;
    } catch {
        return 'Fecha inválida';
    }
};


// Convierte una fecha y hora completa al formato extendido con texto
// Ejemplo: getFullWrittenDateTimeFromInput("2025-01-05T16:38:42.000+00:00")
//          => "5 de enero del año dos mil veinticinco, siendo las 16:38 horas"
export const getFullWrittenDateTimeFromInput = (inputDate) => {
    if (!inputDate) return 'Fecha no disponible';

    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const numbersToWords = {
        0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco',
        6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez', 11: 'once',
        12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince', 16: 'dieciséis',
        17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve', 20: 'veinte',
        21: 'veintiuno', 22: 'veintidós', 23: 'veintitrés', 24: 'veinticuatro',
        25: 'veinticinco', 26: 'veintiséis', 27: 'veintisiete', 28: 'veintiocho',
        29: 'veintinueve', 30: 'treinta', 31: 'treinta y uno', 32: 'treinta y dos',
        33: 'treinta y tres', 34: 'treinta y cuatro', 35: 'treinta y cinco',
        36: 'treinta y seis', 37: 'treinta y siete', 38: 'treinta y ocho',
    };

    const date = new Date(inputDate);

    try {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const yearInWords = `dos mil ${numbersToWords[year % 100] || year % 100}`;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} de ${month} del año ${yearInWords}, siendo las ${hours}:${minutes} horas`;
    } catch {
        return 'Fecha inválida';
    }
};

// Formatea un número (string o number) a N dígitos con ceros a la izquierda (por defecto 3)
// Ejemplos:
//   formatNumberWithZero(7)        => "007"
//   formatNumberWithZero("4")     => "004"
//   formatNumberWithZero("004")   => "004"
//   formatNumberWithZero(undefined) => "000"
export const formatNumberWithZero = (value, width = 3) => {
    // Si viene null/undefined, devolvemos todo ceros con el ancho solicitado
    if (value === null || value === undefined) return ''.padStart(width, '0');

    // Aceptar number o string numérica; limpiar caracteres no numéricos por seguridad
    const raw = typeof value === 'number' ? String(value) : String(value).trim();
    const digitsOnly = raw.replace(/[^0-9]/g, '');
    const n = parseInt(digitsOnly, 10);

    if (Number.isNaN(n)) return ''.padStart(width, '0');
    return n.toString().padStart(width, '0');
};

// Convierte una fecha en formato ISO a yyyy-mm-dd
// Ejemplo: formatISODateToSimpleDate("2025-01-05T16:38:42.000+00:00") => "2025-01-05"
export const formatISODateToSimpleDate = (isoDate) => {
    if (!isoDate) return 'Fecha no disponible';

    try {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
        const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos

        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
};


export const formatDateSpanish = (dateStr) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const date = new Date(dateStr);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} de ${month} del ${year}`;
}

// Convierte hora de formato 24h a 12h con AM/PM
// Ejemplo: convertTo12HourFormat("21:21") => "9:21 PM"
// Ejemplo: convertTo12HourFormat("09:30") => "9:30 AM"
// Ejemplo: convertTo12HourFormat("00:00") => "12:00 AM"
export const convertTo12HourFormat = (time24) => {
    if (!time24) return 'Hora no disponible';
    
    try {
        const [hours24, minutes] = time24.split(':');
        const hours = parseInt(hours24, 10);
        
        if (isNaN(hours) || hours < 0 || hours > 23) {
            return 'Hora inválida';
        }
        
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // 0 se convierte en 12
        
        return `${hours12}:${minutes} ${period}`;
    } catch (error) {
        console.error('Error al convertir la hora:', error);
        return 'Hora inválida';
    }
}