const box = document.querySelectorAll('.box');
const btn = document.querySelectorAll('.btn');
const popup = document.querySelector('.wrap-pop');
var selected;
const c_blue = '#2879FF';
const c_empty = '#E3E3E3';
const c_highlight = '#c06c84';
const c_red = '#f67280';
const c_navyBlue = '#355c7d';
// Check For Click In Boxes
box.forEach(e => e.addEventListener('click',function(){
    if(selected){
        resetBoxColors();
        if(selected.classList.value.includes('unchangable')){
            selected.style.border = '0px solid #f67280';
        }
        else if(selected.textContent !=''){
            selected.style.backgroundColor = c_blue;
        }
        else if(selected.textContent =='')
        selected.style.backgroundColor = c_empty;
    }
    selected = this;
    if(selected.style.backgroundColor != 'rgb(24, 79, 167)')
    selected.style.backgroundColor = c_highlight;
    else
    selected.style.border = '2px solid #f67280'
    hightlightBoxes();
}))
// check for click outside of boxes to reset box colors
window.addEventListener('click',(e)=>{
    if(e.path[0].classList[0] != 'game') return;
        resetBoxColors();
});
// 1-9 buttons 
btn.forEach(e => e.addEventListener('click',function(){
    if(selected.classList.contains('unchangable') || !selected) return;
    selected.textContent = this.dataset.value;
}))
// lose of win decider / game checker
document.querySelector('.go').addEventListener('click',compare);

// popup close button
popup.querySelector('.close').addEventListener('click',()=>popup.style.display = 'none')


// -------------------
// hightlight all boxes in x and y in respect to selected box
function hightlightBoxes(){
    const clas = selected.classList[1].split('');
    const [y,x] = [parseInt(clas[0]),parseInt(clas[1])];
    for(let i = (y*9-9); i<(y*9-9)+9; i++){
        if(box[i].classList.value.includes('unchangable')){
            box[i].style.border = '2px solid #f67280';
        }

        else if(selected != box[i])
        box[i].style.backgroundColor = c_navyBlue;
    }
    for(let i = x-1; i<81; i=i+9){
        if(box[i].classList.value.includes('unchangable')){
            box[i].style.border = '2px solid #f67280';
        }

        else if(selected != box[i])
        box[i].style.backgroundColor = c_navyBlue;
    }
}
// reset highlighted colors of all boxes in x and y in respect to last selected box
function resetBoxColors(){
    const clas = selected.classList[1].split('');
    const [y,x] = [parseInt(clas[0]),parseInt(clas[1])];
    for(let i = (y*9-9); i<(y*9-9)+9; i++){

         if(box[i].textContent == '')
            box[i].style.backgroundColor = c_empty;
        else if(box[i].classList.value.includes('unchangable')){
            box[i].style.border = '0px solid #f67280';
        }
         else if(box[i].style.backgroundColor != 'rgb(246, 114, 128)'){
            box[i].style.backgroundColor = c_blue;
        }
    }
    for(let i = x-1; i<81; i=i+9){

         if(box[i].textContent == '')
            box[i].style.backgroundColor = c_empty;
        else if(box[i].classList.value.includes('unchangable')){
            box[i].style.border = '0px solid #f67280';
        }
        else  if(!box[i].classList.value.includes('unchangable')){
            box[i].style.backgroundColor = c_blue;
        }

    }
}


//--------------Logic---------------------
var checker = []; //to store the values of single row/column. i.e.=> from 1-9,9-18(in row).
var status='';    // if duplicates found in array then user loses the game.
var indexes = [];
function compare(option=2){
    checker = [];
    indexes = [];
    status = '';
        for(var i=0;i<81;i++){              //store single row values in checker array
            if(i % 9 == 0) checker=[];  //reset checker on every new row
            valueChecker(i,option);
        }
        for(var j=0;j<9;j++){              //store single column values in checker array
            checker=[];         //reset checker on every new column
            for(var i=j;i<81;i+=9){
                valueChecker(i,option);
            }
        }
        // result
        if(option == 1)return;
    if(status==''){
        popup.style.display='flex';
        popup.querySelector('h1').textContent = 'You Won!'
        popup.querySelector('h1').style.color = '#24BC7A';
    return;
    }
        popup.style.display='flex';
        popup.querySelector('h1').textContent = status;
        popup.querySelector('h1').style.color = c_red;
}
function valueChecker(i,option){
    const value = box[i].textContent;
        if(checker.includes(value)){ //check if there's any duplicates in array
        // this if 'option' condition run only when called from index.js
            if(option==1){    //when game starts some of the boxes are filled auto. from index.js, here we are checking if there are duplicates or not 
                box[i].textContent = '';
                box[i].style.backgroundColor = c_empty;
                box[i].classList.remove('unchangable');
            }
            else if(box[i].classList.value.includes('unchangable'))
                box[i].style.border = '2px solid #f67280';
            else         
            box[i].style.backgroundColor = c_red;  //duplicates found
            if(status!='Incomplete!')   //if boxes arn't filled then no need to print 'loser'.'incomplete will be printed'
            status = 'You Lost the Game!'; 
        }

        else if(value!=''){
            checker.push(value);   //if there's no duplicate value then add it
            indexes.push(i);
        }
        else if(value==''){
            status = 'Incomplete!' //if user didn't put any value
        }
}
