'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//const N = 15.1885860098177;   //入力値 ギア比 C15
//const Gml_ = 51171.1          //入力値 アシスト下流ねじり剛性＠下流 C12
//const Rrp = 58.33;            //入力値 比スト C16
//const Kg = 45600;             //入力値 ギア支持剛性 C14
//const Gts_ = 858.5;           //入力値 サス分ねじり剛性＠下流（片輪）C13 

//const Dwf = 0.609815666;     //入力値 前輪荷重配分 C7
//const m = 1675;              //入力値 車両重量 C6

//const Ct = 0.0395;           //入力値 ニューマチックトレール C10
//const Pt = 0.02736;          //入力値 キャスタートレール C9
//const Cr = 21.98654944;      //入力値 リア正規化等価CP C5
//const Cf = 15.28532382;      //入力値 フロント正規化等価CP（ねじり剛性除く）C4
//const l = 2.825              //入力値 ホイールベース C8
//const vh = 80;               //入力値 車速 C3

let chart1, chart2;

// グラフ背景を白にするためのプラグイン
const whiteBackgroundPlugin = {
  id: 'whiteBackground',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

function calculateAndDisplay() {

  // 入力値を取得して数値に変換
const N = parseFloat(document.getElementById('N').value) || 0;
const Gml_ = parseFloat(document.getElementById('Gml_').value) || 0;
const Rrp = parseFloat(document.getElementById('Rrp').value) || 0;
const Kg = parseFloat(document.getElementById('Kg').value) || 0;
const Gts_ = parseFloat(document.getElementById('Gts_').value) || 0;
const Dwf = parseFloat(document.getElementById('Dwf').value) || 0;
const m = parseFloat(document.getElementById('m').value) || 0;
const Ct = parseFloat(document.getElementById('Ct').value) || 0;
const Pt = parseFloat(document.getElementById('Pt').value) || 0;
const Cr = parseFloat(document.getElementById('Cr').value) || 0;
const Cf = parseFloat(document.getElementById('Cf').value) || 0;
const l = parseFloat(document.getElementById('l').value) || 0;
const vh = parseFloat(document.getElementById('vh').value) || 0;

const KK1 = 0.0000000001096;  //固定値 並列バネ C40
const Gml = Gml_ /N;
const rp =  Rrp/2/Math.PI/1000;   
const KK2 = 0.0028584594163;  //固定値 並列ばね C76
const Gts = 2*Gts_ /N;
const KK3 = 1.1538159064583;  //固定値 並列ばね C100

const EE = [
-3600,
-360,
-90,
-30,
-10,
-9,
-8,
-7,
-6,
-5,
-4,
-3,
-2,
-1,
-0.9,
-0.8,
-0.7,
-0.6,
-0.5,
-0.4,
-0.3,
-0.2,
-0.1,
-0.09,
-0.08,
-0.07,
-0.06,
-0.05,
-0.04,
-0.03,
-0.02,
-0.01,
-0.009,
-0.008,
-0.007,
-0.006,
-0.005,
-0.004,
-0.003,
-0.002,
-0.001,
-0.00099,
-0.00098,
-0.00097,
-0.00096,
-0.00095,
-0.00094,
-0.00093,
-0.00092,
-0.00091,
-0.0009,
-0.00089,
-0.00088,
-0.00087,
-0.00086,
-0.00085,
-0.00084,
-0.00083,
-0.00082,
-0.00081,
-0.0008,
-0.00079,
-0.00078,
-0.00077,
-0.00076,
-0.00075,
-0.00074,
-0.00073,
-0.00072,
-0.00071,
-0.0007,
-0.00069,
-0.00068,
-0.00067,
-0.00066,
-0.00065,
-0.00064,
-0.00063,
-0.00062,
-0.00061,
-0.0006,
-0.00059,
-0.00058,
-0.00057,
-0.00056,
-0.00055,
-0.00054,
-0.00053,
-0.00052,
-0.00051,
-0.0005,
-0.00049,
-0.00048,
-0.00047,
-0.00046,
-0.00045,
-0.00044,
-0.00043,
-0.00042,
-0.00041,
-0.0004,
-0.00039,
-0.00038,
-0.00037,
-0.00036,
-0.00035,
-0.00034,
-0.00033,
-0.00032,
-0.00031,
-0.0003,
-0.00029,
-0.00028,
-0.00027,
-0.00026,
-0.00025,
-0.00024,
-0.00023,
-0.00022,
-0.00021,
-0.0002,
-0.00019,
-0.00018,
-0.00017,
-0.00016,
-0.00015,
-0.00014,
-0.00013,
-0.00012,
-0.00011,
-0.0001,
-0.00009,
-0.00008,
-0.00007,
-0.00006,
-0.00005,
-0.00004,
-0.00003,
-0.00002,
-0.00001,
0,
0.00001,
0.00002,
0.00003,
0.00004,
0.00005,
0.00006,
0.00007,
0.00008,
0.00009,
0.0001,
0.00011,
0.00012,
0.00013,
0.00014,
0.00015,
0.00016,
0.00017,
0.00018,
0.00019,
0.0002,
0.00021,
0.00022,
0.00023,
0.00024,
0.00025,
0.00026,
0.00027,
0.00028,
0.00029,
0.0003,
0.00031,
0.00032,
0.00033,
0.00034,
0.00035,
0.00036,
0.00037,
0.00038,
0.00039,
0.0004,
0.00041,
0.00042,
0.00043,
0.00044,
0.00045,
0.00046,
0.00047,
0.00048,
0.00049,
0.0005,
0.00051,
0.00052,
0.00053,
0.00054,
0.00055,
0.00056,
0.00057,
0.00058,
0.00059,
0.0006,
0.00061,
0.00062,
0.00063,
0.00064,
0.00065,
0.00066,
0.00067,
0.00068,
0.00069,
0.0007,
0.00071,
0.00072,
0.00073,
0.00074,
0.00075,
0.00076,
0.00077,
0.00078,
0.00079,
0.0008,
0.00081,
0.00082,
0.00083,
0.00084,
0.00085,
0.00086,
0.00087,
0.00088,
0.00089,
0.0009,
0.00091,
0.00092,
0.00093,
0.00094,
0.00095,
0.00096,
0.00097,
0.00098,
0.00099,
0.001,
0.002,
0.003,
0.004,
0.005,
0.006,
0.007,
0.008,
0.009,
0.01,
0.02,
0.03,
0.04,
0.05,
0.06,
0.07,
0.08,
0.09,
0.1,
0.2,
0.3,
0.4,
0.5,
0.6,
0.7,
0.8,
0.9,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
30,
90,
360,
3600
];

console.log("EE=",EE);
//const EE = [-3600,-360,-90,-30,-10];

///////////////////////////////////////////////////

const FF = new Array(EE.length);
FF.fill(0); // 配列のすべての要素を 0 に変更 ここでは、固定値0が使われている

console.log("FF=",FF);
//const FF = [0,0,0,0,0];

///////////////////////////////////////////////////

const GG = new Array(FF.length);
GG.fill(0); // 配列のすべての要素を 0 に変更 ここでは、固定値0が使われている

console.log("GG=",GG);
//const GG = [0,0,0,0,0];

///////////////////////////////////////////////////

const HH = EE;

console.log("HH=",HH);

///////////////////////////////////////////////////

const II = [];
for(const el1 of HH){
 II.push(el1/N);
};
console.log("II=", II);

///////////////////////////////////////////////////

const B155 = [
0,
0.001612946,
0.002411056,
0.002411061,
0.053897403,
0.143461099,
0.36049979,
1.142091993,
10000,
];

const JJ = [];
for (const el2 of EE) {  //エクセルのMATCH関数
  for (let i = 0; i < B155.length; i++) {
    const el3 = B155[i];
    if (Math.abs(el2) < el3) {
      JJ.push(i);
      break;  // 最初にマッチしたインデックスだけを記録して抜ける
    }
  }
}

console.log("JJ=", JJ);

///////////////////////////////////////////////////

const KK = [];
for(const el3 of JJ){
    KK.push(el3+1);
}

console.log("KK=", KK);

///////////////////////////////////////////////////

const A155 = [
0,
2.52799E-07,
2.94097E-07,
2.94097E-07,
5.55629E-07,
7.63441E-07,
9.11431E-07,
0.000001,
0.000002,
];

const LL = [];
for(const el4 of KK){
  LL.push((A155[el4-2]-A155[el4-1])/(B155[el4-2]-B155[el4-1]));
}
console.log("LL=", LL);

///////////////////////////////////////////////////

console.log("HH=", HH);
const MM1 = [];
let mm = 0;
for(const el5 of HH){
  if(el5 < 0){
    mm = -1;
    MM1.push(mm);
  }else if(el5 === 0){
    mm = 0;
    MM1.push(mm);
  }else if (el5 > 0){
    mm = 1;
    MM1.push(mm);
  }
}
console.log("MM1=", MM1);

const MM2 = [];
for(const el6 of JJ){
  MM2.push(A155[el6-1]);
}
console.log("MM2=", MM2);

/* const MM3 = [];
for(let i=0; i < HH.length ; i++){
  MM3.push(MM1[i]*MM2[i]);
}
console.log("MM3=", MM3); */

const MM4 = [];
for(const el7 of JJ){
  MM4.push(B155[el7-1]);
}
console.log("MM4=", MM4); 

const MM5 = [];
for(const el8 of HH){
  MM5.push(Math.abs(el8));
}
console.log("MM5=", MM5);

const MM6 = [];
for(let i = 0; i < LL.length; i++){
  MM6.push(MM1[i]*(MM2[i]+LL[i]*(MM5[i]-MM4[i])));
}
console.log("MM6=", MM6);

///////////////////////////////////////////////////

const NN = [];
for(const el9 of HH){
  NN.push(el9*KK1);
}
console.log("NN=", NN);

///////////////////////////////////////////////////

const OO = [];
for(let i = 0; i< MM6.length; i++){
  OO.push(MM6[i]+NN[i]);
}
console.log("OO=", OO);

///////////////////////////////////////////////////

const PP = [];
 for(let i=0; i< OO.length; i++){
  PP.push(OO[i]/(Gml/N));
 }
console.log("PP=",PP);

///////////////////////////////////////////////////

const QQ = new Array(PP.length);
QQ.fill(0); // 配列のすべての要素を 0 に変更 ここでは、固定値0が使われている
console.log("QQ=",QQ);

///////////////////////////////////////////////////

const AB = [];
for(let i = 0; i < HH.length; i++){
  AB.push(HH[i]+PP[i]);
}

console.log("AB=",AB); //なぜか先に計算する

///////////////////////////////////////////////////

const RR = [];
for(let i = 0; i < HH.length; i++){
  RR.push((HH[i]+AB[i])/2);
}

console.log("RR=",RR); 

///////////////////////////////////////////////////

const SS = [];
for(const el20 of RR){
  SS.push(el20/N);
}

console.log("SS=",SS); 

///////////////////////////////////////////////////

const B168 = [0,
              2.63158E-08,
              0.000105289,
              0.000526342,
              10000]

const TT = [];
for (const el21 of RR) {  //エクセルのMATCH関数
  for (let i = 0; i < B168.length; i++) {
    const el22 = B168[i];
    if (Math.abs(el21) < el22) {
      TT.push(i);
      break;  // 最初にマッチしたインデックスだけを記録して抜ける
    }
  }
}

console.log("TT=", TT);

///////////////////////////////////////////////////

const UU = [];
for(const el23 of TT){
  UU.push(el23+1);
}

console.log("UU=", UU);

///////////////////////////////////////////////////

const A168 = [0,
              2.63158E-09,
              7.89474E-09,
              0.00000001,
              0.00000101];


const VV = [];
for(const el24 of UU){
  VV.push((A168[el24-2]-A168[el24-1])/(B168[el24-2]-B168[el24-1]));
}
console.log("VV=", VV);

///////////////////////////////////////////////////

console.log("RR=", RR);
const WW1 = [];
let ww = 0;
for(const el25 of RR){
  if(el25 < 0){
    ww = -1;
    WW1.push(ww);
  }else if(el25 === 0){
    ww = 0;
    WW1.push(ww);
  }else if (el25 > 0){
    ww = 1;
    WW1.push(ww);
  }
}
console.log("WW1=", WW1);

const WW2 = [];
for(const el26 of TT){
  WW2.push(A168[el26-1]);
}
console.log("WW2=", WW2);

/* const MM3 = [];
for(let i=0; i < HH.length ; i++){
  MM3.push(MM1[i]*MM2[i]);
}
console.log("MM3=", MM3); */

const WW4 = [];
for(const el27 of TT){
  WW4.push(B168[el27-1]);
}
console.log("WW4=", WW4); 

const WW5 = [];
for(const el28 of RR){
  WW5.push(Math.abs(el28));
}
console.log("WW5=", WW5);

const WW6 = [];
for(let i = 0; i < VV.length; i++){
  WW6.push(WW1[i]*(WW2[i]+VV[i]*(WW5[i]-WW4[i])));
}
console.log("WW6=", WW6);

///////////////////////////////////////////////////

const XX = [];
for(const el29 of RR){
  XX.push(el29*KK1);
}
console.log("XX=", XX);

///////////////////////////////////////////////////

const YY = [];
for(let i =0; i < WW6.length; i++){
  YY.push(OO[i]+WW6[i]+XX[i]);
}
console.log("YY=", YY);

///////////////////////////////////////////////////

const ZZ = new Array(YY.length);
ZZ.fill(0); // 配列のすべての要素を 0 に変更 ここでは、固定値0が使われている
console.log("ZZ=",ZZ);

///////////////////////////////////////////////////

const AAA = [];
for (const el30 of AB)
  AAA.push(rp * 1000 * (el30* (Math.PI/180))); //度数からラジアンに変更
console.log("AAA=",AAA);  

///////////////////////////////////////////////////

const AC = [];
for(const el31 of AB){
  AC.push(el31/N);
}
console.log("AC=",AC);  

///////////////////////////////////////////////////

const B181 = [0,
              0.001446507,
              0.007468658,
              0.021800412,
              0.056943157,
              0.118071643,
              0.260971214,
              1.045480514,
              10000];


const AD = [];
for (const el32 of AB) {  //エクセルのMATCH関数
  for (let i = 0; i < B181.length; i++) {
    const el33 = B181[i];
    if (Math.abs(el32) < el33) {
      AD.push(i);
      break;  // 最初にマッチしたインデックスだけを記録して抜ける
    }
  }
}

console.log("AD=", AD);

///////////////////////////////////////////////////

const AE = [];
for(const el33 of AD){
  AE.push(el33 + 1);
}
console.log("AE=", AE);

///////////////////////////////////////////////////

const A181 = [0,
              0.542481614,
              0.738281634,
              1.005516456,
              1.348543392,
              1.661933045,
              2.054121707,
              2.35,
              2.35000001];

const AF = [];
for(const el34 of AE){
  AF.push((A181[el34-2]-A181[el34-1])/(B181[el34-2]-B181[el34-1]));
}
console.log("AF=", AF);

///////////////////////////////////////////////////

const AG1 = [];
let ag = 0;
for(const el35 of AB){
  if(el35 < 0){
    ag = -1;
    AG1.push(ag);
  }else if(el35 === 0){
    ag = 0;
    AG1.push(ag);
  }else if (el35 > 0){
    ag = 1;
    AG1.push(ag);
  }
}
console.log("AG1=", AG1);

const AG2 = [];
for(const el36 of AD){
  AG2.push(A181[el36-1]);
}
console.log("WW2=", WW2);

/* const MM3 = [];
for(let i=0; i < HH.length ; i++){
  MM3.push(MM1[i]*MM2[i]);
}
console.log("MM3=", MM3); */

const AG4 = [];
for(const el37 of AD){
  AG4.push(B181[el37-1]);
}
console.log("AG4=", AG4); 

const AG5 = [];
for(const el38 of AB){
  AG5.push(Math.abs(el38));
}
console.log("AG5=", AG5);

const AG6 = [];
for(let i = 0; i < AF.length; i++){
  AG6.push(AG1[i]*(AG2[i]+AF[i]*(AG5[i]-AG4[i])));
}
console.log("AG6=", AG6);

///////////////////////////////////////////////////

const AH = [];
for(const el39 of AB){
  AH.push(el39*KK2);
}

console.log("AH=", AH);

///////////////////////////////////////////////////

const AI = [];
for(let i = 0; i < YY.length; i++){
  AI.push(YY[i]+AG6[i]+AH[i]);
}

console.log("AI=", AI);

///////////////////////////////////////////////////

const AJ = [];
for(let i = 0; i < AI.length; i++){
 AJ.push(AI[i]/rp/Kg);
}

console.log("AJ=", AJ);

///////////////////////////////////////////////////

const AK = [];
for(let i = 0; i < AJ.length; i++){
  AK.push((AJ[i]/1000/rp/N)*(180/Math.PI)); //ラジアンから度数に変更
}

console.log("AK=", AK);

///////////////////////////////////////////////////

const AL = [];
for(const el40 of AI){
  AL.push(el40/Gts);
}

console.log("AL=", AL);

///////////////////////////////////////////////////

const AM = [];
for(let i = 0; i < AK.length; i++){
  AM.push(AB[i]/N+AK[i]+AL[i])
}

console.log("AM=", AM);

///////////////////////////////////////////////////

const AN = [];
for(const el41 of AM){
  AN.push(el41*(Math.PI/180)); //度数からラジアンに変更)
}

console.log("AN=", AN);

///////////////////////////////////////////////////

const B194 = [0,
              0.00017426,
              0.000174582,
              0.009142964,
              0.025770462,
              0.033240468,
              0.045030794,
              0.070391032,
              10000];

const AO = [];
for (const el42 of AM) {  //エクセルのMATCH関数
  for (let i = 0; i < B194.length; i++) {
    const el43 = B194[i];
    if (Math.abs(el42) < el43) {
      AO.push(i);
      break;  // 最初にマッチしたインデックスだけを記録して抜ける
    }
  }
}

console.log("AO=", AO);

///////////////////////////////////////////////////

const AP = [];
for(const el43 of AO){
  AP.push(el43+1);
}

console.log("AP=", AP);

///////////////////////////////////////////////////

const A194 = [0,
              8.24522E-08,
              8.24637E-08,
              3.47915E-07,
              6.62389E-07,
              7.68412E-07,
              8.79786E-07,
              0.000001,
              0.000002]

const AQ = [];
for(const el43 of AP){
  AQ.push((A194[el43-2]-A194[el43-1])/(B194[el43-2]-B194[el43-1]));
}
console.log("AQ=", AQ);

///////////////////////////////////////////////////

const AR1 = [];
let ar = 0;
for(const el44 of AM){
  if(el44 < 0){
    ar = -1;
    AR1.push(ar);
  }else if(el44 === 0){
    ar = 0;
    AR1.push(ar);
  }else if (el44 > 0){
    ar = 1;
    AR1.push(ar);
  }
}
console.log("AR1=", AR1);

const AR2 = [];
for(const el45 of AO){
  AR2.push(A194[el45-1]);
}
console.log("AR2=", AR2);

/* const MM3 = [];
for(let i=0; i < HH.length ; i++){
  MM3.push(MM1[i]*MM2[i]);
}
console.log("MM3=", MM3); */

const AR4 = [];
for(const el46 of AO){
  AR4.push(B194[el46-1]);
}
console.log("AR4=", AR4); 

const AR5 = [];
for(const el47 of AM){
  AR5.push(Math.abs(el47));
}
console.log("AR5=", AR5);

const AR6 = [];
for(let i = 0; i < AQ.length; i++){
  AR6.push(AR1[i]*(AR2[i]+AQ[i]*(AR5[i]-AR4[i])));
}
console.log("AR6=", AR6);

///////////////////////////////////////////////////

const AS = [];
for(const el48 of AM){
  AS.push(el48 * KK3);
}

console.log("AS=", AS);

///////////////////////////////////////////////////

const AT = [];
for(let i = 0; i < AI.length; i++){
  AT.push(AI[i]+AR6[i]+AS[i]);
}

console.log("AT=", AT);

///////////////////////////////////////////////////

const AU = [];
for(const el49 of AT){
  AU.push(el49*N);
}

console.log("AU=", AU);

///////////////////////////////////////////////////

const AV = [];
AV.push((AU[1]-AU[0])/(AM[1]-AM[0]));

for(let i = 0; i < AU.length-1; i++){
  AV.push((AU[i+1]-AU[i])/(AM[i+1]-AM[i]));
} 
console.log("AV=", AV);

///////////////////////////////////////////////////


const g = 9.81;              //固定値 加速度 C110
const SAT0f = -7.11;         //固定値 強制力 C105
const Kh = (Cr-Cf)/g/l/Cr/Cf;
const vs = vh/3.6;
const K_Kh = 1/(1+Kh*vs**2);       

///////////////////////////////////////////////////

const EEEE = [
-6,
-5,
-4,
-3,
-2,
-1,
0,
1,
2,
3,
4,
5,
6
];

console.log("EEEE=", EEEE);
///////////////////////////////////////////////////

const FFFF =[];
for(const el50 of EEEE){
  FFFF.push(Math.atan(el50/100));
}

console.log("FFFF=", FFFF);

///////////////////////////////////////////////////

const GGGG = [];
for(const el51 of FFFF){
  GGGG.push(-Dwf*m*g*el51)
}

console.log("GGGG=",GGGG); //G= 600.5034633194999

////////////////////////////////////////////

const HHHH = [];
for(const el52 of GGGG){
  HHHH.push(-el52*(Pt+Ct)+SAT0f);
}
console.log("HHHH=", HHHH); //H= -47.25966155754177

/////////////////////////////////////////////

const IIII = [];
for(const el53 of FFFF){
  IIII.push((-Kh*g*l*el53)*(180/Math.PI)); //ラジアンから度数に変更
}
console.log("IIII=",IIII); //I= 0.0684200299607068

/////////////////////////////////////////////

const JJJJ = [    //固定値 釣合トー角 [deg] 
-0.006844769,
0.008037877,
0.014293836,
0.012764215,
0.008520739,
0.002722391,
-0.004207146,
-0.011666879,
-0.019132482,
-0.026192837,
-0.032114009,
-0.036577025,
-0.038363307
]

console.log("JJJJ=",JJJJ); // J= -0.00684476930555633

/////////////////////////////////////////////

const KKKK = [];
for(const el54 of JJJJ){
  KKKK.push(el54*(Math.PI/180)); //度数からラジアンに変更
}
console.log("KKKK=",KKKK);  //K= -0.00011946376092140376

/////////////////////////////////////////////

const LLLL = [];
for(let i = 0; i < JJJJ.length; i++){
  LLLL.push(JJJJ[i]-IIII[i])
}

console.log("LLLL=",LLLL); //L= -0.07526479926626313

/////////////////////////////////////////////

const MMMM = [];
for(const el55 of LLLL){
  MMMM.push(el55*(Math.PI/180)); //度数からラジアンに変更
}

console.log("MMMM=",MMMM);  //M= -0.0013136185580489039

/////////////////////////////////////////////

const NNNN = [];
for(let i = 0; i < FFFF.length; i++){
  NNNN.push(K_Kh*(-m*g*Dwf*FFFF[i] + m*vs**2*Dwf/l*KKKK[i]))
}

console.log("NNNN=", NNNN);  //N= 427.41467110743037


/////////////////////////////////////////////

const OOOO = [];
for(const el56 of NNNN){
 OOOO.push(-el56*(Pt+Ct)+SAT0f);
}

console.log("OOOO=", OOOO);  //O= -35.686944910242794 

/////////////////////////////////////////////

const PPPP = [];
for (const el57 of LLLL) {  //エクセルのMATCH関数
  for (let i = 0; i < AM.length; i++) {
    const el58 = AM[i];
    if (el57 < el58) {
      PPPP.push(i+1);   //計算値を合わせるため+1する
      break;  // 最初にマッチしたインデックスだけを記録して抜ける
    }
  }
}

console.log("PPPP=", PPPP); //P=16

/////////////////////////////////////////////

const QQQQ = [];
for(const el58 of PPPP){
  QQQQ.push(el58+1)
}

console.log("QQQQ=", QQQQ);  //Q=17

/////////////////////////////////////////////

const RRRR = [];
for(const el59 of PPPP){
  RRRR.push(AM[el59-2]);
}
console.log("RRRR=", RRRR); //const R = -0.08179; //16行目の値

/////////////////////////////////////////////

const SSSS = [];
for(const el60 of QQQQ){
  SSSS.push(AM[el60-2]);
}

console.log("SSSS=", SSSS); //const S = -0.0748; //17行目の値

/////////////////////////////////////////////

const TTTT = [];
for(const el61 of PPPP){
  TTTT.push(AU[el61-2]);
}

console.log("TTTT=", TTTT); //const T = -36.3322; 16行目の値

/////////////////////////////////////////////

const UUUU = [];
for(const el62 of QQQQ){
  UUUU.push(AU[el62-2]);
}

console.log("UUUU=", UUUU); //const U = -35.6331; 17行目の値

/////////////////////////////////////////////

const VVVV = [];
for(let i = 0; i < TTTT.length; i++){
  VVVV.push(TTTT[i]+(UUUU[i]-TTTT[i])/(SSSS[i]-RRRR[i])*(LLLL[i]-RRRR[i]));
}

console.log("VVVV=", VVVV);

/////////////////////////////////////////////

const WWWW = [];

for(let i = 0; i < OOOO.length; i++){
  WWWW.push((OOOO[i]-VVVV[i])**2);
}

console.log("WWWW=", WWWW); //値が極小

/////////////////////////////////////////////

const YYYY =[];

for(let i=0; i < FFFF.length; i++){
  YYYY.push(K_Kh*(Kh*g*vs*FFFF[i]+vs/l*KKKK[i]));
}

console.log("YYYY=", YYYY);

/////////////////////////////////////////////

const ZZZZ =[];

for(let i=0; i < FFFF.length; i++){
  ZZZZ.push(K_Kh*((1+Kh*Cr*g*l*Dwf)/Cr*FFFF[i]+(Dwf-vs**2/Cr/g/l)*KKKK[i]));
}

console.log("ZZZZ=", ZZZZ);

/////////////////////////////////////////////

const AAAAAA = [];

for(let i=0; i < FFFF.length; i++){
  AAAAAA.push(K_Kh*((Dwf-vs**2/Cr/g/l)*MMMM[i]));
}

console.log("AAAAAA=", AAAAAA);

/////////////////////////////////////////////

const nagare = [];

for(let i=0; i < YYYY.length; i++){
  nagare.push(YYYY[i]*vs*(100/vs)**2/2);
}

console.log("nagare=", nagare);

/////////////////////////////////////////////

const nagare_beta = [];

for(let i=0; i < nagare.length; i++){
  nagare_beta.push(ZZZZ[i]*100+nagare[i]);
}

console.log("nagare_beta=", nagare_beta);

const nagareXn3 = nagare_beta[3];
const nagareXn1 = nagare_beta[5];
const nagareX1  = nagare_beta[7];
const nagareX3  = nagare_beta[9];
const kando = ((nagare_beta[9]-nagare_beta[3])/6).toFixed(2);

console.log("X=-3の時",nagareXn3);
console.log("X=-1の時",nagareXn1);
console.log("X=1の時",nagareX1);
console.log("X=3の時",nagareX3);
console.log("kando=", kando);

/////////////////////////////////////////////
//流れグラフ用　X=-3,-1,1,3 const result = [[x1,y1],[x2,y2]]の形にする

const result1 = [];
for(let i = 3; i <=9 ; i++){
  const result2 = [];
  result2.push(EEEE[i],nagare_beta[i]);
  result1.push(result2);
}

console.log("result_nagare_beta1=", result1);

/////////////////////////////////////////////

//流れグラフ用　X=-6から6まで const result = [[x1,y1],[x2,y2]]の形にする

const result3 = [];
for(let i = 0; i < EEEE.length ; i++){
  const result4 = [];
  result4.push(EEEE[i],nagare_beta[i]);
  result3.push(result4);
}

console.log("result_nagare_beta2=", result3);

/////////////////////////////////////////////

//判定用　X=-1～1の流れ量0.24以下　&& スラント感度0.24以下でOKとする

let judge = "OK";
for(let i = 5; i <= 7 ; i++){
  if((Math.abs(nagare_beta[i].toFixed(2)) > 0.24) || (kando > 0.24)){
    judge = "NG";
    break;
  }
}

console.log("judge=", judge);

/////////////////////////////////////////////

document.getElementById('judge').value = judge;
document.getElementById('kando').value = kando;

// 画像とコメントを表示する
const resultImage = document.getElementById('resultImage');
const comment = document.getElementById('comment');
resultImage.style.display = 'block'; // 画像を表示
comment.style.display = 'block';     // コメントを表示

updateChart(chart1, result1, 'blue', '設計ノミナル1', 'Road Slant(%)', 'Pull Distance(m)');
updateChart(chart2, result3, 'red', '設計ノミナル2', 'Road Slant(%)', 'Pull Distance(m)');

displayValues(result1, 'values11');
displayValues(result3, 'values12');

}  //関数ここまで

function updateChart(chart, dataArray, color, title, xlabel, ylabel) {
  const labels = dataArray.map(item => item[0]);
  const data = dataArray.map(item => item[1]);
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].borderColor = color;

  chart.options.plugins.title.text = title;
  chart.options.scales.x.title = {
    display: true,
    text: xlabel
  };
  chart.options.scales.y.title = {
    display: true,
    text: ylabel
  }

  chart.update();
}

function displayValues(dataArray, elementId) {
  const list = document.getElementById(elementId);
  list.innerHTML = ''; // リセット
  dataArray.forEach(([x, y]) => {
    const li = document.createElement('li');
    li.textContent = `X=${x}: ${y.toFixed(2)}`;
    list.appendChild(li);
  });
}

/* function displayValues(dataArray, elementId) {
  const list = document.getElementById(elementId);
  list.innerHTML = ''; // リセット
  dataArray.forEach(([x, y]) => {
    const li = document.createElement('li');
    li.textContent = `X=${x}: ${y.toFixed(2)}`;
    list.appendChild(li);
  });
} */

window.onload = function () {
  const ctx1 = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');

  chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '設計ノミナル1',
        data: [],
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: ''
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Road Slant(%)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Pull Distance(m)'
          }
        }
      }
    },

    plugins: [whiteBackgroundPlugin]
  });

  chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '設計ノミナル2',
        data: [],
        fill: false,
        borderColor: 'red',
        tension: 0.1
      }]
    },

    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: ''
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Road Slant(%)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Pull Distance(m)'
          }
        }
      }
    },
    
    plugins: [whiteBackgroundPlugin]
  });
};

const image = document.getElementById('resultImage');
const comment = document.getElementById('comment');
const comment1 = document.getElementById('comment1');
const game = document.getElementById('game');
const gatorRow = document.querySelector('.gator-row');

const images_gator = document.getElementsByClassName('green-box');

image.addEventListener('click', () => {
    // 画像と元のコメントを非表示
    image.style.display = 'none';
    comment.style.display = 'none';

    // 「イテ！」表示
    //comment1.textContent = "イテッ！";
    //comment1.style.display = 'block';

    // 「イテ！」を絵文字付きで表示
    comment1.innerHTML = "<span style='font-size: 24px; color: red; font-weight: bold;'>💥 イテッ！ 💥</span>";
    comment1.style.display = 'block';

    //ゲームボタンを表示
    game.style.display = 'block';

    //タイマ（残り時間5秒）を表示
    const timer = document.getElementById("timer");
    timer.style.display = 'block';

    // 1秒後に元に戻す
    setTimeout(() => {
        // 「イテ！」を非表示
        comment1.style.display = 'none';

        // 画像とコメントを再表示
        image.style.display = 'block';
        comment.style.display = 'block';
    }, 1000);

    /// ワニ表示（まとめて）
    gatorRow.style.display = 'flex';

    for (let i = 0; i < images_gator.length; i++) {
    images_gator[i].style.color = 'black'; // 最初から表示させる
    }
});

function resetPage() {
  location.reload(); // ページをリロードして初期状態に戻す
}

//ワニクリック用
// const images_gator2 = document.getElementsByClassName('green-box');
// const comment_gator2 = document.getElementById('comment_gator');

//すべての緑のボックスにイベントリスナーを追加
// for (let i = 0; i < images_gator2.length; i++) {
//     images_gator2[i].addEventListener('click', () => {

//         // クリックされたワニの色を透明にする
//         images_gator2[i].style.color = 'transparent'; // 絵文字を透明にする

//         comment_gator2.textContent = "イテッ！"; // コメント内容を設定
//         comment_gator2.style.display = 'block'; // 表示

//         // 一定時間後に非表示にする場合
//         setTimeout(() => {
//             comment_gator2.style.display = 'none';
//         }, 500); // 0.5秒後

//         // 0.5秒後にワニを再表示する
//         setTimeout(() => {
//             images_gator2[i].style.color = 'black'; // 絵文字を再表示する
//         }, 500); // 0.5秒後

//     });
// }

//const images_gator = document.getElementsByClassName('green-box');
const comment_gator = document.getElementById('comment_gator');
const gameButton = document.getElementById('game');

let gatorTimers = [];
let score = 0;
let gameRunning = false;
let difficultyLevel = 1000; // 初期出現時間: 1秒
let gameDuration = 5000;    // ゲーム全体の長さ: 5秒


// ワニをクリックしたときの処理
// for (let i = 0; i < images_gator.length; i++) {
//     images_gator[i].addEventListener('click', () => {
//         if (!gameRunning) return; // ゲーム中のみ有効

//         if (images_gator[i].style.color === 'black') {
//             images_gator[i].style.color = 'transparent'; // 非表示
//             comment_gator.textContent = "イテッ！";
//             comment_gator.style.display = 'block';
//             score++; // スコア加算

//             setTimeout(() => {
//                 comment_gator.style.display = 'none';
//             }, 500);
//         }
//     });
// }


// ワニをクリックしたときの処理
for (let i = 0; i < images_gator.length; i++) {
    images_gator[i].addEventListener('click', () => {
        const currentColor = images_gator[i].style.color;

        if (currentColor === 'black') {
            images_gator[i].style.color = 'transparent'; // 非表示
            comment_gator.textContent = "イテッ！";
            comment_gator.style.display = 'block';
            score++; // スコア加算

            // setTimeout(() => {
            //     comment_gator.style.display = 'none';
            // }, 500);
            setTimeout(() => {
                if (!gameRunning) {
                    images_gator[i].style.color = 'black'; // 再表示（ゲーム前のみ）
                }
                comment_gator.style.display = 'none';  // コメント非表示は共通
            }, 500);
        }
    });
}

// ランダム間隔を返す関数（1秒～3秒）
function getRandomInterval() {
    return Math.floor(Math.random() * 2000) + 1000;
}

let countdownTime = 5; // 秒（変更可能）
let countdownInterval; // カウントダウン用変数

// ゲーム開始処理
function gamePage() {

    // 初期化
    score = 0;
    countdownTime = 5;
    document.getElementById("scoreDisplay").textContent = `スコア: ${score}`;
    //document.getElementById("game").style.display = "none";
    document.getElementById("endMessage").style.display = "none";
    //document.getElementById("timer").textContent = `残り時間: ${countdownTime}秒`;

    //score = 0;
    difficultyLevel = 1000;
    gameRunning = true;

    timer.style.display = "block"

    // カウントダウン開始
    countdownInterval = setInterval(() => {
    countdownTime--;
    document.getElementById("timer").textContent = `残り時間: ${countdownTime}秒`;

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      endGame();
    }
    }, 1000);


    // 全ワニを非表示
    for (let i = 0; i < images_gator.length; i++) {
        images_gator[i].style.color = 'transparent';
    }

    // 既存タイマーをクリア
    gatorTimers.forEach(timer => clearInterval(timer));
    gatorTimers = [];

    // 各ワニに独立したタイマーを設定
    for (let i = 0; i < images_gator.length; i++) {
        const gator = images_gator[i];

        const timer = setInterval(() => {
            if (!gameRunning) return;

            // 出現
            gator.style.color = 'black';

            // 一定時間で非表示
            setTimeout(() => {
                gator.style.color = 'transparent';
            }, difficultyLevel);

        }, getRandomInterval());

        gatorTimers.push(timer);
    }

    // 徐々に難易度UP（出現時間を短くする）
    const difficultyTimer = setInterval(() => {
        if (difficultyLevel > 300) {
            difficultyLevel -= 100; // 最短0.3秒まで短縮
        }
    }, 1000); // 1秒ごとに難化

    gatorTimers.push(difficultyTimer);

    // 一定時間後にゲーム終了
    setTimeout(() => {
        endGame();
    }, gameDuration);
}

// ゲーム終了処理
function endGame() {
    gameRunning = false;

    // 全タイマー停止
    gatorTimers.forEach(timer => clearInterval(timer));
    gatorTimers = [];
    clearInterval(countdownInterval);

    // 全ワニを非表示
    for (let i = 0; i < images_gator.length; i++) {
        images_gator[i].style.color = 'transparent';
    }

    // コメント表示
    comment_gator.textContent = `ゲーム終了！スコア: ${score}`;
    comment_gator.style.display = 'block';
}







