/*
    属性
        有哪些字符   个数  速度  得分  关卡  生命  减分
    方法
        游戏开始    产生字符(个数，那些字符)    消除    进入下一关     重新开始
*/
/* Game */
/* start    产生字符 */
function Game() {
    this.charAmount = [['Q','img/Q.png'],['W','img/W.png'],['E','img/E.png'],['R','img/R.png'],['T','img/T.png'],['Y','img/Y.png'],
    ['U','img/U.png'],['I','img/I.png'],['O','img/O.png'],['P','img/P.png'],['A','img/A.png'],['S','img/S.png'],['D','img/D.png'],
    ['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['Z','img/Z.png'],
    ['X','img/X.png'],['C','img/C.png'],['V','img/V.png'],['B','img/B.png'],['N','img/N.png'],['M','img/M.png'],];
    this.length = 5;
    this.speed = 1;
    this.elements = [];
    this.position = [];
    this.HP = 10;
    this.HPObj = document.querySelector('.sign>.HP>.box');
    this.score = 0;
    this.scoreObj = document.querySelector('.sign>.score>.box');
    this.customs = 10;
    this.gameOver = document.querySelector('div.gameOver');
}
Game.prototype = {
    start:function(){
        this.getChars(this.length);
        this.drop();
        this.key();
    },
   getChars:function(length){
        for(let i = 0; i < this.length; i++){
            this.getChar();
        }
    },
    getChar:function () {
        let num;
        let lefts;
        let divs = document.createElement('div');
        let tops = Math.random() * 70;
        //去重
        do{
            num = Math.floor(Math.random() * this.charAmount.length);
        }while(this.checkRepeat(num));
        //去掉重复位置
        do{
            lefts =(window.innerWidth - 400) * Math.random() + 200;
        }while(this.checkPosition(lefts));
        divs.classList.add('char');
        divs.style.cssText = `
            left:${lefts}px;top:${tops}px;background-image:url(${this.charAmount[num][1]});
        `;
        divs.innerText = this.charAmount[num][0];
        document.body.appendChild(divs);
        this.elements.push(divs);
        this.position.push(lefts);
    },
    //去掉重复的字母
    checkRepeat:function(num){
        /* this.elements.some(function(value){
            return value.innerText == this.charAmount[num];
        }) */
        return this.elements.some(value => value.innerText == this.charAmount[num][0]);
    },
    checkPosition:function(lefts){
        return this.position.some(function(value){
            return Math.abs(value - lefts) < 50;
        })
    },
    drop:function(){
        let that = this;
        this.t = setInterval(function(){
            for(let i = 0; i < that.elements.length; i++){
                let tops = that.elements[i].offsetTop;
                that.elements[i].style.top = `${tops + that.speed}px`;
                if(tops >= 550){
                    that.HP--;
                    document.body.removeChild(that.elements[i]);
                    that.elements.splice(i,1);
                    that.position.splice(i,1);
                    that.HPObj.innerText = that.HP;
                    if(that.HP == 0){
                       that.over();
                    }
                }
            }
            if(that.elements.length < that.length){
                that.getChar();
            }
        },10);
    },
    key:function(){
        let that = this;
        document.onkeydown = function(e){
            let char = String.fromCharCode(e.keyCode);
            for(let i = 0; i < that.elements.length; i++){
                if(char == that.elements[i].innerText){
                    that.score++;
                    that.scoreObj.innerText = that.score;
                    document.body.removeChild(that.elements[i]);
                    that.elements.splice(i,1);
                    that.position.splice(i,1);
                }
            }
            if (that.score == that.customs) {
                that.next();
            }
        }
    },
   stop:function(){
        clearInterval(this.t);
   },
   go:function(){
        console.log(this.t);
   },
    next:function(){
        clearInterval(this.t);
        for(let i = 0; i < this.elements.length; i++){
            document.body.removeChild(this.elements[i]);
        }
        this.elements = [];
        this.position = [];
        confirm('恭喜你过关了，是否进行下一关？');
        this.length++;
        this.customs += 10;
        this.start();
    },
    over:function(){
        clearInterval(this.t);
        this.gameOver.style.display = 'block';
    },
}