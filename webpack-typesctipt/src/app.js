import './app.ws';
import './main.ts';
import './css/common.css';
import './css/app.less';
import './css/index.scss';

const fn = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('typescript');
        }, 300)
    })
}

fn().then(res => {
    console.log(res);
});
