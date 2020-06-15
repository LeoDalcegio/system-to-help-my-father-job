import moment from 'moment';

export const toDate = (value) => {
    return (
        moment(value).format('DD/MM/YYYY')
    )
}

