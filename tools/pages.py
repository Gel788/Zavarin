import json,html,os,sys
sys.path.insert(0,os.path.dirname(__file__))
E=html.escape
def page(fn,title,desc,body,js=''):
  s=f'''<!DOCTYPE html>
<html lang="ru" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(title)} — ЗАВАРИН</title><meta name="description" content="{E(desc)}"><meta name="theme-color" content="#0b0b0c"><link rel="icon" href="img/og-logo.jpg">
<!--FONTS--><!--/FONTS-->
<link rel="stylesheet" href="lux.css?v=8"><link rel="stylesheet" href="site.css?v=8">
<script>document.documentElement.classList.remove('no-js')</script>
</head><body data-solid="1">
<!--HDR--><!--/HDR-->
<main id="main">
{body}
</main>
<!--FTR--><!--/FTR-->
<script src="lux.js?v=8"></script>{js}
</body></html>'''
  open(fn,'w').write(s)
def hero(lbl,h1,d,crumb):
  return f'<section class="pgh"><div class="wrap"><nav class="crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a> / {crumb}</nav><div class="g12"><div class="t"><p class="lbl">{lbl}</p><h1 class="h1x">{h1}</h1></div><p class="d">{d}</p></div></div></section>'
INFO=['delivery.html','Доставка и оплата'],['guarantee.html','Гарантии'],['care.html','Уход за изделиями']
def snav(cur):return '<nav class="side-nav" aria-label="Покупателям">'+''.join(f'<a href="{a}"{" aria-current=\"page\"" if a==cur else ""}>{b}</a>' for a,b in INFO)+'<a href="contacts.html">Контакты</a></nav>'
def prose(lines):
  out=[];ul=[]
  for t,x in lines:
    if t=='li':ul.append(f'<li>{E(x)}</li>');continue
    if ul:out.append('<ul>'+''.join(ul)+'</ul>');ul=[]
    out.append(f'<{t}>{E(x)}</{t}>')
  if ul:out.append('<ul>'+''.join(ul)+'</ul>')
  return '<div class="prose">'+''.join(out)+'</div>'

# ---- brand
page('brand.html','О бренде','Ювелирный дом ЗАВАРИН — бренд православных ювелирных изделий братьев Ярослава и Антона Завариных, история которого началась в 2013 году.',
hero('О бренде','Ювелирный дом <em>ЗАВАРИН</em>','Бренд православных ювелирных изделий братьев Ярослава и Антона Завариных, история которого началась в 2013 году.','О бренде')+
'''<section class="sec" style="padding-top:0"><div class="wrap"><div class="big-ph rv"><img src="img/lux/individual.webp" width="1800" height="848" alt="Ювелирный дом ЗАВАРИН"></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap split2"><div class="a"><p class="lbl">Манифест</p></div><div class="b"><p class="q rv" style="font:400 clamp(24px,2.6vw,36px)/1.35 var(--serif)">Соблюдая и оберегая православные традиции, мы создаём <em>авторские коллекции</em> уникальных работ из драгоценных металлов, натуральных камней и ценных пород дерева.</p></div></div></section>
<section class="sec dark"><div class="wrap"><p class="lbl">История бренда</p><h2 class="h2" style="margin:14px 0 48px">От увлечения — <em>к семейному дому</em></h2><div class="tl2" style="border-color:var(--line-d)">
<div style="border-color:var(--line-d)"><b>2013</b><h3>История бренда</h3><p style="color:#cfc9be">Бренд ЗАВАРИН начинает свою историю в 2013 году в городе Костроме как увлечение Ярослава Заварина. Изделия сразу находят отклик в сердцах людей, появляются первые заказчики и единомышленники.</p></div>
<div style="border-color:var(--line-d)"><b>2018</b><h3>Семейное дело</h3><p style="color:#cfc9be">Атмосфера родного города и творческая увлечённость Ярослава воодушевляют его брата Антона. В 2018 году братья организуют семейное предприятие, ювелирный дом «Ортодоксарт».</p></div>
<div style="border-color:var(--line-d)"><b>ЗАВАРИН</b><h3>Ребрендинг</h3><p style="color:#cfc9be">Тёплый отклик покупателей стал стимулом для создания семейного бренда, названного по фамилии основателей — Ярослава и Антона Завариных.</p></div>
<div style="border-color:var(--line-d)"><b>2026</b><h3>Галерея в Москве</h3><p style="color:#cfc9be">6 марта 2026 года открылась первая ювелирная галерея ЗАВАРИН — в Большом Ордынском переулке, в историческом центре Замоскворечья.</p></div></div></div></section>
<section class="sec"><div class="wrap split2"><div class="a"><p class="lbl">Авторский стиль</p></div><div class="b">'''+prose([('p','Авторский почерк читается в каждой работе. Он — в смелом, но гармоничном сочетании природных и драгоценных материалов, в каждой детали, которую можно рассматривать как отдельное произведение искусства, но только взглянув на композицию целиком, понять глубину, смысл и красоту задуманного.'),('p','Мы честно и с душой подходим к своей работе и гарантируем действительно высокое качество изделий, представляющих художественную ценность.'),('p','Около 70% изделий ювелирного дома создаются с использованием цельного агата; для этого в ЗАВАРИН работает собственный цех огранки.')])+'''<p style="margin-top:32px"><a class="btn ink" href="index.html#craft">Как создаются работы</a></p></div></div></section>''')

# ---- contacts
page('contacts.html','Контакты','Контакты Ювелирного дома ЗАВАРИН: Кострома, ул. Коммунаров, 40; ювелирная галерея в Москве, Большой Ордынский пер., 4, стр. 4.',
hero('Контакты','Мы на <em>связи</em>','Служба клиентского сервиса: 8 800 600-85-33 (бесплатно по России), пн–пт 09:00–18:00, support@zavarin.art','Контакты')+
'''<section class="sec" style="padding-top:0"><div class="wrap cards3">
<div class="box rv"><p class="lbl">Клиентский сервис</p><h3><a href="tel:88006008533">8 800 600-85-33</a></h3><p>Бесплатный звонок по России. Пн–пт 09:00–18:00.<br><a href="mailto:support@zavarin.art">support@zavarin.art</a><br>Дополнительно: <a href="tel:+79621867918">+7 962 186-79-18</a>, <a href="tel:+79607453557">+7 960 745-35-57</a>, <a href="tel:+79036346018">+7 903 634-60-18</a>, <a href="tel:+79621866259">+7 962 186-62-59</a></p></div>
<div class="box rv"><p class="lbl">Ювелирная галерея</p><h3>Москва</h3><p>119017, Большой Ордынский переулок, 4, стр. 4 (вход с Малой Ордынки).<br>Пн–вс 09:00–21:00 · <a href="tel:+74995030444">+7 (499) 503-04-44</a><br><a href="https://yandex.ru/maps/?text=%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9%20%D0%9E%D1%80%D0%B4%D1%8B%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%2C%204%D1%814" rel="noopener">Открыть на карте</a></p></div>
<div class="box rv"><p class="lbl">Ювелирный дом</p><h3>Кострома</h3><p>156003, ул. Коммунаров, д. 40.<br>Пн–пт 08:00–17:00 · <a href="tel:88006008533">8 800 600-85-33</a>, <a href="tel:+79051514988">+7 905 151-49-88</a><br><a href="https://yandex.ru/maps/?text=%D0%9A%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%BC%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9A%D0%BE%D0%BC%D0%BC%D1%83%D0%BD%D0%B0%D1%80%D0%BE%D0%B2%2C%2040" rel="noopener">Открыть на карте</a></p></div></div></section>
<section class="sec dark"><div class="wrap split2"><div class="a"><div class="par clip"><img src="img/lux/gallery.webp" width="1000" height="620" alt="Ювелирная галерея ЗАВАРИН в Москве" loading="lazy" style="width:100%"></div></div><div class="b"><p class="lbl">Служба поддержки</p><h2 class="h2" style="margin:14px 0 20px">Задать <em>вопрос</em></h2>'''+prose([('p','Служба поддержки доступна пн–пт 08:00–18:00, сб 10:00–14:00 (по Москве). Если вы пишете нам в нерабочие часы, ваше обращение не останется без ответа — мы вернёмся к нему в первый же рабочий день.')])+'''<p style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="mailto:support@zavarin.art">Написать</a><a class="btn" style="background:transparent;color:#ece7dd" href="tel:88006008533">Позвонить</a></p></div></div></section>
<section class="sec"><div class="wrap split2"><div class="a"><p class="lbl">Реквизиты</p></div><div class="b">'''+prose([('li','ИП Заварин Ярослав Станиславович'),('li','Юридический и почтовый адрес: 156005, г. Кострома, ул. Советская, д. 82, кв. 52'),('li','ИНН 441404320283 · ОГРНИП 318440100002841'),('li','ПАО Сбербанк, Центрально-черноземный банк · р/с 40802810829000005408'),('li','к/с 30101810600000000681 · БИК 042007681')])+'</div></div></section>')

# ---- info pages
I=json.load(open('products.json'))['info']
def infopage(fn,title,lbl,h1,d,lines):
  page(fn,title,d,hero(lbl,h1,d,title)+f'<section class="sec" style="padding-top:0"><div class="wrap split2"><div class="a">{snav(fn)}</div><div class="b">{prose(lines)}</div></div></section>')
infopage('delivery.html','Доставка и оплата','Покупателям','Доставка <em>и оплата</em>','Интернет-магазин zavarin.art круглосуточно принимает заказы. После оформления заявки менеджер свяжется с вами в течение следующего рабочего дня.',[
('h2','Доставка по регионам России'),('p','Доставка в регионы РФ осуществляется курьерской службой СДЭК, почтовой службой экспресс-доставки EMS, а также Почтой России. При оформлении заказа вы оплачиваете стоимость доставки в соответствии с тарифами транспортной компании.'),
('h3','При получении посылки потребуется'),('li','Предъявить документ, удостоверяющий личность (паспорт).'),('li','Проверить целостность упаковки, комплектацию заказа, внешнее состояние изделий и наличие видимых производственных дефектов.'),('p','На сайте курьерской службы вы всегда сможете отследить посылку по номеру заказа.'),
('h2','Самовывоз'),('p','Самовывоз изделий возможен только из офиса ювелирного дома ЗАВАРИН по адресу: 156003, г. Кострома, ул. Коммунаров, д. 40. Предварительно необходимо связаться с менеджером по телефону 8 800 600-85-33. При доставке до пункта выдачи уточните срок хранения груза у транспортной компании.'),
('h2','Оплата'),('p','После оформления и подтверждения заказа менеджером необходимо внести 100% оплату одним из способов:'),('li','Наличными в офисе компании.'),('li','Онлайн банковской картой в личном кабинете на сайте или по ссылке из электронной почты.'),
('p','Оплата картой проходит через платёжный шлюз ПАО Сбербанк в защищённом режиме (SSL, 256-битное шифрование); принимаются карты МИР, Visa, MasterCard, JCB. При оплате наличными менеджер вправе запросить персональные данные, предусмотренные 115-ФЗ.')])
infopage('guarantee.html','Гарантии','Покупателям','Гарантии <em>подлинности</em>','Изделия ювелирного дома ЗАВАРИН проходят индивидуальный контроль качества.',[
('p','Мы проверяем подлинность характеристик драгоценных камней, пробы золота и серебра на каждом этапе на соответствие нормам и стандартам в Верхне-Волжской государственной инспекции пробирного надзора (ОСТ 117-3-002-95).'),('h2','Мы гарантируем'),('li','Подтверждение пробы каждого изделия (апробирование).'),('li','Клеймение ювелирных украшений идентификатором изготовителя — именником, который наносится на каждое изделие бренда.'),('li','Оттиск государственного пробирного клейма после экспертизы инспекции пробирного надзора.'),('li','Фирменный ярлык с индивидуальным штрихкодом, описанием, артикулом, пробой и характеристиками металлов и вставок.'),
('h2','Обмен и возврат'),('p','Возможность обменять либо вернуть изделие при обнаруженном и подтверждённом заводском браке установлена ст. 18 ФЗ «О защите прав потребителей»:'),('li','видимый заводской брак — до 14 дней;'),('li','скрытый заводской брак — до 6 месяцев.'),
('p','Ювелирная продукция без дефектов не подлежит обмену или возврату (Постановление Правительства РФ от 19.01.1998 № 55). При дистанционной продаже покупатель вправе вернуть товар надлежащего качества в течение 7 дней после передачи при сохранении товарного вида и опломбированного ярлыка — кроме изделий с индивидуально-определёнными свойствами.'),
('p','Если по вине обладателя произошло повреждение изделия, специалисты ювелирного дома могут произвести ремонт; сроки и стоимость согласовываются по запросу.')])
infopage('care.html','Уход за изделиями','Покупателям','Уход <em>за изделиями</em>','Мы используем сложные художественные комбинации драгоценных металлов с эбеновым деревом и натуральным камнем. За изделиями ухаживать легко.',[
('h2','Дерево эбен'),('p','Тропическая влагостойкая порода. Для поддержания внешнего вида периодически обрабатывайте деревянную основу натуральным «датским маслом» или лампадным маслом; излишки удалите салфеткой из микрофибры. Не рекомендуется посещать в изделиях из эбена парилку; шнур из лавсана не боится влаги и подлежит стирке.'),
('h2','Натуральный камень'),('p','Изделия с натуральным камнем, например агатом, можно очистить, промыв под проточной водой.'),('h2','Драгоценные металлы'),('p','Для поддержания блеска рекомендуем специализированную «ювелирную косметику». Каждое изделие в заказе комплектуется фирменными салфетками для ухода.')])

# ---- blog
B=json.load(open('blog.json'))
def card(a,i):
  cls=' class="lead1 rv"' if i==0 else ' class="rv"'
  return f'<a{cls} href="article.html?s={a["slug"]}"><div class="ph"><img src="{a["img"]}" alt="" loading="lazy"></div><div><small>{a["date"]}</small><h2>{E(a["title"])}</h2><p>{E(a["ex"])}</p></div></a>'
page('blog.html','Журнал','Журнал ЗАВАРИН: православные традиции, праздники, материалы и новости ювелирного дома.',hero('Журнал','Журнал <em>ЗАВАРИН</em>','Публикации ювелирного дома: традиции, праздники, материалы и новости. Тексты — zavarin.art/blog.','Журнал')+'<section class="sec" style="padding-top:0"><div class="wrap bl">'+''.join(card(a,i) for i,a in enumerate(B))+'</div></section>')
page('article.html','Статья','Статья журнала ЗАВАРИН','<div id="art"></div>','<script src="article.js?v=8"></script>')

# ---- checkout
page('checkout.html','Оформление заказа','Оформление заказа в ювелирном доме ЗАВАРИН',hero('Оформление','Оформление <em>заказа</em>','После отправки заявки менеджер свяжется с вами в течение следующего рабочего дня для подтверждения и оплаты.','<a href="catalog.html">Каталог</a> / Оформление')+'''
<section id="co"><div class="wrap co"><form class="f fm" id="cof" novalidate>
<fieldset class="fm"><legend class="lbl" style="margin-bottom:8px">1 · Контакты</legend>
<div class="row2"><div class="fl"><label for="n">Имя и фамилия</label><input id="n" name="name" autocomplete="name" required><span class="er" aria-live="polite"></span></div>
<div class="fl"><label for="ph">Телефон</label><input id="ph" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 ___ ___-__-__" required><span class="er" aria-live="polite"></span></div></div>
<div class="fl"><label for="em">E-mail (необязательно)</label><input id="em" name="email" type="email" autocomplete="email"><span class="er" aria-live="polite"></span></div></fieldset>
<fieldset class="fl" style="margin-top:24px"><legend>2 · Способ получения</legend><div class="opts">
<label class="opt2"><input type="radio" name="dl" value="СДЭК" checked><span><b>СДЭК</b><span>Курьером или в пункт выдачи по тарифам транспортной компании</span></span></label>
<label class="opt2"><input type="radio" name="dl" value="EMS"><span><b>EMS</b><span>Экспресс-доставка почтовой службой</span></span></label>
<label class="opt2"><input type="radio" name="dl" value="Почта России"><span><b>Почта России</b><span>Доставка в отделение по всей России</span></span></label>
<label class="opt2"><input type="radio" name="dl" value="Самовывоз"><span><b>Самовывоз — Кострома</b><span>Офис ювелирного дома, ул. Коммунаров, д. 40 (по согласованию с менеджером)</span></span></label></div></fieldset>
<div class="fl" id="adrw"><label for="adr">Адрес доставки</label><textarea id="adr" name="address" autocomplete="street-address" placeholder="Город, улица, дом, квартира, индекс или адрес пункта выдачи" required></textarea><span class="er" aria-live="polite"></span></div>
<div class="fl"><label for="cm">Комментарий: размер, гравировка, пожелания по изменению изделия</label><textarea id="cm" name="comment"></textarea></div>
<label class="chk"><input type="checkbox" id="ag" required><span>Согласен на обработку персональных данных для связи по заказу</span></label><span class="er" id="ager" aria-live="polite" style="font-size:12px;color:#9a3b2f"></span>
<p style="font-size:13px;color:var(--stone)">Оплата — после подтверждения заказа менеджером: наличными в офисе или банковской картой по ссылке (ПАО Сбербанк). На этом сайте платёж не проводится.</p>
<div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn ink" type="submit">Отправить заявку</button><a class="btn ghost" href="tel:88006008533">Заказать по телефону</a></div>
</form><aside class="s"><div class="sum" id="sum" aria-live="polite"></div></aside></div></section>
<section class="ok" id="okv" hidden><div class="wrap"><p class="lbl">Заявка сформирована</p><h1 tabindex="-1" id="okh">Спасибо, <em>заказ принят</em></h1><p id="okt"></p><div class="act"><a class="btn ink" id="okm" href="#">Отправить письмом</a><a class="btn ghost" href="tel:88006008533">8 800 600-85-33</a><a class="btn ghost" href="catalog.html">Вернуться в каталог</a></div></div></section>''','<script src="checkout.js?v=8"></script>')

# ---- account
page('account.html','Личный кабинет','Личный кабинет (демо)','''<section class="pgh"><div class="wrap"><nav class="crumbs"><a href="index.html">Главная</a> / Кабинет</nav><div class="g12"><div class="t"><p class="lbl">Личный кабинет <span class="demo">Демо-интерфейс</span></p><h1 class="h1x" id="acth">Добро <em>пожаловать</em></h1></div><p class="d">Это демонстрационный макет: данные хранятся только в вашем браузере и никуда не передаются. Настоящий кабинет — на zavarin.art/personal.</p></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap" id="acc"></div></section>''','<script src="account.js?v=8"></script>')
print('pages ok')
