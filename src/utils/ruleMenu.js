import { cloneDeep } from 'lodash'
export function ruleMenu(allMenu,rqMenu){
    let result=[];

    const arr = cloneDeep(allMenu)//按需引用
    arr.forEach(one => {
        rqMenu.forEach(two=>{
            if(one.meta.title === two.name){
                // menu.push(one)
                //注意：判断是否包含children=[]
                if(two.children && two.children.length>0){
                    //继续比较
                   one.children=ruleMenu(one.children,two.children)
                }
                //添加数组
                result.push(one)
                 
            }
        })
    });
 
    return result;
 
}