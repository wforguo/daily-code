import './main.ts';
import './css/app.less';

const fn = () => {
    return new Promise(setTimeout(() => {
        return 'typescript';
    }, 300))
}

fn().then(res => {
    console.log(res);
});
