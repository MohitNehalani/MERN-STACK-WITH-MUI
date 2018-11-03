const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) || // checks both array and object
    (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;