class trie_node {//字典树节点
    constructor(val){
        this.value=val;
        this.deep=0; //根节点深度
        this.son=[]; //子节点
        this.if_end=false;//结尾判断
        this.fail=null;
    }
    find_node(val){//查找子节点
        for(let i=0;i<this.son.length;++i){
            let node=this.son[i]
            if(node.value==val){
                return node;
            }
        }
        return null;
    }
}
class trie {//字典树
    constructor(){
        this.root=new trie_node(null); 
    }
    insert(str){//单个字符串插入字典树
        let node=this.root;
        for(let char of str){
            let sno_node = node.find_node(char);
            if(sno_node==null){
                sno_node=new trie_node(char)
                sno_node.deep=node.deep+1;
                node.son.push(sno_node);
            }
            node=sno_node;
        }     
        if(!node.if_end){//处理结尾判断
            node.if_end=true;
        }
    }
    init_with_arr(arr){
    	for(let i=0;i<arr.length;++i){
    		this.insert(arr[i]);
    	}
    }

}
function build_fail_ptr(root){//构建字典树失败指针
    let queue=[root];
    while(queue.length){//广度优先遍历字典树
        let cur_node=queue.shift();//当前节点
        for(let i=0;i<cur_node.son.length;++i){//遍历当前节点的子节点
            let node=cur_node.son[i]
            if(cur_node===root){ //第一层节点fail指向root
                node.fail=root;
            }else{
                node.fail=cur_node.fail.find_node(node.value)||root;
            }
            queue.push(node);
        }
        
    }
}

function ac_automation(arr,str) {//ac自动机字符串匹配算法
    let tree = new trie() 
    tree.init_with_arr(arr); //生成字典树    
    build_fail_ptr(tree.root) //构造失败指针
    let node=tree.root;
 	let ans=[];
    for(let i=0;i<str.length;++i){
    	let current_node=node.find_node(str[i])
        while(!current_node && node!==tree.root){ //跳转至fail指针
            node=node.fail;
            current_node=node.find_node(str[i])
        }
        if(current_node){//当前节点非空，节点变化
            node=current_node;
        }
        if(node.if_end){//结尾判断
            ans.push(str.substr(i+1-node.deep,node.deep))
        }
    }
    //console.log(tree);
    return ans;
}

let result=ac_automation(['俄罗斯人家','侗寨','赫哲族景区','达斡尔城','哈亭','鄂伦春景区','板凳桥','满族皇堂子','满族博物馆','朝鲜族村','朝鲜族景区','打谷场','景颇族','佤寨','山苗寨','铜鼓坪','水苗寨','侗族景区','彝寨','土林','侗族水车群','景颇族馆景区'],'哈亭打谷场阿斯顿场俄罗斯人家山苗寨');
console.log(result);