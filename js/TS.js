    
// let dis_matrix = [
//         [0,100,80,Infinity,Infinity,Infinity,Infinity,150,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,100],
//         [100,0,Infinity,90,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,90],
//         [80,Infinity,0,40,Infinity,Infinity,Infinity,100,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,90,40,0,80,Infinity,50,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,80,0,80,10,60,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,80,0,120,40,30,30,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,50,10,120,0,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [150,Infinity,100,Infinity,60,40,Infinity,0,60,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,30,Infinity,60,0,40,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,30,Infinity,Infinity,40,0,10,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,10,0,40,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,40,0,120,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,120,0,100,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,100,0,40,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,40,0,10,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,10,0,Infinity,30,Infinity,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,0,40,40,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,30,40,0,50,Infinity,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,40,50,0,80,Infinity,Infinity],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,80,0,80,80],
//         [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,80,0,40],
//         [100,90,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,80,40,0]
// ];

let city_num=22;
let table_len=20;

function all_path_dis(matrix,path){//由当前路径所产生的路径
    let dis_list=[]
    for(let i in path){
        let dis=0;
        for(let j=0;j<city_num;++j){
            dis+=matrix[path[i][j]][path[i][(j+1)%city_num]];
        }
        dis_list.push(dis);
    }
    return dis_list;
}

function path_generate(path_min){//计算当前所有路径的距离
    let res=[]
    for(let i=0;i<city_num-1;++i){
        for(let j=i+1;j<city_num;++j){
            let path_b=path_min.slice();
            [path_b[i],path_b[j]]=[path_b[j],path_b[i]];                
            res.push(path_b);
        }
    }
    return res;
}

function array_remove(arr,val){//array删除元素
    let index=arr.indexOf(val);
    if(index>-1){
        arr.splice(index, 1);
    }
}
function ts(dis_matrix){
	taboo_table=[];//禁忌表
	path_set=[];//路径集合
	initial=[1,0,2,3,4,6,5,7,8,9,10,11,12,13,14,15,17,16,18,19,20,21];//这里因为矩阵inf的原因要给一条可行的路径，可以用贪心算或者随便给一体
	path_set.push(initial);    
	taboo_table.push(initial);
	let dis_list=all_path_dis(dis_matrix,path_set);
	let dis_min=Math.min.apply(null, dis_list); //最短路径长度
	let path_min=path_set[dis_list.indexOf(dis_min)].slice(); //最短路径方案
	let exp_dis=dis_min;//距离期望
	let exp_path=path_min.slice();//路径期望
	for(let i=0;i<100;++i){
		all_path=path_generate(path_min);
		all_dis=all_path_dis(dis_matrix,all_path);
		dis_min=Math.min.apply(null, all_dis);
		path_min=all_path[all_dis.indexOf(dis_min)].slice();
		if(dis_min<exp_dis){//更新期望
			exp_dis=dis_min;
			exp_path=path_min.slice();
			if(taboo_table.includes(path_min,0)){
				array_remove(taboo_table,path_min);
				taboo_table.push(path_min);
			}else{
				taboo_table.push(path_min);
			}
		}else{//不能更新期望
			if(taboo_table.includes(path_min,0)){//路径在禁忌表中
				array_remove(all_path,path_min);
				array_remove(all_dis,dis_min);
				dis_min=Math.min.apply(null, all_dis);
				path_min=all_path[all_dis.indexOf(dis_min)].slice();
				taboo_table.push(path_min);
			}else{
				taboo_table.push(path_min);
			}
		}
		if(taboo_table.length>=table_len){
			taboo_table.shift();
		}
	}
	return [exp_dis,exp_path];
}
    
  