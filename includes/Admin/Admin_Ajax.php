<?php

namespace BitPress\BIT_SMTP\Admin;

class Admin_Ajax
{
  public function __construct()
  {
    global $wpdb;
    $this->wpdb = $wpdb;
  }
  public function register()
  {
    add_action('wp_ajax_bit_save_email_config', array($this, 'saveMailConfig'));
    add_action('wp_ajax_bit_send_test_email', array($this, 'sendTestEmail'));
    add_action('wp_ajax_bitforms_get_mail_config', array($this, 'getMailConfig'));
  }

  private function mailPostData($request){
    $mail_post_data = [
      'status' => isset($request['status']) ? sanitize_text_field($request['status']) : '',
      'form_email_address' => isset($request['form_email_address']) ? sanitize_email($request['form_email_address']) : '',
      'form_name' => isset($request['form_name']) ? sanitize_text_field($request['form_name']) : '',
      're_email_address' => isset($request['re_email_address']) ? sanitize_email($request['re_email_address']) : '',
      'smtp_host' => isset($request['smtp_host']) ? sanitize_text_field($request['smtp_host']) : '',
      'encryption' => isset($request['encryption']) ? sanitize_text_field($request['encryption']) : '',
      'port' => isset($request['port']) ? sanitize_text_field($request['port']) : '',
      'smtp_auth' => isset($request['smtp_auth']) ? sanitize_text_field($request['smtp_auth']) : '',
      'smtp_user_name' => isset($request['smtp_user_name']) ? sanitize_text_field($request['smtp_user_name']) : '',
      'smtp_password' => isset($request['smtp_password']) ? sanitize_text_field($request['smtp_password']) : ''
    ];
    return $mail_post_data;
  }

  public function saveMailConfig()
  {
    \ignore_user_abort();
    if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit_smtp')) {
      unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
      $mail_post_data = $this->mailPostData($_REQUEST);
      $result = update_option('bit_smtp_options',wp_json_encode($mail_post_data));
      wp_send_json_success($result, 200);
    } else {
      wp_send_json_error(
        __(
          'Token expired',
          'bitsmtp'
        ),
        401
      );
    }
  }

  public function sendTestEmail()
  {
    \ignore_user_abort();
    if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit_smtp')) {
      $inputJSON = file_get_contents('php://input');
      $queryParams = json_decode($inputJSON);
      $to =  isset($queryParams->to) ? sanitize_email($queryParams->to) : '';
      $subject =  isset($queryParams->subject) ? sanitize_text_field($queryParams->subject) : '';
      $message  =  isset($queryParams->message) ? sanitize_text_field($queryParams->message) : '';
      unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
      if (!empty($to) && is_email($to) && !empty($subject) && !empty($message)) {
        try {
          $result = wp_mail($to, $subject, $message);
          wp_send_json_success($result, 200);
        } catch (Exception $e) {
          $status = $e->getMessage();
        }
      } else {
        $status = __('Some of the test fields are empty or an invalid email supplied', 'bit-smtp');
      }
    } else {
      wp_send_json_error(
        __(
          'Token expired',
          'bitsmtp'
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
