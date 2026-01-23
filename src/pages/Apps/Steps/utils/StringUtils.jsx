function formatFullNameUpper(student) {
    const fn = student && student.firstNames ? student.firstNames : 'Desconocido';
    const ln = student && student.lastName ? student.lastName : 'Desconocido';
    const mn = student && student.middleName ? student.middleName : '';
    return `${fn} ${ln} ${mn}`?.trim();
}

function getGenderedPrefix(student) {
    return student && student.gender === true ? 'el Bachiller.' : 'la Bachiller.';
}

function getGenderedIdentification(student) {
    return student && student.gender === true ? 'identificado con DNI N°' : 'identificada con DNI N°';
}

function buildStudentParts(FIRST_STEP_INFO, includeId = true) {
    const students = [FIRST_STEP_INFO?.student, FIRST_STEP_INFO?.studentTwo];
    return students.filter(Boolean).map((student) => {
        const prefix = getGenderedPrefix(student);
        const name = formatFullNameUpper(student);
        let part = `${prefix} ${name}`;
        if (includeId) {
            const idPhrase = getGenderedIdentification(student);
            const dni = student?.dni ? ` ${idPhrase} ${student.dni}` : '';
            const studentCode = student?.studentCode ? ` y Código de estudiante: ${student.studentCode}` : '';
            part += dni + studentCode;
        }
        return part;
    });
}

export function extractStudentsInfo(FIRST_STEP_INFO) {
    const partsWithId = buildStudentParts(FIRST_STEP_INFO, true);
    const partsWithoutId = buildStudentParts(FIRST_STEP_INFO, false);
    const first = FIRST_STEP_INFO?.student;
    const titleThesis = FIRST_STEP_INFO?.title;

    return {
        firstStudent: first,
        secondStudent: FIRST_STEP_INFO?.studentTwo,
        combinedNames: partsWithId.join(' Y '),
        combinedNamesOnly: partsWithoutId.join(' Y '),
        code: first?.studentCode || '',
        dni: first?.dni || '',
        career: first?.career?.name || '',
        title: titleThesis,
    };
}

export function buildFormattedStudentLine(FIRST_STEP_INFO) {
    const first = FIRST_STEP_INFO?.student;
    const second = FIRST_STEP_INFO?.studentTwo;

    if (!first) return '';

    const firstPrefix = getGenderedPrefix(first);
    const firstFullName = formatFullNameUpper(first);
    const firstIdPhrase = getGenderedIdentification(first);
    const firstLine = `${firstPrefix} ${firstFullName}, ${firstIdPhrase} ${first?.dni || ''} y código de estudiante N° ${first?.studentCode || ''}`;

    if (!second) {
        return firstLine.trim();
    }

    const secondPrefix = getGenderedPrefix(second);
    const secondFullName = formatFullNameUpper(second);
    const secondIdPhrase = getGenderedIdentification(second);
    const secondLine = `${secondPrefix} ${secondFullName}, ${secondIdPhrase} ${second?.dni || ''} y código de estudiante N° ${second?.studentCode || ''}`;

    return `${firstLine}, junto con ${secondLine}`.trim();
}

export function extractAdvisersInfo(TWO_STEP_INFO) {
    const adviser = TWO_STEP_INFO?.adviser || {};
    const coadviser = TWO_STEP_INFO?.coadviser || {};

    const adviserNames = `${adviser?.degree} ${adviser?.firstNames} ${adviser?.lastName} ${adviser?.middleName}`?.toUpperCase().trim();
    const coAdviserNames = `${coadviser?.degree} ${coadviser?.firstNames} ${coadviser?.lastName} ${coadviser?.middleName || ''}`?.toUpperCase().trim();

    return {
        adviserNames,
        coAdviserNames,
    };
}

export function extractJurysInfo(FIVE_STEP_INFO) {
    const president = FIVE_STEP_INFO?.president || {};
    const firstMember = FIVE_STEP_INFO?.firstMember || {};
    const secondMember = FIVE_STEP_INFO?.secondMember || {};
    const accessory = FIVE_STEP_INFO?.accessory || {};

    const presidentNames = `${president?.degree} ${president?.firstNames} ${president?.lastName} ${president?.middleName || ''}`?.toUpperCase().trim();
    const firstMemberNames = `${firstMember?.degree} ${firstMember?.firstNames} ${firstMember?.lastName} ${firstMember?.middleName || ''}`?.toUpperCase().trim();
    const secondMemberNames = `${secondMember?.degree} ${secondMember?.firstNames} ${secondMember?.lastName} ${secondMember?.middleName || ''}`?.toUpperCase().trim();
    const accessoryNames = `${accessory?.degree} ${accessory?.firstNames} ${accessory?.lastName} ${accessory?.middleName || ''}`?.toUpperCase().trim();

    return {
        presidentNames,
        firstMemberNames,
        secondMemberNames,
        accessoryNames,
    };
}


export function getInterestedLabel(student, studentTwo) {
    const hasFirst = !!student;
    const hasSecond = !!studentTwo;

    const g1 = hasFirst ? student.gender === true : null;
    const g2 = hasSecond ? studentTwo.gender === true : null;

    if (hasFirst && hasSecond) {
        if (g1 === true && g2 === true) return 'de los interesados';
        if (g1 === false && g2 === false) return 'de las interesadas';
        return 'de los interesados';
    }

    if (hasFirst && !hasSecond) {
        return g1 === true ? 'del interesado' : 'de la interesada';
    }

    // Si no hay estudiantes, devolver vacío por seguridad
    return '';
}


const normalizeUrl = (value = '') => {
    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const urlRegex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*)$/i;

export const validateUrl = (value) => {
    const normalized = normalizeUrl(value);
    if (!normalized) {
        return 'Ingrese la url';
    }
    if (!urlRegex.test(normalized)) {
        return 'Ingrese una URL válida';
    }
    return undefined;
};