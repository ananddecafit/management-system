import * as danfo from 'danfojs';

export const arrayToJson = (arr: any[], columns: string[]) => {
    const tf = danfo.tensorflow;
    let tensor_arr = tf.tensor2d(arr);
    let df = new danfo.DataFrame(tensor_arr, {columns})
    return danfo.toJSON(df);
};

export const csvToDataFrame = (csvUrl: string, requestHeaders: any) => {
    return danfo.readCSV(csvUrl, {
        downloadRequestHeaders: requestHeaders
    } as any);
};

export const csvToJson = (csvUrl: string, requestHeaders: any) => {
    return csvToDataFrame(csvUrl, requestHeaders).then(res => danfo.toJSON(res));
};
