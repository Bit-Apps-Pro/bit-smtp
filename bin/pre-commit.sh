#!/usr/bin/env sh

C_RESET='\e[0m'
C_RED='\e[31m'
C_GREEN='\e[32m'
C_YELLOW='\e[33m'

pathExists() {
    local is_exists=0

    if [ -d "$1" ]; then
        is_exists=1
    elif [ -f "$1" ]; then
        is_exists=1
    fi
    [ $is_exists -ne 0 ] 2>&1
}

commandExists() {
    which "$1" >/dev/null 2>&1
}

checknecessary() {
    if ! pathExists "./vendor/bin/php-cs-fixer"; then
        printf " ${C_RED}./vendor/bin/php-cs-fixer is required. please run \`composer install\` ${C_RESET}\n\n"; exit 1;
    elif ! pathExists "./vendor/bin/phpcs"; then
        printf " ${C_RED}./vendor/bin/phpcs is required. please run \`composer install\` ${C_RESET}\n\n"; exit 1;
    elif ! pathExists "./vendor/bin/phpunit"; then
        printf " ${C_RED}./vendor/bin/phpunit is required. please run \`composer install\` ${C_RESET}\n\n"; exit 1;
    elif ! pathExists "./frontend/node_modules/.bin/eslint"; then
        printf " ${C_RED}./frontend/node_modules/.bin/eslint is required. please install node_modules ${C_RESET}\n\n"; exit 1;
    fi
}

getexitstatus() {
    exitcode="$1"
    if [[ 0 == $exitcode || 130 == $exitcode ]]; then
        printf " ${C_GREEN}OK!${C_RESET}\n\n"
    else
        printf " ${C_RED}FAILED!${C_RESET}\n\n"
        echo "$2"
        exit 1
    fi
}

progress() {
    local exitcode SLEEP_TIME
    PID=$! #simulate a long process
    printf "%s  %-20s" "$1" " "
    SLEEP_TIME=${2-".1"}
    # While process is running...
    while kill -0 $PID 2>/dev/null; do
        printf "▓"
        sleep $SLEEP_TIME
    done
    wait $PID
    exitcode=$?
    if [ $exitcode -ne 0 ]; then
        exit $exitcode
    fi
}

lintphp() {
    for FILE in $1; do
        vendor/bin/php-cs-fixer fix $FILE >/dev/null 2>&1
    done
    git add . >/dev/null 2>&1
    getexitstatus 0
}

compatphp() {
    local output
    output=$(./vendor/bin/phpcs -p $1 --ignore=./tests/ --standard=PHPCompatibilityWP --runtime-set testVersion 5.6- --colors 2>&1)
    getexitstatus $? "$output"

}

csphp() {
    local output
    output=$(./vendor/bin/phpcs -p $1 --standard="phpcs.xml" --ignore="./tests/" --colors 2>&1)
    getexitstatus $? "$output"
}

unittestphp() {
    local output
    output=$(./vendor/bin/phpunit --colors=always 2>&1)
    getexitstatus $? "$output"
}

checkphp() {
    local modified=$(git diff --diff-filter=ACM --name-only --cached | grep ".php$")
    if [ ! -z "$modified" ]; then
        lintphp "$modified" &
        progress "php:lint"
        compatphp "$modified" &
        progress "php:compatibility"
        csphp "$modified" &
        progress "php:conding standard"
    fi
    unittestphp &
    progress "php:testing"
}

lintjs() {
    local output
    output=$(cd $1 && ./node_modules/.bin/eslint $3 --fix --color 2>&1)
    # output=$(cd $1 && $2 lint --color 2>&1)
    git add . >/dev/null 2>&1
    getexitstatus $? "$output"

}
checfrontend() {
    local packagemanager modified frontendpath
    frontendpath="$PWD/frontend"
    packagemanager="npm"
    if pathExists "$frontendpath/pnpm-lock.yaml" && commandExists "pnpm"; then
        packagemanager="pnpm"
    elif pathExists "$frontendpath/yarn.lock" && commandExists "yarn"; then
        packagemanager="yarn"
    fi

    modified=$(git diff --name-only --cached | xargs -I{} echo "$(pwd)/{}" | grep -E "(.tsx?|jsx?)$")
    if [ ! -z "$modified" ]; then
        lintjs "$frontendpath" "$packagemanager" "$modified" &
        progress "script:lint" .7
    fi
}

main() {
    checknecessary
    checkphp
    checfrontend
}
main
