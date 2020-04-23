export function getDayArr(y,m){const flag=y%4==0&&y%100!=0&&y%400!=0
const nums=[31,flag?29:28,31,30,31,30,31,31,30,31,30,31]
let arr=[]
for(let i=0;i<nums[m-1];i++){arr.push(fmt(i+1)+'日')}
return arr}
export function getArr(index){let arr=[],s=1,len=13,tag='月';if(index>2){s=0
if(index==3){len=24
tag='时'}
if(index>3){len=60
if(index==4){tag='分'}
if(index==5){tag='秒'}}}
for(let i=s;i<len;i++){arr.push(fmt(i)+tag)}
return arr}
function fmt(t){return t>9?t:'0'+t}
export function checkDefaultValue(m,d){if(m=='date'||m=='dateTime'||m=='time'){if(!d){throw Error("'defaultValue'为必填属性")}
if((m=='date'&&d.length!=10)||(m=='time'&&d.length!=8)||(m=='dateTime'&&d.length!=19)){throw Error("'defaultValue'有误，请根据当前mode 正确设置格式")}
return}
throw Error(`mode无${m}该选项配置`)}
export function getDateTimeValue(arr,mode){let y=fmt(parseInt(arr[0])),M=fmt(parseInt(arr[1])),d=fmt(parseInt(arr[2])),h=fmt(parseInt(arr[3])),m=fmt(parseInt(arr[4])),s=fmt(parseInt(arr[5]))
if(mode!='dateTime')return`${y}-${M}-${d}`
return`${y}-${M}-${d} ${h}:${m}:${s}`}