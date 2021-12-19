import './css/app1.css';
import './css/app.less';
import './css/app.scss';
import './app.ws';
import './main.ts';

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
