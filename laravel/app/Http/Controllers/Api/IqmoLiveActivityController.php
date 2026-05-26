<?php

namespace App\Http\Controllers\Api;

use App\Constants\ApiErrorCode;
use App\Http\Controllers\Controller;
use App\Services\IqmoLiveActivityService;
use Illuminate\Http\Request;

final class IqmoLiveActivityController extends Controller
{
    public function __construct(
        private readonly IqmoLiveActivityService $activity
    ) {}

    public function index(Request $request)
    {
        $scope = (string) $request->query('scope', 'global');
        $subject = $request->query('subject');
        $chapter = $request->query('chapter');
        $limit = (int) $request->query('limit', 8);

        if ($scope === 'global') {
            $subject = null;
            $chapter = null;
        }

        $feed = $this->activity->getFeed(
            $scope !== '' ? $scope : null,
            is_string($subject) && $subject !== '' ? $subject : null,
            is_string($chapter) && $chapter !== '' ? $chapter : null,
            $limit
        );

        return response()->json($feed);
    }

    public function store(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');
        if ($userId < 1) {
            return response()->json(['error' => ApiErrorCode::UNAUTHORIZED], 401);
        }

        $body = $request->all();
        if (($body['heartbeat'] ?? false) && empty($body['type'])) {
            $this->activity->touchPresence(
                $userId,
                isset($body['subject']) ? (string) $body['subject'] : null,
                isset($body['chapter']) ? (string) $body['chapter'] : null,
                ! empty($body['publicOptIn'])
            );

            return response()->json(['ok' => true]);
        }

        $result = $this->activity->recordEvent($userId, $body);
        if (! ($result['ok'] ?? false)) {
            return response()->json(['ok' => false, 'reason' => $result['reason'] ?? 'rejected'], 202);
        }

        return response()->json(['ok' => true, 'event' => $result['event'] ?? null]);
    }
}
