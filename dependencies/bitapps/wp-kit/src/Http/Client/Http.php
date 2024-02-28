<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPKit\Http\Client;

use ArgumentCountError;
use BadMethodCallException;

class Http
{
    private HttpClient $_client;

    public function __call($method, $args)
    {
        return $this->forwardCall($method, $args);
    }

    public static function __callStatic($method, $args)
    {
        return forward_static_call([new static(), 'forwardCall'], $method, $args);
    }

    private function forwardCall($method, $args)
    {
        if (!isset($this->_client)) {
            $this->_client = new HttpClient();
        }

        if (method_exists($this->_client, $method)) {
            return $this->_client->{$method}(...$args);
        }

        if (\in_array($method, ['post', 'get', 'put'])) {
            $argsCount = \count($args);
            if ($argsCount < 2) {
                throw new ArgumentCountError('Too few arguments to function ' . esc_html($method) . ' passed ' . $argsCount . ', At least 2 expected');
            }

            $url = $args[0];
            unset($args[0]);

            return $this->_client->request($url, $method, ...$args);
        }

        throw new BadMethodCallException(esc_html($method) . ' method not exists in ' . __CLASS__);
    }
}
