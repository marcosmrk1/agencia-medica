
export  const removeAccents = str => str?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
export const orderPatients = (res) => {
    res.map(el => {
        el.order -= 1; return el;
    }).filter(el => el.order > 0);
}