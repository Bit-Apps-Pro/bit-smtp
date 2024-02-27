#!/usr/bin/env bash
showHelp() {

    local option=""
    if [ ! -z "$1" ]; then
        option="option [$1] does not exists in this command"
    fi

    # `cat << EOF` This means that cat should stop reading when EOF is detected
    cat <<EOF

    $option

    Usage: ./install-wp-tests.sh <wp-version> 

    -h, --help                  Display help
EOF
    exit 0
}

commandExists() {
    which "$1" >/dev/null 2>&1
}

pathExists() {
    local is_exists=0

    if [ -d "$1" ]; then
        is_exists=1
    elif [ -f "$1" ]; then
        is_exists=1
    fi
    [ $is_exists -ne 0 ] 2>&1
}

download() {
    if [ $(which curl) ]; then
        curl -s "$1" >"$2"
    elif [ $(which wget) ]; then
        wget -nv -O "$2" "$1"
    fi
}

isYes() {
    shopt -s nocasematch
    local yes=0
    if [[ $1 =~ ^(y|yes)$ ]]; then
        yes=1
    fi
    shopt -u nocasematch
    if [ $yes -eq 0 ]; then
        exit
    fi
}

settesttag() {
    if [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+\-(beta|RC)[0-9]+$ ]]; then
        WP_BRANCH=${WP_VERSION%\-*}
        WP_TESTS_TAG="branches/$WP_BRANCH"

    elif [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+$ ]]; then
        WP_TESTS_TAG="branches/$WP_VERSION"
    elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
        if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
            # version x.x.0 means the first release of the major version, so strip off the .0 and download version x.x
            WP_TESTS_TAG="tags/${WP_VERSION%??}"
        else
            WP_TESTS_TAG="tags/$WP_VERSION"
        fi
    elif [[ $WP_VERSION == 'nightly' || $WP_VERSION == 'trunk' ]]; then
        WP_TESTS_TAG="trunk"
    else

        # http serves a single offer, whereas https serves multiple. we only want one
        download http://api.wordpress.org/core/version-check/1.7/ /tmp/wp-latest.json
        LATEST_VERSION=$(grep -o '"version":"[^"]*' /tmp/wp-latest.json | sed 's/"version":"//')
        if [[ -z "$LATEST_VERSION" ]]; then
            echo "Latest WordPress version could not be found"
            exit 1
        fi
        WP_TESTS_TAG="tags/$LATEST_VERSION"
    fi
}

alreadyexist() {
    if pathExists "$1"; then
        tput clear;
        read -p "$1 already exists. Are you sure you want to proceed? [y/N]: " CREATED;
        isYes CREATED;
    fi
}
mkTestDir() {
    WP_TESTS_DIR="$PLUGIN_DIR/tests/__libs"
    if ! pathExists "$WP_TESTS_DIR"; then
        mkdir "$WP_TESTS_DIR" -p 2 &>1
    fi
    echo -e "CREATING TEST DIR"
    settesttag
    install_test_suite
    createtestsbootstrap
    createphpunitconfig
}

createtestsbootstrap() {
    alreadyexist "$PLUGIN_DIR/tests/bootstrap.php";
    local PLUGIN_BASE_FILE=$(find $PLUGIN_DIR -maxdepth 1 -iname '*.php' -exec grep -H 'Plugin Name: ' /dev/null '{}' \; | sed -E "s:\:.+$::")
    local DIR=$(echo $PLUGIN_DIR | sed -E "s:$(dirname $PLUGIN_DIR)\/::")
    PLUGIN_BASE_FILE=$(echo $PLUGIN_BASE_FILE | sed -E "s:$PLUGIN_DIR\/::")
    (
        cat <<EOF
<?php
\$_tests_dir = __DIR__ . '/__libs';

if (! file_exists("{\$_tests_dir}/includes/functions.php")) {
    echo "Could not find {\$_tests_dir}/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    exit(1);
}

if (! file_exists(\dirname(__DIR__) . '/tests.config.php')) {
    echo "Could not find \dirname(__DIR__) . '/tests.config.php, create an tests config file from tests.config.sample.php" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    exit(1);
}

// Give access to tests_add_filter() function.
require_once "{\$_tests_dir}/includes/functions.php";
define('WP_TESTS_CONFIG_FILE_PATH', \dirname(__DIR__) . '/tests.config.php');
/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin()
{

    if (!function_exists('activate_plugin')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    if (!is_plugin_active('$DIR/$PLUGIN_BASE_FILE')) {
        activate_plugin('$DIR/$PLUGIN_BASE_FILE');
    }
    \$group = -1;
    foreach (\$_SERVER['argv'] as \$key => \$value) {
        if (\$value === '--group') {
            \$group = \$key + 1;
        }

        if (\$key === \$group && \$value === 'ajax') {
            \define('TEST_AJAX', \$value);
            \$group = -1;
        }

        if (\$key === \$group && \$value === 'api') {
            \define('TEST_API', \$value);
            \$group = -1;
        }
    }
    require \dirname(__DIR__) . '/$PLUGIN_BASE_FILE';
}

tests_add_filter('muplugins_loaded', '_manually_load_plugin');

// Start up the WP testing environment.
require "{\$_tests_dir}/includes/bootstrap.php";


if (file_exists(__DIR__ . '/BaseTestCase.php')) {
    require __DIR__ . '/BaseTestCase.php';
}

EOF
    ) >"$PLUGIN_DIR"/tests/bootstrap.php
}

createphpunitconfig() {
    alreadyexist "$PLUGIN_DIR/phpunit.xml.dist";
    (
        cat <<EOF
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/bootstrap.php"
    backupGlobals="false"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
    >
    <testsuites>
        <testsuite  name="Unit">
            <directory suffix="Test.php">./tests/</directory>
            <exclude>./tests/__libs</exclude>
            <exclude>./tests/BaseTestCase.php</exclude>
        </testsuite>
    </testsuites>
</phpunit>
EOF
    ) >"$PLUGIN_DIR"/phpunit.xml.dist
}

install_test_suite() {
    # portable in-place argument for both GNU sed and Mac OSX sed
    if [[ $(uname -s) == 'Darwin' ]]; then
        local ioption='-i.bak'
    else
        local ioption='-i'
    fi
    echo -e "\033[2K\rInstalling test libs in [ $WP_TESTS_DIR ] dir. \n Test tag: ${WP_TESTS_TAG} \n https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/includes/"
    # set up testing suite if it doesn't yet exist
    if [ ! -d "$WP_TESTS_DIR" ]; then
        # set up testing suite
        mkdir -p "$WP_TESTS_DIR"
    fi
    rm -rf $WP_TESTS_DIR/{includes,data}
    svn export --quiet --ignore-externals "https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/includes/" "$WP_TESTS_DIR/includes"
    svn export --quiet --ignore-externals "https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/data/" "$WP_TESTS_DIR/data"

    if [ ! -f "$PLUGIN_DIR/tests.config.sample.php" ]; then
        svn export --quiet --ignore-externals https://develop.svn.wordpress.org/${WP_TESTS_TAG}/wp-tests-config-sample.php "$PLUGIN_DIR/tests.config.sample.php"
        # remove all forward slashes in the end
        WP_CORE_DIR=$(echo $WP_CORE_DIR | sed "s:/\+$::")
        # sed $ioption "s:dirname( __FILE__ ) . '/src/':'$WP_CORE_DIR/':" "$PLUGIN_DIR/tests.config.sample.php"
        sed $ioption "s:dirname( __FILE__ ) . '/src/':\dirname(\dirname(\dirname(__DIR__))) . DIRECTORY_SEPARATOR:" "$PLUGIN_DIR/tests.config.sample.php"
        sed $ioption "s:__DIR__ . '/src/':'$WP_CORE_DIR/':" "$PLUGIN_DIR/tests.config.sample.php"
        sed $ioption "s/youremptytestdbnamehere/wp_test_db/" "$PLUGIN_DIR/tests.config.sample.php"
        sed $ioption "s/yourusernamehere/root/" "$PLUGIN_DIR/tests.config.sample.php"
        sed $ioption "s/yourpasswordhere//" "$PLUGIN_DIR/tests.config.sample.php"
    fi

}
checkrequirements() {
    if ! commandExists 'curl'; then
        echo -e " curl is requried"
        exit 1
    elif ! commandExists 'svn'; then
        echo -e " svn is requried"
        exit 1
    fi
}

main() {
    checkrequirements
    if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
        showHelp
    fi
    PLUGIN_DIR=$(readlink -f "$(dirname ${BASH_SOURCE[0]})/..")
    WP_CORE_DIR=$(readlink -f "$PLUGIN_DIR/../../../")

    WP_VERSION=${1-latest}

    cat <<EOF

--  ██████  ██ ████████  █████  ██████  ██████  ███████ 
--  ██   ██ ██    ██    ██   ██ ██   ██ ██   ██ ██      
--  ██████  ██    ██    ███████ ██████  ██████  ███████ 
--  ██   ██ ██    ██    ██   ██ ██      ██           ██ 
--  ██████  ██    ██    ██   ██ ██      ██      ███████ 
--                                                      
--                      PHP Unit Test generator for wp plugin                                  

   Plugin dir           : $PLUGIN_DIR 

   Wordpress dir        : $WP_CORE_DIR

   Wordpress version    : $WP_VERSION

a tests folder will be created if not exists

EOF
    read -p 'Are you sure you want to proceed? [y/N]: ' CREATE_TESTS

    isYes $CREATE_TESTS
    mkTestDir
    # WP_TESTS_DIR=${WP_TESTS_DIR-/wordpress-tests-lib}
    exit
}

set -eo pipefail

main "$@"
