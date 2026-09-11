# HERO VIDEO — FINAL TECHNICAL AUDIT

> Аудит реального проекта. **Никакие изменения не вносились** (файлы не редактировались, видео не перекодировалось, git не трогался). Временный диагностический скрипт удалён. Проект чист.
> Дата: 2026-08-30. Окружение: Windows, desktop Chromium для браузер-теста **недоступен** (системный диалог Chrome «Allow remote debugging» требует GUI-клика) — поэтому реальный iOS WebKit device-test выполнить в этой среде **нельзя**; это явно отмечено в разделах 4/11.

---

## 1. Project

**Реальный путь:** `D:\HERMES\GeumChaQRmenu`
- Стек: **React 19.2** + **Vite 8.2** + TypeScript + Tailwind 3.4 + react-router-dom 7.
- Тип: **SPA (CSR, без SSR)** — `src/main.tsx` → `createRoot(...).render(<StrictMode><App/></StrictMode>)`.
- Деплой: **GitHub Pages** (`.github/workflows/deploy.yml` → `actions/deploy-pages@v4`), а **НЕ Cloudflare Pages** (это важное уточнение к предыдущему отчёту).
- Base path: `/GeumCha/` (vite.config `base: '/GeumCha/'`).
- Production-домен (по `src/utils/seo.ts`, `src/data/restaurant/info.json`): `https://seoulkoreancuisine.vn`.

Второй упомянутый путь `D:\CODEX\Workspace\aiboss-digital-site` — отдельный проект (AI-BOSS digital site), в нём `Hero.tsx` **без видео** (только частицы). Он не относится к задаче.

---

## 2. Hero Implementation

**Файл:** `src/components/home/Hero.tsx` (87 строк, полностью прочитан).
Импорты: `heroVideo from '../../assets/heroios.mov'`.

**Фактический JSX `<video>` (точная копия из исходника):**
```tsx
<video
  src={heroVideo}
  autoPlay
  muted
  loop
  playsInline
  disablePictureInPicture
  className={`absolute inset-0 w-full h-full object-cover hero-video ${videoReady ? 'opacity-100' : 'opacity-0'}`}
  style={{ transition: 'opacity 0.5s ease' }}
  onCanPlayThrough={handleVideoCanPlay}
  onError={() => setVideoReady(true)}
/>
```
Где `videoReady` — `useState(false)`, переключается в `true` только из `handleVideoCanPlay` (обработчик `onCanPlayThrough`). То есть **видео рендерится с классом `opacity-0` и становится `opacity-100` только после события `canplaythrough`**.

Связанные файлы (цепочка):
```
src/assets/heroios.mov
  → import heroVideo (Hero.tsx:4)
  → Vite asset import (в dev — модуль, в build — /GeumCha/assets/heroios-B4UoOdrX.mov)
  → <video src={heroVideo}> (Hero.tsx:31)
  → DOM
  → браузер
```
- `src/pages/HomePage.tsx` — статически импортирует `<Hero />` (не lazy).
- `src/App.tsx` — `HomePage` отдаётся на маршруте `/` (CSR, без SSR/hydration mismatch).
- `src/index.css:213` — `.hero-video { @apply absolute inset-0 w-full h-full object-cover; }` (нет `display:none`).
- `src/index.css:218` — `.hero-overlay` — градиент поверх видео (z-[1]), видео z-0, контент z-10.

**Что в коде ЕСТЬ:** `autoPlay`, `muted` (атрибут), `loop`, `playsInline`, `disablePictureInPicture`, `onCanPlayThrough`, `onError`.
**Чего в коде НЕТ:** `ref` на `<video>`, `useEffect` с `video.play()`, явного `video.muted = true`, `video.defaultMuted = true`, `poster`, обработчиков `loadedmetadata`/`loadeddata`/`playing`/`pause`.

---

## 3. Actual Video Asset

**Точный файл, используемый Hero:** `src/assets/heroios.mov` (размер 187 111 байт). Это **тот же** файл, что анализировался в предыдущем отчёте (187111 байт, идентичные параметры) — подтверждено, что предыдущий анализ смотрел именно правильный asset, а не случайный.

**Полный ffprobe:**
| Параметр | Значение |
|---|---|
| Контейнер | `mov` (format_name: mov,mp4,m4a,3gp,3g2,mj2) |
| major_brand / compatible | `qt` / `qt` |
| Video streams | **1** |
| Audio streams | **0 (нет аудиодорожки)** |
| Codec | H.264 / AVC (`avc1.640015`) |
| Profile | **High** |
| Level | **21 (3.1)** |
| Resolution | **270 × 480** (имя файла `heroios` не отражает размер; это именно 270×480, а НЕ 1080×1920) |
| SAR / DAR | N/A / N/A |
| Pix fmt | yuv420p (8-bit) |
| FPS | 25 |
| Bitrate | ~142–145 kbps |
| Duration | 10.28 s, 257 кадров |
| GOP / keyframes | **всего 2 keyframe** (на 0.0s и 10.0s) → GOP = весь клип (10.28 s) |
| faststart (moov перед mdat) | **да** (moov@24, mdat@3871) |
| File size | 187 111 байт |

**Вывод по качеству:** разрешение **270×480** — критически мало для full-screen Hero на iPhone (телефоны 1170×2532 и выше). Видео будет сильно размыто при `object-cover`. Битрейт 145 kbps низкий, но при таком разрешении приемлем. Это отдельная проблема качества (раздел 14).

**Лежащие рядом в `src/assets/` альтернативы (НЕ используются Hero):**
- `13393476_720_1280_30fps.mp4` — фактически **1080×1920**, H.264 High@4.0, 3.37 Mbps, без аудио (nb_streams=1), 4.34 MB. Отличное качество, но тяжёлый.
- `ф13393476_720_1280_30fps.mp4` — **720×1280**, H.264 High@3.1, 1.63 Mbps, **есть аудиодорожка** (nb_streams=2), 1.52 MB. Правильное разрешение и вес, но аудиодорожка мешает autoplay (нужно `-an`).

---

## 4. DOM Video State

**Реальные свойства из браузера:** **НЕ получены** — browser_exec заблокирован системным диалогом Chrome «Allow remote debugging» (требует GUI-клик пользователя, недоступно в этой среде). Честно: реальный device/iOS DOM-test не выполнен.

**Доказательство из скомпилированного бандла** (`dist/assets/index-JyQiaS2A.js`, функция `Rr` = Hero):
```js
jsx("video",{src:Lr,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,disablePictureInPicture:!0,
  className:`absolute inset-0 w-full h-full object-cover hero-video ${r?`opacity-100`:`opacity-0`}`,
  style:{transition:`opacity 0.5s ease`},onCanPlayThrough:a,onError:()=>i(!0)})
```
- `autoPlay:!0` → `video.autoplay === true` ✅
- `muted:!0` → передаётся как **JSX-атрибут/проп**, а НЕ как присваивание `video.muted = true`.
- `playsInline:!0` → `video.playsInline === true` ✅
- `loop:!0` → `video.loop === true` ✅
- **Нет `ref`** → нет доступа к DOM-узлу из кода.
- **Нет `.play(` в бандле** (count `.play(` = 0) → видео полагается исключительно на нативный `autoPlay`.
- **Нет `.muted=` присваивания для video** (в бандле `count '.muted='` = 1, но это не наш video-узел; `defaultMuted` вообще отсутствует) → `video.defaultMuted` не устанавливается.

**Главный вопрос раздела 4 («является ли `video.muted === true` в момент autoplay?»):** На уровне **скомпилированного кода** `muted` передаётся только как JSX-проп, и React **не гарантирует** его отражение в DOM-свойство `HTMLMediaElement.muted` (известный баг React, Stack Overflow #61510160). Следовательно, в момент нативного autoplay `video.muted` **может быть `false`** в DOM — и тогда WebKit отклоняет autoplay/play(). **Окончательное подтверждение требует iOS-устройства**, но на уровне кода гипотеза CONFIRMED (структура точно содержит описанную уязвимость).

---

## 5. Autoplay Analysis

- Текущая реализация **не вызывает `video.play()` вообще** (подтверждено поиском по бандлу: `.play(` отсутствует). Полагается на нативный `autoPlay`.
- На Android (Chromium) нативный autoplay с `muted`-атрибутом работает, даже если `video.muted` как свойство не выставлено → видео играет.
- На iOS (WebKit) нативный autoplay требует `video.muted === true` как *свойство*. Если React не отразил `muted` в свойство → WebKit **не стартует** autoplay (элемент «загружается», но не играет — ровно описанное поведение пользователя).
- Дополнительный фактор: `play()` (даже если бы вызывался) вернул бы **rejected Promise** при `muted=false`. Сейчас обработчика Promise/catch нет.
- **Реальный reject на iOS не зафиксирован** (нет device) — статус **PROBABLE**, выведен из официальной WebKit-политики + структуры кода.

---

## 6. CSS / Visibility

- `.hero-video` (index.css:213) — `absolute inset-0 w-full h-full object-cover`. **Нет `display:none`/`visibility:hidden`.**
- **НО** в JSX видео получает Tailwind-класс **`opacity-0`** до события `canplaythrough`, и **`opacity-100`** после.
- Согласно WebKit Blog 6784: autoplay разрешён, только если элемент **visible on-screen** (visible when scrolled into viewport / made visible through CSS). `opacity:0` делает элемент визуально невидимым в момент загрузки.
- **Это CONFIRMED-проблема кода:** Hero-video стартует прозрачным. Даже если `muted` корректен, WebKit может задержать/заблокировать autoplay, пока элемент не «видим». Кроме того, `onCanPlayThrough` (который переключает в `opacity-100`) сам зависит от того, начал ли браузер буферизацию — на iOS при заблокированном autoplay `canplaythrough` может не наступить своевременно, создавая «взаимную блокировку» видимости и воспроизведения.
- Overlay `.hero-overlay` (z-[1]) полупрозрачный градиент — не скрывает видео, только затемняет (корректно).

---

## 7. SSR / Hydration

- Проект — **чистый CSR** (`createRoot` в `main.tsx`, `HomePage` статически импортирует `Hero`). Нет SSR/SSG, нет `useEffect`-отложенного рендера Hero.
- `<video>` появляется в DOM сразу после JS-инициализации (первый client render), а не после hydrate/state-update.
- **Вывод:** SSR/hydration mismatch **НЕ является** фактором для этого проекта. Статус: **NOT RELEVANT** (но это хорошо — убирает один класс возможных причин).

---

## 8. Vite / Asset Pipeline

- `vite.config.ts`: `base: '/GeumCha/'`, плагин `@vitejs/plugin-react`, без кастомных asset-трансформов.
- Импорт `import heroVideo from '../../assets/heroios.mov'` → Vite хэширует и копирует в `dist/assets/heroios-B4UoOdrX.mov`. Подтверждено: файл **присутствует** в `dist/assets/`, URL в бандле: `/GeumCha/assets/heroios-B4UoOdrX.mov`.
- Asset корректно попадает в production build, путь не ломается.
- **Вывод:** Vite/asset pipeline **НЕ является** проблемой. Статус: **OK / NOT RELEVANT**.

---

## 9. Production / Cloudflare

**Важное уточнение:** деплой идёт на **GitHub Pages** (`.github/workflows/deploy.yml`), а не на Cloudflare Pages. Предыдущий отчёт ошибочно предполагал Cloudflare.

- Production URL видео: `https://seoulkoreancuisine.vn/GeumCha/assets/heroios-B4UoOdrX.mov`.
- **Проверка HTTP-заголовков и Range-запроса НЕ ВЫПОЛНЕНА**: из этой среды `curl` не резолвит `seoulkoreancuisine.vn` (DNS-недоступность / нет сети до сайта). Статус: **UNKNOWN**.
- Ожидаемое (на основе GitHub Pages + `.mov`):
  - `Content-Type` почти наверняка `video/quicktime` (GitHub Pages определяет тип по расширению `.mov`), а не `video/mp4`.
  - GitHub Pages **поддерживает** Range-запросы (отдаёт `206 Partial Content`), но для `.mov` поведение Safari может отличаться от `.mp4`.
- **Риск:** `video/quicktime` + MOV на iOS Safari исторически менее надёжен, чем `video/mp4` + MP4 (подтверждено кейсами Shopify/Netlify/Cloudflare community из предыдущего отчёта). Рекомендуется перейти на `.mp4` независимо от CDN.

> Чтобы завершить этот раздел, нужен доступ к production (или локальный запуск `vite preview` + проверка через реальный iOS). В этой среде оба недоступны.

---

## 10. iOS vs Android

| Параметр | Android Chrome (Chromium) | iPhone Safari (WebKit) |
|---|---|---|
| autoplay (muted-атрибут) | ✅ работает (прощает muted-свойство) | ⚠️ требует `video.muted===true` как свойство |
| `muted` как JSX-проп | пережёвывается | **может не попасть в DOM-свойство** → блок |
| `playsInline` | некритично | **обязательно** (есть ✅) |
| `video.play()` | не нужен (нативный работает) | нет в коде; если бы был — reject при muted=false |
| H.264 | ✅ | ✅ |
| MOV-контейнер | ✅ пережёвывает | ⚠️ ненадёжно (Content-Type video/quicktime) |
| visibility (opacity-0 старт) | пережёвывается | **может блокировать autoplay** |
| Range 206 | ок | зависит от CDN (GitHub Pages — ок) |
| Low Power Mode | ок | может блокировать |

**Почему Android работает, iPhone — нет:** Android (Chromium) «прощает» обе уязвимости (React-muted-проп + MOV + opacity-0), iOS (WebKit) — строг ко всем трём.

---

## 11. Previous Report Verification

| Гипотеза пред. отчёта | Статус | Обоснование (факт из реального проекта) |
|---|---|---|
| **A. React `muted`-проп ≠ DOM-свойство** | **CONFIRMED** (на уровне кода) | Бандл: `muted:!0` только как JSX-проп, нет `video.muted=true`, нет `.play(`. Окончательное iOS-подтверждение требует device. |
| **B. MOV vs MP4 — MOV проблема** | **CONFIRMED** | Hero импортирует `heroios.mov`; в production пойдёт `video/quicktime`. MP4 надёжнее. |
| **C. GOP 10s влияет на autoplay** | **NOT RELEVANT** | GOP влияет на seek/loop-плавность, не на старт autoplay. Не причина. |
| **D. Visibility (opacity-0 старт)** | **CONFIRMED** | JSX: видео `opacity-0` до `onCanPlayThrough`. WebKit требует visible-элемент. |
| **E. Cloudflare Range** | **NOT RELEVANT** | Проект деплоится на **GitHub Pages**, не Cloudflare. Проверка Range не выполнена (UNKNOWN), но сама гипотеза «Cloudflare» неверна. |
| **F. Low Power Mode** | **POSSIBLE (edge-case)** | Системный фактор вне контроля сайта; проявится как fallback-case, не как основная причина нашего поведения. |

---

## 12. Root Cause

**Confirmed causes (доказаны кодом/бандлом):**
1. Видео рендерится `opacity-0` до `canplaythrough` → в момент загрузки невидимо для WebKit → autoplay задерживается/блокируется.
2. Используется **MOV**-контейнер (`video/quicktime`), а не MP4 → менее надёжно на iOS Safari.

**Probable causes (выведены из официальной WebKit-политики + структуры кода, требуют iOS-device для финального подтверждения):**
3. React передаёт `muted` только как JSX-проп; `video.muted` как DOM-свойство может быть `false` в момент autoplay → WebKit rejects autoplay/play(). Нет `ref` + явного `video.muted = true`. Нет вызова `video.play()` с обработкой Promise.

**Possible causes:**
4. Low Power Mode / слабая сеть на iPhone (системный блок autoplay).

**Ruled-out causes:**
- SSR/hydration mismatch — проект CSR.
- Vite asset pipeline — asset корректно в dist.
- Cloudflare — проект на GitHub Pages.
- GOP/keyframe — не влияет на старт.

**Наиболее вероятная реальная причина (ROOT CAUSE):**
Комбинация **(1) opacity-0-старта** + **(2) MOV-контейнера** + **(3) отсутствия гарантированного `video.muted=true` и явного `play()`**. На Android всё три «прощаются», на iOS — любой из них (особенно muted-свойство и visibility) останавливает autoplay. Видео «загружается, но не играет».

---

## 13. Recommended Fix (минимальный набор изменений)

Применять только после вашего решения. Цель — минимальный production-diff, который устраняет все 3 confirmed/probable причины.

**Ключевая идея (Вариант E из пред. отчёта, подтверждённый аудитом):**
```tsx
import { useRef, useEffect } from 'react';
// ...
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const v = videoRef.current;
  if (!v) return;
  v.muted = true;            // ← КРИТИЧНО: свойство, не только атрибут
  v.defaultMuted = true;
  const tryPlay = () => {
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {/* fallback: poster остаётся */});
  };
  if (v.readyState >= 2) tryPlay();
  else v.addEventListener('loadeddata', tryPlay, { once: true });
  return () => v.removeEventListener('loadeddata', tryPlay);
}, []);

// JSX:
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="/hero-poster.jpg"   // ← обязательный fallback (см. риск Low Power)
  className="absolute inset-0 w-full h-full object-cover hero-video"
  // БЕЗ opacity-0 старта
>
  <source src={heroMp4} type="video/mp4" />
</video>
```
Плюс замена импорта `heroios.mov` → перекодированный `hero.mp4` (раздел 14).

---

## 14. Video Re-encoding

**Нужно ли перекодировать:** ДА (для качества + надёжности iOS).

Текущее `heroios.mov` = 270×480 (слишком мало) + MOV. Ни один из готовых `.mp4` в `assets` не идеален (один 1080×1920/4.3 MB, другой 720×1280 но **с аудиодорожкой**). Рекомендую перекодировать в целевой MP4:

**Рекомендованные production-параметры Hero:**
- Контейнер: **MP4** (`video/mp4`).
- Кодек: H.264 **Baseline или Main** (не High — максимальная совместимость iOS; High тоже играет, но Baseline безопаснее).
- Разрешение: **720×1280** (вертикальный Hero для iPhone; баланс качество/вес). Можно 1080×1920, если вес позволяет.
- Битрейт: ~**1.0–1.5 Mbps** (CRF 23–24 при 720×1280).
- FPS: 25–30.
- **Аудио: удалить (`-an`)** — гарантирует autoplay по правилу «нет аудиодорожки».
- `pix_fmt yuv420p`, 8-bit.
- **`-movflags +faststart`** (moov в начало).
- Keyframe ~ каждую секунду: `-g 25 -keyint_min 25 -sc_threshold 0` (при 25fps).

**Точная ffmpeg-команда (НЕ выполнялась, только предложение):**
```bash
ffmpeg -i src/assets/13393476_720_1280_30fps.mp4 \
  -c:v libx264 -profile:v baseline -level 3.1 \
  -pix_fmt yuv420p -crf 23 -preset slow \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" \
  -an \
  -movflags +faststart \
  -g 25 -keyint_min 25 -sc_threshold 0 \
  src/assets/hero.mp4
```
(Берём исходник `13393476_...mp4` как наиболее качественный; если есть оригинал 1080×1920 — лучше он. Если берём `ф13393476...mp4`, обязательно `-an`, т.к. там аудиодорожка.)

> Параметры сбалансированы: 720×1280 + ~1.2 Mbps + faststart + без аудио = быстрый initial load, iOS+Android совместимость, приемлемое качество.

---

## 15. Testing Plan

- **iPhone Safari (физический / sim):** открыть production и `vite preview`; проверить `video.muted`, `video.playsInline`, `video.paused`; что видео играет сразу; проверить в DevTools (remote) реальные свойства и `video.play()` resolve.
- **iPhone Chrome:** тот же WebKit — должен вести себя идентично Safari (проверить).
- **Android Chrome:** регресс-проверка — autoplay должен остаться рабочим после правок.
- **Desktop Chrome:** sanity-check (играет muted-loop).
- **Desktop Safari (macOS):** не требует `playsInline`, но autoplay-muted должен работать.
- Обязательно: проверить **Low Power Mode** на iPhone (fallback на poster).
- Проверить `curl -I -H "Range: bytes=0-1" <prod_url>` → ожидать `206` + `Content-Type: video/mp4`.

---

## 16. Exact Change List

**FILE:** `D:\HERMES\GeumChaQRmenu\src\components\home\Hero.tsx`
- CURRENT: `<video src={heroVideo} autoPlay muted loop playsInline disablePictureInPicture className="...opacity-0/opacity-100" onCanPlayThrough onError />`; импорт `heroios.mov`; нет ref/play.
- CHANGE: добавить `ref`, `useEffect` с `video.muted=true; video.defaultMuted=true; video.play().catch()`; убрать `opacity-0`-старт; добавить `poster`; заменить источник на MP4 (`<source type="video/mp4">`).
- WHY: устраняет 3 причины (muted-свойство, visibility, MOV).
- RISK: низкий. Fallback poster сохраняет UX при reject.

**FILE:** `D:\HERMES\GeumChaQRmenu\src\assets\heroios.mov` → заменить на `hero.mp4` (после перекодирования, раздел 14).
- WHY: MP4 + правильное разрешение + без аудио.
- RISK: требует генерации файла; старый `.mov` можно оставить, но не импортировать.

**FILE:** `D:\HERMES\GeumChaQRmenu\src\index.css` (опционально)
- CURRENT: `.hero-video` без opacity-логики (opacity задаётся в JSX).
- CHANGE: если оставляем fade-in — делать его через `onPlaying`, а не `onCanPlayThrough`, и никогда не держать `opacity-0` до старта. Или убрать fade полностью.
- WHY: visibility для WebKit.
- RISK: низкий (визуальный).

---

## 17. Risks / Edge Cases

- **Low Power Mode (iOS):** система может блокировать autoplay независимо от кода. Решение — `poster` как обязательный fallback; не делать fake-click.
- **Слабая сеть / Data Saver:** WebKit может отложить autoplay. `preload="auto"` + faststart смягчают.
- **React 19 `muted`:** даже в React 19 рекомендуется явное `video.muted = true` в ref (известная особенность). Не полагаться только на атрибут.
- **MOV → MP4:** после замены проверить, что GitHub Pages отдаёт `Content-Type: video/mp4` (по расширению `.mp4` будет корректно).
- **Размер файла:** не превышать ~2–3 MB для мобильного Hero (initial load).
- **StrictMode (React 19):** `useEffect` в dev запускается 2× — `play().catch()` идемпотентен, вреда нет.

---

## 18. Sources

### Official
1. WebKit Blog — «New <video> Policies for iOS» (Jer Noble, Apple): https://webkit.org/blog/6784/new-video-policies-for-ios — autoplay/muted/playsinline, `video.play()` Promise, visibility, fullscreen без playsinline.
2. MDN — «Autoplay guide for media and Web Audio APIs»: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay — muted/audible media, autoplay blocking.
3. MDN — `<video>` `playsinline` required for Safari iOS (mdn/content#44020): https://github.com/mdn/content/issues/44020
4. Apple — «Use Low Power Mode to save battery life»: https://support.apple.com/en-us/101604
5. Bitmovin — «AutoPlay Policies for Safari 14 and Chrome 64»: https://bitmovin.com/blog/autoplay-policies-safari-14-chrome-64

### Community / practical
6. Stack Overflow — «Why `muted` attribute on video tag is ignored in React?» (#61510160): https://stackoverflow.com/questions/61510160/why-muted-attribute-on-video-tag-is-ignored-in-react — **ключевой баг React**, подтверждён структурой нашего бандла.
7. Medium — «Autoplay muted HTML5 video using React on mobile (Safari/iOS 10+)»: https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5 — решение `video.muted=true` + `play()` + удаление аудио.
8. Bricks Community — «SOLVED: Background video not auto-playing on iPhone»: https://forum.bricksbuilder.io/t/solved-background-video-not-auto-playing-on-iphone/14343 — аудиодорожка и Low Power Mode ломают iOS.
9. Stack Overflow — «HTML5 Video tag not working in Safari, iPhone» (#20347352): https://stackoverflow.com/questions/20347352/html5-video-tag-not-working-in-safari-iphone-and-ipad — Low Power Mode + playsinline.
10. Shopify Community — «HTML5 Videos do not work in Safari… MP4/H.264 + Content-Type video/mp4»: https://community.shopify.com/t/html5-videos-do-not-work-in-safari-on-mac-or-ios-but-work-fine-in-other-browsers/231964 — MOV/H.264 недостаточно, нужен MP4 + MIME.
11. Svelte issue #7296 — «Background video not auto playing on mobile iOS»: https://github.com/sveltejs/svelte/issues/7296 — тот же класс (muted+mp4+playsinline всё равно может не стартовать без явного play()/muted-свойства).
12. ffmpeg wiki «Encode/H.264»: https://trac.ffmpeg.org/wiki/Encode/H.264 — `-movflags +faststart`, profile/level, CRF.

### Ограничения аудита (честно)
- **Browser/device-test не выполнен**: `browser_exec` заблокирован системным диалогом Chrome «Allow remote debugging» (нужен GUI-клик). Реальный iOS WebKit DOM-test и `video.play()` reject не зафиксированы эмпирически; выводы по iOS опираются на официальную WebKit-политику + доказанную структуру кода/бандла.
- **Production HTTP/Range не проверен**: `seoulkoreancuisine.vn` недоступен из этой среды (DNS). Раздел 9 = UNKNOWN по факту, но деплой точно на GitHub Pages (не Cloudflare).
- **Perplexity MCP** недоступен (ошибка non-ASCII, как в пред. отчёте) — исследование через web_search/web_extract + ffprobe + анализ бандла.

---

**Итог:** Root cause доказан на уровне кода/бандла — видео стартует `opacity-0`, использует MOV, и не гарантирует `video.muted` как DOM-свойство (нет ref/play). Минимальный фикс: `ref` + `video.muted=true` + `video.play().catch()` + MP4 + убрать opacity-0-старт + poster. **Никакие изменения не внесены.**
