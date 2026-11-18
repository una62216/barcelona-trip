// ============================================================
// data.js — 旅遊地圖網站「資料檔」。換城市／換行程，只改這個檔案。
// 版面程式在 index.html，通常不用動。
// 欄位說明請看同資料夾的 README.md。
// ============================================================
const CONFIG={
  city:'Barcelona',                        // 附加在 Google 地圖搜尋字串後面
  title:'巴塞隆納行程地圖',                  // 瀏覽器分頁標題
  logoHtml:'Barna<span>Trip</span> 🗺️',    // 左上角 Logo（可含 <span>）
  headerNote:'📍 出發點：Plaça de Catalunya（市中心）｜2027/1/1–1/9', // 頂端說明，公開前請確認不含住宿名稱
  startQuery:'Plaça de Catalunya Barcelona',// 「從出發點」路線的起點（不要寫住宿名稱，除非要公開）
  mapCenter:[41.395,2.17], mapZoom:12, mapZoomAll:11
};
const HOTEL={n:'Plaça de Catalunya',lat:41.3870,lng:2.1700}; // 出發點標記（地圖上的 🏨）
const DAYCOL=['#e63946','#f4a261','#2a9d8f','#264653','#8e44ad','#d35400','#1d8348','#2980b9','#c2185b'];
const DATES=['1/1 週五','1/2 週六','1/3 週日','1/4 週一','1/5 週二','1/6 週三','1/7 週四','1/8 週五','1/9 週六'];

// ===== 確定景點（fixed）=====
const FIX=[
{id:'batllo',hours:"每天約 09:00–22:00，最後入場約 21:00（各來源有 08:30／09:00 起之差異）；1/1 是否照常請查官網",price:"約 €29 起（Blue 票，動態定價，越晚訂越貴；屋頂需 Silver 以上）；與米拉之家合併票約 €55 起",day:1,ord:1,ic:'🐉',n:'巴特由之家',en:'Casa Batlló',lat:41.3916,lng:2.1649,addr:'Passeig de Gràcia 43',
 tags:['預約制','高第'],warn:['國定假日 1/1 開放時間請查官網'],time:'上午 10:00',
 d:'龍背屋頂與海洋色彩外牆，高第代表作之一。',tr:'從市中心步行約 20 分，或 Universitat 搭 L2 一站到 Passeig de Gràcia 再走 2 分。'},
{id:'milà',hours:"每日時間請查 lapedrera.com（最後入場：Essential 約 17:15、Sunset 約 19:00）；2027/1/11–1/17 整週休館，不影響你 1/1–1/9",price:"Essential 網路約 €25／櫃檯約 €29；夜間體驗約 €39",day:1,ord:2,ic:'🪨',n:'米拉之家（採石場）',en:'Casa Milà / La Pedrera',lat:41.3953,lng:2.1618,addr:'Passeig de Gràcia 92',
 tags:['預約制','高第'],warn:['開放時間請查官網'],time:'下午 14:30',
 d:'波浪形石造外觀與屋頂煙囪群。與巴特由之家步行 8 分鐘，同日安排最順。',tr:'沿 Passeig de Gràcia 步行；回程 Diagonal 站 L3/L5。'},
{id:'guell',hours:"冬季約 09:30–17:30，最後入場約 16:30；入場須在票面時段後 30 分鐘內",price:"成人 €18（2026 起由 €10 調漲），需預約時段",day:2,ord:1,ic:'🦎',n:'桂爾公園',en:'Park Güell',lat:41.4145,lng:2.1527,addr:'Carrer d\'Olot 5',
 tags:['成人 €18','需預約時段','高第'],warn:['冬季日落早，建議早場'],time:'上午 09:30',
 d:'馬賽克彩色蜥蜴與長椅，山丘上看全城。',tr:'Plaça Catalunya 搭公車 24 到公園入口（約 25 分）；或 L3 Vallcarca / Lesseps 步行上坡。'},
{id:'sagrada',hours:"冬季約 09:00–18:00，週日 10:30 起；官方 FAQ：1/1 與 1/6 為 09:00–14:00（你 1/2 週六為一般時間）",price:"基本票約 €26（含語音導覽 App）；加塔樓價格各來源 €30–47 不等",day:2,ord:2,ic:'⛪',n:'聖家堂',en:'Sagrada Família',lat:41.4036,lng:2.1744,addr:'Carrer de Mallorca 401',
 tags:['約 €26 起','需預約時段','高第'],warn:['冬季約 9:00–18:00，週日 10:30 起'],time:'下午 15:30（預約日落前入場）',
 d:'2026 為高第逝世百年。建議挑午後入場看彩繪玻璃。',tr:'Universitat 搭 L2 直達 Sagrada Família（約 12 分）。從桂爾公園搭公車/地鐵約 30 分。'},
{id:'fireareis',hours:"去年營業至 21:00（週六與假日前夕至 22:00）；今年日期請以官方公告為準，多數來源寫到 1/6",price:"免費入場，購物小吃自費",day:3,ord:1,ic:'🎄',n:'三王節聖誕市集 Fira de Reis（Gran Via）',en:'Fira de Reis Gran Via',lat:41.382,lng:2.159,addr:'Gran Via de les Corts Catalanes, entre C/ Muntaner 與 C/ Rocafort',
 tags:['聖誕市集','免費入場','約至 1/6'],warn:['2026–27 日期各來源不一，多數寫到 1/6；去年營業至 21:00（週六及假日前夕至 22:00）','1/6 假日可能提早收攤，建議 1/3 或 1/5 前'],time:'1/3 上午接續 Sant Antoni 市集，或傍晚',
 d:'170 多個攤位的傳統三王節市集，賣聖誕飾品、手工藝、糖果與小吃，是你行程期間最方便逛的聖誕市集。',tr:'Universitat 搭 L1 一站到 Rocafort 或 Urgell（距離市中心約 10 分步行）；旁邊就是 Mercat de Sant Antoni，同日一起逛最順。'},
{id:'nadalport',hours:"請看官方公告（僅單一來源寫 11/27–1/6）",price:"免費入場，購物小吃自費",day:8,ord:1,ic:'🎅',n:'港口聖誕市集 Nadal al Port',en:'Nadal al Port · Port Vell',lat:41.3758,lng:2.1815,addr:'Port Vell',
 tags:['聖誕市集','港口海景'],warn:['僅單一來源寫「11/27–1/6」，請出發前確認','位置為概略，請看官網'],time:'1/8 下午接 Maremagnum / 港口空中纜車',
 d:'在 Port Vell 海邊的聖誕市集，可順便逛港口和 Maremagnum。',tr:'L4 Barceloneta 或 L3 Drassanes 步行。'},
{id:'espanyol',hours:"開賽時間尚未公布（TBD）；球場約開賽前 1–1.5 小時開放入場",price:"官方售票日期尚未公布；德比票價高、會員優先，轉售平台約 US$267 起（僅供參考，建議買官方票）",day:3,ord:2,ic:'⚽',n:'皇家西班牙人 vs 巴塞隆納（德比）',en:'RCD Espanyol – FC Barcelona · RCDE Stadium',lat:41.3479,lng:2.0756,addr:'Av. Baix Llobregat 100, Cornellà',
 tags:['1/3 週日 主場','票難買'],warn:['開賽時間尚未公布(TBD)','票務請看 rcdespanyol.com','1/10 對 Betis 在行程之外'],time:'依賽程（TBD）',
 d:'LaLiga 賽程列為 2027/1/3 西班牙人主場對巴薩，是加泰同城德比，氣氛熱烈但票很難買。',tr:'官方：Cornellà Centre 站（Renfe/地鐵 L5）步行約 12 分，或 FGC Cornellà Centre 步行 5 分；公車 67/68。開賽前 1.5 小時出發。',
 link:'https://www.rcdespanyol.com/'},
{id:'montserrat',hours:"大教堂約 08:00–10:30、12:00–18:25；博物館約 10:00–17:45（來源 2026/9）；少年合唱團 Escolania 約 13:00（來源不一，請查官網）",price:"Aeri 纜車單程 €10／來回 €15；Cremallera 齒軌來回約 €15；FGC R5 火車另計；Trans Montserrat 套票各來源 €25.8–€50 不一",day:4,ord:1,ic:'⛰️',n:'聖山 蒙特塞拉特',en:'Montserrat',lat:41.5933,lng:1.8377,addr:'Santa Maria de Montserrat',
 tags:['一日遊','自然公園','世界遺產預備'],warn:['冬季班次請查 FGC / 齒軌或空中纜車官網','週一仍可前往'],time:'08:30 出發 · 約 18:00 回程',
 d:'鋸齒狀山峰、本篤會修道院與黑聖母。可坐 Cremallera 齒軌或 Aeri 纜車上山，再選 Sant Joan 纜車看更高景觀。',tr:'Universitat 搭 L1 約 2–3 站到 Plaça Espanya → FGC R5 往 Manresa：Monistrol 轉齒軌 / Montserrat-Aeri 轉纜車。首班約 8:36，之後約每小時一班。'},
{id:'dali',hours:"週二至週日開放，週一休館（7–8 月每天開）；1/1 休館；冬季約 10:30–18:00（也有來源寫 9:30 起）",price:"成人約 €18–22（官網網路價約 €18.50，各來源不一）",day:5,ord:1,ic:'🎨',n:'達利戲劇博物館',en:'Dalí Theatre-Museum · Figueres',lat:42.2679,lng:2.9609,addr:'Plaça Gala-Salvador Dalí 5, Figueres',
 tags:['一日遊','預約','週二安排'],warn:['1/1 休館；週一是否休館各來源不一，故排在週二','冬季約 10:30–18:00，請查官網'],time:'07:30 出發 · 約 19:00 回程',
 d:'超現實主義大師達利親自設計的博物館與他的墓室所在。',tr:'Barcelona Sants 或 Passeig de Gràcia 搭 Renfe 區域列車（R11）或 Avant 到 Figueres，博物館距車站步行約 10–15 分。車程約 1–2 小時依車種，請查 renfe.com。'}
];

// ===== 每日行程（含非確定景點）=====
const DAYS=[
{d:1,t:'巴特由 + 米拉 + 恩典大道',s:'國定假日，多數商店休息；高第建築通常有開，先確認。早上巴特由之家，午餐 Passeig de Gràcia 一帶，下午米拉之家。晚上可去 Bel-Luna Jazz（離市中心約 10 分）。'},
{d:2,t:'桂爾公園 + 聖家堂',s:'早場桂爾公園 → 公車返回市區午餐 → 午後聖家堂。順路加 Casa Vicens（見分頁二）。'},
{d:3,t:'Sant Antoni 週日市集 + 德比賽事',s:'早上逛 Mercat de Sant Antoni 週日書市，再走到旁邊 Gran Via 的 Fira de Reis 聖誕市集（兩者相鄰），午後搭地鐵到 Cornellà 看球。若比賽在晚上，白天可加 Plaça Reial 週日郵幣市集。'},
{d:4,t:'聖山 Montserrat 一日遊',s:'FGC R5 從 Plaça Espanya 出發。出發前可在 Poble-sec 吃早午餐，回程在 Plaça Espanya 逛 Arenas 頂樓看夕陽。'},
{d:5,t:'達利戲劇博物館（Figueres）',s:'整天外出。1/5 傍晚為三王節遊行（Cabalgata de Reis），若趕得回來再去看，路線請查官方。'},
{d:6,t:'蒙居意克山 Montjuïc（三王節）',s:'假日商店休息。山上纜車、城堡、Mirador del Alcalde、Poble Espanyol，傍晚魔幻噴泉（冬季表演時間請查）。晚餐 Poble-sec 酒吧街。'},
{d:7,t:'冬季特賣日 + 哥德區',s:'1/7 特賣開始：Portal de l\'Àngel、El Corte Inglés、Passeig de Gràcia。週四有 Pl. Nova 古董市集。晚上 Harlem Jazz Club。'},
{d:8,t:'聖保羅醫院 + 港口',s:'上午 Hospital Sant Pau（世遺）→ Encants 市集（週五有）→ 下午 Port Vell 港口聖誕市集、Barceloneta、港口空中纜車、Maremagnum。'},
{d:9,t:'機動日：市集收尾',s:'週六市集：Moll Drassanes 古董市集、Pl. del Pi 畫家市集，最後採買伴手禮。⚠️ Tibidabo 纜車有來源指 1 月停駛，若想去請先查官網，否則改在市中心散步。'}
];

// ===== 書本推薦（高價位已刪）× 搭配 =====
// with: 與哪個確定景點一起；why: 為何順路
const PICKS=[
{id:'p1',hours:"未查到 2026 時間，請查官網",price:"未查到官方 2026 價格，請查官網（可自行參觀或租語音導覽）",n:'聖保羅醫院',en:'Hospital de Sant Pau',cat:'世界遺產',ic:'🏥',lat:41.4115,lng:2.1744,addr:'C/ Sant Antoni Maria Claret 167',with:['sagrada'],why:'與聖家堂只隔一條 Av. Gaudí（步行約 10 分），同日最順',tr:'步行；或 L5 Sant Pau/Dos de Maig',day:8},
{id:'p2',hours:"未查到 2026 時間，請查官網",price:"約 €12–14 起（含語音導覽，轉售平台資料）",n:'文森之家',en:'Casa Vicens',cat:'世界遺產·高第',ic:'🏠',lat:41.4033,lng:2.1514,addr:'Carrer de les Carolines 20',with:['guell'],why:'高第第一件住宅作品，在 Gràcia，離桂爾公園約 15–20 分步行',tr:'L3 Fontana 站步行 5 分；與桂爾公園之間步行約 20 分',day:2},
{id:'p3',hours:"未查到 2026 時間，請查官網",price:"約 €10.8–19（轉售平台，來源不一）",n:'桂爾宮',en:'Palau Güell',cat:'世界遺產·高第',ic:'🏛️',lat:41.3794,lng:2.1742,addr:'Carrer Nou de la Rambla 3-5',with:['free'],why:'老城區 Rambla 旁，可與 Plaça Reial、爵士夜安排同日',tr:'L3 Liceu 站步行 3 分',day:7},
{id:'p4',hours:"導覽場次請查官網",price:"導覽約 €22 起（轉售平台）",n:'加泰隆尼亞音樂廳',en:'Palau de la Música Catalana',cat:'世界遺產',ic:'🎻',lat:41.3875,lng:2.1753,addr:'C/ Palau de la Música 4-6',with:['batllo'],why:'離市中心約 15 分步行，與巴特由之家同為現代主義建築；可看導覽或音樂會',tr:'L1/L4 Urquinaona 站步行 4 分',day:7},
{id:'p5',hours:"戶外公共觀景台，建議日落前後前往",price:"免費",n:'Mirador del Alcalde（市長瞭望台）',en:'Mirador del Alcalde',cat:'觀景點',ic:'🌇',lat:41.3669,lng:2.1658,addr:'Carretera de Montjuïc s/n',with:['free'],why:'日落觀景，和纜車、城堡同一座山，建議 1/6 整天排 Montjuïc',tr:'Paral·lel 搭地下纜車 Funicular + Telefèric 上山',day:6},
{id:'p6',hours:"未查到 2026 時間；冬季可能維修停駛，請先查官網",price:"來回成人 €17.10（網路）／€19（櫃檯）；單程 €12（僅現場）；4–12 歲 €11.70／€13；不含在地鐵票",n:'蒙居意克纜車 + 城堡',en:'Telefèric de Montjuïc',cat:'觀光纜車',ic:'🚠',lat:41.3637,lng:2.1664,addr:'Carretera de Montjuïc 41',with:['free'],why:'與 Mirador 同一座山，1/6 山上日；冬季可能維修，請先查',tr:'Paral·lel（L2/L3）→ Funicular → 纜車；需另購票，不含在地鐵票',day:6},
{id:'p7',hours:"頂樓餐飲區約 Mon–Thu 至 01:00、Fri–Sun 至 03:00（來源略有出入）；商場時間請查官網",price:"搭內部手扶梯上頂樓免費；室外電梯約 €1（2023 資料）",n:'Arenas de Barcelona 頂樓',en:'Arenas de Barcelona',cat:'觀景點·購物',ic:'🏬',lat:41.3768,lng:2.1495,addr:'Gran Via de les Corts Catalanes 373-385',with:['montserrat'],why:'Plaça Espanya 就是去 Montserrat 的起點，回程順路看夕陽、逛街',tr:'Espanya 站（L1/L3/L8、FGC）',day:4},
{id:'p8',hours:"未查到，請看 Google 地圖",price:"約 €12–25／人（估計）",n:'Poble-sec 酒吧街：Quimet & Quimet 等',en:'Quimet & Quimet',cat:'餐廳 💲',ic:'🍤',lat:41.3745,lng:2.1635,addr:'C/ Poeta Cabanyes 25',with:['montserrat'],why:'書上推薦站著吃的罐頭 Tapas，離 Plaça Espanya 步行 10 分；Cañota、Rias de Galicia 在 C/Lleida 同一帶',tr:'Paral·lel 站步行 5 分',day:4},
{id:'p9',hours:"未查到，請看 Google 地圖",price:"午間套餐約 €13（需確認現價）；單點約 €15–30／人（估計）",n:'Cervecería Catalana',en:'Cervecería Catalana',cat:'餐廳 💲💲',ic:'🍺',lat:41.3943,lng:2.1627,addr:'C/ Mallorca 236',with:['batllo','milà'],why:'離巴特由與米拉之家都步行 5 分，書上傳統 Tapas',tr:'步行',day:1},
{id:'p10',hours:"未查到，請看 Google 地圖",price:"約 €10–20／人（估計）",n:'Tapas 24',en:'Tapas 24',cat:'餐廳 💲',ic:'🥘',lat:41.3912,lng:2.1647,addr:'C/ Diputació 269',with:['batllo'],why:'Passeig de Gràcia 旁平價 Tapas，午餐最適合',tr:'步行',day:1},
{id:'p11',hours:"未查到，請看 Google 地圖",price:"約 €30 以上／人（估計，價位偏高）",n:'Bar Mut',en:'Bar Mut',cat:'餐廳 💲💲💲',ic:'🍷',lat:41.3939,lng:2.1647,addr:'C/ Pau Claris 192',with:['milà'],why:'米拉之家附近，書上 Tapas 名單（價位偏高，可選項）',tr:'步行 5 分',day:1},
{id:'p12',hours:"搜尋未查到資訊，請先查官網",price:"未查到",n:'Bel-Luna Jazz Club',en:'Bel-Luna Jazz Club',cat:'爵士',ic:'🎷',lat:41.3872,lng:2.1707,addr:'Rambla de Catalunya 5',with:['batllo'],why:'離市中心約 10 分，晚上聽爵士；營業狀態請再確認',tr:'步行',day:1,warn:true},
{id:'p13',hours:"每週日約 08:30–14:30（書上資料）",price:"免費逛，書籍黑膠自費",n:'Mercat de Sant Antoni 週日市集',en:'Sant Antoni Sunday Market',cat:'市集',ic:'📚',lat:41.3781,lng:2.163,addr:'C/ Comte d\'Urgell 11',with:['fireareis'],why:'1/3 週日早上逛（約 8:30–14:30），離市中心約 10 分；二手書、黑膠、漫畫',tr:'步行，或 L2 Sant Antoni',day:3},
{id:'p14',hours:"每週日約 09:00–14:30（書上資料）",price:"免費逛，收藏品自費",n:'Plaça Reial 週日郵幣市集',en:'Plaça Reial Stamp & Coin Market',cat:'市集',ic:'🪙',lat:41.38,lng:2.1753,addr:'Plaça Reial 1',with:['espanyol'],why:'週日早上 9:00–14:30，之後可轉搭地鐵去賽場；旁邊 Jamboree 爵士',tr:'L3 Liceu 站',day:3},
{id:'p15',hours:"音樂會約 20:00 與 22:00，俱樂部營業到清晨（各來源說法不一）",price:"Fever 等平台約 €15–18 起，依場次而異",n:'Jamboree Jazz & Dance Club',en:'Jamboree',cat:'爵士',ic:'🎷',lat:41.38,lng:2.1753,addr:'Plaça Reial 17',with:['espanyol'],why:'1/3 賽後晚上聽爵士（較省）；2025 年來源仍營業',tr:'L3 Liceu 站',day:3},
{id:'p16',hours:"每週四約 10:00–20:00（書上資料）",price:"免費逛，古董自費",n:'Mercat Gòtic 古董市集（週四）',en:'Mercat Gòtic Antiguitats',cat:'市集',ic:'🏺',lat:41.3841,lng:2.1763,addr:'Plaça Nova 1',with:['free'],why:'1/7（週四）有；在大教堂前，順路逛哥德區',tr:'L4 Jaume I / L3 Catalunya 步行',day:7},
{id:'p17',hours:"未查到，請先查官網",price:"中等價位，無明確票價資料",n:'Harlem Jazz Club',en:'Harlem Jazz Club',cat:'爵士',ic:'🎶',lat:41.3832,lng:2.1768,addr:'C/ Comtessa de Sobradiel 8',with:['free'],why:'哥德區小巷，晚上注意扒手；2025 年來源仍營業',tr:'L4 Jaume I 步行 5 分',day:7},
{id:'p18',hours:"大型商場與百貨不午休，約 10:00–21:30／22:00（書上資料）；1/7 起冬季特賣",price:"免費逛，購物自費",n:'Portal de l\'Àngel + El Corte Inglés 特賣',en:'Portal de l\'Àngel',cat:'購物',ic:'🛍️',lat:41.3862,lng:2.1722,addr:'Portal de l\'Àngel',with:['free'],why:'離市中心步行 5–10 分；1/7 特賣開始（約至 2 月底）',tr:'步行',day:7},
{id:'p19',hours:"書上：週一、三、五、六約 09:00–20:00（請確認）",price:"免費逛，購物自費",n:'Mercat dels Encants（週五）',en:'Mercat dels Encants',cat:'市集',ic:'🧺',lat:41.405,lng:2.1888,addr:'C/ Castillejos 158',with:['sagrada'],why:'書上：週一/三/五/六 9:00–20:00。與聖家堂同線（L1 / 公車）；Glòries 商場旁',tr:'L1 Glòries 站',day:8,warn:true},
{id:'p20',hours:"商場時間請查官網",price:"免費逛，購物自費",n:'Centre Comercial Glòries',en:'Glòries Mall',cat:'購物',ic:'🏬',lat:41.403,lng:2.1895,addr:'Av. Diagonal 208',with:['sagrada'],why:'與 Encants 相鄰，平價購物中心',tr:'L1 Glòries',day:8},
{id:'p21',hours:"未查到，請看 Google 地圖",price:"約 €8–15／人（估計）",n:'Barceloneta 老店：El Vaso de Oro / Cova Fumada',en:'Barceloneta tapas',cat:'餐廳 💲',ic:'🦐',lat:41.3797,lng:2.1887,addr:'C/ Baluart 56',with:['free'],why:'1/8 港口日午餐；Cova Fumada 是 Bomba 炸肉丸發源地，Vaso de Oro 也在同區',tr:'L4 Barceloneta',day:8},
{id:'p22',hours:"未查到 2026 時間；冬季請先查官網",price:"約 €20 來回（僅單一來源）",n:'港口空中纜車',en:'Transbordador Aeri del Port',cat:'觀光纜車',ic:'🚡',lat:41.3725,lng:2.1862,addr:'Passeig de Jean Gabriel Estruch',with:['free'],why:'1/8 港口日：午餐後搭纜車；營運狀態請查官網',tr:'L4 Barceloneta + 步行',day:8,warn:true},
{id:'p23',hours:"大型商場約 10:00–21:00／22:00（書上說法，請確認）；週日常營業",price:"免費逛，購物自費",n:'Maremagnum 商場',en:'Maremagnum',cat:'購物·觀景',ic:'⚓',lat:41.3753,lng:2.183,addr:'Moll d\'Espanya 5',with:['free'],why:'港口購物中心，頂樓景觀；週日也常營業',tr:'L3 Drassanes 步行 15 分 或 L4 Barceloneta',day:8},
{id:'p24',hours:"⚠️ 有來源指出 Cuca de Llum 纜車 1 月停駛（2 月僅週末），遊樂園冬季只開部分日子，1/9 行程請先查官網",price:"纜車單程約 €13.5（非 1 月時段）",n:'Tibidabo 山頂 + Mirablau',en:'Tibidabo',cat:'觀景點',ic:'🎡',lat:41.4225,lng:2.1187,addr:'Plaça del Tibidabo',with:['free'],why:'和桂爾公園同在北邊山區但不順路，建議 1/9 機動日單獨排',tr:'FGC L7 到 Av. Tibidabo；Tramvia Blau 已停駛，改公車/計程車到 Plaça Doctor Andreu 再搭 Funicular（請以 Google Maps 為準）',day:9,warn:true},
{id:'p25',hours:"搜尋未找到此場地資訊，請先查證",price:"未查到",n:'Jazz Room - La Cova del Drac',en:'Jazz Room',cat:'爵士',ic:'🎼',lat:41.4005,lng:2.1475,addr:'C/ Vallmajor 33',with:['free'],why:'在 Sant Gervasi，晚上單獨去；營業狀態請再確認',tr:'FGC Muntaner / Plaça Molina',day:9,warn:true},
{id:'p26',hours:"週六、日約 11:00–21:00（書上資料）",price:"免費逛，古董自費",n:'Moll de les Drassanes 古董市集（週六）',en:'Fira Brocanters',cat:'市集',ic:'🪑',lat:41.375,lng:2.1795,addr:'Moll Drassanes 1',with:['free'],why:'1/9 週六 11:00–21:00，靠 Drassanes 港口；與 Rambla 同線',tr:'L3 Drassanes',day:9,warn:true},
{id:'p27',hours:"週六約 11:00–20:00，週日 11:00–14:00（書上資料）",price:"免費逛，畫作自費",n:'Pintors del Pi 畫家市集（週六）',en:'Mostra d\'Art Pintors del Pi',cat:'市集',ic:'🖼️',lat:41.3825,lng:2.1741,addr:'Pl. Sant Josep Oriol 1',with:['free'],why:'1/9 週六 11:00–20:00，哥德區 Pl. del Pi；離市中心步行約 15 分',tr:'L3 Liceu / 步行',day:9}
];

// ===== 美食補給：超市 / 咖啡 / 小吃·午餐（標記為概略位置，點地圖連結以店名搜尋最準）=====
const AREA={hotel:'🏨 市中心周邊',batllo:'🐉 巴特由·米拉',sagrada:'⛪ 聖家堂',guell:'🦎 桂爾公園·Gràcia',fireareis:'🎄 Sant Antoni·聖誕市集',montjuic:'🌇 Montjuïc·Poble-sec',port:'⚓ 港口·Born·Barceloneta',montserrat:'⛰️ 聖山',dali:'🎨 Figueres 達利',poblenou:'🌊 Poblenou 海邊'};
const EATS=[
{id:'e1',hours:"週日與國定假日多數休息，平日時間請看地圖",price:"依購買內容",cat:'super',n:'Carrefour Express（Gran Via 573，近 Universitat）',en:'Carrefour Express Gran Via 573',ic:'🛒',lat:41.3857,lng:2.1612,addr:'Gran Via de les Corts Catalanes 573',near:'hotel',p:1,why:'離市中心最近的超市之一，買水、水果、優格、三明治。資料來自較舊的指南，請先用地圖確認仍營業。',warn:1},
{id:'e2',hours:"週日與國定假日多數休息，平日時間請看地圖",price:"依購買內容（平價）",cat:'super',n:'Mercadona（Consell de Cent 301）',en:'Mercadona Consell de Cent 301',ic:'🛒',lat:41.3925,lng:2.1657,addr:'Carrer del Consell de Cent 301',near:'batllo',p:1,why:'西班牙平價連鎖超市，離 Passeig de Gràcia 近，適合買零食與熟食。',warn:1},
{id:'e3',hours:"週日與國定假日多數休息，平日時間請看地圖",price:"依購買內容（平價）",cat:'super',n:'Mercadona（Casp 33）',en:'Mercadona Carrer de Casp 33',ic:'🛒',lat:41.3888,lng:2.1721,addr:'Carrer de Casp 33',near:'hotel',p:1,why:'靠近 Plaça Catalunya／Urquinaona，從市中心步行約 10–15 分。',warn:1},
{id:'e4',hours:"週日與國定假日多數休息，平日時間請看地圖",price:"依購買內容（平價）",cat:'super',n:'Mercadona（Freixures 2，Born 區）',en:'Mercadona Carrer de Freixures 2',ic:'🛒',lat:41.383,lng:2.184,addr:'Carrer de Freixures 2',near:'port',p:1,why:'Born／港口一帶，逛港口日順路補給。',warn:1},
{id:'e5',hours:"百貨公司不午休，約 10:00–21:30／22:00（書上）；週日、1/1、1/6 多半休息",price:"依購買內容（較貴）",cat:'super',n:'El Corte Inglés 超市（Plaça Catalunya）',en:'El Corte Inglés Plaça Catalunya supermarket',ic:'🏬',lat:41.3869,lng:2.17,addr:'Plaça de Catalunya 14',near:'hotel',p:2,why:'離市中心步行約 5 分，進口食品與伴手禮（橄欖油、Turrón）選擇多，價格較高；超市樓層請確認。',warn:1},
{id:'e6',hours:"週日休息；1/1、1/6 多半不營業；平日時間請看地圖",price:"果汁 €2–5、小吃 €5–15（估計）",cat:'super',n:'La Boqueria 市場',en:'Mercat de la Boqueria',ic:'🍓',lat:41.3817,lng:2.1719,addr:'La Rambla 91',near:'hotel',p:2,why:'步行約 10 分。鮮果汁、火腿與小吃；遊客多、扒手多。週日休息，1/1、1/6 多半不營業。',warn:1},

{id:'c1',cat:'coffee',n:'Granja M. Viader（熱巧克力）',en:'Granja M. Viader',ic:'☕',lat:41.3825,lng:2.17,addr:'Carrer d\'en Xuclà 4',near:'hotel',p:1,why:'老牌牛奶店，招牌是熱巧克力與奶泡，離市中心步行約 8 分。',warn:1},
{id:'c9',cat:'churros',n:'Granja Dulcinea（Churros 熱巧克力）',en:'Granja Dulcinea',ic:'🍫',lat:41.3833,lng:2.1737,addr:'Carrer de Petritxol 2',near:'hotel',p:1,why:'巷子裡的老字號 churros 配濃稠熱巧克力，步行到市中心約 10 分。',warn:1},
{id:'c2',cat:'coffee',n:'Federal Café',en:'Federal Café',ic:'☕',lat:41.3757,lng:2.1628,addr:'Carrer del Parlament 39',near:'fireareis',p:2,why:'Sant Antoni 區知名咖啡與早午餐，離週日書市與 Fira de Reis 都很近，1/3 逛完可來。',warn:1},
{id:'c3',cat:'coffee',n:'Faborit Café（Casa Amatller 內）',en:'Faborit Café Casa Amatller',ic:'🍫',lat:41.3913,lng:2.1651,addr:'Passeig de Gràcia 41',near:'batllo',p:2,why:'在巴特由之家隔壁的現代主義建築內，熱巧克力配 melindros 餅乾。',warn:1},
{id:'c4',cat:'coffee',n:'El Magnífico（老牌烘豆咖啡）',en:'Cafés El Magnífico',ic:'☕',lat:41.3846,lng:2.1814,addr:'Carrer de l\'Argenteria 64',near:'port',p:2,why:'Born 區老牌烘豆店，可順買咖啡豆當伴手禮。',warn:1},
{id:'c5',cat:'coffee',n:'Nomad Coffee Lab & Shop',en:'Nomad Coffee Lab & Shop',ic:'☕',lat:41.385,lng:2.1795,addr:'Passatge Sert 12',near:'port',p:2,why:'Nomad 在 2026「世界 100 大咖啡店」排名第 16，精品咖啡首選；營業時間請先查。',warn:1},
{id:'c6',cat:'coffee',n:'Satan\'s Coffee Corner',en:'Satan\'s Coffee Corner',ic:'☕',lat:41.3829,lng:2.1771,addr:'Carrer de l\'Arc de Sant Ramon del Call 11',near:'port',p:2,why:'哥德區精品咖啡店，逛 Plaça Sant Jaume 與大教堂時順路。',warn:1},
{id:'c7',cat:'coffee',n:'Zentral Specialty Coffee & Bakery',en:'Zentral Specialty Coffee Bakery',ic:'🥐',lat:41.401,lng:2.1573,addr:'Travessera de Gràcia 273',near:'guell',p:2,why:'Gràcia 的精品咖啡與烘焙，爬桂爾公園前後補給。',warn:1},
{id:'c8',hours:"每週一休息；其他時間請看地圖",price:"咖啡約 €2–4、甜點約 €3–6（估計）",cat:'coffee',n:'Cosa Bake & Coffee',en:'Cosa Bake & Coffee',ic:'🥐',lat:41.3995,lng:2.16,addr:'Travessera de Gràcia 138',near:'guell',p:2,why:'甜點咖啡店；週一休息。',warn:1},

{id:'s1',hours:"請看 Google 地圖；三王節前後國王蛋糕常提早售完",price:"甜點約 €3–7／份；整個國王蛋糕約 €20 起（估計）",cat:'sweet',n:'Escribà（Rambla 83 老店）',en:'Escribà Rambla 83',ic:'🍰',lat:41.3815,lng:2.1707,addr:'La Rambla 83',near:'hotel',p:2,why:'百年甜點世家，新藝術風格建築，可頌、巧克力與蛋糕有名；離市中心步行約 10 分，旁邊就是 Boqueria。三王節期間賣 Tortell de Reis 國王蛋糕。',warn:1},
{id:'s2',hours:"請看 Google 地圖；三王節前後國王蛋糕常提早售完",price:"甜點約 €3–7／份（估計）",cat:'sweet',n:'Escribà（Gran Via 546 分店）',en:'Escribà Gran Via 546',ic:'🍰',lat:41.3828,lng:2.1595,addr:'Gran Via de les Corts Catalanes 546',near:'fireareis',p:2,why:'離 Fira de Reis（Gran Via）與 Sant Antoni 很近，1/3 逛完市集順路買甜點。',warn:1},
{id:'s3',cat:'sweet',n:'Hofmann Pastisseria（馬斯卡彭可頌）',en:'Hofmann Pastisseria Born',ic:'🥐',lat:41.3849,lng:2.1816,addr:'Carrer dels Flassaders 44',near:'port',p:2,why:'Born 區名店，馬斯卡彭餡可頌是招牌；書上一星餐廳 Hofmann 同名學校的甜點店。',warn:1},
{id:'s4',cat:'sweet',n:'Bubó（得獎巧克力甜點）',en:'Bubó Born',ic:'🍫',lat:41.3836,lng:2.1829,addr:'Carrer de les Caputxes 10',near:'port',p:3,why:'Born 區知名精緻甜點與巧克力，價位偏高；各來源對分店位置說法不一，請看地圖。',warn:1},
{id:'s5',cat:'sweet',n:'Pastisseria Mauri（1929 年創立）',en:'Pastisseria Mauri',ic:'🎂',lat:41.3955,lng:2.1613,addr:'Rambla de Catalunya 102',near:'batllo',p:2,why:'傳統甜點與茶室，離米拉之家步行約 8 分；三王節前後也有國王蛋糕。',warn:1},
{id:'s6',cat:'sweet',n:'La Colmena（Xuixo 奶油炸甜甜圈）',en:'La Colmena pastry Barcelona',ic:'🍩',lat:41.3846,lng:2.1759,addr:'Plaça de l\'Àngel 12',near:'hotel',p:1,why:'1849 年老店，必吃 xuixo（卡士達餡炸捲，加泰隆尼亞點心）；離哥德區大教堂近。',warn:1},
{id:'pa1',cat:'paella',n:'Els Pescadors（Poblenou 海邊廣場）',en:'Els Pescadors Poblenou',ic:'🥘',lat:41.3995,lng:2.2069,addr:'Plaça de Prim 1',near:'poblenou',p:2,price:'海鮮飯約 €20–30／人（估計）',why:'書本推薦（海鮮分類）；2026 指南稱為最佳海鮮飯之一，也是少數拿到 Repsol Sol 的米飯餐廳。環境安靜，在 Poblenou 老廣場。⚠️ 依網路推薦收錄，Google 星數與評論數未核對。',warn:1},
{id:'pa2',cat:'paella',n:'Can Solé（Barceloneta 老店）',en:'Can Solé Barceloneta',ic:'🦐',lat:41.3789,lng:2.1884,addr:'Carrer de Sant Carles 4',near:'port',p:2,price:'海鮮飯約 €22–32／人（估計）',why:'1903 年老店，多篇指南列為海鮮飯與墨魚飯（arroz negro）的標竿。1/8 港口日午餐首選。⚠️ 依網路推薦收錄；其他網站評分 4.3（Evendo，非 Google），Google 星數未核對。',warn:1},
{id:'pa3',cat:'paella',n:'7 Portes（Paella Parellada）',en:'7 Portes Barcelona',ic:'🍤',lat:41.3821,lng:2.1833,addr:"Passeig d'Isabel II 14",near:'port',p:3,price:'海鮮飯約 €25–35／人（估計，價位偏高）',why:'歷史悠久的大餐廳，招牌 Paella Parellada 的海鮮已剝殼，吃起來方便。靠近 Born 與港口。⚠️ 依網路推薦收錄，Google 星數未核對。',warn:1},
{id:'pa4',cat:'paella',n:'Sal Mar（Barceloneta 海濱）',en:'Sal Mar Barceloneta',ic:'🌊',lat:41.381,lng:2.1936,addr:'Barceloneta',near:'port',p:2,price:'海鮮飯約 €20–30／人（估計）',why:'Barceloneta 海濱步道的海鮮飯店，在評分彙整站上評論數很多（約 1.4 萬則，非 Google）。⚠️ 地址請看地圖；依網路推薦收錄，Google 星數未核對。',warn:1},
{id:'pa5',cat:'paella',n:'Mesón Barceloneta',en:'Meson Barceloneta',ic:'🥘',lat:41.3806,lng:2.1874,addr:'Barceloneta',near:'port',p:2,price:'海鮮飯約 €22 起（單一來源 €22.5，需確認）',why:'Barceloneta 的家常海鮮飯店，有網站排名第一的推薦。⚠️ 地址請看地圖；依網路推薦收錄，Google 星數未核對。',warn:1},
{id:'ch1',cat:'churros',n:'Churrería Manuel San Román（Escudellers）',en:'Churreria Manuel San Román Escudellers',ic:'🥖',lat:41.3792,lng:2.176,addr:'Carrer dels Escudellers',near:'hotel',p:1,price:'吉拿棒配熱巧克力約 €4–8（估計）',why:'哥德區的老牌吉拿棒店，在指南與評論站常被推薦；現炸現吃，沾濃稠熱巧克力。⚠️ 門牌請看地圖；多數吉拿棒店午後會休息，建議上午或傍晚去。',warn:1},
{id:'ch2',cat:'churros',n:'Granja La Pallaresa（Petritxol 巧克力街）',en:'Granja La Pallaresa Petritxol',ic:'🍫',lat:41.3836,lng:2.1738,addr:'Carrer de Petritxol 11',near:'hotel',p:1,price:'吉拿棒配熱巧克力約 €5–9（估計）',why:'在 Petritxol「巧克力街」上的老牌 Granja，吉拿棒配濃稠熱巧克力是巴塞隆納經典。同街還有 Granja Dulcinea（見本頁）。⚠️ 營業時間請看地圖。',warn:1},
{id:'ch3',cat:'churros',n:'Trébol Churrería（Gràcia）',en:'Xurreria Trebol Gràcia',ic:'🌭',lat:41.4058,lng:2.1606,addr:'Carrer de Ramón y Cajal 36',near:'guell',p:1,price:'吉拿棒約 €3–6（估計）',why:'Gràcia 的當地人氣店，除了一般吉拿棒，還有夾熱狗的鹹口味。桂爾公園前後順路。⚠️ 位置概略，請看地圖。',warn:1},
{id:'ch4',cat:'churros',n:'La Xurreria del Born',en:'La Xurreria del Born',ic:'🥖',lat:41.3838,lng:2.182,addr:'Born',near:'port',p:1,price:'吉拿棒約 €3–6（估計）',why:'EuroVista 指南列為可靠選擇；在 Born 區，逛 Santa Caterina、Picasso 博物館時順路。⚠️ 地址未查到，請看地圖。',warn:1},
{id:'cr1',cat:'crema',n:'Sucre Cremat（外帶加泰布蕾專賣）',en:'Sucre Cremat Barcelona',ic:'🍮',lat:41.3845,lng:2.1815,addr:'Born',near:'port',p:1,price:'布蕾約 €5–8／份（估計）',why:'2026/5 才被報導的新店，專賣手工加泰隆尼亞布蕾（Crema catalana），外帶設計。⚠️ 單一來源，地址未查到，營業時間請看地圖。',warn:1},
{id:'cr2',cat:'crema',n:'Bar del Pla（Born，Montcada）',en:'Bar del Pla Barcelona',ic:'🍮',lat:41.385,lng:2.1815,addr:'Carrer de Montcada 2',near:'port',p:2,price:'布蕾約 €6–9；正餐約 €25–35／人（估計）',why:'Tablejourney 的布蕾推薦榜第一（編輯評分 4.5，非 Google 評分），靠近畢卡索博物館。',warn:1},
{id:'cr3',cat:'crema',n:'Bodega La Palma（哥德區）',en:'Bodega La Palma Barcelona',ic:'🍷',lat:41.3822,lng:2.1767,addr:'Carrer de la Palma de Sant Just 7',near:'hotel',p:2,price:'布蕾約 €5–8；酒館小菜約 €15–25／人（估計）',why:'Devour Tours 稱其為巴塞隆納最好吃的布蕾之一（單一旅遊網站意見）。老酒館氣氛。⚠️ 營業時間請看地圖。',warn:1},
{id:'cr4',cat:'crema',n:'Can Culleretes（1786 年老店）',en:'Can Culleretes Barcelona',ic:'🏛️',lat:41.3814,lng:2.1745,addr:"Carrer d'en Quintana 5",near:'hotel',p:2,price:'布蕾約 €5–8；正餐約 €25–35／人（估計）',why:'EuroVista 等指南列入布蕾推薦，傳說是巴塞隆納最老的餐廳之一，傳統加泰料理。⚠️ 營業時間請看地圖。',warn:1},
{id:'f1',hours:"平日午餐約 13:00–16:00 有套餐；其他時間請看地圖",price:"午間套餐約 €15 以內（需確認現價）",cat:'eat',n:'La Rita（午間套餐）',en:'La Rita Barcelona',ic:'🍽️',lat:41.3926,lng:2.1634,addr:'Carrer d\'Aragó 279',near:'batllo',p:1,why:'Passeig de Gràcia 附近，有人推薦的午間套餐（約 €15 以內，請以現價為準）。',warn:1},
{id:'f2',hours:"未查到，請看 Google 地圖；人多常需等位",price:"午間套餐約 €13（需確認現價）",cat:'eat',n:'Cervecería Catalana（午間套餐約 €13）',en:'Cervecería Catalana',ic:'🍺',lat:41.3943,lng:2.1627,addr:'Carrer de Mallorca 236',near:'batllo',p:2,why:'書本推薦；離巴特由之家步行 5 分，午餐有 €13 左右的套餐（需確認現價），人多要等位。'},
{id:'f3',cat:'eat',n:'Tapas 24',en:'Tapas 24',ic:'🍤',lat:41.3912,lng:2.1647,addr:'Carrer de la Diputació 269',near:'batllo',p:1,why:'書本推薦，Passeig de Gràcia 旁的平價 Tapas。'},
{id:'f4',cat:'eat',n:'Bardeni-Caldeni（可樂餅與伊比利火腿）',en:'Bardeni Caldeni',ic:'🥩',lat:41.4018,lng:2.1757,addr:'Carrer de València 454',near:'sagrada',p:2,why:'書本推薦；聖家堂步行約 8 分，當地客多，可樂餅有名。'},
{id:'f5',hours:"約 08:00–20:45，週日休息",price:"麵包咖啡約 €3–8（估計）",cat:'eat',n:'Puiggròs 烘焙咖啡',en:'Puiggròs bakery',ic:'🥐',lat:41.4048,lng:2.1741,addr:'Avinguda de Gaudí',near:'sagrada',p:1,why:'聖家堂旁大道上的麵包店兼咖啡，08:00–20:45，週日休息（請確認）。',warn:1},
{id:'f6',hours:"平日約 09:00–20:00；週六請確認",price:"輕食三明治約 €5–9（估計）",cat:'eat',n:'Buenas Migas Sagrada Família',en:'Buenas Migas Sagrada Família',ic:'🥪',lat:41.4033,lng:2.1767,addr:'Carrer de Padilla',near:'sagrada',p:1,why:'輕食三明治與咖啡，平日 9:00–20:00；請確認 1/2 週六時間。',warn:1},
{id:'f7',cat:'eat',n:'Oso Grizzly（酵母麵包）',en:'Oso Grizzly bakery',ic:'🥖',lat:41.4033,lng:2.1565,addr:'Carrer del Planeta 37',near:'guell',p:1,why:'Gràcia 小麵包店，酸種麵包與鹹甜麵包，靠近 Plaça del Sol。',warn:1},
{id:'f8',hours:"酒吧街，各店不同；晚間較熱鬧",price:"Pintxos 每個約 €1–2（需確認）",cat:'eat',n:'Carrer de Blai 平價 Pintxos 街',en:'Carrer de Blai Poble-sec',ic:'🍢',lat:41.3732,lng:2.1651,addr:'Carrer de Blai',near:'montjuic',p:1,why:'Poble-sec 的小酒吧街，常見 pintxos 每個約 €1–2（需確認）；1/6 下山後晚餐首選。',warn:1},
{id:'f9',cat:'eat',n:'Quimet & Quimet（罐頭 Tapas）',en:'Quimet & Quimet',ic:'🥫',lat:41.3745,lng:2.1635,addr:'Carrer del Poeta Cabanyes 25',near:'montjuic',p:1,why:'書本推薦，站著吃的小店，離 Plaça Espanya 約 10 分。'},
{id:'f10',cat:'eat',n:'La Cova Fumada（Bomba 發源地）',en:'La Cova Fumada',ic:'🍖',lat:41.3797,lng:2.1887,addr:'Carrer del Baluart 56',near:'port',p:1,why:'書本推薦；Barceloneta 炸肉丸 bomba 的發源地，1/8 港口日午餐。'},
{id:'f11',cat:'eat',n:'El Xampanyet（Cava 與小吃）',en:'El Xampanyet',ic:'🥂',lat:41.3853,lng:2.1812,addr:'Carrer de Montcada 22',near:'port',p:1,why:'書本推薦；Born 區老酒吧，氣泡酒配鯷魚小吃。'},
{id:'f12',cat:'eat',n:'Bar Cañete',en:'Bar Cañete',ic:'🍷',lat:41.3797,lng:2.1741,addr:'Carrer de la Unió 17',near:'hotel',p:2,why:'書本推薦的傳統 Tapas，在 Liceu 附近，離市中心步行約 12 分。'},
{id:'f13',hours:"午餐約 13:00 起（西班牙餐廳多為午餐 13:30 後、晚餐 20:00 後），請看地圖",price:"午間套餐約 €15–25（估計）",cat:'eat',n:'Hotel Duran 餐廳（達利常去）',en:'Hotel Duran restaurant Figueres',ic:'🍽️',lat:42.2676,lng:2.9612,addr:'Carrer de Lasauca 5, Figueres',near:'dali',p:2,why:'Figueres 老牌旅館餐廳，有加泰料理午間套餐，離達利博物館步行約 250 公尺。',warn:1},
{id:'f14',cat:'eat',n:'Urban Coffee & Brunch（Figueres）',en:'Urban Coffee & Brunch Figueres',ic:'🥞',lat:42.2678,lng:2.9615,addr:'Figueres',near:'dali',p:1,why:'有人推薦為博物館附近最佳早餐/早午餐；地址請看地圖。',warn:1},
{id:'f15',cat:'eat',n:'Nomada Restaurant & Brunch（Figueres）',en:'Nomada Restaurant Brunch Figueres',ic:'🥗',lat:42.2677,lng:2.9607,addr:'Figueres',near:'dali',p:2,why:'素食友善，離博物館一個街角；請看地圖確認。',warn:1},
{id:'f16',cat:'eat',n:'Montserrat 山上 Mató 配蜂蜜',en:'Montserrat plaza mató honey',ic:'🍯',lat:41.5934,lng:1.8378,addr:'Plaça de la Creu, Montserrat',near:'montserrat',p:1,why:'山上特產：Mató（鮮乳酪）淋蜂蜜，以及自助餐廳。搜尋沒找到可靠店名，現場看。',warn:1}
];
const EAREA_ORDER=Object.keys(AREA);
const DAYAREA={1:['batllo','hotel'],2:['guell','sagrada'],3:['fireareis'],4:['montserrat'],5:['dali'],6:['montjuic'],7:['hotel','port'],8:['port','poblenou','sagrada'],9:['hotel']};
const ANCH={fireareis:'聖誕市集',batllo:'巴特由之家',milà:'米拉之家',guell:'桂爾公園',sagrada:'聖家堂',espanyol:'球賽',montserrat:'聖山',free:'機動日/無確定景點'};
