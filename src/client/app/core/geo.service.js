(function(){
	'use strict';
	
	angular.module('app.core')
		.factory('geoService', geoService);
		
	geoService.$inject = ['$q'];
	
	function geoService($q) {
		var service = {
			getDistricts: getDistricts,
			getProvinces: getProvinces
		}
		
		return service;
    
		function getDistricts(){
			var q1 = $q.defer();
            
            q1.resolve(districts);
            
            return q1.promise;
		}
		
		function getProvinces(){
			var q2 = $q.defer();
            
            q2.resolve(provinces);
            
            return q2.promise;
		}
	}
	
	var districts = [
  {
    "District":"Bang Bon",
    "Thai":"บางบอน"
  },
  {
    "District":"Bang Kapi",
    "Thai":"บางกะปิ"
  },
  {
    "District":"Bang Khae",
    "Thai":"บางแค"
  },
  {
    "District":"Bang Khen",
    "Thai":"บางเขน"
  },
  {
    "District":"Bang Kho Laem",
    "Thai":"บางคอแหลม"
  },
  {
    "District":"Bang Khun Thian",
    "Thai":"บางขุนเทียน"
  },
  {
    "District":"Bang Na",
    "Thai":"บางนา"
  },
  {
    "District":"Bang Phlat",
    "Thai":"บางพลัด"
  },
  {
    "District":"Bang Rak",
    "Thai":"บางรัก"
  },
  {
    "District":"Bang Sue",
    "Thai":"บางซื่อ"
  },
  {
    "District":"Bangkok Noi",
    "Thai":"บางกอกน้อย"
  },
  {
    "District":"Bangkok Yai",
    "Thai":"บางกอกใหญ่"
  },
  {
    "District":"Bueng Kum",
    "Thai":"บึงกุ่ม"
  },
  {
    "District":"Chatuchak",
    "Thai":"จตุจักร"
  },
  {
    "District":"Chom Thong",
    "Thai":"จอมทอง"
  },
  {
    "District":"Din Daeng",
    "Thai":"ดินแดง"
  },
  {
    "District":"Don Mueang",
    "Thai":"ดอนเมือง"
  },
  {
    "District":"Dusit",
    "Thai":"ดุสิต"
  },
  {
    "District":"Huai Khwang",
    "Thai":"ห้วยขวาง"
  },
  {
    "District":"Khan Na Yao",
    "Thai":"คันนายาว"
  },
  {
    "District":"Khlong Sam Wa",
    "Thai":"คลองสามวา"
  },
  {
    "District":"Khlong San",
    "Thai":"คลองสาน"
  },
  {
    "District":"Khlong Toei",
    "Thai":"คลองเตย"
  },
  {
    "District":"Lak Si",
    "Thai":"หลักสี่"
  },
  {
    "District":"Lat Krabang",
    "Thai":"ลาดกระบัง"
  },
  {
    "District":"Lat Phrao",
    "Thai":"ลาดพร้าว"
  },
  {
    "District":"Min Buri",
    "Thai":"มีนบุรี"
  },
  {
    "District":"Nong Chok",
    "Thai":"หนองจอก"
  },
  {
    "District":"Nong Khaem",
    "Thai":"หนองแขม"
  },
  {
    "District":"Pathum Wan",
    "Thai":"ปทุมวัน"
  },
  {
    "District":"Phasi Charoen",
    "Thai":"ภาษีเจริญ"
  },
  {
    "District":"Phaya Thai",
    "Thai":"พญาไท"
  },
  {
    "District":"Phra Khanong",
    "Thai":"พระโขนง"
  },
  {
    "District":"Phra Nakhon",
    "Thai":"พระนคร"
  },
  {
    "District":"Pom Prap Sattru Phai",
    "Thai":"ป้อมปราบศัตรูพ่าย"
  },
  {
    "District":"Prawet",
    "Thai":"ประเวศ"
  },
  {
    "District":"Rat Burana",
    "Thai":"ราษฎร์บูรณะ"
  },
  {
    "District":"Ratchathewi",
    "Thai":"ราชเทวี"
  },
  {
    "District":"Sai Mai",
    "Thai":"สายไหม"
  },
  {
    "District":"Samphanthawong",
    "Thai":"สัมพันธวงศ์"
  },
  {
    "District":"Saphan Sung",
    "Thai":"สะพานสูง"
  },
  {
    "District":"Sathon",
    "Thai":"สาทร"
  },
  {
    "District":"Suan Luang",
    "Thai":"สวนหลวง"
  },
  {
    "District":"Taling Chan",
    "Thai":"ตลิ่งชัน"
  },
  {
    "District":"Thawi Watthana",
    "Thai":"ทวีวัฒนา"
  },
  {
    "District":"Thon Buri",
    "Thai":"ธนบุรี"
  },
  {
    "District":"Thung Khru",
    "Thai":"ทุ่งครุ"
  },
  {
    "District":"Wang Thonglang",
    "Thai":"วังทองหลาง"
  },
  {
    "District":"Watthana",
    "Thai":"วัฒนา"
  },
  {
    "District":"Yan Nawa",
    "Thai":"ยานนาวา"
  }
];

var provinces = [
  {
    "Province":"Bangkok",
    "Code":"BKK"
  },
  {
    "Province":"Amnat Charoen",
    "Code":"ACR"
  },
  {
    "Province":"Ang Thong",
    "Code":"ATG"
  },
  {
    "Province":"Bueng Kan",
    "Code":"BKN"
  },
  {
    "Province":"Buriram",
    "Code":"BRM"
  },
  {
    "Province":"Chachoengsao",
    "Code":"CCO"
  },
  {
    "Province":"Chainat",
    "Code":"CNT"
  },
  {
    "Province":"Chaiyaphum",
    "Code":"CPM"
  },
  {
    "Province":"Chanthaburi",
    "Code":"CTI"
  },
  {
    "Province":"Chiang Mai",
    "Code":"CMI"
  },
  {
    "Province":"Chiang Rai",
    "Code":"CRI"
  },
  {
    "Province":"Chonburi",
    "Code":"CBI"
  },
  {
    "Province":"Chumphon",
    "Code":"CPN"
  },
  {
    "Province":"Kalasin",
    "Code":"KSN"
  },
  {
    "Province":"Kamphaeng Phet",
    "Code":"KPT"
  },
  {
    "Province":"Kanchanaburi",
    "Code":"KRI"
  },
  {
    "Province":"Khon Kaen",
    "Code":"KKN"
  },
  {
    "Province":"Krabi",
    "Code":"KBI"
  },
  {
    "Province":"Lampang",
    "Code":"LPG"
  },
  {
    "Province":"Lamphun",
    "Code":"LPN"
  },
  {
    "Province":"Loei",
    "Code":"LEI"
  },
  {
    "Province":"Lopburi",
    "Code":"LRI"
  },
  {
    "Province":"Mae Hong Son",
    "Code":"MSN"
  },
  {
    "Province":"Maha Sarakham",
    "Code":"MKM"
  },
  {
    "Province":"Mukdahan",
    "Code":"MDH"
  },
  {
    "Province":"Nakhon Nayok",
    "Code":"NYK"
  },
  {
    "Province":"Nakhon Pathom",
    "Code":"NPT"
  },
  {
    "Province":"Nakhon Phanom",
    "Code":"NPM"
  },
  {
    "Province":"Nakhon Ratchasima",
    "Code":"NMA"
  },
  {
    "Province":"Nakhon Sawan",
    "Code":"NSN"
  },
  {
    "Province":"Nakhon Si Thammarat",
    "Code":"NRT"
  },
  {
    "Province":"Nan",
    "Code":"NAN"
  },
  {
    "Province":"Narathiwat",
    "Code":"NWT"
  },
  {
    "Province":"Nong Bua Lamphu",
    "Code":"NBP"
  },
  {
    "Province":"Nong Khai City",
    "Code":"NKI"
  },
  {
    "Province":"Nonthaburi",
    "Code":"NBI"
  },
  {
    "Province":"Pathum Thani",
    "Code":"PTE"
  },
  {
    "Province":"Pattani",
    "Code":"PTN"
  },
  {
    "Province":"Phang Nga",
    "Code":"PNA"
  },
  {
    "Province":"Phatthalung",
    "Code":"PLG"
  },
  {
    "Province":"Phayao",
    "Code":"PYO"
  },
  {
    "Province":"Phetchabun",
    "Code":"PNB"
  },
  {
    "Province":"Phetchaburi",
    "Code":"PBI"
  },
  {
    "Province":"Phichit",
    "Code":"PCT"
  },
  {
    "Province":"Phitsanulok",
    "Code":"PLK"
  },
  {
    "Province":"Phra Nakhon Si Ayutthaya",
    "Code":"AYA"
  },
  {
    "Province":"Phrae",
    "Code":"PRE"
  },
  {
    "Province":"Phuket",
    "Code":"PKT"
  },
  {
    "Province":"Prachinburi",
    "Code":"PRI"
  },
  {
    "Province":"Prachuap Khiri Khan",
    "Code":"PKN"
  },
  {
    "Province":"Ranong",
    "Code":"RNG"
  },
  {
    "Province":"Ratchaburi",
    "Code":"RBR"
  },
  {
    "Province":"Rayong",
    "Code":"RYG"
  },
  {
    "Province":"Roi Et",
    "Code":"RET"
  },
  {
    "Province":"Sa Kaeo",
    "Code":"SKW"
  },
  {
    "Province":"Sakon Nakhon",
    "Code":"SNK"
  },
  {
    "Province":"Samut Prakan",
    "Code":"SPK"
  },
  {
    "Province":"Samut Sakhon",
    "Code":"SKN"
  },
  {
    "Province":"Samut Songkhram",
    "Code":"SKM"
  },
  {
    "Province":"Saraburi",
    "Code":"SRI"
  },
  {
    "Province":"Satun",
    "Code":"STN"
  },
  {
    "Province":"Sing Buri",
    "Code":"SBR"
  },
  {
    "Province":"Sisaket",
    "Code":"SSK"
  },
  {
    "Province":"Songkhla",
    "Code":"SKA"
  },
  {
    "Province":"Sukhothai",
    "Code":"STI"
  },
  {
    "Province":"Suphan Buri",
    "Code":"SPB"
  },
  {
    "Province":"Surat Thani",
    "Code":"SNI"
  },
  {
    "Province":"Surin",
    "Code":"SRN"
  },
  {
    "Province":"Tak",
    "Code":"TAK"
  },
  {
    "Province":"Trang",
    "Code":"TRG"
  },
  {
    "Province":"Trat",
    "Code":"TRT"
  },
  {
    "Province":"Ubon Ratchathani",
    "Code":"UBN"
  },
  {
    "Province":"Udon Thani",
    "Code":"UDN"
  },
  {
    "Province":"Uthai Thani",
    "Code":"UTI"
  },
  {
    "Province":"Uttaradit",
    "Code":"UTD"
  },
  {
    "Province":"Yala",
    "Code":"YLA"
  },
  {
    "Province":"Yasothon",
    "Code":"YST"
  }
];
	
})();