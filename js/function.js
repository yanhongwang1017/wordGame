//获取元素的封装对象
function $(select,ranger = document){
	if (typeof select == 'string') {
		//ranger = ranger?ranger:document;
		//ranger = ranger || document;
		let selector = select.trim();
		let firstChar = selector.charAt(0);
		if(firstChar == '#'){
			return ranger.getElementById(selector.substring(1));
		}else if(firstChar == '.'){
			return ranger.getElementsByClassName(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
			return ranger.getElementsByTagName(selector);
		}
	}else if (typeof select == 'function'){
		window.onload = function(){
			select();
		}
	}		
}
function html(element,content){
	if(arguments.length == 2){
		element.innerHTML = content;
	}else if(arguments.length == 1){
		return element.innerHTML;
	}
}
function text(element,content){
	if(arguments.length == 2){
		element.innerText = content;
	}else if(arguments.length == 1){
		return element.innerText;
	}
}
//设置样式
function css(element,attrObj){
	for(let i in attrObj){
		element.style[i] = attrObj[i];
	}
}
//添加事件
function on(collection,type,fn){
	for(let i = 0; i < collection.length; i++){
		collection[i][type] = fn;
	}
}
//删除事件
function off(collection,type){
	for(let i = 0; i < collection.length; i++){
		collection[i][type] = null;
	}
}

HTMLElement.prototype.insertAfter = function(insert){
	let parent = this.parentNode;
	let next = this.nextElementSibling;
	if(next){
		parent.insertBefore(insert,next)
	}else{
		parent.appendChild(insert);
	}
}
//从父元素插入到子元素
HTMLElement.prototype.prependChild = function(insert){
	let first = this.firstElementChild;
	if(first){
		this.insertBefore(insert,first);
	}else{
		parent.appendChild(insert);
	}
}
//子元素插入到父元素中去
HTMLElement.prototype.prependTo = function(parent){
	parent.prependChild(this);
}
//appendTo
HTMLElement.prototype.appendTo = function(parent){
	parent.prependChild(this);
}
//节点清空
HTMLElement.prototype.empty = function(){
	let child = this.childNodes;
	/*for(let i = child.length - 1; i > 0; i--){
		this.removeChild(child[i]);
	}*/
	this.innerHtml = '';
}
//删除节点
HTMLElement.prototype.remove = function(){
	let parent = this.parentNode;
	parent.removeChild(this);
}
//获取某元素后面的下一个兄弟元素
HTMLElement.prototype.next = function(){
	let next = this.nextElementSibling;
	if(next){
		return next;
	}else{
		return false;
	}
}
//获取某元素后面的所有兄弟元素
HTMLElement.prototype.nextAll = function(){
	let nexte = this.next();
	let newarr = [];
	if(nexte){
		newarr.push(nexte);
	}else{
		return false;
	}
	while(nexte){
		nexte = nexte.next;
		newarr.push(nexte);
	}
	newarr.pop();
	return newarr;
}