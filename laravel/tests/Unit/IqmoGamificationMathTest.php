<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\IqmoGamificationMath;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class IqmoGamificationMathTest extends TestCase
{
    #[Test]
    public function parse_profile_user_id_accepts_zero_padded_iq_prefix(): void
    {
        $this->assertSame(868, IqmoGamificationMath::parseProfileUserId('IQ-0868'));
        $this->assertSame(868, IqmoGamificationMath::parseProfileUserId('iq-0868'));
    }

    #[Test]
    public function parse_profile_user_id_rejects_invalid_formats(): void
    {
        $this->assertNull(IqmoGamificationMath::parseProfileUserId('IQ-0000'));
        $this->assertNull(IqmoGamificationMath::parseProfileUserId('0868'));
        $this->assertNull(IqmoGamificationMath::parseProfileUserId('IQ-abc'));
    }

    #[Test]
    public function format_profile_id_zero_pads_to_four_digits(): void
    {
        $this->assertSame('IQ-0042', IqmoGamificationMath::formatProfileId(42));
        $this->assertSame('IQ-0868', IqmoGamificationMath::formatProfileId(868));
    }

    #[Test]
    public function stars_for_percent_matches_frontend_thresholds(): void
    {
        $this->assertSame(0, IqmoGamificationMath::starsForPercent(49));
        $this->assertSame(1, IqmoGamificationMath::starsForPercent(50));
        $this->assertSame(2, IqmoGamificationMath::starsForPercent(70));
        $this->assertSame(3, IqmoGamificationMath::starsForPercent(90));
    }

    #[Test]
    public function compute_level_detail_at_zero_is_level_one(): void
    {
        $detail = IqmoGamificationMath::computeLevelDetail(0);

        $this->assertSame(1, $detail['current']);
        $this->assertSame(0, $detail['minXpThisLevel']);
        $this->assertGreaterThan(0, $detail['xpToNext']);
    }

    #[Test]
    public function display_name_from_email_title_cases_local_part(): void
    {
        $this->assertSame('Anna Test', IqmoGamificationMath::displayNameFromEmail('anna.test@iqmo.ru'));
        $this->assertSame('Ученик IQMO', IqmoGamificationMath::displayNameFromEmail('@empty.test'));
    }

    #[Test]
    public function initials_from_name_returns_up_to_two_letters(): void
    {
        $this->assertSame('AT', IqmoGamificationMath::initialsFromName('Anna Test'));
        $this->assertSame('AN', IqmoGamificationMath::initialsFromName('Anna'));
    }
}
