import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from '@/App'
import '@/style/app.less';
import {
    RecoilRoot,
} from 'recoil';

console.log('import.meta.env', import.meta.env);
// 版本及打包日期
console.log(
    `%c Version %c ${process.env.APP_VERSION}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
);
console.log(
    `%c BuildTime %c ${process.env.APP_BUILD_TIME}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
);
function render () {
    ReactDOM.render(
        <RecoilRoot>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </RecoilRoot>,
        document.getElementById('root')
    )
}

render();
