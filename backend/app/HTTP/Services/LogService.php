<?php

namespace BitApps\SMTP\HTTP\Services;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Connection;
use BitApps\SMTP\Deps\BitApps\WPDatabase\QueryBuilder;
use BitApps\SMTP\Model\Log;
use DateTime;
use Throwable;

\defined('ABSPATH') || exit();

class LogService
{
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

    public function success($message, $data)
    {
        $this->save(Log::SUCCESS, $message, $data);
    }

    public function error($message, $data)
    {
        $this->save(Log::ERROR, $message, $data);
    }

    public function save($status, $message, $details)
    {
        $log             = new Log();

        $log->status     = $status;
        $log->message    = $message;
        $log->details    = $details;

        return $log->save();
    }

    public function delete($id)
    {
        Log::where('id', $id)->delete();

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
}
