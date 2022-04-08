/**
 *@description: async.js
 *@author: forguo
 *@date: 2021/1/13
 */

export const asyncF = async function () {
    await setTimeout(() => {
        console.log('async');
        return 'async';
    }, 3000);
};
