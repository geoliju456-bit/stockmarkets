

const TIMEZONES = {

  "Asia/Kabul": { city: "Kabul", country: "Afghanistan", region: "Asia" },
  "Asia/Yerevan": { city: "Yerevan", country: "Armenia", region: "Asia" },
  "Asia/Baku": { city: "Baku", country: "Azerbaijan", region: "Asia" },
  "Asia/Dhaka": { city: "Dhaka", country: "Bangladesh", region: "Asia" },
  "Asia/Thimphu": { city: "Thimphu", country: "Bhutan", region: "Asia" },
  "Asia/Brunei": { city: "Bandar Seri Begawan", country: "Brunei", region: "Asia" },
  "Asia/Phnom_Penh": { city: "Phnom Penh", country: "Cambodia", region: "Asia" },
  "Asia/Shanghai": { city: "Shanghai", country: "China", region: "Asia" },
  "Asia/Urumqi": { city: "Urumqi", country: "China", region: "Asia" },
  "Asia/Hong_Kong": { city: "Hong Kong", country: "China", region: "Asia" },
  "Asia/Macau": { city: "Macau", country: "China", region: "Asia" },
  "Asia/Tbilisi": { city: "Tbilisi", country: "Georgia", region: "Asia" },
  "Asia/Jakarta": { city: "Jakarta", country: "Indonesia", region: "Asia" },
  "Asia/Pontianak": { city: "Pontianak", country: "Indonesia", region: "Asia" },
  "Asia/Makassar": { city: "Makassar", country: "Indonesia", region: "Asia" },
  "Asia/Jayapura": { city: "Jayapura", country: "Indonesia", region: "Asia" },
  "Asia/Tehran": { city: "Tehran", country: "Iran", region: "Asia" },
  "Asia/Baghdad": { city: "Baghdad", country: "Iraq", region: "Asia" },
  "Asia/Jerusalem": { city: "Jerusalem", country: "Israel", region: "Asia" },
  "Asia/Tokyo": { city: "Tokyo", country: "Japan", region: "Asia" },
  "Asia/Amman": { city: "Amman", country: "Jordan", region: "Asia" },
  "Asia/Almaty": { city: "Almaty", country: "Kazakhstan", region: "Asia" },
  "Asia/Aqtau": { city: "Aktau", country: "Kazakhstan", region: "Asia" },
  "Asia/Aqtobe": { city: "Aktobe", country: "Kazakhstan", region: "Asia" },
  "Asia/Oral": { city: "Oral", country: "Kazakhstan", region: "Asia" },
  "Asia/Bishkek": { city: "Bishkek", country: "Kyrgyzstan", region: "Asia" },
  "Asia/Vientiane": { city: "Vientiane", country: "Laos", region: "Asia" },
  "Asia/Kuala_Lumpur": { city: "Kuala Lumpur", country: "Malaysia", region: "Asia" },
  "Asia/Kuching": { city: "Kuching", country: "Malaysia", region: "Asia" },
  "Asia/Ulaanbaatar": { city: "Ulaanbaatar", country: "Mongolia", region: "Asia" },
  "Asia/Hovd": { city: "Hovd", country: "Mongolia", region: "Asia" },
  "Asia/Yangon": { city: "Yangon", country: "Myanmar", region: "Asia" },
  "Asia/Kathmandu": { city: "Kathmandu", country: "Nepal", region: "Asia" },
  "Asia/Pyongyang": { city: "Pyongyang", country: "North Korea", region: "Asia" },
  "Asia/Karachi": { city: "Karachi", country: "Pakistan", region: "Asia" },
  "Asia/Manila": { city: "Manila", country: "Philippines", region: "Asia" },
  "Asia/Singapore": { city: "Singapore", country: "Singapore", region: "Asia" },
  "Asia/Seoul": { city: "Seoul", country: "South Korea", region: "Asia" },
  "Asia/Colombo": { city: "Colombo", country: "Sri Lanka", region: "Asia" },
  "Asia/Taipei": { city: "Taipei", country: "Taiwan", region: "Asia" },
  "Asia/Dushanbe": { city: "Dushanbe", country: "Tajikistan", region: "Asia" },
  "Asia/Bangkok": { city: "Bangkok", country: "Thailand", region: "Asia" },
  "Asia/Dili": { city: "Dili", country: "Timor-Leste", region: "Asia" },
  "Asia/Ashgabat": { city: "Ashgabat", country: "Turkmenistan", region: "Asia" },
  "Asia/Tashkent": { city: "Tashkent", country: "Uzbekistan", region: "Asia" },
  "Asia/Ho_Chi_Minh": { city: "Ho Chi Minh City", country: "Vietnam", region: "Asia" },

  "Asia/Dubai": { city: "Dubai", country: "United Arab Emirates", region: "Middle East" },
  "Asia/Abu_Dhabi": { city: "Abu Dhabi", country: "United Arab Emirates", region: "Middle East" },
  "Asia/Riyadh": { city: "Riyadh", country: "Saudi Arabia", region: "Middle East" },
  "Asia/Qatar": { city: "Doha", country: "Qatar", region: "Middle East" },
  "Asia/Kuwait": { city: "Kuwait City", country: "Kuwait", region: "Middle East" },
  "Asia/Bahrain": { city: "Manama", country: "Bahrain", region: "Middle East" },
  "Asia/Muscat": { city: "Muscat", country: "Oman", region: "Middle East" },
  "Asia/Beirut": { city: "Beirut", country: "Lebanon", region: "Middle East" },
  "Asia/Famagusta": { city: "Famagusta", country: "Cyprus", region: "Asia" },
  "Asia/Nicosia": { city: "Nicosia", country: "Cyprus", region: "Asia" },

  "Asia/Hebron": { city: "Hebron", country: "Palestine", region: "Asia" },
  "Asia/Gaza": { city: "Gaza", country: "Palestine", region: "Asia" },

  "Asia/Krasnoyarsk": { city: "Krasnoyarsk", country: "Russia", region: "Asia" },
  "Asia/Irkutsk": { city: "Irkutsk", country: "Russia", region: "Asia" },
  "Asia/Yakutsk": { city: "Yakutsk", country: "Russia", region: "Asia" },
"Asia/Vladivostok": { city: "Vladivostok", country: "Russia", region: "Asia" },
"Asia/Magadan": { city: "Magadan", country: "Russia", region: "Asia" },
"Asia/Sakhalin": { city: "Yuzhno-Sakhalinsk", country: "Russia", region: "Asia" },
"Asia/Kamchatka": { city: "Petropavlovsk-Kamchatsky", country: "Russia", region: "Asia" },
"Asia/Kolkata": { city: "Kolkata", country: "India", region: "Asia" },
"Asia/Delhi": {city: "Delhi",country: "India", region: "Asia",aliasOf: "Asia/Kolkata"},
"Asia/Mumbai": {city: "Mumbai",country: "India",region: "Asia",aliasOf: "Asia/Kolkata"},
"Asia/Chennai": {city: "Chennai",country: "India",region: "Asia",aliasOf: "Asia/Kolkata"},

"Asia/Chita": { city: "Chita", country: "Russia", region: "Asia" },
"Asia/Novosibirsk": { city: "Novosibirsk", country: "Russia", region: "Asia" },
"Asia/Omsk": { city: "Omsk", country: "Russia", region: "Asia" },

"Asia/Aden": { city: "Aden", country: "Yemen", region: "Middle East" },

"Asia/Choibalsan": { city: "Choibalsan", country: "Mongolia", region: "Asia" },

"Asia/Srednekolymsk": { city: "Srednekolymsk", country: "Russia", region: "Asia" },

"Asia/Khandyga": { city: "Khandyga", country: "Russia", region: "Asia" },

"Asia/Ust-Nera": { city: "Ust-Nera", country: "Russia", region: "Asia" },

"Asia/Barnaul": { city: "Barnaul", country: "Russia", region: "Asia" },

"Asia/Tomsk": { city: "Tomsk", country: "Russia", region: "Asia" },
"Europe/London": { city: "London", country: "United Kingdom", region: "Europe" },
"Europe/Dublin": { city: "Dublin", country: "Ireland", region: "Europe" },

"Europe/Paris": { city: "Paris", country: "France", region: "Europe" },
"Europe/Berlin": { city: "Berlin", country: "Germany", region: "Europe" },
"Europe/Madrid": { city: "Madrid", country: "Spain", region: "Europe" },
"Europe/Rome": { city: "Rome", country: "Italy", region: "Europe" },
"Europe/Amsterdam": { city: "Amsterdam", country: "Netherlands", region: "Europe" },
"Europe/Brussels": { city: "Brussels", country: "Belgium", region: "Europe" },
"Europe/Vienna": { city: "Vienna", country: "Austria", region: "Europe" },
"Europe/Zurich": { city: "Zurich", country: "Switzerland", region: "Europe" },
"Europe/Stockholm": { city: "Stockholm", country: "Sweden", region: "Europe" },
"Europe/Oslo": { city: "Oslo", country: "Norway", region: "Europe" },
"Europe/Copenhagen": { city: "Copenhagen", country: "Denmark", region: "Europe" },
"Europe/Helsinki": { city: "Helsinki", country: "Finland", region: "Europe" },
"Europe/Warsaw": { city: "Warsaw", country: "Poland", region: "Europe" },
"Europe/Prague": { city: "Prague", country: "Czech Republic", region: "Europe" },
"Europe/Budapest": { city: "Budapest", country: "Hungary", region: "Europe" },
"Europe/Bratislava": { city: "Bratislava", country: "Slovakia", region: "Europe" },
"Europe/Ljubljana": { city: "Ljubljana", country: "Slovenia", region: "Europe" },
"Europe/Zagreb": { city: "Zagreb", country: "Croatia", region: "Europe" },
"Europe/Sarajevo": { city: "Sarajevo", country: "Bosnia and Herzegovina", region: "Europe" },
"Europe/Belgrade": { city: "Belgrade", country: "Serbia", region: "Europe" },
"Europe/Podgorica": { city: "Podgorica", country: "Montenegro", region: "Europe" },
"Europe/Skopje": { city: "Skopje", country: "North Macedonia", region: "Europe" },
"Europe/Tirane": { city: "Tirana", country: "Albania", region: "Europe" },

"Europe/Athens": { city: "Athens", country: "Greece", region: "Europe" },
"Europe/Sofia": { city: "Sofia", country: "Bulgaria", region: "Europe" },
"Europe/Bucharest": { city: "Bucharest", country: "Romania", region: "Europe" },
"Europe/Chisinau": { city: "Chișinău", country: "Moldova", region: "Europe" },

"Europe/Kiev": { city: "Kyiv", country: "Ukraine", region: "Europe" },
"Europe/Uzhgorod": { city: "Uzhhorod", country: "Ukraine", region: "Europe" },
"Europe/Zaporozhye": { city: "Zaporizhzhia", country: "Ukraine", region: "Europe" },

"Europe/Riga": { city: "Riga", country: "Latvia", region: "Europe" },
"Europe/Tallinn": { city: "Tallinn", country: "Estonia", region: "Europe" },
"Europe/Vilnius": { city: "Vilnius", country: "Lithuania", region: "Europe" },

"Europe/Reykjavik": { city: "Reykjavik", country: "Iceland", region: "Europe" },

"Europe/Andorra": { city: "Andorra la Vella", country: "Andorra", region: "Europe" },
"Europe/Monaco": { city: "Monaco", country: "Monaco", region: "Europe" },
"Europe/San_Marino": { city: "San Marino", country: "San Marino", region: "Europe" },
"Europe/Vatican": { city: "Vatican City", country: "Vatican City", region: "Europe" },
"Europe/Malta": { city: "Valletta", country: "Malta", region: "Europe" },
"Europe/Gibraltar": { city: "Gibraltar", country: "Gibraltar", region: "Europe" },

"Europe/Moscow": { city: "Moscow", country: "Russia", region: "Europe" },
"Europe/Kaliningrad": { city: "Kaliningrad", country: "Russia", region: "Europe" },
"Europe/Volgograd": { city: "Volgograd", country: "Russia", region: "Europe" },

"Europe/Istanbul": { city: "Istanbul", country: "Turkey", region: "Europe" },

"America/New_York": { city: "New York", country: "United States", region: "North America" },
"America/Detroit": { city: "Detroit", country: "United States", region: "North America" },
"America/Kentucky/Louisville": { city: "Louisville", country: "United States", region: "North America" },
"America/Kentucky/Monticello": { city: "Monticello", country: "United States", region: "North America" },
"America/Indiana/Indianapolis": { city: "Indianapolis", country: "United States", region: "North America" },
"America/Indiana/Vincennes": { city: "Vincennes", country: "United States", region: "North America" },
"America/Indiana/Winamac": { city: "Winamac", country: "United States", region: "North America" },
"America/Indiana/Marengo": { city: "Marengo", country: "United States", region: "North America" },
"America/Indiana/Petersburg": { city: "Petersburg", country: "United States", region: "North America" },
"America/Indiana/Vevay": { city: "Vevay", country: "United States", region: "North America" },

"America/Chicago": { city: "Chicago", country: "United States", region: "North America" },
"America/Indiana/Tell_City": { city: "Tell City", country: "United States", region: "North America" },
"America/Menominee": { city: "Menominee", country: "United States", region: "North America" },

"America/Denver": { city: "Denver", country: "United States", region: "North America" },
"America/Boise": { city: "Boise", country: "United States", region: "North America" },

"America/Phoenix": { city: "Phoenix", country: "United States", region: "North America" },

"America/Los_Angeles": { city: "Los Angeles", country: "United States", region: "North America" },

"America/Anchorage": { city: "Anchorage", country: "United States", region: "North America" },
"America/Juneau": { city: "Juneau", country: "United States", region: "North America" },
"America/Sitka": { city: "Sitka", country: "United States", region: "North America" },
"America/Metlakatla": { city: "Metlakatla", country: "United States", region: "North America" },
"America/Yakutat": { city: "Yakutat", country: "United States", region: "North America" },
"America/Nome": { city: "Nome", country: "United States", region: "North America" },
"America/Adak": { city: "Adak", country: "United States", region: "North America" },

"America/Halifax": { city: "Halifax", country: "Canada", region: "North America" },
"America/Glace_Bay": { city: "Glace Bay", country: "Canada", region: "North America" },
"America/Moncton": { city: "Moncton", country: "Canada", region: "North America" },
"America/Goose_Bay": { city: "Goose Bay", country: "Canada", region: "North America" },

"America/Toronto": { city: "Toronto", country: "Canada", region: "North America" },
"America/Nipigon": { city: "Nipigon", country: "Canada", region: "North America" },
"America/Thunder_Bay": { city: "Thunder Bay", country: "Canada", region: "North America" },
"America/Iqaluit": { city: "Iqaluit", country: "Canada", region: "North America" },

"America/Winnipeg": { city: "Winnipeg", country: "Canada", region: "North America" },
"America/Regina": { city: "Regina", country: "Canada", region: "North America" },
"America/Swift_Current": { city: "Swift Current", country: "Canada", region: "North America" },

"America/Edmonton": { city: "Edmonton", country: "Canada", region: "North America" },
"America/Cambridge_Bay": { city: "Cambridge Bay", country: "Canada", region: "North America" },
"America/Yellowknife": { city: "Yellowknife", country: "Canada", region: "North America" },
"America/Inuvik": { city: "Inuvik", country: "Canada", region: "North America" },
"America/Creston": { city: "Creston", country: "Canada", region: "North America" },

"America/Vancouver": { city: "Vancouver", country: "Canada", region: "North America" },
"America/Whitehorse": { city: "Whitehorse", country: "Canada", region: "North America" },
"America/Dawson": { city: "Dawson", country: "Canada", region: "North America" },

"America/St_Johns": { city: "St. John's", country: "Canada", region: "North America" },

"America/Mexico_City": { city: "Mexico City", country: "Mexico", region: "North America" },
"America/Cancun": { city: "Cancún", country: "Mexico", region: "North America" },
"America/Merida": { city: "Mérida", country: "Mexico", region: "North America" },
"America/Monterrey": { city: "Monterrey", country: "Mexico", region: "North America" },
"America/Matamoros": { city: "Matamoros", country: "Mexico", region: "North America" },
"America/Chihuahua": { city: "Chihuahua", country: "Mexico", region: "North America" },
"America/Hermosillo": { city: "Hermosillo", country: "Mexico", region: "North America" },
"America/Mazatlan": { city: "Mazatlán", country: "Mexico", region: "North America" },
"America/Ojinaga": { city: "Ojinaga", country: "Mexico", region: "North America" },
"America/Tijuana": { city: "Tijuana", country: "Mexico", region: "North America" },
"America/Bahia_Banderas": { city: "Bahía de Banderas", country: "Mexico", region: "North America" },

"America/Godthab": { city: "Nuuk", country: "Greenland", region: "North America" },
"America/Danmarkshavn": { city: "Danmarkshavn", country: "Greenland", region: "North America" },
"America/Scoresbysund": { city: "Ittoqqortoormiit", country: "Greenland", region: "North America" },
"America/Thule": { city: "Qaanaaq", country: "Greenland", region: "North America" },

"America/Guatemala": { city: "Guatemala City", country: "Guatemala", region: "North America" },
"America/Belize": { city: "Belmopan", country: "Belize", region: "North America" },
"America/El_Salvador": { city: "San Salvador", country: "El Salvador", region: "North America" },
"America/Honduras": { city: "Tegucigalpa", country: "Honduras", region: "North America" },
"America/Managua": { city: "Managua", country: "Nicaragua", region: "North America" },
"America/Costa_Rica": { city: "San José", country: "Costa Rica", region: "North America" },
"America/Panama": { city: "Panama City", country: "Panama", region: "North America" },

"America/Argentina/Buenos_Aires": { city: "Buenos Aires", country: "Argentina", region: "South America" },
"America/Argentina/Cordoba": { city: "Córdoba", country: "Argentina", region: "South America" },
"America/Argentina/Rosario": { city: "Rosario", country: "Argentina", region: "South America" },
"America/Argentina/Mendoza": { city: "Mendoza", country: "Argentina", region: "South America" },
"America/Argentina/La_Rioja": { city: "La Rioja", country: "Argentina", region: "South America" },
"America/Argentina/San_Juan": { city: "San Juan", country: "Argentina", region: "South America" },
"America/Argentina/San_Luis": { city: "San Luis", country: "Argentina", region: "South America" },
"America/Argentina/Catamarca": { city: "Catamarca", country: "Argentina", region: "South America" },
"America/Argentina/Tucuman": { city: "San Miguel de Tucumán", country: "Argentina", region: "South America" },
"America/Argentina/Jujuy": { city: "San Salvador de Jujuy", country: "Argentina", region: "South America" },
"America/Argentina/Salta": { city: "Salta", country: "Argentina", region: "South America" },
"America/Argentina/Ushuaia": { city: "Ushuaia", country: "Argentina", region: "South America" },

"America/Sao_Paulo": { city: "São Paulo", country: "Brazil", region: "South America" },
"America/Rio_Branco": { city: "Rio Branco", country: "Brazil", region: "South America" },
"America/Porto_Velho": { city: "Porto Velho", country: "Brazil", region: "South America" },
"America/Manaus": { city: "Manaus", country: "Brazil", region: "South America" },
"America/Boa_Vista": { city: "Boa Vista", country: "Brazil", region: "South America" },
"America/Cuiaba": { city: "Cuiabá", country: "Brazil", region: "South America" },
"America/Campo_Grande": { city: "Campo Grande", country: "Brazil", region: "South America" },
"America/Belem": { city: "Belém", country: "Brazil", region: "South America" },
"America/Maceio": { city: "Maceió", country: "Brazil", region: "South America" },
"America/Recife": { city: "Recife", country: "Brazil", region: "South America" },
"America/Fortaleza": { city: "Fortaleza", country: "Brazil", region: "South America" },
"America/Araguaina": { city: "Araguaína", country: "Brazil", region: "South America" },
"America/Santarem": { city: "Santarém", country: "Brazil", region: "South America" },
"America/Noronha": { city: "Fernando de Noronha", country: "Brazil", region: "South America" },

"America/Santiago": { city: "Santiago", country: "Chile", region: "South America" },
"America/Punta_Arenas": { city: "Punta Arenas", country: "Chile", region: "South America" },
"America/Easter": { city: "Easter Island", country: "Chile", region: "South America" },

"America/Bogota": { city: "Bogotá", country: "Colombia", region: "South America" },

"America/Lima": { city: "Lima", country: "Peru", region: "South America" },

"America/Caracas": { city: "Caracas", country: "Venezuela", region: "South America" },

"America/La_Paz": { city: "La Paz", country: "Bolivia", region: "South America" },

"America/Asuncion": { city: "Asunción", country: "Paraguay", region: "South America" },

"America/Montevideo": { city: "Montevideo", country: "Uruguay", region: "South America" },

"America/Guayaquil": { city: "Guayaquil", country: "Ecuador", region: "South America" },
"America/Galapagos": { city: "Galápagos", country: "Ecuador", region: "South America" },

"America/Guyana": { city: "Georgetown", country: "Guyana", region: "South America" },

"America/Paramaribo": { city: "Paramaribo", country: "Suriname", region: "South America" },

"America/Cayenne": { city: "Cayenne", country: "French Guiana", region: "South America" },

"America/Stanley": { city: "Stanley", country: "Falkland Islands", region: "South America" },

"Africa/Abidjan": { city: "Abidjan", country: "Côte d’Ivoire", region: "Africa" },
"Africa/Accra": { city: "Accra", country: "Ghana", region: "Africa" },
"Africa/Addis_Ababa": { city: "Addis Ababa", country: "Ethiopia", region: "Africa" },
"Africa/Algiers": { city: "Algiers", country: "Algeria", region: "Africa" },
"Africa/Asmara": { city: "Asmara", country: "Eritrea", region: "Africa" },
"Africa/Bamako": { city: "Bamako", country: "Mali", region: "Africa" },
"Africa/Bangui": { city: "Bangui", country: "Central African Republic", region: "Africa" },
"Africa/Banjul": { city: "Banjul", country: "Gambia", region: "Africa" },
"Africa/Bissau": { city: "Bissau", country: "Guinea-Bissau", region: "Africa" },
"Africa/Blantyre": { city: "Blantyre", country: "Malawi", region: "Africa" },
"Africa/Brazzaville": { city: "Brazzaville", country: "Republic of the Congo", region: "Africa" },
"Africa/Bujumbura": { city: "Bujumbura", country: "Burundi", region: "Africa" },
"Africa/Cairo": { city: "Cairo", country: "Egypt", region: "Africa" },
"Africa/Casablanca": { city: "Casablanca", country: "Morocco", region: "Africa" },
"Africa/Ceuta": { city: "Ceuta", country: "Spain (Africa)", region: "Africa" },
"Africa/Conakry": { city: "Conakry", country: "Guinea", region: "Africa" },
"Africa/Dakar": { city: "Dakar", country: "Senegal", region: "Africa" },
"Africa/Dar_es_Salaam": { city: "Dar es Salaam", country: "Tanzania", region: "Africa" },
"Africa/Djibouti": { city: "Djibouti", country: "Djibouti", region: "Africa" },
"Africa/Douala": { city: "Douala", country: "Cameroon", region: "Africa" },
"Africa/El_Aaiun": { city: "El Aaiún", country: "Western Sahara", region: "Africa" },
"Africa/Freetown": { city: "Freetown", country: "Sierra Leone", region: "Africa" },
"Africa/Gaborone": { city: "Gaborone", country: "Botswana", region: "Africa" },
"Africa/Harare": { city: "Harare", country: "Zimbabwe", region: "Africa" },
"Africa/Johannesburg": { city: "Johannesburg", country: "South Africa", region: "Africa" },
"Africa/Juba": { city: "Juba", country: "South Sudan", region: "Africa" },
"Africa/Kampala": { city: "Kampala", country: "Uganda", region: "Africa" },
"Africa/Khartoum": { city: "Khartoum", country: "Sudan", region: "Africa" },
"Africa/Kigali": { city: "Kigali", country: "Rwanda", region: "Africa" },
"Africa/Kinshasa": { city: "Kinshasa", country: "Democratic Republic of the Congo", region: "Africa" },
"Africa/Lagos": { city: "Lagos", country: "Nigeria", region: "Africa" },
"Africa/Libreville": { city: "Libreville", country: "Gabon", region: "Africa" },
"Africa/Lome": { city: "Lomé", country: "Togo", region: "Africa" },
"Africa/Luanda": { city: "Luanda", country: "Angola", region: "Africa" },
"Africa/Lubumbashi": { city: "Lubumbashi", country: "Democratic Republic of the Congo", region: "Africa" },
"Africa/Lusaka": { city: "Lusaka", country: "Zambia", region: "Africa" },
"Africa/Malabo": { city: "Malabo", country: "Equatorial Guinea", region: "Africa" },
"Africa/Maputo": { city: "Maputo", country: "Mozambique", region: "Africa" },
"Africa/Maseru": { city: "Maseru", country: "Lesotho", region: "Africa" },
"Africa/Mbabane": { city: "Mbabane", country: "Eswatini", region: "Africa" },
"Africa/Mogadishu": { city: "Mogadishu", country: "Somalia", region: "Africa" },
"Africa/Monrovia": { city: "Monrovia", country: "Liberia", region: "Africa" },
"Africa/Nairobi": { city: "Nairobi", country: "Kenya", region: "Africa" },
"Africa/Ndjamena": { city: "N’Djamena", country: "Chad", region: "Africa" },
"Africa/Niamey": { city: "Niamey", country: "Niger", region: "Africa" },
"Africa/Nouakchott": { city: "Nouakchott", country: "Mauritania", region: "Africa" },
"Africa/Ouagadougou": { city: "Ouagadougou", country: "Burkina Faso", region: "Africa" },
"Africa/Porto-Novo": { city: "Porto-Novo", country: "Benin", region: "Africa" },
"Africa/Sao_Tome": { city: "São Tomé", country: "São Tomé and Príncipe", region: "Africa" },
"Africa/Tripoli": { city: "Tripoli", country: "Libya", region: "Africa" },
"Africa/Tunis": { city: "Tunis", country: "Tunisia", region: "Africa" },
"Africa/Windhoek": { city: "Windhoek", country: "Namibia", region: "Africa" },

"Australia/Adelaide": { city: "Adelaide", country: "Australia", region: "Oceania" },
"Australia/Brisbane": { city: "Brisbane", country: "Australia", region: "Oceania" },
"Australia/Broken_Hill": { city: "Broken Hill", country: "Australia", region: "Oceania" },
"Australia/Darwin": { city: "Darwin", country: "Australia", region: "Oceania" },
"Australia/Eucla": { city: "Eucla", country: "Australia", region: "Oceania" },
"Australia/Hobart": { city: "Hobart", country: "Australia", region: "Oceania" },
"Australia/Lindeman": { city: "Lindeman", country: "Australia", region: "Oceania" },
"Australia/Lord_Howe": { city: "Lord Howe Island", country: "Australia", region: "Oceania" },
"Australia/Melbourne": { city: "Melbourne", country: "Australia", region: "Oceania" },
"Australia/Perth": { city: "Perth", country: "Australia", region: "Oceania" },
"Australia/Sydney": { city: "Sydney", country: "Australia", region: "Oceania" },
"Pacific/Auckland": { city: "Auckland", country: "New Zealand", region: "Oceania" },
"Pacific/Chatham": { city: "Chatham Islands", country: "New Zealand", region: "Oceania" },
"Pacific/Apia": { city: "Apia", country: "Samoa", region: "Oceania" },
"Pacific/Bougainville": { city: "Bougainville", country: "Papua New Guinea", region: "Oceania" },
"Pacific/Chuuk": { city: "Chuuk", country: "Micronesia", region: "Oceania" },
"Pacific/Easter": { city: "Easter Island", country: "Chile", region: "Oceania" },
"Pacific/Efate": { city: "Port Vila", country: "Vanuatu", region: "Oceania" },
"Pacific/Fakaofo": { city: "Fakaofo", country: "Tokelau", region: "Oceania" },
"Pacific/Fiji": { city: "Suva", country: "Fiji", region: "Oceania" },
"Pacific/Funafuti": { city: "Funafuti", country: "Tuvalu", region: "Oceania" },
"Pacific/Galapagos": { city: "Galapagos", country: "Ecuador", region: "Oceania" },
"Pacific/Gambier": { city: "Gambier Islands", country: "French Polynesia", region: "Oceania" },
"Pacific/Guadalcanal": { city: "Honiara", country: "Solomon Islands", region: "Oceania" },
"Pacific/Guam": { city: "Hagåtña", country: "Guam", region: "Oceania" },
"Pacific/Honolulu": { city: "Honolulu", country: "United States", region: "Oceania" },
"Pacific/Kanton": { city: "Kanton Island", country: "Kiribati", region: "Oceania" },
"Pacific/Kiritimati": { city: "Kiritimati", country: "Kiribati", region: "Oceania" },
"Pacific/Kosrae": { city: "Kosrae", country: "Micronesia", region: "Oceania" },
"Pacific/Kwajalein": { city: "Kwajalein", country: "Marshall Islands", region: "Oceania" },
"Pacific/Majuro": { city: "Majuro", country: "Marshall Islands", region: "Oceania" },
"Pacific/Marquesas": { city: "Marquesas Islands", country: "French Polynesia", region: "Oceania" },
"Pacific/Nauru": { city: "Yaren", country: "Nauru", region: "Oceania" },
"Pacific/Niue": { city: "Alofi", country: "Niue", region: "Oceania" },
"Pacific/Norfolk": { city: "Norfolk Island", country: "Australia", region: "Oceania" },
"Pacific/Noumea": { city: "Nouméa", country: "New Caledonia", region: "Oceania" },
"Pacific/Pago_Pago": { city: "Pago Pago", country: "American Samoa", region: "Oceania" },
"Pacific/Palau": { city: "Ngerulmud", country: "Palau", region: "Oceania" },
"Pacific/Pitcairn": { city: "Adamstown", country: "Pitcairn Islands", region: "Oceania" },
"Pacific/Pohnpei": { city: "Pohnpei", country: "Micronesia", region: "Oceania" },
"Pacific/Port_Moresby": { city: "Port Moresby", country: "Papua New Guinea", region: "Oceania" },
"Pacific/Rarotonga": { city: "Rarotonga", country: "Cook Islands", region: "Oceania" },
"Pacific/Tahiti": { city: "Papeete", country: "French Polynesia", region: "Oceania" },
"Pacific/Tarawa": { city: "Tarawa", country: "Kiribati", region: "Oceania" },
"Pacific/Tongatapu": { city: "Nukuʻalofa", country: "Tonga", region: "Oceania" },
"Pacific/Wake": { city: "Wake Island", country: "United States", region: "Oceania" },
"Pacific/Wallis": { city: "Mata-Utu", country: "Wallis and Futuna", region: "Oceania" },
"Antarctica/Casey": { city: "Casey Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Davis": { city: "Davis Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/DumontDUrville": { city: "Dumont d’Urville Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Macquarie": { city: "Macquarie Island", country: "Australia (Antarctic)", region: "Antarctica" },
"Antarctica/Mawson": { city: "Mawson Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/McMurdo": { city: "McMurdo Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Palmer": { city: "Palmer Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Rothera": { city: "Rothera Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Syowa": { city: "Syowa Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Troll": { city: "Troll Station", country: "Antarctica", region: "Antarctica" },
"Antarctica/Vostok": { city: "Vostok Station", country: "Antarctica", region: "Antarctica" }

};

/* ==========================================
   TIMEZONE METADATA
   Used by time-conversion.js
========================================== */

/* ================= PUBLIC HELPERS ================= */

/**
 * Always returns a SAFE object
 */
function getTimezoneInfo(iana) {
  if (!iana || typeof iana !== "string") {
    return {
      city: "Unknown",
      country: "Unknown",
      region: "Unknown",
      path: "Unknown / Unknown / Unknown"
    };
  }

  const tz = TIMEZONES[iana];

  if (!tz) {
    const parts = iana.split("/");
    const city = parts[1]?.replace(/_/g, " ") || iana;
    const region = parts[0] || "Unknown";

    return {
      city,
      country: "Unknown",
      region,
      path: `${city} / Unknown / ${region}`
    };
  }

  return {
    city: tz.city,
    country: tz.country,
    region: tz.region,
    path: `${tz.city} / ${tz.country} / ${tz.region}`
  };
}

/**
 * Used in result table headings
 */
function getTimezonePath(iana) {
  return getTimezoneInfo(iana).path;
}

/* ================= GLOBAL EXPORT ================= */
/* ⚠️ DO NOT REMOVE — USED BY time-conversion.js */

window.Timezones = {
  getTimezoneInfo,
  getTimezonePath,
  DATA: TIMEZONES
};

/* REQUIRED GLOBAL EXPORT */
window.TIMEZONES = TIMEZONES;
