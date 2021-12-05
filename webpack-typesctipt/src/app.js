import './main.ts';

const fn = () => {
    return new Promise(setTimeout(() => {
        return 'typescript';
    }, 300))
}

fn().then(res => {
    console.log(res);
});
