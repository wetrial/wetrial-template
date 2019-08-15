import { get,post } from '@wetrial/request';
import { API_PREFIX } from '@/constants';

export function GetPagedList(data):Promise<any>{
    return get({
        url:`${API_PREFIX}Order/GetPagedList`,
        data
    });
}

export function create(data){
    return post({
        url:`${API_PREFIX}Order/Create`,
        data
    });
}