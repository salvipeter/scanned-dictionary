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
// Samphan Khamthaidee, Thai Style Algorithm: Sorting Thai,
// Computer Review, Vol. 91 (March 1992), Man Group, Bangkok, 1992.
var wordCompare = function(a, b) {
  var isldvowel = function(c) {
    return "เแโใไ".indexOf(c) >= 0;
  };
  var isstone = function(c) {
    return "ๆ◌็◌่◌้◌๊◌๋◌์".indexOf(c) >= 0;
  };
  var stringify = function(d) {
    if (d < 0)
      return "less";
    if (d > 0)
      return "greater";
    return "equal";
  }

  var d = 0;
  var i1 = 0;
  var i2 = 0;
  while (true) {
    while (a[i1] == b[i2]) {
      if (i1 == a.length) {
        if (i2 == b.length)
          return "equal";
        return "less";
      }
      if (i2 == b.length)
        return "greater";
      i1++; i2++;
    }
    var c1 = a[i1];
    var c2 = b[i2];
    if (isstone(c1) && isstone(c2)) {
      i1++; i2++;
      if (d == 0)
        d = c1 - c2;
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

  if (isldvowel(c1) && isldvowel(c2)) {
    return stringify(a[i1+1] != b[i2+1] ? b[i2+1] - a[i1+1] : c1 - c2);
  } else if (isldvowel(c1)) {
    return stringify(a[i1+1] != c2 ? a[i1+1] - c2 : 1);
  } else if (isldvowel(c2)) {
    return stringify(c1 != b[i2+1] ? c1 - b[i2+1] : -1);
  } else
    return stringify(c1 - c2);
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
  "ขวนขวาย"
  // 80
];
