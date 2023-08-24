<?php

namespace BitApps\SMTP\Admin;

class Admin_Ajax
{
    /**
     * WordPress database abstraction object
     *
     * @var wpdb
     */
    public $wpdb;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
    }
    public function register()
    {
        add_action('wp_ajax_bit_save_email_config', array($this, 'saveMailConfig'));
        add_action('wp_ajax_bit_send_test_email', array($this, 'sendTestEmail'));
        add_action('wp_ajax_bit_get_mail_config', array($this, 'getMailConfig'));
    }

    private function mailPostData($request)
    {
        $mail_post_data = [
            'mailer' => isset($request['mailer']) ? sanitize_text_field($request['mailer']) : '',
            'option' => isset($request['option']) ? sanitize_text_field($request['option']) : '',
            'status' => isset($request['status']) ? sanitize_text_field($request['status']) : '',
            'form_email_address' => isset($request['form_email_address']) ? sanitize_email($request['form_email_address']) : '',
            'form_name' => isset($request['form_name']) ? sanitize_text_field($request['form_name']) : '',
            're_email_address' => isset($request['re_email_address']) ? sanitize_email($request['re_email_address']) : '',
            'smtp_host' => isset($request['smtp_host']) ? sanitize_text_field($request['smtp_host']) : '',
            'encryption' => isset($request['encryption']) ? sanitize_text_field($request['encryption']) : '',
            'port' => isset($request['port']) ? sanitize_text_field($request['port']) : '',
            'smtp_auth' => isset($request['smtp_auth']) ? sanitize_text_field($request['smtp_auth']) : '',
            'smtp_user_name' => isset($request['smtp_user_name']) ? sanitize_text_field($request['smtp_user_name']) : '',
            'smtp_password' => isset($request['smtp_password']) ? sanitize_text_field($request['smtp_password']) : '',
        ];
        return $mail_post_data;
    }

    public function saveMailConfig()
    {
        \ignore_user_abort();
        if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit-smtp')) {
            unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
            $mail_post_data = $this->mailPostData($_REQUEST);
            $result = update_option('bit_smtp_options', $mail_post_data);
            wp_send_json_success($result, 200);
        } else {
            wp_send_json_error(
                __(
                    'Token expired',
                    'bit-smtp'
                ),
                401
            );
        }
    }

    public function sendTestEmail()
    {
        \ignore_user_abort();
        if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit-smtp')) {
            $inputJSON = file_get_contents('php://input');
            $queryParams = json_decode($inputJSON);
            $to = isset($queryParams->to) ? sanitize_email($queryParams->to) : '';
            $subject = isset($queryParams->subject) ? sanitize_text_field($queryParams->subject) : '';
            $message = isset($queryParams->message) ? sanitize_text_field($queryParams->message) : '';
            unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
            if (!empty($to) && is_email($to) && !empty($subject) && !empty($message)) {
                try {

                    add_action('wp_mail_failed', function ($error) {
                        $errors = $error->errors['wp_mail_failed'];
                        wp_send_json_error(['error' => __($errors[0], 'bit-smtp')], 400);
                    });

                    wp_mail($to, $subject, $message);

                    wp_send_json_success(['error' => false], 200);
                } catch (Exception $e) {
                    $error = $e->getMessage();
                    wp_send_json_error(['error' => __($error, 'bit-smtp')], 400);
                }
            } else {
                $error = __('Some of the test fields are empty or an invalid email supplied', 'bit-smtp');
                wp_send_json_error(['error' => $error], 400);
            }
        } else {
            wp_send_json_error(
                __(
                    'Token expired',
                    'bit-smtp'
                ),
                401
            );
        }
    }

    public function getMailConfig()
    {
        $result = get_option('bit_smtp_options');
        wp_send_json_success($result, 200);
    }
}
