fs = require('fs');

var allsame = function (v, s, e) {
	for (var i = s; i <= e; ++i)
		if(parseInt(v[i]) != parseInt(v[s]))
			return false;
	return true;
} 

var isquil = function(a,b) {
	return parseInt(a) == parseInt(b);
}

var isplalidrome = function(v,s,e) {
	for (var i = s; i <= e; ++i) {
		if (v[i] != v[e - (i - s)])
			return false;
	}
	return true;
}
var ascend = function (v, s, e, flag, val) {
	if (flag) {
		for (var i = s; i <= e; ++i)
			if (parseInt(v[i])  != parseInt(val) + (i - s))
				return false;
		return true; 
	} else {
		for (var i = s; i <= e; ++i)
			if (parseInt(v[i]) != parseInt(val) - (i - s))
				return false;
		return true;
	}
}
var oneval = function (v, s, e, val) {
	for (var i = s; i <= e; ++i) {
		if (parseInt(v[i]) != parseInt(val))
			return false;
	}
	return true;
}
var hasval = function (v, s, e,flag, val) {
	if (flag) {
		for (var i = s; i <= e; ++i)
			if (parseInt(v[i]) != parseInt(val))
				return false;
		return true;
	} else {
		for (var i = s; i <= e; ++i)
			if (parseInt(v[i]) == parseInt(val))
				return false;
		return true;
	}
}

var getGrade = function (v) {
	if ((hasval(v,3,5,false,4) && hasval(v,6,10,true,v[6])) || 
			ascend(v,5,10,true,v[5]) || (hasval(v,3,5,true,4) && 
				hasval(v,6,10,true,8)))
		return 3;
	if (hasval(v,0,10,false,4) && ((hasval(v,7,10,true,8) && 
			hasval(v,4,5,true,v[4])) || ascend(v,7,10,true,v[7])))
		return 4;

	if ((hasval(v,0,10,false,4)&&hasval(v,7,10,true,v[7])) || 
			(oneval(v,0,10,4)&&ascend(v,6,10,true,v[6])) || 
			(ascend(v,5,10,false,v[5])) || 
			(ascend(v,5,7,false,v[5])&&ascend(v,8,10,true,v[7])) || 
			(ascend(v,5,7,true,v[5])&&ascend(v,8,10,true,v[5])&&
			 hasval(v,0,10,false,4)))
		return 5;

	if ((hasval(v,6,9,true,v[6])) || (ascend(v,6,10,false,v[6])) || 
			(ascend(v,7,10,true,v[7])) || (ascend(v,5,7,true,v[5])&&
				ascend(v,8,10,false,v[7])) || 
			(ascend(v,5,7,false,v[5]&&ascend(v,8,10,false,v[5]))) || 
			(hasval(v,0,10,false,4)&&isquil(v[5],v[7])&&
			 isquil(v[7],v[9])&&isquil(v[6],v[8])&&isquil(v[8],v[10])&&
			 isquil(v[5],v[6])) || hasval(v,7,10,true,4) || 
			(hasval(v,8,10,true,v[8])&&(isquil(v[8],6) || isquil(v[8],8) ||
										isquil(v[8],9))))
		return 6;

	if ((hasval(v,8,10,true,v[8])) || (ascend(v,7,10,false,v[7])) ||
			(ascend(v,6,9,true,v[6])) || (ascend(v,6,9,false,v[6])) ||
			(isquil(v[7],v[8])&&isquil(v[9],v[10])&&!isquil(v[8],v[9])) ||
			(oneval(v,0,10,4)&&isquil(v[5],v[7])&&isquil(v[7],v[9])&&
			 isquil(v[6],v[8])&&isquil(v[8],v[10])&&!isquil(v[5],v[6])) ||
			(oneval(v,5,10,4)&&
			 ((ascend(v,5,7,true,v[5])&&ascend(v,8,10,true,v[5])) || 
			  (ascend(v,5,7,false,v[5])&&ascend(v,8,10,false,v[5])))) ||
			(hasval(v,4,5,true,v[4])&&hasval(v,6,8,true,v[6])&&
			 hasval(v,9,10,true,v[4])&&isquil(v[5],v[6])))
		return 7;

	if ((hasval(v,7,9,v[7])) || (ascend(v,8,10,true,v[8])) || 
			(isquil(v[7],v[8])&&isquil(v[9],v[10])&&!isquil(v[8],v[9])) ||
			(hasval(v,7,10,false,4)&&isquil(v[7],v[9])&&isquil(v[8],v[10])
			 &&!isquil(v[7],v[8])) || (isquil(v[3],v[10])&&
			 isquil(v[4],v[9])&&isquil(v[5],v[8])&&isquil(v[6],v[7])))
		return 8;

	if ((isquil(v[9],v[10])&&
				(isquil(v[9],6)||isquil(v[9],8)||isquil(v[9],9))) ||
			(isplalidrome(v,5,10) || isplalidrome(v,4,9) ||
			 isplalidrome(v,3,8)))
		return 9;

	return 10;
}


var getGradeNew = function(v) {
	if (oneval(v,3,10,6) || oneval(v,3,10,8) || oneval(v,3,10,9))
		return 1;
    if (oneval(v,3,10,v[3]))
		return 1;
	if (oneval(v,4,10,6) || oneval(v,4,10,8) || oneval(v,4,10,9))
		return 1;
    if (oneval(v,4,10,v[4]))
		return 1;
	if (oneval(v,5,10,6) || oneval(v,5,10,8) || oneval(v,5,10,9))
		return 1;
	if (ascend(v,4,10,true,v[4]) || ascend(v,4,10,false,v[4]))
		return 1;
	if (hasval(v,5,10,false,6)&&hasval(v,5,10,false,8)&&
			hasval(v,5,10,false,9)&&oneval(v,5,10,v[5]))
		return 1;
	if (oneval(v,6,10,6) || oneval(v,6,10,8) || oneval(v,6,10,9))
		return 1;



	if (ascend(v,5,10,true,v[5]) || ascend(v,5,10,false,v[5]))
		return 2;
	if (hasval(v,6,10,false,6)&&hasval(v,6,10,false,8)&&
			hasval(v,6,10,false,9)&&oneval(v,6,10,v[6]))
		return 2;


	if (oneval(v,7,10,6) || oneval(v,7,10,8) || oneval(v,7,10,9))
		return 3;
	if (ascend(v,6,10,true,5))
		return 3;


	if(hasval(v,7,10,false,6)&&hasval(v,7,10,false,8)&&
			hasval(v,7,10,false,9)&&oneval(v,7,10,v[7]))
		return 4;
	if((!isquil(v[6],5)) && ascend(v,6,10,true,v[6]) || 
			ascend(v,6,10,false,v[6]))
		return 4;
	if (ascend(v,7,10,true,6))
		return 4;


	if (oneval(v,8,10,6) || oneval(v,8,10,8) || oneval(v,8,10,9))
		return 5;


	if (hasval(v,8,10,false,6)&&hasval(v,8,10,false,8)&&
			hasval(v,8,10,false,9)&&oneval(v,8,10,v[8]))
		return 6;
	if ((!isquil(v[7],6))&&
			(ascend(v,7,10,true,v[7]) || ascend(v,7,10,false,v[7])))
	    return 6;
	if (oneval(v,7,8,6)&&oneval(v,9,10,8))
		return 6;
	if (oneval(v,7,8,8)&&oneval(v,9,10,6))
		return 6;
	if (oneval(v,7,8,6)&&oneval(v,9,10,9))
		return 6;
	if (oneval(v,7,8,9)&&oneval(v,9,10,6))
		return 6;
	if (oneval(v,7,8,9)&&oneval(v,9,10,8))
		return 6;
	if (oneval(v,7,8,8)&&oneval(v,9,10,9))
		return 6;
	if (oneval(v,5,6,v[5])&&oneval(v,7,8,v[7])&&
			oneval(v,9,10,v[9])&&(!isquil(v[5],v[7]))&&
			(!isquil(v[5],v[9]))&&(!isquil(v[7],v[9])))
		return 6;
	if (isquil(v[5],v[7])&&isquil(v[5],v[9])&&
			isquil(v[6],v[8])&&isquil(v[6],v[10])&&(!isquil(v[5],v[6])))
		return 6;
	if ((ascend(v,5,7,true,v[5])&&ascend(v,8,10,true,v[5])) || 
			(ascend(v,5,7,false,v[5],ascend(v,8,10,false,v[5]))))
		return 6;


	if (hasval(v,0,10,false,4)) 
	{
	
		if (isquil(v[7],v[8])&&isquil(v[9],v[10])&&(!isquil(v[7],v[9])))
			return 7;
		if (isquil(v[7],v[9])&&isquil(v[8],v[10])&&(isquil(v[8],8))&&
				(isquil(v[7],6) || isquil(v[7],9)))
			return 7;
		if (ascend(v,8,10,true,v[8]) || ascend(v,8,10,false,v[8]))
			return 7;



		if (isquil(v[7],v[9])&&isquil(v[8],v[10])&&(!isquil(v[7],v[8])))
			return 8;
		if (oneval(v,9,10,v[9])&&(isquil(v[9],6) || isquil(v[9],8 || 
						isquil(v[9],9))))
			return 8;
		//new add
		if (oneval(v,6,9,v[6]))
			return 8;

		if (oneval(v,9,10,v[9]))
			return 9;	
	}

	return 10;
}

var show = function (grade,outpath) {

	var text = '';
	for (var key in grade) {
		console.log('key:', key,'   :', grade[key].length);
//		console.log('\n\n\n\n');
//		console.log('grade:',key);
		text += 'grade:' + key + '\n';
		for (var i = 0; i < grade[key].length; ++i) {
//			console.log(grade[key][i]);
			text += grade[key][i] + '\n';
		}
//		console.log('\n\n');
		text += '\n\n';
	}
	fs.writeFileSync(outpath,text,'utf8');
}

var solve = function(inpath,outpath) {

	var text = fs.readFileSync(inpath, 'utf8');
	var list = text.split('\n');
//	console.log(list);

//	console.log(list.length);
	
//	list = ['17023516866','17012315155','17012315388'];
	var grade = {};
	for (var i = 0; i < list.length; ++i) {
		if (11 != list[i].length)
			continue;
	     var g = getGradeNew(list[i]);
		 if (!grade[g]) {
			grade[g] = [];
		 }
		 grade[g].push(list[i]);
	}

	show(grade,outpath);
}

var test = function () {


	text = '17023328888';
	console.log(text);
	console.log(ascend(text,7,10,true,text[7]));
	console.log(ascend(text,3,5,false,text[3]));
	console.log(hasval(text,0,10,false,4));
	console.log(hasval(text,4,5,true,text[4]));
	console.log(hasval(text,7,10,true,8));
	console.log('**********');
	var v = text;
	if (hasval(v,0,10,false,4) && ((hasval(v,7,10,true,8) && 
			hasval(v,4,5,true,v[4])) || ascend(v,7,10,true,v[7])))
		console.log('true');

	console.log('false');


}



if (__filename == __dirname + '/cal.js') {
	solve('in.txt', 'out.txt');
//	test();
}
