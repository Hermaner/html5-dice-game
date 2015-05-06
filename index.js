<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>骰子游戏</title>
    <script type="text/javascript" charset="utf-8">
        var cwidth = 400;
        var cheight = 300;
        var dicex = 50;
        var dicey = 50;
        var dx;
        var dy;
        var dicewidth = 100;
        var diceheight = 100;
        var dotrad = 10;
        var ctx;
        var firstturn;//标志是否是第一次
        var point;
        ctx = document.getElementById('canvas').getContext('2d');
        /*
        * 开始掷骰子
        * */
        function throwdice(){
            //产生1~6随机数
            var ch = 1 + Math.floor(Math.random()*6);
            var sum = ch;
            //定位
            dx = dicex;
            dy = dicey;
            //画出第一个数字
            drawface(ch);
            //重新定位
            dx = dicex + 150;
            //重行产生随机数
            ch = 1 + Math.floor(Math.random()*6);
            //求和 保存在sum中
            sum += ch;
            //画出第二个数字
            drawface(ch);
        /*
        * 增加银行 记录玩家的资金
        * */
            var bank = Number(document.f.bank.value);
            if(bank < 10){
                alert("you ran out of money!add some money and try again");
                return;
            }
            bank = bank - 10;
            document.f.bank.value =String(bank);

             if(firstturn){
                switch (sum){
                    case 7:
                    case 11:
                        document.f.outcome.value = "you win";
                        b

                        ank = Number(document.f.bank.value);
                            bank = bank + 20;
                        document.f.bank.value=String(bank);
                        break;
                    case 2:
                    case 3:
                    case 12:
                        document.f.outcome.value = "you lose";
                        break;
                    default :
                        point = sum;
                        firstturn = false;
                        document.f.pv.value = point;
                        document.f.stage.value = "need follow-up throw";
                        document.f.outcome.value = "";
                }

            }else{
                switch(sum){
                    case point:
                        document.f.outcome.value = "you win";
                        bank = Number(document.f.bank.value);
                        bank = bank + 20;
                            document.f.bank.value=String(bank);
                        document.f.stage.value = "Back to first throw.";
                        document.f.pv.value = "";
                        firstturn = true;
                        break;
                    case 7:
                        document.f.outcome.value = "you lose";
                        document.f.stage.value = "Back to first throw";
                        document.f.pv.value = "";
                        firstturn = true;

                }


            }

        }

        /*
        * 画骰子
        * */
        function drawface(n){
            ctx=document.getElementById('canvas').getContext('2d');
            //产生随机颜色的随机数
           var     red = parseInt(Math.random()*255),
                   green = parseInt(Math.random()*255),
                   blue = parseInt(Math.random()*255);
            ctx.lineWidth = 5;
            ctx.strokeStyle = toRgb(red,green,blue);
            ctx.clearRect(dx,dy,dicewidth,diceheight);
            ctx.strokeRect(dx,dy,dicewidth,diceheight);
            ctx.fillStyle = toRgb(red,green,blue);
            switch(n){
                case 1:
                    Draw1();
                    break;
                case 2:Draw2();
                    break;
                case 3:
                    Draw2();
                    Draw1();
                    break;
                case 4:Draw4();
                    break;
                case 5:Draw4();
                        Draw1();
                    break;
                case 6:Draw4();
                       Draw2mid();
                    break;

            }

        }
        /*
        小于10 补零
         */
        function addZone(string){
            return string.length == 2 ? string:'0' + string;
        }
        /*
        产生随机颜色
         */
        function toRgb(redValue,greenValue,blueValue){
            var
                    rgbR = addZone(redValue.toString(16),2),
                    rgbG = addZone(greenValue.toString(16),2),
                    rgbB = addZone(blueValue.toString(16),2);
            var rgb = "#" + rgbR + rgbG + rgbB;
            return rgb;
        }
        /*
        画出数字
         */
        function Draw1(){
            var dotx;
            var doty;
            ctx.beginPath();
            dotx = dx + .5*dicewidth;
            doty = dy + .5*diceheight;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
        function Draw2(){
            var dotx;
            var doty;
            ctx.beginPath();
            dotx = dx + 3*dotrad;
            doty = dy + 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            dotx = dx + dicewidth - 3*dotrad;
            doty = dy + diceheight - 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
        function Draw4(){
            var dotx;
            var doty;
            ctx.beginPath();
            dotx = dx + 3*dotrad;
            doty = dy + 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            dotx = dx + dicewidth - 3*dotrad;
            doty = dy + diceheight - 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            dotx = dx +  3*dotrad;
            doty = dy + diceheight - 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            dotx = dx + dicewidth - 3*dotrad;
            doty = dy + 3*dotrad;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
        function Draw2mid(){
            var dotx;
            var doty;
            ctx.beginPath();
            dotx = dx + 3*dotrad;
            doty = dy + .5*diceheight;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);

            dotx = dx + dicewidth - 3*dotrad;
            doty = dy + .5*diceheight;
            ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
    </script>
</head>


<body onload="init()">
<canvas id="canvas" width="400" height="300">
    your browser doesn't support the html5 element canvas
</canvas>
<button  onclick="throwdice();">throw dice</button>
<br/>
<form name="f">
    stage:<input name="stage" value="First Throw">
    point:<input name="pv" value="">
    output:<input name="outcome" value="">
    bank:<input name="bank" value="100000000000">
</form>
</body>
</html>
