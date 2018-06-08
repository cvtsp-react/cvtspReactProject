var fs = require('fs')
var path = require('path')
var endLine = require('os').EOL
var render = require('json-templater/string')

var ROOT = process.cwd();
var ROUTER_ROOT_PATH = '/editPages';
// 编辑的页面路径
var VIEWS_PATH = path.resolve(ROOT, 'src/views');
var EDIT_PAGES_PATH = path.resolve(ROOT, 'src/views/editPages');

// 需要写入的路由配置
var ROUTER_PATH  = path.resolve(ROOT, 'src/router/index.js');
var MAIN_ROUTER_PATH = path.resolve(ROOT, 'src/router/main.js');

// 公共模版
var templates = `
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div></div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

{{lists}}
export default () => (
<Router>
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />}/>
        {{router}}
    </Switch>
</Router>
)
`;
var asyncTemplate = `
const {{name}} = Loadable({
    loader: () => import('views${ROUTER_ROOT_PATH}/{{name}}'),
    loading: MyLoadingComponent
})
`;
var routeTemplate = `
        <Route path="${ROUTER_ROOT_PATH}/{{name}}/:children" component={{{name}}} />
`;

//wirteFileSync(VIEWS_PATH, ROUTER_PATH);
wirteFileSync(EDIT_PAGES_PATH, MAIN_ROUTER_PATH);


function wirteFileSync(readPath, writePath) {
    var {viewLists, routeLists} = outputLists(readPath);
    var template = render(templates, {
        lists: viewLists.join(''),
        router: routeLists.join('')
    });
    fs.writeFileSync(writePath, template);
}

function outputLists(readPath) {
    var viewLists = [], routeLists = [];
    var fileLists = fs.readdirSync(readPath);

    fileLists.forEach(list => {
        try {
            const current_path = path.resolve(readPath, list);
            if(fsExistsSync(`${current_path}/index.js`)) {
                viewLists.push(render(asyncTemplate, {
                    name: list
                }));
                routeLists.push(render(routeTemplate, {
                    name: list
                }))
            }
        }catch(e) {
            console.log(e)
        }
    });

    return {
        viewLists,
        routeLists
    }
}

function fsExistsSync(url) {
    try{
        fs.accessSync(url,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}