<?php

namespace BitApps\BMI\Core\Utils;

use BitApps\BMI\Config;

class Hash
{
    const CIPHER  = 'aes-256-cbc';

    public static function encrypt($data)
    {
        $secretKey = Config::getOption('secret_key');
        if (!$secretKey) {
            $secretKey = Config::VAR_PREFIX . time();
            Config::addOption('secret_key', $secretKey, true);
        }
        $ivLength   = openssl_cipher_iv_length(self::CIPHER);
        $iv         = openssl_random_pseudo_bytes($ivLength);
        $cipherText = openssl_encrypt($data, self::CIPHER, $secretKey, 0, $iv);

        return base64_encode($iv . $cipherText);
    }

    public static function decrypt($encryptedData)
    {
        $secretKey = Config::getOption('secret_key');
        if (!$secretKey) {
            $secretKey = Config::VAR_PREFIX . time();
            Config::addOption('secret_key', $secretKey, true);
        }
        $decode     = base64_decode($encryptedData);
        $ivLength   = openssl_cipher_iv_length(self::CIPHER);
        $iv         = substr($decode, 0, $ivLength);
        $cipherText = substr($decode, $ivLength);

        return openssl_decrypt($cipherText, self::CIPHER, $secretKey, 0, $iv);
    }
}
