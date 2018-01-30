import {sha512} from './sha'

let Hash_txt = function(){
	var pv=this;
	pv.$MD5=function(str){//Encode sting to MD5
		if (str=="")return null;
		var tmstr=pv.txt2ary(str);
		return pv.MD5(tmstr,tmstr.length);
	}
	pv.$SHA1=function(str){//Encode sting to SHA-1
		if (str=="")return null;
		var tmstr=pv.txt2ary(str);
		return pv.SHA1(tmstr,tmstr.length);
	}
	pv.$SHA512 = function(mess){
		return sha512(mess);
	}
    pv.$SHA256=function(str){//Encode sting to SHA-1
		if (str=="")return null;
		var tmstr=pv.txt2ary(str);
		return pv.SHA256(tmstr,tmstr.length);
	}
	pv.$SHA512 = function(mess){
		return sha512(mess);
	}
	pv.MD5=function(buff,len){//Execute MD5 encode
		var lenmod,ibuff,tem0,tem1,tem2,tem3,h0,h1,h2,h3,md5_f,md5_g,temp;
		var const64r=[ //Parameter data
			0xD76AA478, 0xE8C7B756, 0x242070DB, 0xC1BDCEEE, 0xF57C0FAF, 0x4787C62A,
			0xA8304613, 0xFD469501, 0x698098D8, 0x8B44F7AF, 0xFFFF5BB1, 0x895CD7BE,
			0x6B901122, 0xFD987193, 0xA679438E, 0x49B40821, 0xF61E2562, 0xC040B340,
			0x265E5A51, 0xE9B6C7AA, 0xD62F105D, 0x02441453, 0xD8A1E681, 0xE7D3FBC8,
			0x21E1CDE6, 0xC33707D6, 0xF4D50D87, 0x455A14ED, 0xA9E3E905, 0xFCEFA3F8,
			0x676F02D9, 0x8D2A4C8A, 0xFFFA3942, 0x8771F681, 0x6D9D6122, 0xFDE5380C,
			0xA4BEEA44, 0x4BDECFA9, 0xF6BB4B60, 0xBEBFBC70, 0x289B7EC6, 0xEAA127FA,
			0xD4EF3085, 0x04881D05, 0xD9D4D039, 0xE6DB99E5, 0x1FA27CF8, 0xC4AC5665,
			0xF4292244, 0x432AFF97, 0xAB9423A7, 0xFC93A039, 0x655B59C3, 0x8F0CCC92,
			0xFFEFF47D, 0x85845DD1, 0x6FA87E4F, 0xFE2CE6E0, 0xA3014314, 0x4E0811A1,
			0xF7537E82, 0xBD3AF235, 0x2AD7D2BB, 0xEB86D391];
		var spec64r=[ //4 Rounds hash
			7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
			5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
			4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
			6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
		if (len>268435456 || len<0){return 0;}
		var block64=Array();
		lenmod=len%64;
		if (lenmod>=56){ //Extend data to multiple of 512 bits
			lenmod-=64;
		}
		buff[len]=0x80;
		lenmod++;
		ibuff=len+1;
		while (lenmod<56){
			buff[ibuff++]=0;
			lenmod++;
		}
		buff[ibuff++]=(len*8)&0x000000ff;//MD5 uses little endian data
		buff[ibuff++]=((len*8)&0x0000ff00)>>>8;
		buff[ibuff++]=((len*8)&0x00ff0000)>>>16;
		buff[ibuff++]=((len*8)&0xff000000)>>>24;
		buff[ibuff++]=buff[ibuff++]=buff[ibuff++]=buff[ibuff++]=0;
		tem0=h0=0x67452301;//Initialize
		tem1=h1=0xEFCDAB89;
		tem2=h2=0x98BADCFE;
		tem3=h3=0x10325476;
		var i_,j_,leftrotate;
		for (i_=0;i_<ibuff;i_+=64){ //Each chunk
			for (j_=0;j_<16;j_++){
				block64[j_]=buff[i_+j_*4];
				block64[j_]|=buff[i_+j_*4+1]<<8;
				block64[j_]|=buff[i_+j_*4+2]<<16;
				block64[j_]|=buff[i_+j_*4+3]<<24;
			}
			for (j_=0;j_<64;j_++){ //64 round hash
				if (j_>=0 && j_<16){
					md5_f=(tem1&tem2)|((~tem1)&tem3);
					md5_g=j_;
				}
				else if (j_>=16 && j_<32){
					md5_f=(tem3&tem1)|((~tem3)&tem2);
					md5_g=(5*j_+1)%16;
				}
				else if (j_>=32 && j_<48){
					md5_f=tem1^tem2^tem3;
					md5_g=(3*j_+5)%16;
				}
				else if (j_>=48 && j_<64){
					md5_f=tem2^(tem1|(~tem3));
					md5_g=(7*j_)%16;
				}
				leftrotate=safeadd(safeadd(tem0,md5_f),safeadd(const64r[j_],block64[md5_g]));
				leftrotate=leftr(leftrotate,spec64r[j_]);
				temp=tem3;
				tem3=tem2;
				tem2=tem1;
				tem1=safeadd(tem1,leftrotate);
				tem0=temp;
			}
			tem0=h0=safeadd(h0,tem0);//Add
			tem1=h1=safeadd(h1,tem1);
			tem2=h2=safeadd(h2,tem2);
			tem3=h3=safeadd(h3,tem3);
		}
		return le2lex(h0)+le2lex(h1)+le2lex(h2)+le2lex(h3);
	}
	pv.SHA1=function(buff,len){
		//Note:SHA uses big endian integer
		var lenmod,ibuff,tem0,tem1,tem2,tem3,tem4,h0,h1,h2,h3,h4,sha_f,sha_k,temp;
		if (len>268435456 || len<0){return 0;}
		var block64=Array();
		lenmod=len%64;
		if (lenmod>=56){ //Extend like MD5
			lenmod-=64;
		}
		buff[len]=0x80;
		lenmod++;
		ibuff=len+1;
		while (lenmod<56){
			buff[ibuff++]=0;
			lenmod++;
		}
		buff[ibuff++]=buff[ibuff++]=buff[ibuff++]=buff[ibuff++]=0;
		buff[ibuff++]=((len*8)&0xff000000)>>>24;
		buff[ibuff++]=((len*8)&0x00ff0000)>>>16;
		buff[ibuff++]=((len*8)&0x0000ff00)>>>8;
		buff[ibuff++]=(len*8)&0x000000ff;
		h0=0x67452301;
		h1=0xEFCDAB89;
		h2=0x98BADCFE;
		h3=0x10325476;
		h4=0xC3D2E1F0;
		var i_,j_;
		for (i_=0;i_<ibuff;i_+=64){
			tem0=h0;
			tem1=h1;
			tem2=h2;
			tem3=h3;
			tem4=h4;
			for (j_=0;j_<16;j_++){
				block64[j_]=buff[i_+j_*4]<<24;
				block64[j_]|=buff[i_+j_*4+1]<<16;
				block64[j_]|=buff[i_+j_*4+2]<<8;
				block64[j_]|=buff[i_+j_*4+3];
			}
			for (j_=0;j_<80;j_++){//80 round hash
				if (j_>=16){
					block64[j_]=block64[j_-3]^block64[j_-8]^block64[j_-14]^block64[j_-16];
					block64[j_]=leftr(block64[j_],1);
				}
				if (j_<20){//Round 1~20
					sha_f=(tem1&tem2)|(~tem1&tem3);
					sha_k=0x5A827999;
				}else if (j_<40){//Round 21~40
					sha_f=tem1^tem2^tem3;
					sha_k=0x6ED9EBA1;
				}else if (j_<60){//Round 41~60
					sha_f=(tem1&tem2)|(tem1&tem3)|(tem2&tem3);
					sha_k=0x8F1BBCDC;
				}else{//Round 61~80
					sha_f=tem1^tem2^tem3;
					sha_k=0xCA62C1D6;
				}
				temp=safeadd(leftr(tem0,5),safeadd(sha_f,safeadd(tem4,safeadd(sha_k,block64[j_]))));//杂凑运算
				tem4=tem3;
				tem3=tem2;
				tem2=leftr(tem1,30);
				tem1=tem0;
				tem0=temp;
			}
			h0=safeadd(h0,tem0);//Add
			h1=safeadd(h1,tem1);
			h2=safeadd(h2,tem2);
			h3=safeadd(h3,tem3);
			h4=safeadd(h4,tem4);
		}
		return bi2lex(h0)+bi2lex(h1)+bi2lex(h2)+bi2lex(h3)+bi2lex(h4);
	}	
	pv.txt2ary=function (txt){//Text convert to byte stream encode with utf-8
		var codeary=Array();
		var cc=0;
		var ucode=0;
		var ufcode,i,j;
		for (i=0;i<txt.length;i++){
			ucode=txt.charCodeAt(i);
			ufcode=pv.ucs2utf8(ucode);
			for (j=1;j<=ufcode[0];j++){
				codeary[cc++]=ufcode[j];
			}
		}
		return codeary;
	}
	pv.ucs2utf8=function (uc){ //Unicode character encode to utf-8
		var carray=Array();
		if (uc>=0 && uc<=0x7f){ //ASCII
			carray[0]=1;
			carray[1]=uc;
			return carray;
		}
		else if (uc>=0x80 && uc<=0x7ff){ //2Byte UTF 
			carray[0]=2;
			carray[1]=0xc0|(uc>>>6);
			carray[2]=0x80|(uc&0x3f);
			return carray;
		}
		else if ((uc>=0x800 && uc<=0xd7ff) || (uc>=0xe000 && uc<=0xffff)){ //3Byte UTF
			carray[0]=3;
			carray[1]=0xe0|(uc>>>12);
			carray[2]=0x80|((uc>>>6)&0x3f);
			carray[3]=0x80|(uc&0x3f);
			return carray;
		}
		else if (uc>=0x10000 && uc<=0x10ffff){ //4Byte UTF
			carray[0]=4;
			carray[1]=0xf0|(uc>>>18);
			carray[2]=0x80|((uc>>>12)&0x3f);
			carray[3]=0x80|((uc>>>6)&0x3f);
			carray[4]=0x80|(uc&0x3f);
			return carray;
		}
		else{ //None UTF
			return null;
		}
	}
	var safeadd=function (A,B){//
		var ladd=(A&0xffff)+(B&0xffff);
		var hadd=(A>>>16)+(B>>>16)+(ladd>>>16);
		return ((ladd&0xffff)|(hadd<<16));
	}
	var le2lex=function(A){//Little endian integer to hex
		var d2e=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
		return d2e[(A>>4)&0xf]+d2e[A&0xf]+d2e[(A>>12)&0xf]+d2e[(A>>8)&0xf]+
			d2e[(A>>20)&0xf]+d2e[(A>>16)&0xf]+d2e[(A>>28)&0xf]+d2e[(A>>24)&0xf];
	}
	var bi2lex=function(A){//Big endian integer to hex
		var d2e=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
		return d2e[(A>>28)&0xf]+d2e[(A>>24)&0xf]+d2e[(A>>20)&0xf]+d2e[(A>>16)&0xf]+
			d2e[(A>>12)&0xf]+d2e[(A>>8)&0xf]+d2e[(A>>4)&0xf]+d2e[A&0xf];
	}
	var leftr=function(v,x){//
		return (v<<x)|(v>>>(32-x));
	}
    var rightr=function(v,x){//
		return (v>>>x)|(v<<(32-x));
	}
};

export default new Hash_txt();