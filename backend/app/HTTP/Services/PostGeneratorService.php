<?php

namespace BitApps\BMI\HTTP\Services;

use BitApps\BMI\Model\Platform;

class PostGeneratorService
{
    public static function createPost($category, $platFormType = null, $appName = null, $status = null)
    {
        if (empty($platFormType) && empty($appName)) {
            return PostGeneratorService::generateAllPlatformPost($category);
        }

        return PostGeneratorService::generateNewPlatformPost($category, $platFormType, $appName, $status);
    }

    public static function latestApps()
    {
        $triggers = App::triggers();
        $actions  = App::actions();

        $platforms  = Platform::all(['platform_type', 'app_name']);
        $newTrigger = [];
        $newAction  = [];

        if (!empty($platforms)) {
            foreach ($platforms as $platform) {
                if ($platform->platform_type === 'trigger') {
                    $newTrigger[strtolower(str_replace(' ', '-', $platform->app_name))] = $platform->app_name;
                }
                if ($platform->platform_type === 'action') {
                    $newAction[strtolower(str_replace(' ', '-', $platform->app_name))] = $platform->app_name;
                }
            }
        }

        return [
            'triggers' => array_diff($triggers, $newTrigger),
            'actions'  => array_diff($actions, $newAction)
        ];
    }

    public static function generateNewPlatformPost($category, $platFormType, $appName, $status)
    {
        $actions  = static::latestApps()['actions'];
        $triggers = static::latestApps()['triggers'];

        if ($platFormType === 'trigger') {
            foreach ($actions as $action) {
                $postData = static::postData($appName, $action, $category, $status);

                $insert = wp_insert_post($postData);
                if (!$insert) {
                    return false;
                }
            }
        } else {
            foreach ($triggers as $trigger) {
                $postData = static::postData($trigger, $appName, $status);
                $insert   = wp_insert_post($postData);

                if (!$insert) {
                    return false;
                }
            }
        }
    }

    public static function generateAllPlatformPost($category)
    {
        $actions  = static::latestApps()['actions'];
        $triggers = static::latestApps()['triggers'];

        foreach ($triggers as $trigger) {
            foreach ($actions as $action) {
                $insert = wp_insert_post(static::postData($trigger, $action, $category));
                if (!$insert) {
                    return false;
                }
            }
        }
    }

    private static function postData($triggerName, $actionName, $category, $status = null)
    {
        $title = ContentGenerationService::generateTitle($triggerName, $actionName);

        $content = '{introduction}<br/>{installation_process}<br/>{trigger_step}<br/>{action_step}<br/>{conclusion}<br/>{trigger_use_case}<br/>{action_use_case}';

        return [
            'post_title'    => $title,
            'post_content'  => $content,
            'post_status'   => isset($status) ? $status : 'draft',
            'post_type'     => 'blogs',
            'post_name'     => strtolower(str_replace(' ', '-', $triggerName)) . ' integrations ' . strtolower(str_replace(' ', '-', $actionName)),
            'post_category' => [$category]
        ];
    }
}
