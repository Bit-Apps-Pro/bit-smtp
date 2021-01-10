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
    add_action('wp_ajax_bit_email_log', array($this, 'getMailLog'));
    add_action('wp_ajax_bit_save_email_config', array($this, 'saveMailConfig'));
    add_action('wp_ajax_bit_send_test_email', array($this, 'sendTestEmail'));
    add_action('wp_ajax_bitforms_get_mail_config', array($this, 'getMailConfig'));
  }
  public function getMailLog()
  {
    echo 'log';
  }

  public function saveMailConfig()
  {
    if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit_wp_smtp')) {
      unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
      $mailDetails = json_encode($_REQUEST);
      $query = "UPDATE `{$this->wpdb->prefix}options` SET `option_value` = '$mailDetails' WHERE `{$this->wpdb->prefix}options`.`option_name`='bit_smtp_options'";
      $result = $this->wpdb->query($query);
      if ($result) {
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
    if (wp_verify_nonce(sanitize_text_field($_REQUEST['_ajax_nonce']), 'bit_wp_smtp')) {
      $inputJSON = file_get_contents('php://input');
      $queryParams = json_decode($inputJSON);

      $to = wp_unslash($queryParams->to);
      $subject = wp_unslash($queryParams->subject);
      $message = wp_unslash($queryParams->message);
      unset($_REQUEST['_ajax_nonce'], $_REQUEST['action']);
      if (!empty($to) && is_email($to) && !empty($subject) && !empty($message)) {
        try {
          $result = wp_mail($to, $subject, $message);
          wp_send_json_success($result, 200);
        } catch (Exception $e) {
          $status = $e->getMessage();
        }
      } else {
        $status = __('Some of the test fields are empty or an invalid email supplied', 'wp-smtp');
      }
    } else {
      wp_send_json_error(
        __(
          'Token expired',
          'bitform'
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
