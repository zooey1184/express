// 因为createdAt时间是美国时间，所以要进行处理，保证创建时间与查看时间一致
Date.prototype.format = function(format) {
	var o = {
		"y+": this.getFullYear(),
		"m+": this.getMonth() + 1,
		"d+": this.getDate(), 
		"x+": '日一二三四五六'.split('')[this.getDay()],
		"H+": this.getHours(),
		"h": (this.getHours()>12?'下午':'上午') + this.getHours()%12,
		"i+": this.getMinutes(),
		"s+": this.getSeconds(),
		"S": this.getMilliseconds()
	}
	for (var k in o) {
		var reg = new RegExp("(" + k + ")");
		if (reg.test(format)) {
			var v = o[k] + '';
			if(RegExp.$1.length<4 && RegExp.$1.length>1 && v.length==1) v = '0'+v;
			format = format.replace(reg, v);
		}
	}
	return format;
}
Date.prototype.toISOString = function() {
	return this.format('y-m-dTHH:ii:ss.SZ')
}
