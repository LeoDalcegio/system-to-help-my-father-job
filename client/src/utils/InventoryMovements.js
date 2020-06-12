import { TYPE, TYPE_NAME } from '../enums/InventoryMovements';

export const GetCorrespondentTypeName = (type) => {
    if(type === TYPE.ENTRY){
        return TYPE_NAME.ENTRY;
    }else if (type === TYPE.EXIT){
        return TYPE_NAME.EXIT;
    }

    return '';
}

