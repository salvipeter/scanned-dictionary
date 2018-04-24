// Initialization. Should end with a call to display().
var init = function() {
  //checkData();                  // comment out when all data has been checked
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
      }
      else if (word[i] == '़' || word[i] == '-')
        continue;
      else {
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
    if (x < 0 || y < 0)
      return undefined;
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
      if (i + 2 < a.length && a[i+2] == "ं" && (i + 2 == b.length || b[i+2] != "ं"))
        return "less";            // कां < का
      if (i + 2 < b.length && b[i+2] == "ं" && (i + 2 == a.length || a[i+2] != "ं"))
        return "greater";         // का > कां
      if (i + 2 < a.length && i + 2 < b.length && a[i+2] == "ं" && b[i+2] == "ं")
        ++i;
      ++i;
    }
    else if ((i + 1 == a.length || x < 0) && i + 1 < b.length && y >= 0)
      return "less";            // क < का
    else if ((i + 1 == b.length || y < 0) && i + 1 < a.length && x >= 0)
      return "greater";         // का < क
    ++i;
  }
};

var page_zoom = 2;

// Dictionary pages
var images = "data/hindidic-";
var image_extension = ".png";
var start_page = 0;
var headwords = [               // first words in each page
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
"अनुहार-",
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
"अवश्यम-",
"अविच्छिन्न",
"अविषय",
"अशांत",
"अष्टक",
"असत्कार",
"असाक्षिक",
"असुरी",
"अस्थैर्य",
"अहरन",
"अहो-",
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
"आव-",
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
"-इनी",
"इलाक़ा",
"इसरार",
"ईंगुर",
"ईदुज़्ज़ोहा",
"ईसाई",
"उँ",
"उकवाँ",
"उगहना",
"उचार-",
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
"एंचपेंच",
"एकंतरा",
"एकांतिक",
"एतादृशी",
"ऐंच",
"ऐकाहिक",
"ओंकार",
"ओटनी",
"ओरहन-",
"औंगन",
"औटाना",
"औषधि",
"कंक",
"कंजरपन",
"कंदल",
"ककहरा",
"कचहरिया",
"कच्छ",
"कटकरंज",
"कटिया",
"कठोरपन",
"कड़ा",
"कणिका",
"कथक",
"कद्दू",
"कनियाहट",
"कपाट",
"कबक",
"कमंद",
"कमल",
"क़मीज़",
"करक",
"क़रनाई",
"करामत",
"करेरा",
"कर्तन",
"कर्म-मीमांसा",
"कलक्टरी",
"कलसी",
"कलीसा",
"कल्पनीय",
"कश्ती",
"कसमसाहट",
"कसैला",
"कहा",
"काँजी",
"का",
"काछना",
"काठिन्य",
"कान",
"काफ़ूर",
"काम-",
"काया",
"कार्त्तिकेय",
"कालापन",
"काषाय",
"किटकिटी",
"किम्",
"किरोना",
"किश्ती",
"क़ीमा",
"कुंडी",
"कुआर",
"कुज",
"कुड़कुड़ाना",
"क़ुदरती",
"कुब्जा",
"कुरम-कुरम",
"क़ुर्बान",
"कुलिंजन",
"कुसंग",
"कूकर",
"कृतक",
"कृष्णत्व",
"केसरी",
"को",
"कोटिक",
"कोफ्ता",
"कोश",
"कौणप",
"क्यारी",
"क्रूरता",
"क्षत्रियता",
"क्षेत्रीय",
"खँख",
"खक्खा",
"खटकाना",
"खड़खड़ाहट",
"खत्ता",
"खपना",
"ख़यालात",
"खरापन",
"खल",
"खवैया",
"ख़ाका",
"ख़ान",
"ख़ारिश",
"खिंडवाना",
"खिलवाड़ी",
"खीजना",
"खुदना",
"ख़ुरजी",
"खुलाई",
"ख़ूनी",
"खेपना",
"खोंच",
"खोडर",
"खौलना",
"गंग",
"गंड",
"गँवारी",
"ग़टरगूँ",
"गड़बड़ी",
"गणक",
"गदलापन",
"ग़फ़",
"गरगज",
"गरामी",
"गर्भ",
"गलन",
"ग़लीज़",
"गहनी",
"गांड",
"गाढ़ना",
"गारा",
"गिट्टा",
"गिराऊ",
"गीला",
"गुजराती",
"गुड्डी",
"गुदवाना",
"गुमटा",
"गुर्दा",
"गुलौरा",
"गूझा",
"गेंडुआ",
"गैल",
"गोचना",
"गोदना",
"गोरा",
"गोस्वामी",
"गौर",
"ग्राम",
"घँगोल",
"घटित",
"घना",
"घरऊ",
"घाई",
"घाल",
"घिस्सम-घिस्सा",
"घुन",
"घुसायन",
"घेघरा",
"घोड़ी",
"चंग",
"चंदा",
"चंबल",
"चकवी",
"चखाना",
"चटखारना",
"चड्डा",
"चतुर",
"चपत",
"चमकना",
"चमरस",
"चरड़-चरड़",
"चराई",
"चलता",
"चलायमान",
"चहुँ",
"चाँप",
"चातुरी",
"चार",
"चालाकी",
"चिंघाड़",
"चिकनापन",
"चिड़",
"चित्तरसारी",
"चिनगारी",
"चिरकना",
"चिलबिला",
"चीड़",
"चुंबकत्व",
"चुटकुला",
"चुनवाना",
"चुभलाना",
"चुसकी",
"चूड़ीहारा",
"चूल्हा",
"चेराई",
"चोकर",
"चोरी",
"चौक",
"चौकोन",
"चौपही",
"च्यवन",
"छँकाना",
"छकवाना",
"छत",
"छनाक",
"छरहरा",
"छाँड़ना",
"छात्र",
"छाल",
"छिड़वाना",
"छियासी",
"छुँगली",
"छुतहा",
"छेंकना",
"छोटा",
"ज़ंग",
"जंतरी",
"जग",
"जघन्यता",
"जड़ता",
"जदुईस",
"ज़नाना",
"जन्मना",
"ज़बानी",
"जमादार",
"जम्हाना",
"जरायु",
"जलंघर",
"जलाऊ",
"जवान",
"ज़हर",
"जाँब",
"जाड़ा",
"जान",
"जानो",
"जाया",
"जाहिली",
"ज़िदियाना",
"जिल्दी",
"जी",
"ज़ीना",
"जीवनमुक्त",
"जुझाऊ",
"जुर-",
"जूठा",
"जूला",
"जेहड़",
"जोगिन",
"जोधा",
"जौ",
"ज्ञापक",
"ज्वार",
"झं",
"झक",
"झजरी",
"झनकना",
"झमक",
"झलवाई",
"झाँवर",
"झारना",
"झिलमिलाना",
"झुनझुनी",
"झूमना",
"झोकवाह",
"टंकी",
"टकुआ",
"टपकना",
"टहना",
"टाप",
"टिकोरा",
"टुंच",
"टूम",
"टेरनि",
"टोली",
"ठंड",
"ठगिनी",
"ठमकना",
"ठाठा",
"ठीकम-ठीक",
"ठूँसना",
"ठोकर",
"डंक",
"डग-डग",
"डब्बा",
"डाँक-",
"डाकिन",
"डिंगल",
"डुबाना",
"डोंब",
"डौल",
"ढँकना",
"ढफ",
"ढाँसी",
"ढिसर-",
"ढेंकली",
"ढोंडी",
"तंग",
"तंबू",
"तकवा",
"तगाई",
"तड़पाना",
"तथा",
"तनाना",
"तपो-",
"तमंचा",
"तर",
"तरलता",
"तरुण",
"तलमली",
"तवा",
"तस्कीन",
"तांबूल",
"ताज़ियाना",
"ताना",
"तामील",
"तारीफ़",
"ताव-",
"तित्तिरी",
"तिरपाल",
"तिलक",
"-ती",
"तीवरता",
"तुनतुनी",
"तुरुक",
"तुष्टता",
"तृप्त",
"तेरही",
"तैनाती",
"तोडर",
"तोल",
"त्यागना",
"त्रिक",
"त्वरित",
"थंब",
"थर्राना",
"थावस",
"थूवा",
"दंग",
"दँतारा",
"दक्ष",
"दग़ा",
"दधि",
"दबकीला",
"दम",
"दमकीला",
"दर",
"दरमियानी",
"दरेज़",
"दर्शनी",
"दली",
"दसना",
"दह",
"दहोका",
"दांतिक",
"दाख़िला",
"दाटुर",
"दाम",
"दाया",
"दाला",
"दाहिनी",
"दिठवन",
"दिया",
"दिल",
"दिवाना",
"दीदार",
"दीर्घ",
"दुअन्नी",
"दुकानदार",
"दुधार",
"दुर-",
"दुरुस्ती",
"दुष्टता",
"दूधा",
"दूरता",
"दृढ़ीकरण",
"देग",
"देव",
"देशीकरण",
"दैव्य",
"दोयम",
"दोहराव",
"दौर्गंध्य",
"द्रुति",
"द्वितीय",
"धंधक",
"धक्काड़",
"धड़वा",
"धन",
"धन्यता",
"धमन",
"धराई",
"धर्मता",
"धाँधलपन",
"धानुष्क",
"धाला",
"धीरज",
"धुगधगुी",
"धुलना",
"धूमिल",
"धेनुका",
"धोरा",
"ध्यान-",
"ध्वान",
"नंग",
"नकटा",
"नक्की",
"नगरी",
"नज़ारा",
"ननद",
"नमदा",
"नरकट",
"नव",
"नवेली",
"नसीहा",
"ना-",
"नाक",
"नाग़ा",
"नाठ",
"नानिहाल",
"नामक",
"नालकी",
"नाहिं",
"निःस्वीकरण",
"निकास",
"निखोट",
"निघात",
"निडरता",
"निधुवन",
"निबटना",
"निमीली",
"नियार",
"निरपेक्ष",
"निरायुध",
"निरूपक",
"निर्णीत",
"निर्मम",
"निर्वासन",
"निवार-",
"निशास्ता",
"निष्क",
"निष्पुत्र",
"निस्वन",
"नीकौ",
"नीरसता",
"नुक़सानी",
"नेकु",
"नेह",
"नोचना",
"नौग्रही",
"न्यारिया",
"पंक",
"पंचक",
"पंजाब",
"पँवाड़ा",
"पक्कापन",
"पगड़ी",
"पचासी",
"पट",
"पटहा",
"पट्टा",
"पड़पड़ाना",
"पतई",
"पत्तन",
"पथरी",
"पद्मकी",
"पनाही",
"पयस्य",
"पर",
"परची",
"परनाली",
"परसों",
"परावर्त्य",
"परिजन",
"परिपूरक",
"परिवहन",
"परिसमापन",
"परेती",
"पलंगड़ी",
"पलाना",
"पल्ला",
"पश्चाद्वर्ती",
"पहचानना",
"पहाड़ा",
"पांडित्य",
"पाँसना",
"पागलपना",
"पाठित",
"पाद",
"पानीय",
"पार-",
"पारायण",
"पालथी",
"पाषंड",
"पिंजरा",
"पिचर-पिचर",
"पितिया",
"पिपौली",
"पिशुनता",
"पीठ",
"पीपड़ा",
"पुंडेरिया",
"पुटपुटाना",
"पुनश-",
"पुरातनता",
"पुलिंदा",
"पूँगड़ा",
"पूनी",
"-पूर्वक",
"पेंसिल",
"पेटक",
"पेशगी",
"पैज",
"पैरना",
"पोइस",
"पोथी",
"पोस्त",
"पौरुष",
"प्रकार",
"प्रक्षेपित",
"प्रच्युति",
"प्रतारणा",
"प्रतिध्वनित",
"प्रतिबोध",
"प्रतिवचन",
"प्रतीक्षित",
"प्रत्युक्ति",
"प्रदेह",
"प्रभंजन",
"प्रमुख",
"प्रलेप",
"प्रविधि",
"प्रशासित",
"प्रस्तार",
"प्रह्लाद",
"प्राणक",
"प्राभव",
"प्रीतम",
"प्रोत्साहन",
"फंका",
"फ़ख़्र",
"फड़",
"फनिग",
"फ़रमा",
"फ़रो",
"फलन",
"फ़सादी",
"फागुनी",
"फाली",
"फ़ितूर",
"फिसलहा",
"फुनंग",
"फुलाना",
"फूटन",
"फेंकर-",
"फेरी",
"फ़ोता",
"बंक",
"बँटाव",
"बंधकी",
"बंस",
"बकला",
"बखानी",
"बगला",
"बचाव",
"बजाना",
"बटोई",
"बड़ाई",
"बढ़िया",
"बद",
"बदलाई",
"बनजरिया",
"बनावटी",
"बम",
"-बर",
"बरधा",
"बरसोदिया",
"बरीस",
"बल",
"बलात्",
"बस",
"बहक",
"बहादुरी",
"बहुता",
"बाँकैत",
"बांधव",
"बाख",
"बाजना",
"बाढ़",
"बातचीत",
"बाधवाई",
"बाबरी",
"बारहखड़ी",
"बाल",
"बालू",
"बाहर",
"बिकाल",
"बिचार",
"बिझरा",
"बिदाई",
"बिफरना",
"बिल",
"बिलोड़ना",
"बिसाना",
"बिही",
"बीट",
"बुंदेला",
"बुड़की",
"बुनियादी",
"बुहारन",
"बूर",
"बेकस",
"बेटा",
"बेल",
"बैंहत्था",
"बैरंग",
"बोड़ा",
"बोली",
"ब्यान",
"ब्रह्मण",
"भंग",
"भंडसाल",
"भक्ति",
"भचक",
"भड़कना",
"भद्रक",
"भर",
"भरभराहट",
"भलापन",
"भांडार",
"भाग्य",
"भानु",
"भाव-",
"भासित",
"भिन्नता",
"भील",
"भुतहा",
"भुसावन",
"भूभल",
"भृत्य",
"भैंस",
"भोजन",
"भ्रमण",
"मंग",
"मंजरित",
"मंडित",
"मंदार",
"मक्कारी",
"मग़रूरी",
"मछमारी",
"मज़ाक़न",
"मटराला",
"मणि",
"मथना",
"मद्य",
"मन",
"मनसिज",
"मनौती",
"मरगजा",
"मरहटी",
"मर्त्य",
"मलय",
"मवाजिब",
"मसरफ़",
"मस्ताना",
"महबूबा",
"महातम",
"महीना",
"माँज-",
"मागध",
"माता",
"माधुर्य",
"मानस",
"मामता",
"मारकीन",
"मार्गशीर्ष",
"मालीदा",
"मिचलाना",
"मित्रता",
"मिलना",
"मिश्रण",
"मीत",
"मुंडा",
"मुँह",
"मुँहासा",
"मुकरना",
"मुख",
"मुछंदर",
"मुडेर",
"मुद्रिका",
"मुबाह",
"मुरमुराना",
"मुलायमियत",
"मुसलमानी",
"मुहर्रिरी",
"मूँदना",
"मूलक",
"मृत्यु",
"मेघ",
"मेल-",
"मेहराब",
"मैलापन",
"मोटाई",
"मोर",
"मोहलत",
"मौर",
"यंत्र",
"यत",
"यम",
"याचना",
"यार",
"यूरोप",
"यौवन",
"रंक",
"रँगाना",
"रँभा",
"रखना",
"रगड़ान",
"रजपूती",
"रतनिया",
"रपट",
"रमना",
"रसद",
"रसी",
"रहमत",
"राँवा",
"राज",
"राज़ी",
"राबड़ी",
"राव",
"राहक",
"रियायती",
"रीस",
"रुचि",
"रूँथना",
"रूपसी",
"रेख़ती",
"रेस्टरंट",
"रोग़न",
"रोना",
"रोशनाई",
"रौवार",
"लंक",
"लँघना",
"लक़वा",
"लख़्त",
"लगाम",
"लघुता",
"लट",
"लड़क-",
"लढ़ा",
"लद्दू",
"लप्पड़",
"लय",
"लव",
"लहकौरि",
"लहेरा",
"लाग-",
"लाड़",
"लाल",
"लावणिक",
"लिक्खाड़",
"लिप्त",
"लीबड़",
"लुचुई",
"लुहार",
"लेखनी",
"लेवा",
"लोगाई",
"लोबिया",
"लौंडा",
"वंका",
"वक्तव्य",
"वज़ू",
"वपु",
"वरासत",
"वर्तिका",
"वसंत",
"वहशियाना",
"वाचा",
"वान",
"वारक",
"वालिदैन",
"वाहिनी",
"विकिरण",
"विघ्नित",
"विजन्मा",
"वितर्क्य",
"विद्युज्-",
"विधेयक",
"विपक्षता",
"विभाजन",
"विमुखता",
"विरहित",
"विलय",
"विवस्त्र",
"विशेषक",
"विष",
"विसर्जन",
"विह्वलता",
"वृश्चिक",
"वेला",
"वैमनस्य",
"व्यंग्य",
"व्यवधायक",
"व्याज",
"व्योम",
"शंकर",
"शक्त",
"शपथ",
"शय्या",
"शरीर",
"शस्य",
"शाकिर",
"शामन",
"शासित",
"शिक्षक",
"शिली",
"शीत",
"शुक्रिया",
"शुष्कता",
"शेर",
"शोचनीय",
"शौक़ीनी",
"श्रव्यता",
"श्लेष",
"षट्-",
"संक-",
"संकेतन",
"संगतिया",
"संचय",
"संतति",
"संदेशी",
"संपातिक",
"संभरण",
"संयुक्त",
"संशयालु",
"सँहार-",
"सकुचीला",
"सगाई",
"सज",
"सज्ञानता",
"सड़ाँध",
"सतीत्व",
"सत्यता",
"सदा",
"सनकी",
"सन्नाना",
"सप्त-",
"सबक़",
"सम",
"समधियाना",
"समवाय",
"समाधिकारी",
"समीक्षित",
"सम्मत",
"सर",
"सरबस",
"सराप-",
"सरोकार",
"सर्वतोमुखी",
"सलामी",
"सवालात",
"सहचारिणी",
"सहस-",
"सहूलत",
"साँचा",
"सांबर",
"साई",
"साज",
"साथर",
"साधारण",
"साफल्य",
"सामरिक",
"साया",
"सार्वत्रिक",
"सावनी",
"साहित्यिक",
"सिंघारा",
"सिखनी",
"सितारा",
"सिफ़ारिश",
"सिरका",
"सिरज-",
"सिलाजीत",
"सींकुर",
"सीड़ा",
"सीमा",
"सुअवसर",
"सुखलाना",
"सुचिंतित",
"सुतंत्र",
"सुधड़न",
"सुनापट",
"सुप्रसन्न",
"सुमनसी",
"सुरत",
"सुरैत",
"सुवा",
"सुस्थ",
"सूँड़का",
"सूजन",
"सूप",
"सूर्या",
"सेगौन",
"सेव",
"सै",
"सोखना",
"सोयन",
"सौंदन",
"सौतेला",
"स्तंभ",
"स्थानिक",
"स्नेह",
"स्फोटक",
"स्व-",
"स्वप्निल",
"स्वस्ति",
"स्वाभाविक",
"हँकड़ना",
"हँसाना",
"हगासा",
"हठ-",
"हड्डीला",
"हथोरी",
"हमता",
"हर",
"हरभरा",
"हरिअर",
"हर्ष",
"हलबलाहट",
"हवा",
"हसरत",
"हाँसना",
"हाथ",
"हाथा",
"हार",
"हावी",
"हिंसालु",
"हिनकना",
"हिरासत",
"हिसाबिया",
"ही-ही",
"हुड़दंगा",
"हुसैन",
"हृदयता",
"हेलना",
"हो",
"होरा",
"ह्रस्व"
];
