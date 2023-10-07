import {IEmployee} from "../types/interfaces/IEmployee";


const EMP_API_URL = 'http://localhost:8080/api/';

enum HttpStatus{
    OK=200,
    CREATED201=201,
    ACCEPTED202=202,
    NO_CONTENT=204,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    UNPROCESSABLE=422,
    INTERNAL_SERVER_ERROR=500
}

class FetchError extends Error{
    status?: number;
    data?: any;
    statusText?: string;

    constructor(message:string, status:number) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
    }
}

const requestAPI = async <T>(url:string, method:'GET' | 'POST' | 'PUT' | 'DELETE', body?: any):Promise<T> => {
    const options: RequestInit = {
        headers:{
            'Content-Type':'application/json'
        },
        method:method
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    console.log('EMP_API_URL+url:',EMP_API_URL+url);
    const response = await fetch(EMP_API_URL+url,options);
    console.log('response:',response);
    // if (response.redirected || !response.ok){
    //     if (response.redirected){
    //         console.log('Provide redirection link');
    //     }
    //
    //     const status = response.redirected ? HttpStatus.FORBIDDEN : response.status;
    //     const error = new FetchError('An error occurred while fetching the data', status);
    //
    //     if (response.status === HttpStatus.UNPROCESSABLE){
    //         error.data = (await response.json()) as Promise<T>;
    //     }
    //
    //     error.statusText = response.statusText;
    //
    //     throw error;
    // }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')){
        return (await  response.json()) as Promise<T>;
    } else {
      return {} as T;
    }
};

const getApiData = async<T>(url:string):Promise<T>=>{
    return requestAPI<T>(url,'GET');
}


const getEmployees = ():Promise<IEmployee[]> => {
    return getApiData('employees');
}


export {getEmployees};
