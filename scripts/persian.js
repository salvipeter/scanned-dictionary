// Initialization. Should end with a call to display().
var init = function() {
  checkData();                  // comment out when all data has been checked
  document.title = "Persian-English Dictionary";
  document.getElementById("logo").innerHTML = "<img src=\"img/aryanpur-pe-en.jpg\" />";
  document.getElementById("title").innerHTML = "Persian - English";
  document.getElementById("dictionary").innerHTML = "Abbas &amp; Manoochehr<br>Aryanpur-Kashani, 1996";
  display();
};

// Returns "less" when a < b, "equal" when a = b, "greater" when a > b.
var wordCompare = function(a, b) {
  var alphabet = "آءابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی"; // note the position of hamza
    var canonicalForm = function(word) {
    var result = "";
    for (var i = 0; i < word.length; ++i) {
      if (word[i] == '‌' || word[i] == 'ً')
        continue;
      if (word[i] == 'ئ')
          result += 'ی';
      else if (word[i] == 'ؤ')
          result += 'و';
      else if ("ٔأإ".indexOf(word[i]) >= 0)
        result += 'ء';
      else if (word[i] == 'ة')
        result += 'ه'; // or 'ت' ?!
      else
        result += word[i];
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
    var x = alphabet.indexOf(a[i]);
    var y = alphabet.indexOf(b[i]);
    if (x < 0 || y < 0)
      return undefined;
    if (x < y)
      return "less";
    if (x > y)
      return "greater";
    ++i;
  }
};

var page_zoom = 2.2;

// Dictionary pages
var images = "data/persiandic-";
var image_extension = ".png";
var start_page = 7;
var headwords = [               // first words in each page
"آ",
"آب",
"آبرویافت",
"آتش‌خانه",
"آذر",
"آزادانه",
"آسایشگاه",
"آشغال‌برچین",
"آفریده",
"آلودن",
"آموز",
"آوازه",
"آهنگر",
"ابتیاع",
"ابلوک",
"اتخاذ",
"اتوشوئی",
"اجاره",
"اجتهاد",
"اجلاس",
"احترام",
"احدیت",
"احوال",
"اختفا",
"اخذ",
"اخم",
"ادباء",
"اذفر",
"اربعه",
"ارثی",
"ارزیدن",
"ارنب",
"ازدیاد",
"استاد",
"استخلاص",
"استشهادی",
"استفاضه",
"استواء",
"اسلیقون",
"اشجار",
"اصلاح",
"اطاعت",
"اعاشه",
"اعجاز",
"اغراق",
"افراشتن",
"افسودگر",
"اقتداء",
"اقمار",
"اکنون",
"الحاق",
"الله‌بختی",
"امانتی",
"امدادی",
"امکان",
"اناث",
"انتخابات",
"انتقال",
"انجیر",
"انداز",
"اندوه",
"انسب",
"انعطاف",
"انفعالی",
"انکاری",
"انگیزش",
"اوتار",
"اهتزاز",
"ایام",
"ایزد",
"اینها",
"بابت",
"بادامک",
"بارک‌الله",
"باز",
"بازگرد",
"باطلاق",
"باقلوا",
"بالایی",
"باوقار",
"بخاری",
"بدا",
"بدرفتار",
"بدو",
"برابری",
"بربط",
"برداشتن",
"برقبردی",
"برگشته",
"برهیختن",
"بسا",
"بسیار",
"بغتة",
"بلشویک",
"بمب‌افکن",
"بنده‌زاده",
"بور",
"بهبودی",
"بیابانی",
"بی‌انضباط",
"بی‌توقف",
"بیخبری",
"بی‌دیانتی",
"بیشتری",
"بیغم",
"بیمارخیز",
"بین",
"بی‌وفائی",
"پا", // NB
"پادگان",
"پاسبانی",
"پاک‌نهاد",
"پایمالی",
"پختنی",
"پر",
"پرتوافکنی",
"پردل",
"پرسیاوش",
"پروتئینها",
"پریشان",
"پساب",
"پسند",
"پشگل",
"پلیوسن",
"پنهانی",
"پوست‌کنده",
"پولس",
"پیاده‌پا",
"پیچیده",
"پیروی‌کردن",
"پیشآمدگی",
"پیشکشی",
"پیل‌زور",
"ت",
"تابعیت",
"تاریک",
"تالم‌آور",
"تبار",
"تبلبل",
"تجریبات",
"تحریراً",
"تحلیلی",
"تخفیف",
"تخویف",
"تراجم",
"ترتیبی",
"ترشح",
"ترکیبی",
"تزئینی",
"تسلیحات",
"تشریح‌دان",
"تصادف‌کردن",
"تصنیف‌کردن",
"تطمیع",
"تعجب‌آور",
"تعقل",
"تعمیم",
"تغییرات",
"تفکیک",
"تقدیس",
"تقوی",
"تکریم‌کردن",
"تلاشی",
"تلفیق",
"تماماً",
"تمساح",
"تناوب",
"تندیدن",
"تنگ",
"تنی",
"توپ",
"تورانی",
"توضیح‌واضحات",
"تولیدمثل",
"تهمتن",
"تیرپرتاب",
"تیغه‌دار",
"ثانی",
"ج",
"جازده",
"جان‌دارو",
"جبران‌پدیر",
"جدیدالنسق",
"جریانات",
"جسارت‌آمیز",
"جف‌القلم",
"جلزوولز",
"جمال",
"جن",
"جنسیت",
"جواباً",
"جودرو",
"جوندگان",
"جهلا",
"چ",
"چارپاره",
"چال",
"چخماقی",
"چرخیدن",
"چشم‌انداز",
"چکش",
"چنباتمه",
"چوب‌خشک‌کن",
"چهارگوشه",
"چین‌گسله",
"حاصل‌خیز",
"حال‌ندار",
"حبسی",
"حدس",
"حربی",
"حریرباف",
"حساس",
"حشوی",
"حفره",
"حق‌بین",
"حکم",
"حلقه‌ای",
"حموضت",
"حیاط",
"خ",
"خاردار",
"خاک‌آلود",
"خام",
"خانه‌پردازی",
"ختائی",
"خدمتانه",
"خرت‌وپرت",
"خرطوم‌دار",
"خروشان",
"خسته‌خاطر",
"خشکیده",
"خطا",
"خط‌کشی",
"خفیه‌فروش",
"خلق",
"خمیرترش",
"خواب",
"خوار",
"خواننده",
"خودپرست",
"خوردنی",
"خوش‌خلق",
"خوش‌نواز",
"خون‌گرمی",
"خیره‌چشم",
"د",
"دادنامه",
"داعی",
"دانشمند",
"دج",
"در",
"دربان",
"درد",
"درست‌پیمان",
"درمان‌پدیر",
"درهم",
"دساتیر",
"دستبرد",
"دسته‌ایه",
"دشمنانه",
"دفعة",
"دلار",
"دلدار",
"دم",
"دنباله‌دار",
"دو",
"دوتخمه",
"دور",
"دوزبانی",
"دوکفه‌ای",
"دهان‌اژدر",
"دیاربکر",
"دیرپای",
"دیگ‌غول",
"ذ",
"ذغال‌چوب",
"ذهول",
"راجعه",
"راست‌باز",
"رانی",
"رب‌الجنود",
"رجل",
"ردع",
"رساننده",
"رسیدگی",
"رضامند",
"رفتن",
"رقیق",
"رمزخوانی",
"رنگ",
"روابط",
"روحا",
"روزنه",
"روضه‌خوانی",
"روی‌اندود",
"ریاض",
"ریش",
"ز",
"زاویه‌سنج",
"زبان‌بر",
"زخم",
"زدو",
"زرفین",
"زگیل",
"زمینی",
"زندانبان",
"زوال‌پدیر",
"زورآوری",
"زیادت",
"زیرا",
"زیلو",
"ژورای‌سفید",
"سابیده",
"سار",
"ساقدوش",
"سامری",
"سبب‌ساز",
"سبک‌اسلحه",
"سپیداب",
"ستون‌بندی",
"سخت‌پیشانی",
"سداب",
"سرا",
"سربار",
"سرچین",
"سردی",
"سرشناس",
"سرکردگی",
"سرم‌شناس",
"سرهنگ",
"سست‌مهار",
"سفاک",
"سفیداج",
"سکندری",
"سلام‌علیکم",
"سلک",
"سمعک",
"سند",
"سنگ‌زایی",
"سواحل",
"سوختگی",
"سورسات",
"سوگندشکن",
"سه‌کنج",
"سیاست‌باز",
"سیخ‌پر",
"سیل‌برگردان",
"سینی",
"شاخه‌شاخه",
"شاف",
"شانه",
"شایعه",
"شبق",
"شتابکاری",
"شراء",
"شرط‌بندی",
"شریان‌بند",
"شصتم",
"شقائق",
"شکستن",
"شکوک",
"شمالی",
"شناوران",
"شورش",
"شهامت",
"شیب",
"شیرمتراکم",
"شیفن",
"ص",
"صاف‌دل",
"صحت",
"صداع",
"صرف",
"صفافی",
"صلوات",
"صواعق",
"صیف",
"ضایعات",
"ضربات",
"ضریح",
"ضمانتی",
"ط",
"طامع",
"طبیه",
"طرفدارانه",
"طفره‌آمیز",
"طلسم‌کرده",
"طوسی",
"طیف",
"ظاهراً",
"ظن",
"عاجلاً",
"عاشقی",
"عالی",
"عایق‌کاری",
"عبیر",
"عددکوب",
"عذار",
"عرضحال",
"عریضی",
"عشاق",
"عصمتی",
"عطسه",
"عقابی",
"عقلاً",
"علاقه‌بند",
"علفی",
"عمارت",
"عملاً",
"عنایة",
"عوامل",
"عهدشکن",
"عید",
"غ",
"غالباً",
"غداً",
"غربت‌زده",
"غرورجوانی",
"غسیل",
"غفلت‌کار",
"غلک",
"غنج",
"غیب‌دانی",
"ف",
"فاره",
"فاکتور",
"فتح‌الله",
"فحش",
"فراخ‌دستی",
"فراموش‌خانه",
"فرحاً",
"فرستاده",
"فرضاً",
"فرمایش",
"فرورفتن",
"فرهنگسار",
"فسادکار",
"فشنگ‌پرکن",
"فعلاً",
"فکسنی",
"فلفلی",
"فنلاند",
"فوند",
"فیلم‌بردار",
"قابلمه",
"قاضی‌الحاجات",
"قالب‌ریز",
"قائم",
"قبول‌دار",
"قدر",
"قر",
"قربانگاه",
"قرنی",
"قسمت‌پذیر",
"قصور",
"قطع",
"قفل‌ابجد",
"قلع",
"قلیا",
"قندک",
"قولنامه",
"قهرمان",
"قی‌آور",
"ک",
"کار",
"کارپردازی",
"کاروانک",
"کاغذبر",
"کامکار",
"کاهن",
"کت",
"کثیر‌الانتشار",
"کج‌کلاه",
"کراشیدن",
"کردو",
"کرمک",
"کزاز",
"کسره",
"کشته",
"کشنده",
"کف",
"کفن‌پوش",
"کلاه‌بردار",
"کلوخ‌انداز",
"کم",
"کم‌ترکسی",
"کم‌قیمت",
"کنار",
"کند",
"کنه",
"کوتینی‌شدن",
"کورتاژ",
"کوفیه",
"کویت",
"کهیر",
"کیفی",
"گ",
"گاودنبال",
"گذار",
"گذشته",
"گرد",
"گردگیری",
"گردیده",
"گرفتن",
"گرگ‌صفت",
"گروش",
"گریزنده",
"گزیلن",
"گشایش",
"گفتی",
"گلبن",
"گلوله‌باران",
"گمانش",
"گنجائی",
"گواهی",
"گوشتالو",
"گول‌خور",
"گیاه‌دار",
"گیس",
"لاتاری",
"لاشه‌خوار",
"لال‌بازی",
"لالی",
"لب‌سوز",
"لحظه‌به‌لحظه",
"لرزان",
"لطفاً",
"لغ",
"لفافه",
"لگدانداز",
"لنگرخانه",
"لوکس",
"لئامت",
"م",
"مادام",
"مادیات",
"ماشین",
"مالشی",
"ماموریت",
"مانوس",
"ماهی",
"ماهیچه",
"ماهیچه",
"ماهیچه‌شناس",
"مایوسانه",
"مبادی",
"مبتکراً",
"مبهمات",
"متجاهر",
"متر",
"متشیع",
"متعسر",
"متقابل",
"متمرد",
"متوحش",
"مثانه",
"مجاورت",
"مجردات",
"مجملاً",
"محافظ",
"محتکر",
"محزن",
"محقرانه",
"محو",
"مختص",
"مخلص",
"مداومت",
"مدل",
"مرابحه",
"مربا",
"مرتجل",
"مرحمت",
"مردم‌آزار",
"مردی",
"مرغ‌بسشتی",
"مرگبار",
"مریم‌پرست",
"مزبله",
"مزید",
"مسافرخانه",
"مسبوک",
"مستحدثات",
"مستعین",
"مستوی",
"مسکت",
"مسمومیت",
"مشاربالبنان",
"مشت‌زنی",
"مشروب",
"مشکو",
"مصادم",
"مصلحت",
"مضرس",
"مطبع",
"مظالم",
"معاضدت",
"معتدل",
"معرب",
"معطلی",
"معمور",
"مغایرت",
"مغناطیسی",
"مفخر",
"مفقود",
"مقاومت",
"مقدماتی",
"مقعر‌الطرفین",
"مکانیک",
"مکمن",
"ملاحظه‌کار",
"ملایمت",
"ملزم",
"ملهوف",
"ممر",
"ممیزی",
"مناعت",
"منبعث",
"منتقد",
"منحصر",
"منزوی",
"منصف",
"منظورنظر",
"منفعت",
"منقسم",
"منکوب",
"مو",
"مواطن",
"مؤتمن",
"موجی",
"موروث",
"موشک‌پرانی",
"موفقیت",
"مؤلف",
"مویه‌گر",
"مهر",
"مهمات",
"مهیمن",
"می‌پرست",
"میز",
"میلاد",
"ن",
"ناتمامی",
"نار",
"نازکی",
"ناصری",
"ناکسی",
"نامرغوبی",
"نامه‌نویس",
"نباش",
"نحاس",
"نراد",
"نزدیک",
"نسبت",
"نشاط‌آور",
"نشستن",
"نصوح",
"نظر",
"نظیره",
"نفتالین",
"نفسانیت",
"نقاهت",
"نقطه",
"نکته‌دان",
"نگاهداری‌کردن",
"نمامی",
"نمط",
"نمود",
"نواب",
"نوائیدن",
"نور",
"نوش",
"نوکر",
"نهاده",
"نیا",
"نیزه‌پران",
"نیک‌سیرت",
"نیمچهره",
"و",
"واحداً",
"واردات",
"واژگون",
"واقعاً",
"واگونچی",
"وتری",
"وجین",
"وراجی",
"ورشکستی",
"ورود",
"وزیر",
"وسیله‌جو",
"وصولی",
"وعده‌خلاف",
"وقت‌شناس",
"وکلاء",
"وهاب",
"ه",
"هتاک",
"هدیةً",
"هرروزه",
"هزارچشمه",
"هشتاد",
"هفتادم",
"هلاهل",
"هماسم",
"همخو",
"همرائی",
"هم‌صحبت",
"هم‌وثاق",
"هندو",
"هوابرد",
"هوس",
"هیاکل",
"هیکل‌تراش",
"یاخته",
"یارمند",
"یحتمل",
"یسر",
"یک‌پارچگی",
"یکران",
"یکه‌تاز",
"یوماً"
];