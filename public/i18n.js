/**
 * Guard i18n — automatic language detection for the verification page.
 * Picks the best match from the browser's language list (navigator.languages),
 * falls back to English. Add ?lang=xx to the URL to force a language (testing).
 *
 * Usage: GuardI18n.t('key')  |  elements with data-i18n="key" are filled automatically.
 */
(function () {
  const STRINGS = {
    en: {
      title: 'Human Verification',
      subtitle: "Slide the puzzle piece into place to confirm you're a real person. This quick check helps protect this site from automated bots.",
      loading: 'Loading…', hint: 'Slide to complete the puzzle', refresh: 'Refresh', verified: 'Verified',
      errLoad: "Couldn't load the verification. Please refresh.", errNetwork: 'Network error. Please try again.',
      errVerify: 'Verification failed. Please try again.', okBadge: 'Verification complete',
      okMsg: 'Thank you. You have been verified as a human visitor.', retest: 'Verify again',
      errProtected: 'Something went wrong. Please try again.'
    },
    es: {
      title: 'Verificación humana',
      subtitle: 'Desliza la pieza del rompecabezas hasta su lugar para confirmar que eres una persona real. Esta comprobación rápida ayuda a proteger este sitio de bots automatizados.',
      loading: 'Cargando…', hint: 'Desliza para completar el rompecabezas', refresh: 'Actualizar', verified: 'Verificado',
      errLoad: 'No se pudo cargar la verificación. Actualiza la página.', errNetwork: 'Error de red. Inténtalo de nuevo.',
      errVerify: 'La verificación falló. Inténtalo de nuevo.', okBadge: 'Verificación completada',
      okMsg: 'Gracias. Se ha verificado que eres un visitante humano.', retest: 'Verificar de nuevo',
      errProtected: 'Algo salió mal. Inténtalo de nuevo.'
    },
    fr: {
      title: 'Vérification humaine',
      subtitle: "Faites glisser la pièce du puzzle à sa place pour confirmer que vous êtes une personne réelle. Cette vérification rapide aide à protéger ce site contre les robots automatisés.",
      loading: 'Chargement…', hint: 'Faites glisser pour terminer le puzzle', refresh: 'Actualiser', verified: 'Vérifié',
      errLoad: 'Impossible de charger la vérification. Veuillez actualiser.', errNetwork: 'Erreur réseau. Veuillez réessayer.',
      errVerify: 'Échec de la vérification. Veuillez réessayer.', okBadge: 'Vérification terminée',
      okMsg: 'Merci. Vous avez été vérifié en tant que visiteur humain.', retest: 'Vérifier à nouveau',
      errProtected: "Une erreur s'est produite. Veuillez réessayer."
    },
    de: {
      title: 'Verifizierung',
      subtitle: 'Schieben Sie das Puzzleteil an die richtige Stelle, um zu bestätigen, dass Sie ein Mensch sind. Diese kurze Prüfung schützt diese Website vor automatisierten Bots.',
      loading: 'Wird geladen…', hint: 'Zum Lösen des Puzzles schieben', refresh: 'Aktualisieren', verified: 'Verifiziert',
      errLoad: 'Die Verifizierung konnte nicht geladen werden. Bitte aktualisieren Sie die Seite.', errNetwork: 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
      errVerify: 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.', okBadge: 'Verifizierung abgeschlossen',
      okMsg: 'Vielen Dank. Sie wurden als menschlicher Besucher verifiziert.', retest: 'Erneut verifizieren',
      errProtected: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
    },
    pt: {
      title: 'Verificação humana',
      subtitle: 'Deslize a peça do quebra-cabeça até o lugar certo para confirmar que você é uma pessoa real. Esta verificação rápida ajuda a proteger este site contra bots automatizados.',
      loading: 'Carregando…', hint: 'Deslize para completar o quebra-cabeça', refresh: 'Atualizar', verified: 'Verificado',
      errLoad: 'Não foi possível carregar a verificação. Atualize a página.', errNetwork: 'Erro de rede. Tente novamente.',
      errVerify: 'A verificação falhou. Tente novamente.', okBadge: 'Verificação concluída',
      okMsg: 'Obrigado. Você foi verificado como visitante humano.', retest: 'Verificar novamente',
      errProtected: 'Algo deu errado. Tente novamente.'
    },
    it: {
      title: 'Verifica umana',
      subtitle: 'Fai scorrere il pezzo del puzzle al suo posto per confermare di essere una persona reale. Questo rapido controllo aiuta a proteggere il sito dai bot automatici.',
      loading: 'Caricamento…', hint: 'Scorri per completare il puzzle', refresh: 'Aggiorna', verified: 'Verificato',
      errLoad: 'Impossibile caricare la verifica. Aggiorna la pagina.', errNetwork: 'Errore di rete. Riprova.',
      errVerify: 'Verifica non riuscita. Riprova.', okBadge: 'Verifica completata',
      okMsg: 'Grazie. Sei stato verificato come visitatore umano.', retest: 'Verifica di nuovo',
      errProtected: 'Qualcosa è andato storto. Riprova.'
    },
    nl: {
      title: 'Menselijke verificatie',
      subtitle: 'Schuif het puzzelstuk op zijn plek om te bevestigen dat u een echt persoon bent. Deze snelle controle helpt deze site te beschermen tegen geautomatiseerde bots.',
      loading: 'Laden…', hint: 'Schuif om de puzzel te voltooien', refresh: 'Vernieuwen', verified: 'Geverifieerd',
      errLoad: 'De verificatie kon niet worden geladen. Vernieuw de pagina.', errNetwork: 'Netwerkfout. Probeer het opnieuw.',
      errVerify: 'Verificatie mislukt. Probeer het opnieuw.', okBadge: 'Verificatie voltooid',
      okMsg: 'Bedankt. U bent geverifieerd als menselijke bezoeker.', retest: 'Opnieuw verifiëren',
      errProtected: 'Er is iets misgegaan. Probeer het opnieuw.'
    },
    pl: {
      title: 'Weryfikacja człowieka',
      subtitle: 'Przesuń element układanki na właściwe miejsce, aby potwierdzić, że jesteś prawdziwą osobą. Ta szybka kontrola pomaga chronić tę witrynę przed automatycznymi botami.',
      loading: 'Ładowanie…', hint: 'Przesuń, aby ukończyć układankę', refresh: 'Odśwież', verified: 'Zweryfikowano',
      errLoad: 'Nie udało się załadować weryfikacji. Odśwież stronę.', errNetwork: 'Błąd sieci. Spróbuj ponownie.',
      errVerify: 'Weryfikacja nie powiodła się. Spróbuj ponownie.', okBadge: 'Weryfikacja zakończona',
      okMsg: 'Dziękujemy. Zweryfikowano, że jesteś człowiekiem.', retest: 'Zweryfikuj ponownie',
      errProtected: 'Coś poszło nie tak. Spróbuj ponownie.'
    },
    ru: {
      title: 'Проверка на человека',
      subtitle: 'Передвиньте фрагмент пазла на своё место, чтобы подтвердить, что вы не робот. Эта быстрая проверка помогает защитить сайт от автоматических ботов.',
      loading: 'Загрузка…', hint: 'Сдвиньте, чтобы собрать пазл', refresh: 'Обновить', verified: 'Проверено',
      errLoad: 'Не удалось загрузить проверку. Обновите страницу.', errNetwork: 'Ошибка сети. Повторите попытку.',
      errVerify: 'Проверка не пройдена. Повторите попытку.', okBadge: 'Проверка завершена',
      okMsg: 'Спасибо. Вы подтвердили, что вы человек.', retest: 'Проверить снова',
      errProtected: 'Что-то пошло не так. Повторите попытку.'
    },
    uk: {
      title: 'Перевірка на людину',
      subtitle: 'Пересуньте фрагмент пазла на місце, щоб підтвердити, що ви не робот. Ця швидка перевірка допомагає захистити сайт від автоматичних ботів.',
      loading: 'Завантаження…', hint: 'Пересуньте, щоб скласти пазл', refresh: 'Оновити', verified: 'Перевірено',
      errLoad: 'Не вдалося завантажити перевірку. Оновіть сторінку.', errNetwork: 'Помилка мережі. Спробуйте ще раз.',
      errVerify: 'Перевірку не пройдено. Спробуйте ще раз.', okBadge: 'Перевірку завершено',
      okMsg: 'Дякуємо. Ви підтвердили, що ви людина.', retest: 'Перевірити знову',
      errProtected: 'Щось пішло не так. Спробуйте ще раз.'
    },
    tr: {
      title: 'İnsan Doğrulaması',
      subtitle: 'Gerçek bir kişi olduğunuzu doğrulamak için yapboz parçasını yerine kaydırın. Bu hızlı kontrol, bu siteyi otomatik botlardan korumaya yardımcı olur.',
      loading: 'Yükleniyor…', hint: 'Yapbozu tamamlamak için kaydırın', refresh: 'Yenile', verified: 'Doğrulandı',
      errLoad: 'Doğrulama yüklenemedi. Lütfen sayfayı yenileyin.', errNetwork: 'Ağ hatası. Lütfen tekrar deneyin.',
      errVerify: 'Doğrulama başarısız. Lütfen tekrar deneyin.', okBadge: 'Doğrulama tamamlandı',
      okMsg: 'Teşekkürler. İnsan ziyaretçi olarak doğrulandınız.', retest: 'Yeniden doğrula',
      errProtected: 'Bir şeyler ters gitti. Lütfen tekrar deneyin.'
    },
    ar: {
      title: 'التحقق من أنك إنسان',
      subtitle: 'حرّك قطعة الأحجية إلى مكانها للتأكد من أنك شخص حقيقي. يساعد هذا الفحص السريع في حماية هذا الموقع من الروبوتات الآلية.',
      loading: 'جارٍ التحميل…', hint: 'حرّك لإكمال الأحجية', refresh: 'تحديث', verified: 'تم التحقق',
      errLoad: 'تعذّر تحميل التحقق. يُرجى تحديث الصفحة.', errNetwork: 'خطأ في الشبكة. يُرجى المحاولة مرة أخرى.',
      errVerify: 'فشل التحقق. يُرجى المحاولة مرة أخرى.', okBadge: 'اكتمل التحقق',
      okMsg: 'شكرًا لك. تم التحقق من أنك زائر بشري.', retest: 'التحقق مرة أخرى',
      errProtected: 'حدث خطأ ما. يُرجى المحاولة مرة أخرى.'
    },
    he: {
      title: 'אימות אנושי',
      subtitle: 'החליקו את חלק הפאזל למקומו כדי לאשר שאתם אדם אמיתי. בדיקה מהירה זו מסייעת להגן על האתר מפני בוטים אוטומטיים.',
      loading: 'טוען…', hint: 'החליקו כדי להשלים את הפאזל', refresh: 'רענון', verified: 'אומת',
      errLoad: 'לא ניתן היה לטעון את האימות. אנא רעננו את הדף.', errNetwork: 'שגיאת רשת. נסו שוב.',
      errVerify: 'האימות נכשל. נסו שוב.', okBadge: 'האימות הושלם',
      okMsg: 'תודה. אומתתם כמבקרים אנושיים.', retest: 'אימות מחדש',
      errProtected: 'משהו השתבש. נסו שוב.'
    },
    fa: {
      title: 'تأیید هویت انسانی',
      subtitle: 'قطعه پازل را به جای خود بکشید تا تأیید شود که یک فرد واقعی هستید. این بررسی سریع به محافظت از این سایت در برابر ربات‌های خودکار کمک می‌کند.',
      loading: 'در حال بارگذاری…', hint: 'برای تکمیل پازل بکشید', refresh: 'تازه‌سازی', verified: 'تأیید شد',
      errLoad: 'بارگذاری تأیید ممکن نشد. لطفاً صفحه را تازه کنید.', errNetwork: 'خطای شبکه. لطفاً دوباره تلاش کنید.',
      errVerify: 'تأیید ناموفق بود. لطفاً دوباره تلاش کنید.', okBadge: 'تأیید کامل شد',
      okMsg: 'متشکریم. شما به‌عنوان بازدیدکننده انسانی تأیید شدید.', retest: 'تأیید دوباره',
      errProtected: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.'
    },
    hi: {
      title: 'मानव सत्यापन',
      subtitle: 'यह पुष्टि करने के लिए कि आप वास्तविक व्यक्ति हैं, पज़ल के टुकड़े को सही जगह पर स्लाइड करें। यह त्वरित जाँच इस साइट को स्वचालित बॉट से सुरक्षित रखने में मदद करती है।',
      loading: 'लोड हो रहा है…', hint: 'पज़ल पूरा करने के लिए स्लाइड करें', refresh: 'रीफ़्रेश', verified: 'सत्यापित',
      errLoad: 'सत्यापन लोड नहीं हो सका। कृपया पेज रीफ़्रेश करें।', errNetwork: 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।',
      errVerify: 'सत्यापन विफल रहा। कृपया पुनः प्रयास करें।', okBadge: 'सत्यापन पूर्ण',
      okMsg: 'धन्यवाद। आपको मानव आगंतुक के रूप में सत्यापित किया गया है।', retest: 'फिर से सत्यापित करें',
      errProtected: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
    },
    bn: {
      title: 'মানব যাচাইকরণ',
      subtitle: 'আপনি একজন প্রকৃত ব্যক্তি তা নিশ্চিত করতে ধাঁধার অংশটি সঠিক জায়গায় স্লাইড করুন। এই দ্রুত যাচাই স্বয়ংক্রিয় বট থেকে এই সাইটকে সুরক্ষিত রাখতে সাহায্য করে।',
      loading: 'লোড হচ্ছে…', hint: 'ধাঁধা সম্পূর্ণ করতে স্লাইড করুন', refresh: 'রিফ্রেশ', verified: 'যাচাইকৃত',
      errLoad: 'যাচাইকরণ লোড করা যায়নি। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।', errNetwork: 'নেটওয়ার্ক ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      errVerify: 'যাচাইকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', okBadge: 'যাচাইকরণ সম্পন্ন',
      okMsg: 'ধন্যবাদ। আপনাকে মানব দর্শক হিসেবে যাচাই করা হয়েছে।', retest: 'আবার যাচাই করুন',
      errProtected: 'কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
    },
    ur: {
      title: 'انسانی توثیق',
      subtitle: 'یہ تصدیق کرنے کے لیے کہ آپ ایک حقیقی شخص ہیں، پہیلی کے ٹکڑے کو اس کی جگہ پر سلائیڈ کریں۔ یہ فوری جانچ اس سائٹ کو خودکار بوٹس سے محفوظ رکھنے میں مدد کرتی ہے۔',
      loading: 'لوڈ ہو رہا ہے…', hint: 'پہیلی مکمل کرنے کے لیے سلائیڈ کریں', refresh: 'ریفریش', verified: 'تصدیق شدہ',
      errLoad: 'توثیق لوڈ نہیں ہو سکی۔ براہ کرم صفحہ ریفریش کریں۔', errNetwork: 'نیٹ ورک کی خرابی۔ براہ کرم دوبارہ کوشش کریں۔',
      errVerify: 'توثیق ناکام ہو گئی۔ براہ کرم دوبارہ کوشش کریں۔', okBadge: 'توثیق مکمل',
      okMsg: 'شکریہ۔ آپ کی بطور انسانی وزیٹر توثیق ہو گئی ہے۔', retest: 'دوبارہ توثیق کریں',
      errProtected: 'کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
    },
    id: {
      title: 'Verifikasi Manusia',
      subtitle: 'Geser kepingan puzzle ke tempatnya untuk memastikan Anda adalah orang sungguhan. Pemeriksaan singkat ini membantu melindungi situs ini dari bot otomatis.',
      loading: 'Memuat…', hint: 'Geser untuk menyelesaikan puzzle', refresh: 'Muat ulang', verified: 'Terverifikasi',
      errLoad: 'Verifikasi tidak dapat dimuat. Silakan muat ulang halaman.', errNetwork: 'Kesalahan jaringan. Silakan coba lagi.',
      errVerify: 'Verifikasi gagal. Silakan coba lagi.', okBadge: 'Verifikasi selesai',
      okMsg: 'Terima kasih. Anda telah diverifikasi sebagai pengunjung manusia.', retest: 'Verifikasi ulang',
      errProtected: 'Terjadi kesalahan. Silakan coba lagi.'
    },
    ms: {
      title: 'Pengesahan Manusia',
      subtitle: 'Seret kepingan teka-teki ke tempatnya untuk mengesahkan anda orang sebenar. Semakan pantas ini membantu melindungi tapak ini daripada bot automatik.',
      loading: 'Memuatkan…', hint: 'Seret untuk melengkapkan teka-teki', refresh: 'Muat semula', verified: 'Disahkan',
      errLoad: 'Pengesahan tidak dapat dimuatkan. Sila muat semula halaman.', errNetwork: 'Ralat rangkaian. Sila cuba lagi.',
      errVerify: 'Pengesahan gagal. Sila cuba lagi.', okBadge: 'Pengesahan selesai',
      okMsg: 'Terima kasih. Anda telah disahkan sebagai pelawat manusia.', retest: 'Sahkan semula',
      errProtected: 'Sesuatu telah berlaku. Sila cuba lagi.'
    },
    vi: {
      title: 'Xác minh con người',
      subtitle: 'Trượt mảnh ghép vào đúng vị trí để xác nhận bạn là người thật. Bước kiểm tra nhanh này giúp bảo vệ trang web khỏi các bot tự động.',
      loading: 'Đang tải…', hint: 'Trượt để hoàn thành trò ghép hình', refresh: 'Làm mới', verified: 'Đã xác minh',
      errLoad: 'Không thể tải bước xác minh. Vui lòng làm mới trang.', errNetwork: 'Lỗi mạng. Vui lòng thử lại.',
      errVerify: 'Xác minh không thành công. Vui lòng thử lại.', okBadge: 'Đã hoàn tất xác minh',
      okMsg: 'Cảm ơn bạn. Bạn đã được xác minh là khách truy cập thật.', retest: 'Xác minh lại',
      errProtected: 'Đã xảy ra lỗi. Vui lòng thử lại.'
    },
    th: {
      title: 'การยืนยันตัวตนว่าเป็นมนุษย์',
      subtitle: 'เลื่อนชิ้นส่วนจิ๊กซอว์ไปยังตำแหน่งที่ถูกต้องเพื่อยืนยันว่าคุณเป็นบุคคลจริง การตรวจสอบสั้นๆ นี้ช่วยปกป้องเว็บไซต์จากบอทอัตโนมัติ',
      loading: 'กำลังโหลด…', hint: 'เลื่อนเพื่อต่อจิ๊กซอว์ให้สมบูรณ์', refresh: 'รีเฟรช', verified: 'ยืนยันแล้ว',
      errLoad: 'ไม่สามารถโหลดการยืนยันได้ โปรดรีเฟรชหน้า', errNetwork: 'เครือข่ายขัดข้อง โปรดลองอีกครั้ง',
      errVerify: 'การยืนยันไม่สำเร็จ โปรดลองอีกครั้ง', okBadge: 'ยืนยันเสร็จสมบูรณ์',
      okMsg: 'ขอบคุณ คุณได้รับการยืนยันว่าเป็นผู้เยี่ยมชมที่เป็นมนุษย์แล้ว', retest: 'ยืนยันอีกครั้ง',
      errProtected: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง'
    },
    'zh-CN': {
      title: '人机验证',
      subtitle: '请将拼图块滑动到正确位置，以确认您是真人。此快速检查有助于保护本网站免受自动程序攻击。',
      loading: '加载中…', hint: '滑动以完成拼图', refresh: '刷新', verified: '已验证',
      errLoad: '无法加载验证，请刷新页面。', errNetwork: '网络错误，请重试。',
      errVerify: '验证失败，请重试。', okBadge: '验证完成',
      okMsg: '谢谢，您已通过真人访客验证。', retest: '重新验证',
      errProtected: '出现问题，请重试。'
    },
    'zh-TW': {
      title: '真人驗證',
      subtitle: '請將拼圖滑動到正確位置，以確認您是真人。此快速檢查有助於保護本網站免受自動程式攻擊。',
      loading: '載入中…', hint: '滑動以完成拼圖', refresh: '重新整理', verified: '已驗證',
      errLoad: '無法載入驗證，請重新整理頁面。', errNetwork: '網路錯誤，請再試一次。',
      errVerify: '驗證失敗，請再試一次。', okBadge: '驗證完成',
      okMsg: '謝謝，您已通過真人訪客驗證。', retest: '重新驗證',
      errProtected: '發生問題，請再試一次。'
    },
    ja: {
      title: '人間であることの確認',
      subtitle: 'パズルのピースを正しい位置にスライドして、人間であることを確認してください。この簡単なチェックは、自動化されたボットからサイトを保護するために役立ちます。',
      loading: '読み込み中…', hint: 'スライドしてパズルを完成させてください', refresh: '更新', verified: '確認済み',
      errLoad: '認証を読み込めませんでした。ページを更新してください。', errNetwork: 'ネットワークエラーです。もう一度お試しください。',
      errVerify: '認証に失敗しました。もう一度お試しください。', okBadge: '認証が完了しました',
      okMsg: 'ありがとうございます。人間の訪問者として確認されました。', retest: 'もう一度確認する',
      errProtected: '問題が発生しました。もう一度お試しください。'
    },
    ko: {
      title: '사람 인증',
      subtitle: '퍼즐 조각을 제자리로 밀어 실제 사람임을 확인해 주세요. 이 간단한 확인은 자동화된 봇으로부터 이 사이트를 보호하는 데 도움이 됩니다.',
      loading: '로드 중…', hint: '밀어서 퍼즐을 완성하세요', refresh: '새로고침', verified: '인증됨',
      errLoad: '인증을 불러오지 못했습니다. 페이지를 새로고침해 주세요.', errNetwork: '네트워크 오류입니다. 다시 시도해 주세요.',
      errVerify: '인증에 실패했습니다. 다시 시도해 주세요.', okBadge: '인증 완료',
      okMsg: '감사합니다. 사람 방문자로 확인되었습니다.', retest: '다시 인증',
      errProtected: '문제가 발생했습니다. 다시 시도해 주세요.'
    },
    sv: {
      title: 'Mänsklig verifiering',
      subtitle: 'Skjut pusselbiten på plats för att bekräfta att du är en riktig person. Den här snabba kontrollen hjälper till att skydda webbplatsen mot automatiska botar.',
      loading: 'Läser in…', hint: 'Skjut för att slutföra pusslet', refresh: 'Uppdatera', verified: 'Verifierad',
      errLoad: 'Verifieringen kunde inte läsas in. Uppdatera sidan.', errNetwork: 'Nätverksfel. Försök igen.',
      errVerify: 'Verifieringen misslyckades. Försök igen.', okBadge: 'Verifieringen slutförd',
      okMsg: 'Tack. Du har verifierats som en mänsklig besökare.', retest: 'Verifiera igen',
      errProtected: 'Något gick fel. Försök igen.'
    },
    da: {
      title: 'Menneskelig bekræftelse',
      subtitle: 'Træk puslespilsbrikken på plads for at bekræfte, at du er en rigtig person. Dette hurtige tjek hjælper med at beskytte siden mod automatiske bots.',
      loading: 'Indlæser…', hint: 'Træk for at fuldføre puslespillet', refresh: 'Opdater', verified: 'Bekræftet',
      errLoad: 'Bekræftelsen kunne ikke indlæses. Opdater siden.', errNetwork: 'Netværksfejl. Prøv igen.',
      errVerify: 'Bekræftelsen mislykkedes. Prøv igen.', okBadge: 'Bekræftelse gennemført',
      okMsg: 'Tak. Du er bekræftet som en menneskelig besøgende.', retest: 'Bekræft igen',
      errProtected: 'Noget gik galt. Prøv igen.'
    },
    no: {
      title: 'Menneskelig verifisering',
      subtitle: 'Skyv puslespillbrikken på plass for å bekrefte at du er en ekte person. Denne raske kontrollen hjelper til med å beskytte nettstedet mot automatiske roboter.',
      loading: 'Laster…', hint: 'Skyv for å fullføre puslespillet', refresh: 'Oppdater', verified: 'Verifisert',
      errLoad: 'Verifiseringen kunne ikke lastes. Oppdater siden.', errNetwork: 'Nettverksfeil. Prøv igen.',
      errVerify: 'Verifiseringen mislyktes. Prøv igjen.', okBadge: 'Verifiseringen er fullført',
      okMsg: 'Takk. Du er verifisert som en menneskelig besøkende.', retest: 'Verifiser på nytt',
      errProtected: 'Noe gikk galt. Prøv igjen.'
    },
    fi: {
      title: 'Ihmisyyden vahvistus',
      subtitle: 'Liu’uta palapelin pala paikalleen vahvistaaksesi, että olet oikea ihminen. Tämä nopea tarkistus auttaa suojaamaan sivustoa automaattisilta boteilta.',
      loading: 'Ladataan…', hint: 'Liu’uta viimeistelläksesi palapelin', refresh: 'Päivitä', verified: 'Vahvistettu',
      errLoad: 'Vahvistusta ei voitu ladata. Päivitä sivu.', errNetwork: 'Verkkovirhe. Yritä uudelleen.',
      errVerify: 'Vahvistus epäonnistui. Yritä uudelleen.', okBadge: 'Vahvistus valmis',
      okMsg: 'Kiitos. Sinut on vahvistettu ihmiskävijäksi.', retest: 'Vahvista uudelleen',
      errProtected: 'Jokin meni pieleen. Yritä uudelleen.'
    },
    cs: {
      title: 'Ověření, že jste člověk',
      subtitle: 'Posuňte dílek skládačky na správné místo a potvrďte, že jste skutečná osoba. Tato rychlá kontrola pomáhá chránit tento web před automatickými boty.',
      loading: 'Načítání…', hint: 'Posunutím dokončete skládačku', refresh: 'Obnovit', verified: 'Ověřeno',
      errLoad: 'Ověření se nepodařilo načíst. Obnovte stránku.', errNetwork: 'Chyba sítě. Zkuste to znovu.',
      errVerify: 'Ověření se nezdařilo. Zkuste to znovu.', okBadge: 'Ověření dokončeno',
      okMsg: 'Děkujeme. Byli jste ověřeni jako lidský návštěvník.', retest: 'Ověřit znovu',
      errProtected: 'Něco se pokazilo. Zkuste to znovu.'
    },
    el: {
      title: 'Επαλήθευση ανθρώπου',
      subtitle: 'Σύρετε το κομμάτι του παζλ στη σωστή θέση για να επιβεβαιώσετε ότι είστε πραγματικό πρόσωπο. Αυτός ο γρήγορος έλεγχος βοηθά στην προστασία του ιστότοπου από αυτοματοποιημένα ρομπότ.',
      loading: 'Φόρτωση…', hint: 'Σύρετε για να ολοκληρώσετε το παζλ', refresh: 'Ανανέωση', verified: 'Επαληθεύτηκε',
      errLoad: 'Δεν ήταν δυνατή η φόρτωση της επαλήθευσης. Ανανεώστε τη σελίδα.', errNetwork: 'Σφάλμα δικτύου. Δοκιμάστε ξανά.',
      errVerify: 'Η επαλήθευση απέτυχε. Δοκιμάστε ξανά.', okBadge: 'Η επαλήθευση ολοκληρώθηκε',
      okMsg: 'Ευχαριστούμε. Επαληθευτήκατε ως ανθρώπινος επισκέπτης.', retest: 'Νέα επαλήθευση',
      errProtected: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.'
    },
    ro: {
      title: 'Verificare umană',
      subtitle: 'Glisați piesa de puzzle la locul ei pentru a confirma că sunteți o persoană reală. Această verificare rapidă ajută la protejarea site-ului împotriva boților automați.',
      loading: 'Se încarcă…', hint: 'Glisați pentru a completa puzzle-ul', refresh: 'Reîmprospătare', verified: 'Verificat',
      errLoad: 'Verificarea nu a putut fi încărcată. Reîmprospătați pagina.', errNetwork: 'Eroare de rețea. Încercați din nou.',
      errVerify: 'Verificarea a eșuat. Încercați din nou.', okBadge: 'Verificare finalizată',
      okMsg: 'Vă mulțumim. Ați fost verificat ca vizitator uman.', retest: 'Verificați din nou',
      errProtected: 'Ceva nu a funcționat. Încercați din nou.'
    },
    hu: {
      title: 'Emberi ellenőrzés',
      subtitle: 'Csúsztassa a kirakó darabját a helyére, hogy megerősítse, valódi személy. Ez a gyors ellenőrzés segít megvédeni az oldalt az automatikus botoktól.',
      loading: 'Betöltés…', hint: 'Csúsztassa a kirakó befejezéséhez', refresh: 'Frissítés', verified: 'Ellenőrizve',
      errLoad: 'Az ellenőrzést nem sikerült betölteni. Frissítse az oldalt.', errNetwork: 'Hálózati hiba. Próbálja újra.',
      errVerify: 'Az ellenőrzés sikertelen. Próbálja újra.', okBadge: 'Az ellenőrzés befejeződött',
      okMsg: 'Köszönjük. Emberi látogatóként ellenőriztük.', retest: 'Ellenőrzés újra',
      errProtected: 'Valami hiba történt. Próbálja újra.'
    },
    sw: {
      title: 'Uthibitisho wa Binadamu',
      subtitle: 'Telezesha kipande cha fumbo mahali pake ili kuthibitisha kuwa wewe ni mtu halisi. Ukaguzi huu wa haraka husaidia kulinda tovuti hii dhidi ya roboti za kiotomatiki.',
      loading: 'Inapakia…', hint: 'Telezesha ili kukamilisha fumbo', refresh: 'Onyesha upya', verified: 'Imethibitishwa',
      errLoad: 'Imeshindwa kupakia uthibitisho. Tafadhali onyesha upya ukurasa.', errNetwork: 'Hitilafu ya mtandao. Tafadhali jaribu tena.',
      errVerify: 'Uthibitisho umeshindwa. Tafadhali jaribu tena.', okBadge: 'Uthibitisho umekamilika',
      okMsg: 'Asante. Umethibitishwa kuwa mgeni wa kibinadamu.', retest: 'Thibitisha tena',
      errProtected: 'Hitilafu imetokea. Tafadhali jaribu tena.'
    }
  };

  const RTL = ['ar', 'he', 'fa', 'ur'];
  const ALIASES = { iw: 'he', in: 'id', nb: 'no', nn: 'no', 'zh-hant': 'zh-TW', 'zh-tw': 'zh-TW', 'zh-hk': 'zh-TW', 'zh-mo': 'zh-TW' };

  function pick(tag) {
    if (!tag) return null;
    const lower = tag.toLowerCase();
    if (ALIASES[lower]) return ALIASES[lower];
    if (STRINGS[tag]) return tag;
    const base = lower.split('-')[0];
    if (base === 'zh') return 'zh-CN';
    if (ALIASES[base]) return ALIASES[base];
    return STRINGS[base] ? base : null;
  }

  function detect() {
    try {
      const forced = new URLSearchParams(location.search).get('lang');
      if (pick(forced)) return pick(forced);
    } catch (_) {}
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (const tag of list) {
      const match = pick(tag);
      if (match) return match;
    }
    return 'en';
  }

  const lang = detect();
  const dict = STRINGS[lang];

  function t(key) {
    return (dict && dict[key]) || STRINGS.en[key] || key;
  }

  function apply() {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = RTL.indexOf(lang) > -1 ? 'rtl' : 'ltr';
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.GuardI18n = { t, lang, apply };
})();
