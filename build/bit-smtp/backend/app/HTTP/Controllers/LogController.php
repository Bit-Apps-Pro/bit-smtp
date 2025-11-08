<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\HTTP\Requests\DeleteLogRequest;
use BitApps\SMTP\Plugin;

final class LogController
{
    private $logger;

    public function __construct()
    {
        $this->logger = Plugin::instance()->logger();
    }

    public function all(Request $request)
    {
        $pageNo = \intval($request->pageNo) ?? 1;
        $limit  = \intval($request->limit)  ?? 14;

        $filters = [];
        if (isset($request->to_addr) && !empty($request->to_addr)) {
            $filters['to_addr'] = sanitize_text_field($request->to_addr);
        }

        return Response::success($this->logger->all((($pageNo - 1) * $limit), $limit, $filters));
    }

    public function details(Request $request)
    {
        $logId = \intval($request->id);

        return Response::success($this->logger->get($logId));
    }

    public function delete(DeleteLogRequest $request)
    {
        $validatedIds = array_map(function ($id) {
            return \intval($id);
        }, $request->ids);
        $status = $this->logger->delete($validatedIds);
        if ($status) {
            return Response::success([])->message(__('Log deleted', 'bit-smtp'));
        }

        return Response::error([])->message(__('Failed to delete log', 'bit-smtp'));
    }

    public function updateRetention(Request $request)
    {
        $days   = \intval($request->period);
        $status = $this->logger->updateRetention($days);
        if ($status) {
            return Response::success([])->message(__('Log retention period updated successfully', 'bit-smtp'));
        }

        return Response::error([])->message(__('Failed to update log retention period', 'bit-smtp'));
    }

    public function isEnabled(Request $request)
    {
        $enabled = $this->logger->isEnabled();

        return Response::success(['enabled' => $enabled]);
    }

    public function toggle(Request $request)
    {
        $enabled = isset($request->enabled) ? (bool) $request->enabled : false;
        $status  = $this->logger->setEnabled($enabled);
        if ($status) {
            return Response::success(['enabled' => $enabled])->message(__('Logging updated', 'bit-smtp'));
        }

        return Response::error([])->message(__('Failed to update logging setting', 'bit-smtp'));
    }
}
