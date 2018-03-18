// Initialization. Should end with a call to display().
var init = function() {
  document.title = "Oxford Hindi-English Dictionary";
  document.getElementById("logo").innerHTML = "<img src=\"img/oxford-hi-en.jpg\" />";
  document.getElementById("title").innerHTML = "Hindi - English";
  document.getElementById("dictionary").innerHTML = "R.S.McGregor, Oxford, 1993.";
  display();
};

// Returns "less" when a < b, "equal" when a = b, "greater" when a > b.
var wordCompare = function(a, b) {
  var hindi = {
    "complex": "ँॉक़ख़ग़ज़ड़ढ़फ़",
    "simple":  "ंाकखगजडढफ",
    "nasals": "ङञणनम",
    "half": "ािीुूृेैोौ",
    "base": "कखगघचछजझटठडढतथदधपफबभ",
    "full": "अआइईउऊऋएऐओऔः" +
            "कखगघङ" +
            "चछजझञ" +
            "टठडढण" +
            "तथदधन" +
            "पफबभम" +
            "यरलव" +
            "शषसह"
  };
  var canonicalForm = function(word) {
    var result = "";
    for (var i = 0; i < word.length; ++i) {
      if (i + 2 < word.length && word[i+1] == '्' &&
          hindi["nasals"].indexOf(word[i]) >= 0 &&
          hindi["base"].indexOf(word[i+2]) >= 0) {
        result += "ं";
        ++i;
      } else {
        var j = hindi["complex"].indexOf(word[i]);
        if (j >= 0)
          result += hindi["simple"][j];
        else
          result += word[i];
      }
    }
    return result;
  };
  a = canonicalForm(a);
  b = canonicalForm(b);
  var i = 0;
  while (true) {
    if (i == a.length && i == b.length)
      return "equal";
    if (i == a.length)
      return "less";
    if (i == b.length)
      return "greater";
    var x = hindi["full"].indexOf(a[i]);
    var y = hindi["full"].indexOf(b[i]);
    if (x < 0 || y < 0) {
      if (a[i] == b[i]) {
        ++i;
        continue;
      }
      return undefined;
    }
    if (x < y)
      return "less";            // क < ग
    if (x > y)
      return "greater";         // ग < क
    if (i + 1 < a.length && a[i+1] == "ं" && (i + 1 == b.length || b[i+1] != "ं"))
      return "less";            // कं < क
    if (i + 1 < b.length && b[i+1] == "ं" && (i + 1 == a.length || a[i+1] != "ं"))
      return "greater";         // क > कं
    if (i + 1 < a.length && i + 1 < b.length && a[i+1] == "ं" && b[i+1] == "ं") {
      i += 2;
      continue;
    }
    if (i + 1 < a.length && a[i+1] == "्" && (i + 1 == b.length || b[i+1] != "्"))
      return "greater";         // क् > क
    if (i + 1 < b.length && b[i+1] == "्" && (i + 1 == a.length || a[i+1] != "्"))
      return "less";            // क < क्
    if (i + 1 < a.length && i + 1 < b.length && a[i+1] == "्" && b[i+1] == "्") {
      i += 2;
      continue;
    }
    x = hindi["half"].indexOf(a[i+1]);
    y = hindi["half"].indexOf(b[i+1]);
    if (i + 1 < a.length && i + 1 < b.length && x >= 0 && y >= 0) {
      if (x < y)
        return "less";          // का < कि
      if (x > y)
        return "greater";       // कि > का
      ++i;
    }
    else if ((i + 1 == a.length || x < 0) && i + 1 < b.length && y >= 0)
      return "less";            // क < का
    else if ((i + 1 == b.length || y < 0) && i + 1 < a.length && x >= 0)
      return "greater";         // का < क
    ++i;
  }
};

// Dictionary pages
var images = "data/hindidic-";
var image_extension = ".png";
var headwords = [
"अंक",
"अँकुसी",
"अंगारी",
"अंजन",
"अंड",
"अंतर",
"अंदरूनी",
"अंब",
"अकड़",
"अकाजी",
"अक्खड़पन",
"अखंडनीय",
"अगती",
"अगुवा",
"अघोरी",
"अचीता",
"अज़",
"अज़ीज़ी",
"अटकाव",
"अठखेलपन",
"अडिग",
"अतिकाय",
"अत्यंत",
"अदली-बदली",
"अद्वेष",
"अधिकरण",
"अधियार",
"अधोतर",
"अनंतर",
"अनजानी",
"अनभिलाषी",
"अनसुना",
"अनादि",
"अनिल",
"अनुगमन",
"अनुनीत",
"अनुमरण",
"अनुवाद",
"अनुहार",
"अन्वयन",
"अपन",
"अपराध",
"अपहार",
"अपेक्षित",
"अप्राप्ति",
"अबड़-धबड़",
"अब्बा",
"अभिजात्य",
"अभियांत्रिकी",
"अभिहित",
"अमड़ा",
"अमलतासी",
"अमी",
"अयान",
"अरमनी",
"अरुणित",
"अर्थात्",
"अलक़तरा",
"अललाना",
"अलोभ",
"अवगुण",
"अवधूत",
"अवश्यम",
"अविच्छिन्न",
"अविषय",
"अशांत",
"अष्टक",
"असत्कार",
"असाक्षिक",
"असुरी",
"अस्थैर्य",
"अहरन",
"अहो",
"आँक",
"आँख",
"आँगा",
"आँवन",
"आकली",
"आक्रांत",
"आगत",
"आग़ोश",
"आज़माइश",
"आडंबर",
"आतुर",
"आदमी",
"आधान",
"आनंदी",
"आपत्ति",
"आबद्ध",
"आम",
"आयस",
"आरज़ा",
"आरोग्यता",
"आलसीपन",
"आव",
"आवासिक",
"आशिक़ी",
"आसनी",
"आसुरी",
"आह्लादक",
"इंगलिसिया",
"इंद्राणी",
"इकाई",
"इजारा",
"इत्तफ़ाक़न",
"इनी",
"इलाक़ा",
"इसरार",
"ईंगुर",
"ईदुज़्ज़ोहा",
"ईसाई",
"उँ",
"उकवाँ",
"उगहना",
"उचार",
"उजड़वाना",
"उझेल",
"उठा-बैठी",
"उड़िया",
"उतारन",
"उत्कृष्टता",
"उत्पाटन",
"उदमद",
"उद्दीपन",
"उधड़ना",
"उन्मुखर",
"उपजीवी",
"उपयुक्तता",
"उपशमन",
"उपेक्ष्य",
"उभार",
"उरस",
"उलटवाँसी",
"उल्लिखित",
"उस्ताद",
"ऊँ",
"ऊझड़",
"ऊर्जा",
"ऋक्",
"एंच-पेंच",
"एकंतरा",
"एकांतिक",
"एतादृशी",
"ऐंच",
"ऐकाहिक",
"ओंकार",
"ओटनी",
"ओरहन",
"औंगन",
"औटाना",
"औषधि",
"कंक",
// TODO
"ह्रस्व"
];
