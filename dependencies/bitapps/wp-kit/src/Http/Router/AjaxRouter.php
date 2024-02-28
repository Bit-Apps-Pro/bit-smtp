<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPKit\Http\Router;

use BitApps\SMTP\Dependencies\BitApps\WPKit\Hooks\Hooks;

/**
 * Base Router.
 *
 * @var Router $_route
 */
final class AjaxRouter
{
    private $_router;

    public function __construct(Router $router)
    {
        $this->_router = $router;
    }

    public function registerRoutes()
    {
        foreach ($this->_router->getRoutes() as $route) {
            $this->addRoute($route);
        }
    }

    public function addRoute(RouteRegister $route)
    {

        $requestMethod = isset($_SERVER['REQUEST_METHOD']) ? sanitize_text_field($_SERVER['REQUEST_METHOD']) : '';
        $action = isset($_REQUEST['action']) ? sanitize_text_field($_REQUEST['action']) : '';

        if (strpos($action, $this->_router->getAjaxPrefix()) === false
            || !\in_array(strtoupper($requestMethod), $route->getMethods())
        ) {
            return;
        }

        $requestPath = str_replace($this->_router->getAjaxPrefix(), '', $action);
        if (!$this->isRouteMatched($route, $requestPath)) {
            return;
        }

        Hooks::addAction('wp_ajax_' . $action, [$route, 'handleRequest']);
        if ($route->isNoAuth()) {
            Hooks::addAction('wp_ajax_nopriv_' . $action, [$route, 'handleRequest']);
        }

        $this->_router->addRegisteredRoute($this->currentRouteName(), $route);
    }

    public function currentRouteName()
    {
        $requestMethod = isset($_SERVER['REQUEST_METHOD']) ? sanitize_text_field($_SERVER['REQUEST_METHOD']) : '';
        $action = isset($_REQUEST['action']) ? sanitize_text_field($_REQUEST['action']) : '';
        
        return $requestMethod. $action;
    }

    /**
     * Returns current registered route.
     *
     * @return RouteRegister
     */
    public function currentRoute()
    {
        return $this->_router->getRegisteredRoute($this->currentRouteName());
    }

    private function isRouteMatched(RouteRegister $route, $requestPath)
    {
        if ($route->getRoutePrefix() . $route->getPath() === $requestPath) {
            return true;
        }

        if (
            !$route->hasRegex()
            || preg_match('~^(?|' . $route->regex() . ')$~x', $requestPath, $matchedRoutes) === false
            || empty($matchedRoutes)
        ) {
            return false;
        }

        foreach ($route->getRouteParams() as $param => $attribute) {
            if (isset($matchedRoutes[$param])) {
                $route->setRouteParamValue($param, $matchedRoutes[$param]);
            }
        }

        return $matchedRoutes[0] === $requestPath;
    }
}
