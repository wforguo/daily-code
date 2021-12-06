import './main.ts';
import './css/common.css';
import './css/app.less';
import './css/index.scss';

const fn = () => {
    return new Promise(setTimeout(() => {
        return 'typescript';
    }, 300))
}

fn().then(res => {
    console.log(res);
});
