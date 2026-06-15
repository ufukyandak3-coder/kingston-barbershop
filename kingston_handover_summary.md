# Kingston Barbershop - Proje Geliştirme Özeti ve Devir Dosyası

Bu dosya, projenin "Brutalist Luxury" ve "Apple-vari" premium hissiyatını oturtmak için şimdiye kadar yapılan geliştirmelerin detaylı bir özetini içerir. Claude veya başka bir AI asistanı ile projeye devam ederken tam bağlam sağlamak için bu dosyayı referans olarak kullanabilirsiniz.

## 1. Gelişmiş Kaydırma Hikayesi (Snap-Scroll Narrative)
`/src/components/ui/features-scroll.tsx` bileşeni sıfırdan revize edildi. Artık sıradan bir "görüş alanına girince oyna" (in-view) animasyonu yerine, doğrudan kullanıcının kaydırma (scroll) ivmesine bağlı bir sistem kullanılıyor.

*   **Zorunlu Adım Adım Geçiş (Spring Physics Motoru):** 
    Kullanıcı çok hızlı kaydırsa bile (örn. 1. adımdan doğrudan 3. adıma atlama sorunu), araya eklenen `useSpring(scrollYProgress)` fizik motoru sayesinde geçişlerin her zaman `1 -> 2 -> 3` sırasıyla pürüzsüz ve atlamadan gerçekleşmesi sağlandı.
*   **Gerçek Zamanlı Scroll Açılışı (True Scroll-Linked Reveal):** 
    Hero bölümünden bu alana ilk girişteki animasyonlar (opacity ve y ekseni) zamana bağlı bir `delay` yerine tamamen kaydırma yüzdesine (`useTransform`) bağlandı. Kullanıcı aşağı doğru ne kadar kaydırırsa, yazılar ve görsel o kadar görünür hale geliyor.
*   **Staggered (Kademeli) ve Senkronize Akış:** 
    İlk açılışta önce "Men's Haircut" başlığı belirecek, o netleşmeye başladığı anda hemen altındaki metin ve sağdaki büyük transparan PNG görseli tamamen senkronize bir şekilde sahneye çıkacak şekilde zamanlamalar milisaniyesine kadar ayarlandı.
*   **Parallax ve Çerçeve Optimizasyonu:**
    Arkada devasa bir şekilde hafif farklı bir hızda kayan "KINGSTON" yazısı eklendi (Parallax efekti).
    Ayrıca görselin üstten kesilmesi (clipping) problemi, görselin bulunduğu kapsayıcıya güçlü bir üst boşluk (`pt-32`) eklenip, maksimum yüksekliği `70vh` seviyesine çekilerek çözüldü. Görsellere uygulanan `drop-shadow-2xl`, arka plandaki beyazlıkla birleşerek 3D bir derinlik kattı.

## 2. Dil ve Navigasyon Entegrasyonu (Localization & NavMenu)
`/src/components/ui/menu-hover-effects.tsx` ve `App.tsx` üzerinde çalışıldı.

*   **Dinamik Menü Çevirisi:**
    Daha önce İngilizceye (About, Services, vb.) sabitlenmiş olan üst navigasyon barı, sayfanın ana dil sistemine bağlandı. `App.tsx` üzerinden `items={t.nav}` prop'u gönderilerek, dil Lehçe olduğunda (O nas, Usługi), İngilizce olduğunda ise kendi dillerinde çalışması sağlandı.

## 3. Layout ve Responsive Düzenlemeler
Ana dosya olan `App.tsx` üzerinde düzenlemeler yapıldı.

*   **Kırpılan Metinlerin Düzeltilmesi (Footer / CTA):** 
    Sayfanın en altındaki "NOWY LOOK ZACZYNA SIĘ TUTAJ." yazısında yer alan devasa font boyutu (`7.5rem`), bazı ekran çözünürlüklerinde sol taraftaki boşluk sınırlarını aşıp kelimelerin kesilmesine sebep oluyordu. Bu boyut daha güvenli ancak hala son derece premium hissettiren dinamik değerlere (`lg:text-[5rem] xl:text-[6.5rem]`) çekildi.
*   **Arayüz Temizliği:**
    Kullanıcının isteği doğrultusunda, sayfanın akışını kesen `ScrollExpandMedia` bileşeni tamamen kaldırılarak hikaye ve akış bütünlüğü sağlandı.

## Sonraki Adımlar İçin Claude'a Not
*   **Kullanılan Kütüphaneler:** Projede `motion/react` (Framer Motion), `Tailwind CSS`, ve kaydırma hissiyatı için `Lenis` kullanılmaktadır.
*   **Animasyon Felsefesi:** Yeni bir bileşen ekleneceğinde, hızlı ve sıçrayan animasyonlardan kaçınılmalıdır. Her zaman yumuşak `ease: [0.16, 1, 0.3, 1]` eğrileri (Apple stili) ve kademeli (`staggered`) açılışlar tercih edilmelidir.
*   **Sayfa Yapısı:** `App.tsx` tüm modüllerin ana toplanma noktasıdır, ancak özelleştirilmiş hareketler `src/components/ui/` altındaki kendi özel bileşenlerinde yaşar (Örn: `features-scroll.tsx`).
