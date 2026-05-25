<?php

namespace App\Services;

/**
 * Разрешение URL аватара из iqmo-avatar-v1 (localStorage → profile_state).
 */
final class IqmoAvatarResolver
{
    public const STORAGE_KEY = 'iqmo-avatar-v1';

    /** @var array<string, string> */
    private const PRESET_URL = [
        'default' => '/assets/avatars/avatar-default.png',
        'boy' => '/assets/avatars/avatar-boy.png',
        'girl' => '/assets/avatars/avatar-girl.png',
    ];

    /**
     * @param  array<string, mixed>|null  $keys  decoded keys_json
     */
    public static function urlFromKeys(?array $keys): string
    {
        if ($keys === null || ! isset($keys[self::STORAGE_KEY])) {
            return self::PRESET_URL['default'];
        }

        return self::urlFromStoredValue($keys[self::STORAGE_KEY]);
    }

    /**
     * @param  mixed  $raw  JSON string or already-decoded array
     */
    public static function urlFromStoredValue(mixed $raw): string
    {
        if ($raw === null || $raw === '') {
            return self::PRESET_URL['default'];
        }

        if (is_string($raw)) {
            try {
                $decoded = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
            } catch (\Throwable) {
                return self::PRESET_URL['default'];
            }
        } elseif (is_array($raw)) {
            $decoded = $raw;
        } else {
            return self::PRESET_URL['default'];
        }

        if (! is_array($decoded)) {
            return self::PRESET_URL['default'];
        }

        $preset = (string) ($decoded['preset'] ?? 'default');
        if ($preset === 'custom') {
            $custom = (string) ($decoded['custom'] ?? '');
            if (str_starts_with($custom, 'data:image/')) {
                return $custom;
            }

            return self::PRESET_URL['default'];
        }

        return self::PRESET_URL[$preset] ?? self::PRESET_URL['default'];
    }
}
