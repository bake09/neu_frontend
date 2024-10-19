import { routerInstance } from 'boot/router'

export default async function useGoBack(){
    let pathArray = routerInstance.currentRoute.value.path.split('/')
    console.log('pathArray :>> ', pathArray);

    if(pathArray.length > 2){
        pathArray.pop()
        let newPath = pathArray.join('/')
        routerInstance.push(newPath)
    }
}