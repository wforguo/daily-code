import './main.ts';
import './css/app.css';

const fn = () => {
    return new Promise(setTimeout(() => {
        return 'typescript';
    }, 300))
}

fn().then(res => {
    console.log(res);
});
