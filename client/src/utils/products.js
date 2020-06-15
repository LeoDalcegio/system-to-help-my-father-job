import { TYPE, TYPE_NAME } from '../enums/Products';

export const GetCorrespondentTypeName = (type) => {
    if(type === TYPE.FIO){
        return TYPE_NAME.FIO;
    }else if (type === TYPE.MALHA){
        return TYPE_NAME.MALHA;
    }

    return '';
}

