# Инструкция для Cursor — карточка профиля с рейтингом друзей

## Что сделано

В файле `subject-chemistry.html` добавлена **карточка профиля** в левой колонке (aside) — располагается **под блоком «Предметы»**.

Карточка содержит:
- 👤 Шапка: аватар с инициалами, имя пользователя, бейдж уровня («lvl 7 Знаток»)
- 📊 Блок из 4 статистик (сетка 2×2):
  - 🔥 Серия дней подряд (streak)
  - Тесты пройдено
  - Очки опыта
  - Дней на IQMO
- 🏆 Рейтинг друзей — топ-5 за неделю, текущий пользователь подсвечен синим
- 🔗 Ссылка «Открыть профиль →» внизу

---

## Что нужно сделать в Cursor

### 1. Добавить CSS

В `<style>` внутри `<head>`, сразу **ПЕРЕД** комментарием `/* ---- hero (light, with side illustration) ---- */` добавить блок:

```css
/* ---- profile card (aside) ---- */
.profile-card {
    margin-top: 14px;
    background: #fff;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 16px 14px 14px;
}
.profile-card__head {
    display: flex; align-items: center; gap: 10px;
    padding-bottom: 12px; margin-bottom: 12px;
    border-bottom: 1px solid var(--line);
}
.profile-card__avatar {
    width: 40px; height: 40px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
    background: linear-gradient(135deg, #4f7bd6 0%, #6b93e0 100%);
    color: #fff; flex: 0 0 auto;
}
.profile-card__name {
    font-weight: 700; font-size: 14px; color: var(--ink);
    line-height: 1.2; margin-bottom: 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.profile-card__level {
    font-size: 11px; color: var(--muted);
    display: inline-flex; align-items: center; gap: 4px;
}
.profile-card__level-badge {
    background: #eef3fc; color: var(--accent);
    font-weight: 700; font-size: 10px;
    padding: 2px 6px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: .04em;
    white-space: nowrap;
}
.profile-card__info { min-width: 0; flex: 1; }

.profile-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    margin-bottom: 14px;
}
.profile-stat {
    background: #f7f9fc; border-radius: 10px;
    padding: 9px 10px; min-width: 0;
}
.profile-stat__num {
    font-weight: 700; font-size: 16px; color: var(--ink);
    line-height: 1.1; display: flex; align-items: center; gap: 4px;
}
.profile-stat__num svg { width: 14px; height: 14px; }
.profile-stat__label {
    font-size: 10.5px; color: var(--muted); margin-top: 3px;
    line-height: 1.2;
}
.profile-stat--streak .profile-stat__num { color: #e35d2a; }
.profile-stat--points .profile-stat__num { color: var(--accent); }

.profile-friends__title {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: var(--muted);
    margin-bottom: 8px;
    display: flex; align-items: center; justify-content: space-between;
}
.profile-friends__list {
    display: flex; flex-direction: column; gap: 6px;
}
.profile-friend {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 8px; border-radius: 10px;
    transition: background .15s;
    text-decoration: none;
}
.profile-friend:hover { background: #f7f9fc; }
.profile-friend__rank {
    font-weight: 700; font-size: 12px;
    width: 18px; text-align: center;
    color: var(--muted); flex: 0 0 auto;
}
.profile-friend--1 .profile-friend__rank { color: #e3a32a; }
.profile-friend--2 .profile-friend__rank { color: #8a93a3; }
.profile-friend--3 .profile-friend__rank { color: #c17b4a; }
.profile-friend--me { background: #eef3fc; }
.profile-friend--me:hover { background: #e3ecfa; }
.profile-friend--me .profile-friend__name { color: var(--accent); }
.profile-friend__avatar {
    width: 22px; height: 22px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 10px; color: #fff;
    flex: 0 0 auto;
}
.profile-friend__name {
    flex: 1; min-width: 0;
    font-size: 12.5px; font-weight: 500; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.profile-friend__score {
    font-size: 12px; font-weight: 700; color: var(--muted);
    flex: 0 0 auto;
}
.profile-friend--me .profile-friend__score { color: var(--accent); }

.profile-card__link {
    display: block; text-align: center; margin-top: 10px;
    font-size: 12px; font-weight: 600; color: var(--accent);
    text-decoration: none; padding: 6px;
}
.profile-card__link:hover { text-decoration: underline; }
```

### 2. Добавить HTML-разметку

Найти внутри `<aside class="grid__aside" aria-label="Предметы">` закрывающий тег `</nav>`. **СРАЗУ ПОСЛЕ** `</nav>` (но **ДО** закрывающего `</aside>`) вставить:

```html
<!-- Profile card -->
<aside class="profile-card" aria-label="Профиль">
    <div class="profile-card__head">
        <div class="profile-card__avatar" aria-hidden="true">АМ</div>
        <div class="profile-card__info">
            <div class="profile-card__name">Анна Морозова</div>
            <div class="profile-card__level">
                <span class="profile-card__level-badge">lvl 7</span>
                <span>Знаток</span>
            </div>
        </div>
    </div>

    <div class="profile-stats">
        <div class="profile-stat profile-stat--streak">
            <div class="profile-stat__num">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s1 2 2 2c0-3 1-5 1-8z"/></svg>
                12
            </div>
            <div class="profile-stat__label">дней подряд</div>
        </div>
        <div class="profile-stat">
            <div class="profile-stat__num">47</div>
            <div class="profile-stat__label">тестов пройдено</div>
        </div>
        <div class="profile-stat profile-stat--points">
            <div class="profile-stat__num">1 820</div>
            <div class="profile-stat__label">очков опыта</div>
        </div>
        <div class="profile-stat">
            <div class="profile-stat__num">38</div>
            <div class="profile-stat__label">дней на IQMO</div>
        </div>
    </div>

    <div class="profile-friends">
        <div class="profile-friends__title">
            <span>Рейтинг друзей</span>
            <span style="color: var(--muted); font-weight: 500;">за неделю</span>
        </div>
        <div class="profile-friends__list">
            <a href="#" class="profile-friend profile-friend--1">
                <span class="profile-friend__rank">1</span>
                <span class="profile-friend__avatar" style="background:#3ec37a;">МК</span>
                <span class="profile-friend__name">Максим К.</span>
                <span class="profile-friend__score">2 140</span>
            </a>
            <a href="#" class="profile-friend profile-friend--2 profile-friend--me">
                <span class="profile-friend__rank">2</span>
                <span class="profile-friend__avatar" style="background:linear-gradient(135deg,#4f7bd6 0%,#6b93e0 100%);">АМ</span>
                <span class="profile-friend__name">Вы</span>
                <span class="profile-friend__score">1 820</span>
            </a>
            <a href="#" class="profile-friend profile-friend--3">
                <span class="profile-friend__rank">3</span>
                <span class="profile-friend__avatar" style="background:#e39b2a;">ДС</span>
                <span class="profile-friend__name">Дима С.</span>
                <span class="profile-friend__score">1 560</span>
            </a>
            <a href="#" class="profile-friend">
                <span class="profile-friend__rank">4</span>
                <span class="profile-friend__avatar" style="background:#8a93a3;">ЛП</span>
                <span class="profile-friend__name">Лена П.</span>
                <span class="profile-friend__score">1 340</span>
            </a>
            <a href="#" class="profile-friend">
                <span class="profile-friend__rank">5</span>
                <span class="profile-friend__avatar" style="background:#b47fe0;">НВ</span>
                <span class="profile-friend__name">Никита В.</span>
                <span class="profile-friend__score">1 120</span>
            </a>
        </div>
    </div>

    <a href="./profile.html" class="profile-card__link">Открыть профиль →</a>
</aside>
```

---

## Что нужно будет сделать на бэкенде (задачи для Cursor)

Все данные сейчас **моковые** (захардкожены). Их нужно заменить на реальные:

### Данные пользователя
| Место в HTML | Что подставить |
|---|---|
| `.profile-card__avatar` содержимое | инициалы пользователя (первые буквы имени + фамилии) |
| `.profile-card__name` | Имя пользователя |
| `.profile-card__level-badge` | Уровень (например `lvl N`, вычисляется из XP) |
| `.profile-card__level` текст после бейджа | Название уровня («Новичок», «Ученик», «Знаток», «Эксперт», «Мастер») |

### Статистики
| Поле | Источник |
|---|---|
| Серия дней подряд | user.streak_days |
| Тесты пройдено | count(completed_tests) |
| Очки опыта | user.xp_total |
| Дней на IQMO | today - user.registered_at |

### Рейтинг друзей
Получить топ-5 из API `GET /api/friends/leaderboard?period=week`, вернуть:
```json
[
  { "rank": 1, "name": "Максим К.", "initials": "МК", "avatar_color": "#3ec37a", "score": 2140, "is_me": false },
  { "rank": 2, "name": "Вы", "initials": "АМ", "score": 1820, "is_me": true },
  ...
]
```
- Для `is_me: true` добавлять класс `profile-friend--me` и ставить имя «Вы».
- Для топ-3 — классы `profile-friend--1/2/3` (цвет ранга).

### Система уровней (рекомендация)
```
Новичок:   0–100 XP      (lvl 1–2)
Ученик:    100–500       (lvl 3–5)
Знаток:    500–2000      (lvl 6–10)
Эксперт:   2000–5000     (lvl 11–15)
Мастер:    5000+         (lvl 16+)
```

### Начисление XP (рекомендация)
- Разминка: 10 XP
- Быстрый тест: 30 XP
- Тренировка по категории: 50 XP
- Полный вариант ОГЭ: 100 XP
- Бонус за серию (+10% на каждый день streak, cap 50%)
- Бонус за правильные ответы подряд

---

## Адаптив

Карточка работает и на десктопе (в sticky sidebar слева), и на мобильных (растягивается на всю ширину под блоком «Предметы»). Специальных media-queries не требует.
