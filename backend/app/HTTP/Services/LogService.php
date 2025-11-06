<?php

namespace BitApps\SMTP\HTTP\Services;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Connection;
use BitApps\SMTP\Deps\BitApps\WPDatabase\QueryBuilder;
use BitApps\SMTP\Deps\BitApps\WPKit\Helpers\Arr;
use BitApps\SMTP\Model\Log;
use DateTime;
use Throwable;
use WP_Error;

\defined('ABSPATH') || exit();

class LogService
{
    public function __construct()
    {
        if (\defined('DOING_CRON') && DOING_CRON) {
            $currentTime  = time();
            $logDeletedAt = Config::getOption('log_deleted_at', ($currentTime - (DAY_IN_SECONDS * 30)));
            if ((abs($logDeletedAt - $currentTime) / DAY_IN_SECONDS) > 30) {
                $this->deleteOlder();
            }
        }
    }

    public function all($skip = 0, $take = 20)
    {
        $logs  = [];
        $count = 0;
        if ($take < 1) {
            $take = 1;
        }

        try {
            $logs  = Log::skip($skip)
                ->take($take)
                ->desc()
                ->get();
            $count = Log::count();
        } catch (Throwable $th) {
            // throw $th;
        }

        $pages   = \intval($count / $take);
        $current = ($skip / $take) + 1;

        return compact('count', 'logs', 'pages', 'current');
    }

    public function success(array $mailData)
    {
        $this->save(Log::SUCCESS, $mailData);
    }

    public function error(WP_Error $error)
    {
        $this->save(Log::ERROR, $error->get_error_data(), $error->get_error_messages());
    }

    public function get(int $id): ?Log
    {
        return Log::where('id', $id)->first();
    }

    public function getBulk(array $ids)
    {
        return Log::where('id', $ids)->get();
    }

    public function save($status, $details, $message = null)
    {
        $log             = new Log();

        $log->status      = $status;
        if (isset($message)) {
            $log->debug_info    = \is_scalar($message) ? [$message] : $message;
        }

        $log->subject      = Arr::get($details, 'subject', '');
        $log->to_addr      = Arr::get($details, 'to', '');
        $log->from_addr    = Arr::get($details, 'from', '');

        unset($details['subject'], $details['to'], $details['from'], $details['phpmailer_exception_code']);
        $log->details    = $details;

        return $log->save();
    }

    public function update($id, $status, $details, $message = null)
    {
        $log = $this->get($id);
        if (!$log) {
            return false;
        }

        $log->retry_count = $log->retry_count + 1;
        $log->status      = $status;

        if (isset($message)) {
            $log->debug_info    = \is_scalar($message) ? [$message] : $message;
        }
        /*
        // Don't need to update these fields again....
            $log->subject     = Arr::get($details, 'subject', '');
            $log->to_addr    = Arr::get($details, 'to', '');
            $log->from_addr    = Arr::get($details, 'from', '');

            unset($details['subject'], $details['to'], $details['from'], $details['phpmailer_exception_code']);
            $log->details    = $details;
        */
        $log->save();
    }

    public function delete(array $ids)
    {
        Log::where('id', $ids)->delete();

        return Connection::prop('last_error') ? false : true;
    }

    public function deleteOlder()
    {
        $logRetention = Config::getOption('log_retention', 30);
        if ($logRetention > 200) {
            $logRetention = 200;
        }

        $currentDate = new DateTime();

        $dateToDelete = date_sub($currentDate, date_interval_create_from_date_string($logRetention . ' days'));
        $dateToDelete = date_format($dateToDelete, QueryBuilder::TIME_FORMAT);

        Config::updateOption('log_deleted_at', time());

        return Log::where('created_at', '<', $dateToDelete)->delete();
    }

    public function updateRetention($days)
    {
        if ($days < 1) {
            $days = 1;
        } elseif ($days > 200) {
            $days = 200;
        }

        $status = Config::updateOption('log_retention', $days);

        return (bool) ($status);
    }

    /**
     * Bulk insert multiple mail logs
     *
     * @param array<int,array{status: string, data: array|WP_Error}> $logs Array of log entries
     *
     * @return bool True on success, false on failure
     */
    public function bulkInsert(array $logs)
    {
        if (empty($logs)) {
            return false;
        }

        $records = [];
        foreach ($logs as $log) {
            if (!isset($log['status']) || !isset($log['data'])) {
                continue;
            }

            $record = [
                'status'      => $log['status'],
                'retry_count' => 0,
            ];

            if ($log['status'] === Log::ERROR && $log['data'] instanceof WP_Error) {
                $record['debug_info'] = wp_json_encode($log['data']->get_error_messages());
                $details              = $log['data']->get_error_data();
            } else {
                $details = $log['data'];
            }

            $record['subject']   = Arr::get($details, 'subject', '');
            $record['to_addr']   = wp_json_encode(Arr::get($details, 'to', []));
            $record['from_addr'] = Arr::get($details, 'from', '');

            unset(
                $details['subject'],
                $details['to'],
                $details['from'],
                $details['phpmailer_exception_code']
            );

            $record['details'] = wp_json_encode($details);
            $records[]         = $record;
        }

        if (empty($records)) {
            return false;
        }

        try {
            return (bool) Log::insert($records);
        } catch (Throwable $e) {
            return false;
        }
    }
}
