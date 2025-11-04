<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;
use BitApps\SMTP\HTTP\Requests\Log\DeleteLogRequest;
use BitApps\SMTP\HTTP\Services\LogService;

final class LogController
{
    private $logger;

    public function __construct()
    {
        $this->logger = new LogService();
        $currentTime  = time();
        $logDeletedAt = Config::getOption('log_deleted_at', ($currentTime - (DAY_IN_SECONDS * 30)));
        if ((abs($logDeletedAt - $currentTime) / DAY_IN_SECONDS) > 30) {
            $this->logger->deleteOlder();
        }
    }

    public function all(Request $request)
    {
        if (Capabilities::check('manage_options')) {
            return Response::error([])->message('unauthorized access');
        }

        $pageNo = \intval($request->pageNo) ?? 1;
        $limit  = \intval($request->limit)  ?? 14;

        return Response::success($this->logger->all((($pageNo - 1) * $limit), $limit));
    }

    public function delete(DeleteLogRequest $request)
    {
        $validatedIds = array_map(function ($id) {
            return \intval($id);
        }, $request->ids);
        $status = $this->logger->delete($validatedIds);
        if ($status) {
            return Response::success([])->message('log deleted successfully');
        }

        return Response::error([])->message('failed to delete log');
    }
}
