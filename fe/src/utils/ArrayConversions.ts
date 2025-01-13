import * as dfd from 'danfojs';

export const arrayToJson = (arr: any[], columns: string[]) => {
    const tf = dfd.tensorflow;
    let tensor_arr = tf.tensor2d(arr);
    let df = new dfd.DataFrame(tensor_arr, {columns})
    return dfd.toJSON(df);
};
