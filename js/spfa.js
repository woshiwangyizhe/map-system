function spfa_claulate(dis_matrix,start_index){
	city_num=22;
	let dis=[];
	let vis=[];
	let path=[]
	for(let i=0;i<city_num;++i){
		dis.push(Infinity);
		vis.push(0);
		path.push(0);
	}
	dis[start_index]=0;
	vis[start_index]=1;
	let queue=[start_index];
	while(queue.length){
		let current=queue.shift();
		vis[current]=0;
		for(let i=0;i<city_num;++i){
			if(dis[i]>dis[current]+dis_matrix[current][i]){
				dis[i]=dis[current]+dis_matrix[current][i];
				path[i]=current;
				if(vis[i]==0){
					queue.push(i);
					vis[i]=1;
				}

			}
			
		}
	}
	return [dis,path];
}
function get_path(path,path_arr,val){
	for(let i=val;i!=0;i=path_arr[i]){
		path.push(i);	
	}
	path.reverse();
}

function spfa(dis_matrix,start_index,end_index){
	let path=[];
	let [dis,path_arr]=spfa_claulate(dis_matrix,start_index);
	get_path(path,path_arr,end_index);
	return [dis,path];
}
