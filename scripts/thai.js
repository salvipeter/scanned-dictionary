// Initialization. Should end with a call to display().
var init = function() {
  //checkData();                  // comment out when all data has been checked
  document.title = "Thai-English Student's Dictionary";
  document.getElementById("logo").innerHTML = "<img src=\"img/haas-th-en.jpg\" />";
  document.getElementById("title").innerHTML = "Thai - English";
  document.getElementById("dictionary").innerHTML = "Mary R. Haas, Stanford, 1964.";
  display();
};

// Returns "less" when a < b, "equal" when a = b, "greater" when a > b.
var wordCompare = function(a, b) {
  return "less";
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
