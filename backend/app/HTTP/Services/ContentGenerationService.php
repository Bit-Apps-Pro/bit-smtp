<?php

namespace BitApps\SMTP\HTTP\Services;

class ContentGenerationService
{
    public static function generateTitle($triggerName, $actionName)
    {
        $titles = [
            'How to integrate ' . $triggerName . ' with ' . $actionName . ' only 2 easy Steps',
            'Connect ' . $triggerName . ' with ' . $actionName . ' integration in less than 2 minutes',
            'Automate ' . $triggerName . ' with ' . $actionName . ' integration FREE',
        ];

        $randomIndex = array_rand($titles, 1);

        return $titles[$randomIndex];
    }

    public static function randomActions($trigger)
    {
        $actions = App::actions();

        $randomKeys       = array_rand($actions, 5);

        $url              = site_url();

        $actionRandomList = '<ul>';
        $triggerSlug      = strtolower(str_replace(' ', '-', $trigger));

        foreach ($randomKeys as $key) {
            $actionSlug = strtolower(str_replace(' ', '-', $actions[$key]));
            $actionRandomList .= "<li> <a href='{$url}/{$triggerSlug}-integrations-{$actionSlug}'>{$trigger} integration with {$actions[$key]}</a> </li>";
        }

        $actionRandomList .= '</ul>';

        return $actionRandomList;
    }

    public static function randomTriggers($action)
    {
        $triggers          = App::triggers();
        $randomKeys        = array_rand($triggers, 5);

        $triggerRandomList = '<ul>';
        $url               = site_url();
        $actionSlug        = strtolower(str_replace(' ', '-', $action));

        foreach ($randomKeys as $key) {
            $triggerSlug      = strtolower(str_replace(' ', '-', $triggers[$key]));
            $triggerRandomList .= "<li> <a href='{$url}/{$triggerSlug}-integrations-{$actionSlug}'>{$action} integration with {$triggers[$key]}</a> </li>";
        }

        $triggerRandomList .= '</ul>';

        return $triggerRandomList;
    }
}
