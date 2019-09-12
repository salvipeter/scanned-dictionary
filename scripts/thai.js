// Initialization. Should end with a call to display().
var init = function() {
  checkData();                  // comment out when all data has been checked
  document.title = "Thai-English Student's Dictionary";
  document.getElementById("logo").innerHTML = "<img src=\"img/haas-th-en.jpg\" />";
  document.getElementById("title").innerHTML = "Thai - English";
  document.getElementById("dictionary").innerHTML = "Mary R. Haas, Stanford, 1964.";
  display();
};

// Returns "less" when a < b, "equal" when a = b, "greater" when a > b.
// Algorithm based on:
// Samphan Khamthaidee, Thai Style Algorithm: Sorting Thai,
// Computer Review, Vol. 91 (March 1992), Man Group, Bangkok, 1992.
// Source: https://linux.thai.net/~thep/tsort.html
var wordCompare = function(a, b) {
  var isldvowel = function(c) {
    return "เแโใไ".indexOf(c) >= 0;
  };
  var isstone = function(c) {
    return "ๆ◌็◌่◌้◌๊◌๋◌์".indexOf(c) >= 0;
  };
  var diff = function(c1, c2) {
    var alphabet =
        "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะ◌ัาำ◌ิ◌ี◌ึ◌ื◌ุ◌ู◌ฺเแโใไๅๆ◌็◌่◌้◌๊◌๋◌์◌ํ◌๎";
    return alphabet.indexOf(c1) - alphabet.indexOf(c2);
  };
  var stringify = function(d) {
    if (d < 0)
      return "less";
    if (d > 0)
      return "greater";
    return "equal";
  }

  // The first for  loop compares consequence characters,  skipping tonal marks,
  // until different effective characters (i.e. consonants or vowels) are found,
  // or until either  or both strings are  exhausted. Meanwhile, first-appearing
  // difference in  tonal marks  is also kept  for later use  in case  all other
  // parts are equal.
  var d = 0;
  var i1 = 0;
  var i2 = 0;
  while (true) {
    while (a[i1] == b[i2] && i1 != a.length) {
      i1++; i2++;
    }
    var c1 = a[i1];
    var c2 = b[i2];
    if (isstone(c1) && isstone(c2)) {
      i1++; i2++;
      if (d == 0)
        d = diff(c1, c2);
    } else if (isstone(c1)) {
      i1++;
      if (d == 0)
        d = 1;
    } else if (isstone(c2)) {
      i2++;
      if (d == 0)
        d = -1;
    } else
      break;
  }

  // The next if statement returns the  difference in tonal marks when all other
  // parts appears equal.
  if (i1 == a.length && i2 == b.length)
    return stringify(d);

  // The next  if statement detects  whether a string  is a substring,  if tonal
  // marks are  ignored, of the  other and returns the  difference if it  is the
  // case.
  if (i1 == a.length)
    return "less";
  if (i2 == b.length)
    return "greater";

  // The last  if blocks  compares the  difference for  most general  cases. The
  // following  initial  consonant  will  be  picked to  compare  first  if  the
  // character in question is a leading vowel.
  if (isldvowel(c1) && isldvowel(c2)) {
    return stringify(a[i1+1] != b[i2+1] ? diff(a[i1+1], b[i2+1]) : diff(c1, c2));
  } else if (isldvowel(c1)) {
    return stringify(a[i1+1] != c2 ? diff(a[i1+1], c2) : 1);
  } else if (isldvowel(c2)) {
    return stringify(c1 != b[i2+1] ? diff(c1, b[i2+1]) : -1);
  } else
    return stringify(diff(c1, c2));
};

var page_zoom = 2;

// Dictionary pages
var images = "data/thaidic-";
var image_extension = ".png";
var start_page = 30;
var headwords = [               // first words in each page
  "ก",
  "ก็",
  "ก่น",
  "กรม",
  "กรรไกร",
  "กรอม",
  "กระโจม",
  "กระดาน",
  "กระเดือก",
  "กระทรวง",
  "กระเทียม",
  "กระบะ",
  "กระเพาะ",
  "กระหย่ง",
  "กริ่ง",
  "กลบ",
  "กล่อม",
  "กล้า",
  "กล่าว",
  "กวน",
  "กวี",
  "ก่อง",
  "ก้อน",
  "กะโผลกกะเผลก",
  "กัด",
  "กัน",
  "กับ",
  "กางเขน",
  "ก่าย",
  "การ",
  "การ",
  "การ",
  "ก้าว",
  "กำเริบ",
  "กำหนัด",
  "กิน",
  "กี๊",
  "กู้",
  "เก็บ",
  "เกลียด",
  "เก้าอี้",
  "เกี่ยว",
  "แก่",
  "แก้",
  "แกส",
  "ใกล้",
  "ขจัด",
  "ขนาด",
  "ขยั้นขยอ",
  "ขวนขวาย",
  "ขวาง",
  "ขอ",
  "ข้อ",
  "ของ",
  "ขัด",
  "ขับ",
  "ข้า",
  "ขาด",
  "ข่าย",
  "ข้าว",
  "ขี้",
  "ขี้",
  "ขึ้น",
  "ขุน",
  "เขน",
  "เขย่ง",
  "เข้า",
  "เข้า",
  "เขียว",
  "แข็ง",
  "โขมง",
  "ไข้",
  "คณะ",
  "คน",
  "ครบ",
  "ครั่ง",
  "คราก",
  "คริสตัง",
  "คลอ",
  "คลาน",
  "ควง",
  "ความ",
  "ความ",
  "คอ",
  "คอย",
  "คะแนน",
  "คา",
  "ค้า",
  "คาม",
  "คำ",
  "คำ",
  "คำรน",
  "คึก",
  "คุณ",
  "คุ้ม",
  "คู่",
  "เคราะห์",
  "เครื่อง",
  "เคลื่อน",
  "แค่",
  "โค",
  "ฆ",
  "งวง",
  "งะวเงีย",
  "งาน",
  "งำ",
  "เงิน",
  "เงื้อม",
  "จด",
  "จบ",
  "จริง",
  "จ้อง",
  "จ้ะ",
  "จักรี",
  "จัด",
  "จับ",
  "จาง",
  "จำ",
  "จำหน่าย",
  "จี้",
  "จุกจิก",
  "จูบ",
  "เจริญ",
  "เจ้า",
  "เจิ่ง",
  "แจ้ง",
  "ใจ",
  "ใจ",
  "ใจ",
  "ฉลอง",
  "ฉัน",
  "ฉาย",
  "ฉุก",
  "เฉลี่ย",
  "แฉ่ง",
  "ชน",
  "ชมรม",
  "ช่วย",
  "ชอบ",
  "ชัก",
  "ชั้น",
  "ชั่ว",
  "ช่าง",
  "ช่าง",
  "ชาติ",
  "ชาย",
  "ชาว",
  "ชิ้น",
  "ชีวิต",
  "ชุด",
  "ชู้",
  "เช้า",
  "เชี่ยว",
  "แช่ม",
  "ใช้",
  "ซ้อน",
  "ซาบ",
  "ซืน",
  "เซา",
  "ญาติ",
  "ฒ",
  "ดวง",
  "ด้วย",
  "ดอย",
  "ดับ",
  "ดาบ",
  "ดาษ",
  "ดิ่ง",
  "ดี",
  "ดี",
  "ดื่ม",
  "ดู",
  "เด็ก",
  "เดิน",
  "เดียว",
  "เดือน",
  "แดด",
  "โดย",
  "ได้",
  "ได้",
  "ตก",
  "ตก",
  "ต้น",
  "ต้น",
  "ตรง",
  "ตระหนี่",
  "ตลก",
  "ต่อ",
  "ต่อ",
  "ต้อง",
  "ตอม",
  "ตะปู",
  "ตั้ง",
  "ตัด",
  "ตัว",
  "ตัว",
  "ตา",
  "ตา",
  "ตา",
  "ต่าง",
  "ตาม",
  "ตาม",
  "ตาลปัตร",
  "ติด",
  "ตี",
  "ตื่น",
  "ตู้",
  "เต็ม",
  "เตี้ยม",
  "แตก",
  "แตร",
  "ใต้",
  "ถม",
  "ถอด",
  "ถัง",
  "ถาม",
  "ถิ่น",
  "ถึง",
  "ถุง",
  "ถูก",
  "เถื่อน",
  "ไถ่"
  // 223 (252)
];
