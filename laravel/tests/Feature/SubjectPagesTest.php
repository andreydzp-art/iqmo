<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

/**
 * Subject pages live at clean URLs (/subject-chemistry/, /subject-biology/);
 * the legacy /subject-<slug>.html paths must 301 to the new clean URLs so
 * that search results, email links, and external referrals keep working.
 *
 * Файлы лежат в public/site/subject-<slug>/index.html (sync-site mirrors
 * extracted/subject-<slug>/index.html into laravel/public/site/).
 */
final class SubjectPagesTest extends TestCase
{
    public function test_chemistry_clean_url_serves_subject_page(): void
    {
        $response = $this->get('/subject-chemistry/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_biology_clean_url_serves_subject_page(): void
    {
        $response = $this->get('/subject-biology/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_chemistry_clean_url_without_trailing_slash_also_works(): void
    {
        // Laravel нормализует /subject-<slug> и /subject-<slug>/ к одному
        // обработчику; обе формы должны отдавать страницу, не 404.
        $this->get('/subject-chemistry')->assertStatus(200);
    }

    public function test_biology_clean_url_without_trailing_slash_also_works(): void
    {
        $this->get('/subject-biology')->assertStatus(200);
    }

    public function test_legacy_chemistry_html_redirects_301(): void
    {
        $response = $this->get('/subject-chemistry.html');

        $response->assertStatus(301);
        $response->assertRedirect('/subject-chemistry/');
    }

    public function test_legacy_biology_html_redirects_301(): void
    {
        $response = $this->get('/subject-biology.html');

        $response->assertStatus(301);
        $response->assertRedirect('/subject-biology/');
    }

    public function test_unknown_subject_returns_404(): void
    {
        // Math/Russian страниц ещё нет — пока должны давать 404, чтобы поисковики
        // не индексировали пустые URL. Когда страницы появятся — добавить slug в
        // массив $SUBJECTS в routes/web.php.
        $this->get('/subject-math/')->assertStatus(404);
        $this->get('/subject-russian/')->assertStatus(404);
        $this->get('/subject-physics.html')->assertStatus(404);
    }

    public function test_full_test_chemistry_clean_url_serves_page(): void
    {
        $response = $this->get('/full-test-chemistry/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_full_test_biology_clean_url_serves_page(): void
    {
        $response = $this->get('/full-test-biology/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_full_test_clean_url_without_trailing_slash_also_works(): void
    {
        $this->get('/full-test-chemistry')->assertStatus(200);
        $this->get('/full-test-biology')->assertStatus(200);
    }

    public function test_legacy_full_test_chemistry_html_redirects_301(): void
    {
        $response = $this->get('/full-test-chemistry.html');

        $response->assertStatus(301);
        $response->assertRedirect('/full-test-chemistry/');
    }

    public function test_legacy_full_test_biology_html_redirects_301(): void
    {
        $response = $this->get('/full-test-biology.html');

        $response->assertStatus(301);
        $response->assertRedirect('/full-test-biology/');
    }

    public function test_unknown_full_test_returns_404(): void
    {
        // Полный вариант реализован только для chemistry/biology. Для math/russian
        // пока 404 — добавим в массив $FULL_TESTS, когда тесты появятся.
        $this->get('/full-test-math/')->assertStatus(404);
        $this->get('/full-test-physics.html')->assertStatus(404);
    }

    public function test_root_serves_homepage(): void
    {
        // Каноничный URL главной — `/`. Должен отдавать HTML, а не редирект.
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_legacy_index_html_redirects_301_to_root(): void
    {
        // /index.html раньше отдавал ту же страницу, что и /, и оставлял в индексе
        // два URL с идентичным контентом. Теперь — 301 на /.
        $response = $this->get('/index.html');

        $response->assertStatus(301);
        $response->assertRedirect('/');
    }

    public function test_profile_clean_url_serves_page(): void
    {
        // /profile/ — каноничный URL кабинета (симметрично subject/full-test).
        $response = $this->get('/profile/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_profile_clean_url_without_trailing_slash_also_works(): void
    {
        $this->get('/profile')->assertStatus(200);
    }

    public function test_legacy_profile_html_redirects_301(): void
    {
        // /profile.html переехал на /profile/. 301, чтобы старые ссылки и
        // закладки шли в каноничное место и не плодили дубль в индексе.
        $response = $this->get('/profile.html');

        $response->assertStatus(301);
        $response->assertRedirect('/profile/');
    }
}
